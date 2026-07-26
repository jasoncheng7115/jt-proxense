"""Per-node NIC / bridge / bond status — the data behind jt_nicmon.sh,
gathered over SSH from sysfs + ethtool and returned as JSON for the UI
to render in the house style.

Read-only (viewer+); the remote script takes NO operator input, so there
is no injection surface — it only reads /sys/class/net and `ip`/`ethtool`.

Route:
  GET /api/clusters/{cid}/nodes/{node}/netinfo
      → {ok,
         phys: [{iface, state, link, speed, duplex, mac}],
         nets: [{iface, type, ipv4, members: [..]}]}
"""
from __future__ import annotations

import json
import logging

from aiohttp import web

from .cluster_manager import cluster_manager
from . import ssh_util
from .middleware import role_required

logger = logging.getLogger(__name__)

# Fixed remote script — no interpolation, emits tab-separated rows.
# Section 1 = physical NICs, Section 2 (after '---') = bridges/bonds.
# Mirrors jt_nicmon.sh's sysfs-attribute detection + PVE transient-iface
# filtering (fwbr/fwln/fwpr/veth/vnet/tap).
_SCRIPT = r"""
for dev in $(ls -1 /sys/class/net | sort); do
  base=/sys/class/net/$dev
  if [ -d "$base/bridge" ] || [ -d "$base/brif" ]; then typ=BR
  elif [ -d "$base/bonding" ]; then typ=BOND
  elif [ -d "$base/device" ]; then typ=PHY
  else continue; fi
  [ "$typ" = PHY ] || continue
  st=$(cat "$base/operstate" 2>/dev/null); [ -z "$st" ] && st=-
  carr=$(cat "$base/carrier" 2>/dev/null)
  case "$carr" in 1) lnk=yes;; 0) lnk=no;; *) lnk=-;; esac
  et=$(ethtool "$dev" 2>/dev/null)
  sp=$(printf '%s' "$et" | awk -F': ' '/Speed:/{print $2}'); case "$sp" in ''|Unknown*|*255*) sp=-;; esac
  du=$(printf '%s' "$et" | awk -F': ' '/Duplex:/{print $2}'); case "$du" in ''|Unknown*|unknow) du=-;; esac
  mac=$(cat "$base/address" 2>/dev/null); [ -z "$mac" ] && mac=-
  printf 'PHY\t%s\t%s\t%s\t%s\t%s\t%s\n' "$dev" "$st" "$lnk" "$sp" "$du" "$mac"
done
echo '---'
for dev in $(ls -1 /sys/class/net | sort); do
  base=/sys/class/net/$dev
  if [ -d "$base/bridge" ] || [ -d "$base/brif" ]; then typ=BR
  elif [ -d "$base/bonding" ]; then typ=BOND
  else continue; fi
  keep=0
  case "$dev" in vmbr[0-9]*|bond[0-9]*) keep=1;; esac
  ip=$(ip -4 -o addr show dev "$dev" 2>/dev/null | awk '{print $4}' | head -n1); [ -z "$ip" ] && ip=-
  [ "$ip" != - ] && keep=1
  mem=""
  if [ -d "$base/brif" ]; then
    for p in "$base"/brif/*; do [ -e "$p" ] || continue; m=$(basename "$p")
      case "$m" in fwbr*|fwln*|fwpr*|veth*|vnet*|tap*) continue;; esac
      if [ -d "/sys/class/net/$m/bonding" ] || [ -d "/sys/class/net/$m/device" ]; then mem="$mem $m"; keep=1; continue; fi
      case "$m" in *.[0-9]*) mem="$mem $m";; esac
    done
  fi
  if [ -r "$base/bonding/slaves" ]; then
    for b in $(cat "$base/bonding/slaves"); do
      case "$b" in fwbr*|fwln*|fwpr*|veth*|vnet*|tap*) continue;; esac
      mem="$mem $b"
    done
  fi
  case "$dev" in vnet[0-9]*|fwbr[0-9]*|fwln[0-9]*|fwpr[0-9]*|tap[0-9]*|sdn[0-9]*) keep=0;; esac
  [ "$keep" = 1 ] || continue
  members=$(printf '%s\n' $mem | awk 'NF&&!s[$0]++' | xargs echo); [ -z "$members" ] && members=-
  printf 'NET\t%s\t%s\t%s\t%s\n' "$dev" "$typ" "$ip" "$members"
done
"""


def _ssh_for(cluster, node: str):
    # Single source of truth in ssh_util — this used to be five byte-identical
    # copies, which is how the missing connect timeout stayed missing.
    return ssh_util.target_for(cluster, node)


@role_required("viewer")
async def netinfo_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    host, user, port = _ssh_for(cluster, node)
    try:
        async with await ssh_util.connect(host, user, port) as conn:
            r = await conn.run(_SCRIPT, check=False, timeout=25)
            out = r.stdout or ""
    except Exception as e:
        return web.json_response({"ok": False, "error": str(e)}, status=502)

    phys, nets = [], []
    section = "phys"
    for line in out.splitlines():
        if line.strip() == "---":
            section = "nets"
            continue
        parts = line.split("\t")
        if parts[0] == "PHY" and len(parts) >= 7:
            phys.append({"iface": parts[1], "state": parts[2], "link": parts[3],
                         "speed": parts[4], "duplex": parts[5], "mac": parts[6]})
        elif parts[0] == "NET" and len(parts) >= 5:
            members = [m for m in parts[4].split() if m and m != "-"]
            nets.append({"iface": parts[1], "type": parts[2],
                         "ipv4": parts[3], "members": members})

    return web.json_response({"ok": True, "phys": phys, "nets": nets})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/netinfo", netinfo_handler),
]
