#!/usr/bin/env bash
#
# JT-PROXENSE — one-liner installer (Linux only)
#
# Usage (requires sudo / root):
#   curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh | sudo bash
#
# Environment overrides (for testing):
#   JT_PROXENSE_REPO_URL  — git URL to clone from (default: GitHub main branch)
#   JT_PROXENSE_INSTALL_DIR — target directory (default: /opt/jt-proxense)
#   JT_PROXENSE_USER      — service user (default: jt-proxense)
#   JT_PROXENSE_PORT      — HTTP port written into config.yaml (default: 8098)
#
set -euo pipefail

# ---------- pretty output ----------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
say()  { printf "%b%s%b\n" "$CYAN" "$*" "$NC"; }
ok()   { printf "%b  ✓ %s%b\n" "$GREEN" "$*" "$NC"; }
warn() { printf "%b  ! %s%b\n" "$YELLOW" "$*" "$NC"; }
die()  { printf "%b  ✗ %s%b\n" "$RED" "$*" "$NC" >&2; exit 1; }

# ---------- config ----------
REPO_URL="${JT_PROXENSE_REPO_URL:-https://github.com/jasoncheng7115/jt-proxense.git}"
INSTALL_DIR="${JT_PROXENSE_INSTALL_DIR:-/opt/jt-proxense}"
SERVICE_USER="${JT_PROXENSE_USER:-jt-proxense}"
HTTP_PORT="${JT_PROXENSE_PORT:-8098}"
SERVICE_NAME="jt-proxense"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

# ---------- root check ----------
if [ "$(id -u)" -ne 0 ]; then
    die "This installer must run as root. Try: sudo bash install.sh"
fi

# ---------- banner ----------
cat <<'EOF'

   ╔═══════════════════════════════════════════════════════════╗
   ║            JT-PROXENSE — Installation                     ║
   ║      Real-time Proxmox VE monitoring · Cyberpunk UI       ║
   ╚═══════════════════════════════════════════════════════════╝

EOF

# ---------- /dev/tty for interactive prompts (curl|bash safe) ----------
# `[ -r /dev/tty ]` returns true even when there is no controlling terminal
# (e.g. ssh without -t). Probe in a subshell so bash's "no such device"
# diagnostic is captured, then only do the real exec if the probe passed.
INPUT_FD=""
if [ -t 0 ]; then
    INPUT_FD=0
elif (exec </dev/tty) 2>/dev/null; then
    exec 3</dev/tty
    INPUT_FD=3
fi
ask_yes_no() {
    # ask_yes_no "Prompt?" default(y|n)
    local prompt="$1" default="${2:-n}" reply
    if [ -z "$INPUT_FD" ]; then
        [ "$default" = "y" ] && return 0 || return 1
    fi
    while true; do
        printf "  %s [%s]: " "$prompt" "$default" >&2
        IFS= read -r -u "$INPUT_FD" reply || reply=""
        reply="${reply:-$default}"
        case "$reply" in
            [Yy]|[Yy][Ee][Ss]) return 0 ;;
            [Nn]|[Nn][Oo])     return 1 ;;
        esac
    done
}

# ---------- 1. preflight ----------
say "[1/6] Network preflight (8s timeout per host)..."
preflight_host() {
    local host="$1"
    if curl -fsSI --connect-timeout 8 --max-time 8 "https://${host}/" >/dev/null 2>&1; then
        ok "${host} reachable"
    else
        warn "${host} not reachable — install may fail"
    fi
}
preflight_host "github.com"
preflight_host "pypi.org"

# ---------- 2. detect distro + install OS deps ----------
say "[2/6] Installing OS prerequisites (python3, git)..."
if   command -v apt-get >/dev/null 2>&1; then PM=apt
elif command -v dnf     >/dev/null 2>&1; then PM=dnf
elif command -v yum     >/dev/null 2>&1; then PM=yum
elif command -v pacman  >/dev/null 2>&1; then PM=pacman
elif command -v zypper  >/dev/null 2>&1; then PM=zypper
else die "No supported package manager (apt / dnf / yum / pacman / zypper) found."
fi

case "$PM" in
    apt)    DEBIAN_FRONTEND=noninteractive apt-get update -qq
            DEBIAN_FRONTEND=noninteractive apt-get install -y -q python3 python3-pip python3-venv git curl ca-certificates >/dev/null ;;
    dnf|yum) "$PM" install -y -q python3 python3-pip git curl ca-certificates >/dev/null ;;
    pacman) pacman -Sy --noconfirm --needed python python-pip git curl ca-certificates >/dev/null ;;
    zypper) zypper --non-interactive install -y python3 python3-pip git curl ca-certificates >/dev/null ;;
esac

