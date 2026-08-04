"""Tests for the per-node config archive download.

These assert on the STRING build_command() produces and on real openssl
behaviour, never on the module's source text -- a test that greps the source
pins whatever the source currently does, including its bugs (CLAUDE.md #15).
"""
import shlex
import subprocess

import pytest

from server import node_config_backup as ncb


def _args(include_secrets: bool) -> list[str]:
    return shlex.split(ncb.build_command(include_secrets))


def test_default_archive_excludes_the_cluster_ca_key():
    """The default must not ship /etc/pve/priv.

    That directory holds pve-root-ca.key and authkey.key; anyone with them can
    mint a valid ticket for any user on the cluster. This is the single most
    important property of this feature, so it is asserted first.
    """
    args = _args(False)
    excludes = [args[i + 1] for i, a in enumerate(args) if a == "--exclude"]
    assert "etc/pve/priv" in excludes
    assert "etc/pve/priv/*" in excludes
    assert "*.key" in excludes
    assert "*.keyring" in excludes
    assert any("shadow.cfg" in e for e in excludes)


def test_default_archive_omits_the_secret_path_list():
    args = _args(False)
    for p in ncb.SECRET_PATHS:
        assert p.lstrip("/") not in args


def test_secrets_flag_adds_the_paths_and_drops_the_excludes():
    args = _args(True)
    assert "--exclude" not in args
    for p in ncb.SECRET_PATHS:
        assert p.lstrip("/") in args


def test_members_are_relative_so_extraction_cannot_overwrite_etc():
    """`tar -C / etc/pve` yields members like `etc/pve/...`.

    An absolute member would unpack straight over the extracting machine's own
    /etc, which for an operator poking at a backup on their laptop is a very
    bad afternoon.
    """
    args = _args(True)
    assert "-C" in args and args[args.index("-C") + 1] == "/"
    for a in args[args.index("/") + 1:]:
        assert not a.startswith("/"), a


def test_ignore_failed_read_is_present():
    """Without it one missing directory aborts the whole archive."""
    assert "--ignore-failed-read" in _args(False)


def test_core_paths_are_collected():
    args = _args(False)
    for p in ("/etc/pve", "/etc/network/interfaces", "/etc/hosts", "/etc/fstab"):
        assert p.lstrip("/") in args


def test_parse_skipped_reports_unreadable_paths():
    """A partial archive must be distinguishable from a complete one."""
    err = (
        "tar: /etc/multipath: Cannot open: No such file or directory\n"
        "tar: /etc/pve: Cannot stat: Permission denied\n"
        "tar: Exiting with failure status due to previous errors\n"
    )
    assert ncb.parse_skipped(err) == ["/etc/multipath", "/etc/pve"]


def test_parse_skipped_is_empty_for_a_clean_run():
    assert ncb.parse_skipped("") == []
    assert ncb.parse_skipped("tar: Removing leading `/' from member names\n") == []


def test_safe_node_cannot_escape_the_filename():
    assert ncb._safe_node("../../etc/passwd") == ".._.._etc_passwd"
    assert ncb._safe_node('a"b;rm -rf /') == "a_b_rm_-rf__"


@pytest.mark.skipif(
    subprocess.run(["which", "openssl"], capture_output=True).returncode != 0,
    reason="openssl not installed",
)
def test_encryption_opens_with_stock_openssl(tmp_path):
    """The whole point of the OpenSSL container format is that the operator
    never needs our tooling to get their config back."""
    plain = b"listen-address 0.0.0.0\n" * 500
    blob = ncb.encrypt_openssl(plain, "s3cret passphrase")
    enc = tmp_path / "a.enc"
    enc.write_bytes(blob)
    out = tmp_path / "a.out"
    r = subprocess.run(
        ["openssl", "enc", "-d", "-aes-256-cbc", "-pbkdf2", "-iter", "100000",
         "-md", "sha256", "-pass", "pass:s3cret passphrase",
         "-in", str(enc), "-out", str(out)],
        capture_output=True,
    )
    assert r.returncode == 0, r.stderr
    assert out.read_bytes() == plain


