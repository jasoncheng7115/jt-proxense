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

# ---------- where to send someone when this goes wrong ----------
# Same locale rule as install.sh: a Chinese system gets the Chinese page,
# everything else English. LC_ALL wins, then LC_MESSAGES, then LANG.
DOCS_BASE="https://jasoncheng7115.github.io/jt-proxense"
help_url() {
    case "${LC_ALL:-${LC_MESSAGES:-${LANG:-}}}" in
        zh_*|zh-*|zh|*[._]Hant*|*[._]Hans*)
            printf '%s/troubleshooting.zh-tw.html' "$DOCS_BASE" ;;
        *)  printf '%s/troubleshooting.html' "$DOCS_BASE" ;;
    esac
}
help_line() {
    case "${LC_ALL:-${LC_MESSAGES:-${LANG:-}}}" in
        zh_*|zh-*|zh|*[._]Hant*|*[._]Hans*)
            printf '  → 安裝與升級疑難排解：%s\n' "$(help_url)" >&2 ;;
        *)  printf '  → Install & upgrade troubleshooting: %s\n' "$(help_url)" >&2 ;;
    esac
}
die() { echo "ERROR: $*" >&2; help_line; exit 1; }
STATE_DIR="/var/lib/jt-proxense"     # SQLite DB (users / audit / secrets rows)
KEY_DIR="/etc/jt-proxense"           # master.key + secret store

ASSUME_YES="${JT_PROXENSE_YES:-0}"
for arg in "$@"; do
    case "$arg" in
        --yes|-y) ASSUME_YES=1 ;;
    esac
done

if [ "$(id -u)" -ne 0 ]; then
    die "run as root (sudo)."
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
        die "no terminal for confirmation — re-run with --yes to force."
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
rm -f /usr/local/bin/jt-proxense    # CLI wrapper (a symlink before v1.2.0) installed by install.sh

echo "[4/5] removing service user…"
if id "$SERVICE_USER" >/dev/null 2>&1; then
    userdel "$SERVICE_USER" 2>/dev/null || true
fi

echo "[5/5] done."
echo "jt-proxense has been completely removed from $(hostname)."
