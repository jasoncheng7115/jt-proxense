"""Test helper: a throwaway self-signed TLS context for fake upstream servers.

pve_client, console_proxy and the ESXi adapter all HARDCODE `https://` /
`wss://` when they build upstream URLs, so a plain-HTTP fake would never be
reached. Rather than monkeypatch URL builders (which would stop the tests from
exercising the real URL the code produces), the fakes speak real TLS with a
certificate minted here at runtime.

No key material is committed: the key is generated per test session into a
private temp directory and never leaves it.
"""
from __future__ import annotations

import atexit
import datetime
import functools
import os
import shutil
import ssl
import tempfile


@functools.lru_cache(maxsize=1)
def _cert_paths() -> tuple[str, str]:
    from cryptography import x509
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.x509.oid import NameOID
    import ipaddress

    key = ec.generate_private_key(ec.SECP256R1())
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "fake-upstream.invalid")])
    now = datetime.datetime.now(datetime.timezone.utc)
    cert = (
        x509.CertificateBuilder()
        .subject_name(name)
        .issuer_name(name)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(now - datetime.timedelta(days=1))
        .not_valid_after(now + datetime.timedelta(days=2))
        .add_extension(
            x509.SubjectAlternativeName([x509.IPAddress(ipaddress.ip_address("127.0.0.1"))]),
            critical=False,
        )
        .sign(key, hashes.SHA256())
    )
    d = tempfile.mkdtemp(prefix="jtp-fake-tls-")
    atexit.register(shutil.rmtree, d, True)
    cert_p = os.path.join(d, "cert.pem")
    key_p = os.path.join(d, "key.pem")
    with open(cert_p, "wb") as f:
        f.write(cert.public_bytes(serialization.Encoding.PEM))
    fd = os.open(key_p, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "wb") as f:
        f.write(key.private_bytes(
            serialization.Encoding.PEM,
            serialization.PrivateFormat.PKCS8,
            serialization.NoEncryption(),
        ))
    return cert_p, key_p


def server_ssl_context() -> ssl.SSLContext:
    cert_p, key_p = _cert_paths()
    ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ctx.load_cert_chain(cert_p, key_p)
    return ctx