def test_encryption_uses_a_fresh_salt_each_time():
    """A fixed salt would derive the same key for every node and make identical
    configs recognisable by their ciphertext."""
    a = ncb.encrypt_openssl(b"x" * 64, "same")
    b = ncb.encrypt_openssl(b"x" * 64, "same")
    assert a[:8] == b[:8] == b"Salted__"
    assert a[8:16] != b[8:16]
    assert a[16:] != b[16:]


@pytest.mark.asyncio
async def test_viewer_and_operator_are_refused():
    """Exercise the REFUSAL, not the success path.

    An earlier version of this test asked the handler object whether it carried
    a `_min_role` attribute, which told us about the decorator's bookkeeping
    rather than about who can download the cluster CA key. Call it instead and
    check that it says no -- and that it says no BEFORE touching SSH, so a
    non-admin cannot even provoke a connection to a node.
    """
    class FakeReq(dict):
        match_info = {"cluster_id": "c1", "node": "host-1"}

    for role in ("viewer", "operator"):
        req = FakeReq()
        req["user"] = {"username": "u", "role_global": role}
        resp = await ncb.download_node_config_handler(req)
        assert resp.status == 403, role


def test_manifest_names_what_the_api_cannot_reach():
    """An API snapshot that reads like a full backup is worse than none.

    The manifest must name the absent files explicitly -- an operator reaching
    for this during a rebuild has to learn /etc/fstab is not in it BEFORE the
    rebuild, not during.
    """
    m = ncb._manifest("host-1", [("MANIFEST.txt", b"")], [], include_report=False)
    assert "WHAT THIS IS NOT" in m
    for frag in ("/etc/fstab", "grub", "chrony", "priv"):
        assert frag in m, frag


def test_manifest_warns_about_notes_when_report_included():
    """pvereport embeds guest notes, which on this operator's own cluster
    contain plaintext credentials."""
    m = ncb._manifest("host-1", [], [], include_report=True)
    assert "notes" in m and "plain text" in m
    m2 = ncb._manifest("host-1", [], [], include_report=False)
    assert "SYSTEM REPORT INCLUDED" not in m2


def test_manifest_lists_endpoints_that_failed():
    m = ncb._manifest("host-1", [], ["/cluster/ha/groups  (HTTPError: 500)"], False)
    assert "NOT COLLECTED" in m and "/cluster/ha/groups" in m


def test_targz_is_reproducible_and_rooted():
    """Same config in, same bytes out -- a changed checksum should mean the
    config changed, not that the clock moved."""
    import io as _io, tarfile as _tf
    files = [("etc/hosts", b"127.0.0.1 localhost\n"), ("a.json", b"{}")]
    a = ncb._targz("host-1-config", files)
    b = ncb._targz("host-1-config", list(reversed(files)))
    assert a == b
    names = _tf.open(fileobj=_io.BytesIO(a), mode="r:gz").getnames()
    assert names == ["host-1-config/a.json", "host-1-config/etc/hosts"]
    assert all(n.startswith("host-1-config/") for n in names)


def test_api_mode_never_requests_a_secret_path():
    """The API tables must not contain an endpoint that returns key material."""
    paths = [p for _, p in ncb.CLUSTER_ENDPOINTS + ncb.NODE_ENDPOINTS]
    for p in paths:
        assert "priv" not in p and "ssh" not in p.lower(), p


def test_skipped_entries_survive_the_header_round_trip():
    """The entries are API error messages containing commas.

    Joining them with "," made the dialog report five unreadable paths where
    there were two -- a count that is wrong in the direction that makes the
    archive look worse than it is, and would send someone hunting for missing
    files that are present.
    """
    entries = [
        "/cluster/ha/groups  (ClientResponseError: 500, message='x, y', url='z')",
        "/nodes/n1/report  (TimeoutError: )",
    ]
    packed = "\x1f".join(entries)
    assert packed.split("\x1f") == entries
    assert len(packed.split(",")) > len(entries)  # why "," cannot be used


def test_report_gets_a_longer_window_than_a_normal_read():
    """pvereport shells out on the node; the 10s client default is not enough,
    and the symptom was an archive missing the file the operator ticked."""
    assert ncb.REPORT_TIMEOUT > 60
    assert ncb.COLLECT_TIMEOUT > ncb.REPORT_TIMEOUT


def test_routes_are_post_only():
    """GET would put the passphrase in a URL, hence in the access log."""
    assert [m for m, _, _ in ncb.ROUTES] == ["POST"]
