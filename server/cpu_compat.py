"""CPU-compatibility pre-flight for LIVE QEMU migrations.

Same bug class as the HA-affinity and storage guards in migrate_guard: PVE
ACCEPTS a live migration it cannot fulfil and fails it asynchronously. The
destination QEMU has to present the guest with the exact CPU it booted on; if
the target host cannot, the task dies after the UI said "migrating" — or, for
`cpu: host`, it may even complete and leave a guest that faults the first time
it executes an instruction the new host lacks.

What the real cluster looks like (tests/fixtures/cpu/, PVE 9.2.3): host-114 is
an AMD Ryzen, host-108 an Intel i5-10400 (no AVX-512), host-109/110/111 Intel
Xeon D-2141I (AVX-512). Guests running `cpu: host` exist on both host-108 and
host-114, so a mixed-vendor cluster is not hypothetical here.

What we check, all from the PVE API (no SSH):

  * `cpu: host` / `max` — the guest sees the source host's CPU. Refuse a target
    of a different vendor, or one missing an ISA feature the source has. Only a
    curated list of GUEST-VISIBLE instruction-set flags is compared:
    /proc/cpuinfo also carries kernel and VMX-capability flags (`ept`, `pti`,
    `flexpriority`...) that differ between hosts and mean nothing to a guest,
    and comparing those would refuse migrations that work.
  * `x86-64-v2` … `x86-64-v4` (and `-AES`) — the psABI levels have a fixed
    definition; the target must carry every flag of the level.
  * `flags=+x` — PVE's own `/capabilities/qemu/cpu-flags` answers which nodes
    support each optional flag (`supported-on`); that is authoritative, so use
    it rather than guessing the /proc spelling of `spec-ctrl` & co.

Everything else — named models such as `SandyBridge`, `EPYC`, custom models,
`kvm64` — is NOT judged: we do not carry QEMU's model tables, and a guard that
guesses would be wrong in both directions. Like every check in migrate_guard it
fails OPEN: missing data, an unreadable node, an unknown model → no block. It
blocks only when it can name the flag that is missing.

Offline migrations are never checked: a stopped guest boots fresh on the target
and picks up whatever CPU is there (a named model the target cannot provide
then fails at START, which is a separate and immediately visible error).
"""
from __future__ import annotations

import logging
import time

logger = logging.getLogger(__name__)

# /proc/cpuinfo spellings.
_V2 = frozenset({"cx16", "lahf_lm", "popcnt", "sse4_1", "sse4_2", "ssse3"})
_V3 = _V2 | {"avx", "avx2", "bmi1", "bmi2", "f16c", "fma", "abm", "movbe",
             "xsave"}
_V4 = _V3 | {"avx512f", "avx512bw", "avx512cd", "avx512dq", "avx512vl"}
LEVELS: dict[str, frozenset] = {
    "x86-64-v2": _V2,
    "x86-64-v2-aes": _V2 | {"aes"},
    "x86-64-v3": _V3,
    "x86-64-v4": _V4,
}

# Instruction-set features a guest can execute. Deliberately excludes the
# kernel/virtualisation flags that /proc/cpuinfo also lists — see module doc.
GUEST_VISIBLE = frozenset({
    "sse", "sse2", "sse3", "pni", "ssse3", "sse4_1", "sse4_2", "sse4a",
    "avx", "avx2", "fma", "fma4", "f16c", "xop",
    "avx512f", "avx512bw", "avx512cd", "avx512dq", "avx512vl", "avx512ifma",
    "avx512vbmi", "avx512_vbmi2", "avx512_vnni", "avx512_bitalg",
    "avx512_vpopcntdq", "avx512_bf16", "avx512_fp16", "avx_vnni",
    "aes", "vaes", "pclmulqdq", "vpclmulqdq", "sha_ni", "gfni",
    "bmi1", "bmi2", "abm", "adx", "popcnt", "movbe", "lahf_lm", "cx16",
    "rdrand", "rdseed", "rdpid", "xsave", "xsaveopt", "xsavec", "xsaves",
    "clflushopt", "clwb", "pku", "erms", "fsrm", "invpcid", "pcid",
    "pdpe1gb", "tbm", "clzero", "wbnoinvd", "movdiri", "movdir64b",
    "serialize", "waitpkg", "amx_tile", "amx_int8", "amx_bf16",
})

