#!/usr/bin/env bash
#
# uninstall.sh — completely remove jt-proxense from this host.
#
# One-liner:
#   curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/uninstall.sh | sudo bash
#
# Removes EVERYTHING: the service, the install dir, the SQLite data dir, the
# encrypted secret store + master key, and the service user. This is
# irreversible — export your config first if you might want it back:
#   sudo jt-proxense export-config /root/jt-proxense-backup.enc
#
# Env / flags:
#   --yes  (or JT_PROXENSE_YES=1)  skip the confirmation prompt (for pipes/CI)
#
set -euo pipefail

INSTALL_DIR="${JT_PROXENSE_INSTALL_DIR:-/opt/jt-proxense}"
SERVICE_USER="${JT_PROXENSE_USER:-jt-proxense}"
SERVICE_NAME="jt-proxense"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
STATE_DIR="/var/lib/jt-proxense"     # SQLite DB (users / audit / secrets rows)
KEY_DIR="/etc/jt-proxense"           # master.key + secret store

ASSUME_YES="${JT_PROXENSE_YES:-0}"
for arg in "$@"; do
    case "$arg" in
        --yes|-y) ASSUME_YES=1 ;;
    esac
done

if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: run as root (sudo)." >&2
    exit 1
fi

cat <<EOF
This will COMPLETELY remove jt-proxense from this host:
  - stop + disable the ${SERVICE_NAME} service
  - ${SERVICE_FILE}
  - ${INSTALL_DIR}          (application)
  - ${STATE_DIR}            (SQLite DB: users, audit, cluster secrets)
  - ${KEY_DIR}              (master key — decrypts the secret store)
  - the '${SERVICE_USER}' service user
This is IRREVERSIBLE. Export first if unsure:
  sudo jt-proxense export-config /root/jt-proxense-backup.enc
EOF

if [ "$ASSUME_YES" != "1" ]; then
    # Works even when piped (curl | bash): read from the controlling terminal.
    if [ -r /dev/tty ]; then
        printf "Type 'remove' to proceed: " > /dev/tty
        read -r reply < /dev/tty
    else
        echo "ERROR: no terminal for confirmation — re-run with --yes to force." >&2
        exit 1
    fi
    [ "$reply" = "remove" ] || { echo "aborted."; exit 1; }
fi

echo "[1/5] stopping service…"
systemctl stop "$SERVICE_NAME" 2>/dev/null || true
systemctl disable "$SERVICE_NAME" 2>/dev/null || true

echo "[2/5] removing systemd unit…"
rm -f "$SERVICE_FILE"
systemctl daemon-reload 2>/dev/null || true

echo "[3/5] removing files…"
rm -rf "$INSTALL_DIR" "$STATE_DIR" "$KEY_DIR"

echo "[4/5] removing service user…"
if id "$SERVICE_USER" >/dev/null 2>&1; then
    userdel "$SERVICE_USER" 2>/dev/null || true
fi

echo "[5/5] done."
echo "jt-proxense has been completely removed from $(hostname)."