# Verify python >= 3.10
PY_VER=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
PY_MAJ=${PY_VER%.*}; PY_MIN=${PY_VER#*.}
if [ "$PY_MAJ" -lt 3 ] || { [ "$PY_MAJ" -eq 3 ] && [ "$PY_MIN" -lt 10 ]; }; then
    die "Python 3.10+ required, found ${PY_VER}"
fi
ok "python ${PY_VER}, git $(git --version | awk '{print $3}') ready"

# ---------- 3. service user ----------
say "[3/6] Service user '${SERVICE_USER}'..."
if id "$SERVICE_USER" >/dev/null 2>&1; then
    ok "user already exists"
else
    useradd --system --shell /usr/sbin/nologin --home-dir "$INSTALL_DIR" --no-create-home "$SERVICE_USER"
    ok "user created"
fi

# ---------- 4. clone or update source ----------
say "[4/6] Source code at ${INSTALL_DIR}..."
mkdir -p "$INSTALL_DIR"

# Mark install dir as safe.directory before any git op (service-user owns it,
# but we run git as root). See SOP §2 Linux 特例.
export GIT_CONFIG_KEY_0=safe.directory
export GIT_CONFIG_VALUE_0="$INSTALL_DIR"
export GIT_CONFIG_COUNT=1

if [ -d "$INSTALL_DIR/.git" ]; then
    git -C "$INSTALL_DIR" fetch --quiet origin main
    git -C "$INSTALL_DIR" reset --hard --quiet origin/main
    ok "updated from ${REPO_URL}"
else
    # Fresh install — clone into a temp dir, then move (so we don't blow away
    # any existing config.yaml the user already placed)
    if [ -e "$INSTALL_DIR/run.py" ]; then
        die "${INSTALL_DIR} is non-empty but not a git checkout. Refusing to overwrite. Move it aside or set JT_PROXENSE_INSTALL_DIR."
    fi
    git clone --depth 1 --quiet "$REPO_URL" "$INSTALL_DIR"
    ok "cloned ${REPO_URL}"
fi

# ---------- 5. python deps ----------
say "[5/6] Python dependencies (system pip)..."
PIP_OPTS="--quiet --root-user-action=ignore"
python3 -m pip install $PIP_OPTS --upgrade pip >/dev/null 2>&1 || true
python3 -m pip install $PIP_OPTS -r "$INSTALL_DIR/requirements.txt"
ok "dependencies installed"

# Smoke test imports — every runtime dep listed here.
# Adding a new runtime dep? Update this line AND requirements.txt (SOP §7.1).
python3 -c "import aiohttp, aiohttp_cors, yaml, certifi" \
    || die "Smoke test failed — a runtime module did not import. Check requirements.txt."
ok "import smoke test passed"

# ---------- 6. config.yaml + ownership + systemd ----------
say "[6/6] Configuration, ownership, systemd unit..."
if [ ! -f "$INSTALL_DIR/config.yaml" ]; then
    cp "$INSTALL_DIR/config.example.yaml" "$INSTALL_DIR/config.yaml"
    ok "created config.yaml from example (edit it before starting!)"
else
    ok "config.yaml already exists — left untouched"
fi

# Hand the whole tree to the service user (root may have written .git refs / .pyc)
chown -R "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR"
ok "ownership set to ${SERVICE_USER}:${SERVICE_USER}"

# Install systemd unit
install -m 0644 "$INSTALL_DIR/packaging/${SERVICE_NAME}.service" "$SERVICE_FILE"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1 || true
ok "systemd unit installed and enabled"

START_NOW=1
if ask_yes_no "Start ${SERVICE_NAME} service now?" y; then
    systemctl restart "$SERVICE_NAME"
    sleep 1
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        ok "service is running"
    else
        warn "service failed to start — check: journalctl -u ${SERVICE_NAME} -n 50"
        START_NOW=0
    fi
else
    START_NOW=0
fi

# ---------- summary ----------
HOST_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
[ -z "$HOST_IP" ] && HOST_IP="<your-server-ip>"

cat <<EOF

   ╔═══════════════════════════════════════════════════════════╗
   ║                Installation complete                      ║
   ╚═══════════════════════════════════════════════════════════╝

   Edit your PVE clusters:
       sudo -u ${SERVICE_USER} \$EDITOR ${INSTALL_DIR}/config.yaml

   Service control:
       sudo systemctl start   ${SERVICE_NAME}
       sudo systemctl stop    ${SERVICE_NAME}
       sudo systemctl status  ${SERVICE_NAME}
       sudo journalctl -u ${SERVICE_NAME} -f

EOF
if [ "$START_NOW" = "1" ]; then
    echo "   Open in browser:  http://${HOST_IP}:${HTTP_PORT}/"
    echo
fi
echo "   Security note: this build ships with no built-in authentication."
echo "   Put it behind a reverse proxy + auth before exposing to a network."
echo