# Node CPU info rarely changes (a reboot onto new hardware); a migration dialog
# and an evacuation plan may ask many times in a row.
CACHE_TTL = 600.0
_cpuinfo: dict[tuple[str, str], tuple[float, dict]] = {}
_flagcaps: dict[str, tuple[float, dict]] = {}


def parse_cpu(raw) -> tuple[str, set[str]]:
    """`x86-64-v3,flags=+aes;-pcid` → ("x86-64-v3", {"aes"}).

    Returns the lower-cased model and the set of flags the config ADDS (a `-`
    flag only removes something, so it can never make a target unsuitable).
    PVE also accepts `cputype=` as an explicit key.
    """
    model = ""
    plus: set[str] = set()
    for part in str(raw or "").split(","):
        part = part.strip()
        if not part:
            continue
        if "=" in part:
            k, _, v = part.partition("=")
            k = k.strip().lower()
            if k == "cputype":
                model = v.strip()
            elif k == "flags":
                for f in v.split(";"):
                    f = f.strip()
                    if f.startswith("+"):
                        plus.add(f[1:].strip().lower())
        elif not model:
            model = part
    return model.lower(), plus


def _flags(info) -> set[str]:
    return set(str((info or {}).get("flags") or "").split())


def blockers(cpu_raw, src_info: dict | None, dst_info: dict | None,
             flag_caps: dict | None, target: str) -> dict | None:
    """Pure decision: why this CPU config cannot live-migrate to `target`.

    `src_info` / `dst_info` are the `cpuinfo` objects from /nodes/{n}/status;
    `flag_caps` maps an optional PVE cpu flag to the set of nodes supporting it.
    None means go ahead (including "we cannot tell").
    """
    model, plus = parse_cpu(cpu_raw)
    dst = _flags(dst_info)

    # PVE-level optional flags first: PVE itself says where they work.
    if plus and flag_caps:
        missing = sorted(f for f in plus
                         if f in flag_caps and target not in flag_caps[f])
        if missing:
            return {
                "error": "cpu_flag_unsupported_on_target",
                "detail": (
                    f"the guest's CPU config adds {', '.join('+' + f for f in missing)}, "
                    f"which PVE reports is not supported on '{target}'. PVE would "
                    f"accept the live migration and then fail it."),
                "flags": missing, "target": target,
            }

    if not dst:
        return None                              # target unreadable → fail open

    sv = str((src_info or {}).get("vendor") or "")
    dv = str((dst_info or {}).get("vendor") or "")
    # nested-virt exposes vmx on Intel and svm on AMD; PVE's own description of
    # the flag says live migration only works with the same flag on both sides.
    if "nested-virt" in plus and sv and dv and sv != dv:
        return {
            "error": "cpu_vendor_mismatch",
            "detail": (
                f"the guest enables nested virtualisation, which is vmx on Intel "
                f"and svm on AMD; the source is {sv} and '{target}' is {dv}, so "
                f"a live migration cannot carry it across."),
            "cpu": model, "source_vendor": sv, "target_vendor": dv,
            "target": target,
        }

    if model in ("host", "max"):
        src = _flags(src_info)
        if not src:
            return None
        if sv and dv and sv != dv:
            return {
                "error": "cpu_vendor_mismatch",
                "detail": (
                    f"the guest uses cpu type '{model}', so it sees the source "
                    f"host's {sv} CPU; '{target}' is {dv}. A live migration "
                    f"between CPU vendors cannot work — migrate offline, or "
                    f"switch the guest to a common model such as x86-64-v2-AES."),
                "cpu": model, "source_vendor": sv, "target_vendor": dv,
                "target": target,
            }
        missing = sorted((src & GUEST_VISIBLE) - dst)
        if missing:
            return {
                "error": "cpu_features_missing_on_target",
                "detail": (
                    f"the guest uses cpu type '{model}' and may be executing "
                    f"{', '.join(missing[:8])}{'…' if len(missing) > 8 else ''}, "
                    f"which '{target}' does not have. Migrate offline, or switch "
                    f"the guest to a model every node supports."),
                "cpu": model, "missing": missing, "target": target,
            }
        return None

    need = LEVELS.get(model)
    if need is not None:
        missing = sorted(need - dst)
        if missing:
            return {
                "error": "cpu_level_unsupported_on_target",
                "detail": (
                    f"the guest's cpu type '{model}' requires "
                    f"{', '.join(missing)}, which '{target}' does not have."),
                "cpu": model, "missing": missing, "target": target,
            }
    return None


