"""SSH key helper — surfaces the jt-proxense host's own root public key
so the UI can show a copy-paste SOP for enabling the passwordless SSH
that the node-level features (NTP / host upgrade / VM export / storage
download) depend on.

Read-only, admin-only. Generates a keypair on first call if the host
has none yet, so the returned key is always usable.

Route:
  GET /api/ssh/pubkey → {ok, has_key, pubkey, generated}
"""
from __future__ import annotations

import logging
import os
import subprocess
from pathlib import Path

from aiohttp import web

from .middleware import role_required

logger = logging.getLogger(__name__)

_KEY = Path.home() / ".ssh" / "id_ed25519"
_PUB = Path.home() / ".ssh" / "id_ed25519.pub"


@role_required("admin")
async def pubkey_handler(request: web.Request) -> web.Response:
    generated = False
    try:
        if not _PUB.exists():
            _KEY.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
            # Non-interactive keygen; empty passphrase so the daemon can
            # use it unattended (same trust model as the existing
            # SSH-based features).
            subprocess.run(
                ["ssh-keygen", "-t", "ed25519", "-N", "", "-q",
                 "-C", "jt-proxense", "-f", str(_KEY)],
                check=True, timeout=15,
            )
            generated = True
        pub = _PUB.read_text(encoding="utf-8").strip()
        return web.json_response({"ok": True, "has_key": True,
                                  "pubkey": pub, "generated": generated})
    except Exception as e:
        logger.warning("ssh pubkey read/generate failed: %s", e)
        return web.json_response({"ok": False, "has_key": False,
                                  "error": str(e)}, status=500)


ROUTES = [
    ("GET", r"/api/ssh/pubkey", pubkey_handler),
]