# ───────────────────────────────────────────────────────── data gathering

async def node_cpuinfo(cluster, node: str) -> dict | None:
    cid = getattr(cluster, "id", "") or ""
    hit = _cpuinfo.get((cid, node))
    now = time.monotonic()
    if hit and now - hit[0] < CACHE_TTL:
        return hit[1]
    try:
        st = await cluster.client.get_node_status(node) or {}
        info = st.get("cpuinfo") if isinstance(st, dict) else None
    except Exception as e:
        logger.debug("cpu guard: status of %s unreadable: %s", node, e)
        return None
    if isinstance(info, dict) and info.get("flags"):
        _cpuinfo[(cid, node)] = (now, info)
        return info
    return None


async def load_flag_caps(cluster, node: str) -> dict | None:
    """{flag: set(nodes)} from /capabilities/qemu/cpu-flags (PVE 8.3+)."""
    cid = getattr(cluster, "id", "") or ""
    hit = _flagcaps.get(cid)
    now = time.monotonic()
    if hit and now - hit[0] < CACHE_TTL:
        return hit[1]
    try:
        rows = await cluster.client._request(
            "GET", f"/nodes/{node}/capabilities/qemu/cpu-flags") or []
    except Exception as e:
        logger.debug("cpu guard: cpu-flags unreadable: %s", e)
        return None
    caps: dict = {}
    for r in rows if isinstance(rows, list) else []:
        name = str((r or {}).get("name") or "").lower()
        on = (r or {}).get("supported-on")
        if name and isinstance(on, list):
            caps[name] = {str(n) for n in on}
    _flagcaps[cid] = (now, caps)
    return caps


def _guest(cluster, vmid, node):
    vms = getattr(getattr(cluster, "cache", None), "vms", None) or {}
    items = vms.values() if isinstance(vms, dict) else vms
    for v in items:
        g = v.get if isinstance(v, dict) else (lambda k, d=None, _v=v: getattr(_v, k, d))
        if str(g("vmid")) != str(vmid):
            continue
        if node and g("node") and g("node") != node:
            continue
        return g
    return None


def guest_is_running(cluster, vmid, node) -> bool | None:
    g = _guest(cluster, vmid, node)
    if g is None:
        return None
    st = g("status")
    return str(getattr(st, "value", st) or "").lower() == "running"


async def guest_cpu(cluster, vmid, node) -> str | None:
    """The guest's `cpu` config line; "" when unset (QEMU default kvm64)."""
    try:
        cfg = await cluster.client.get_vm_config(node, int(vmid)) or {}
    except Exception as e:
        logger.debug("cpu guard: config of %s unreadable: %s", vmid, e)
        return None
    return str(cfg.get("cpu") or "") if isinstance(cfg, dict) else None


class Checker:
    """Checks one guest against several targets with one config read."""

    def __init__(self, cluster, kind: str, vmid, source: str | None,
                 online: bool, config: dict | None = None):
        self.cluster = cluster
        self.active = (
            online and (kind or "qemu").lower() in ("qemu", "vm")
            and bool(source) and getattr(cluster, "client", None) is not None
            and guest_is_running(cluster, vmid, source) is True)
        self.vmid = vmid
        self.source = source
        self._loaded = False
        self._config = config                   # already read by the caller
        self._cpu = None
        self._src = None
        self._caps = None

    async def _load(self):
        if self._loaded:
            return
        self._loaded = True
        if isinstance(self._config, dict):
            self._cpu = str(self._config.get("cpu") or "")
        else:
            self._cpu = await guest_cpu(self.cluster, self.vmid, self.source)
        if not self._cpu:
            return                              # default / unreadable: nothing to judge
        self._src = await node_cpuinfo(self.cluster, self.source)
        if parse_cpu(self._cpu)[1]:
            self._caps = await load_flag_caps(self.cluster, self.source)

    async def check(self, target: str) -> dict | None:
        if not self.active or target == self.source:
            return None
        try:
            await self._load()
            if not self._cpu:
                return None
            dst = await node_cpuinfo(self.cluster, target)
            return blockers(self._cpu, self._src, dst, self._caps, target)
        except Exception as e:
            logger.warning("cpu guard failed for %s → %s: %s", self.vmid, target, e)
            return None
