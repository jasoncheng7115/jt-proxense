#!/usr/bin/env bash
#
# JT-PROXENSE — one-liner installer (Linux only)
#
# Usage (requires sudo / root):
#   curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh | sudo bash
#
# Environment overrides (for testing):
#   JT_PROXENSE_REPO_URL  — git URL to clone from (default: GitHub repo)
#   JT_PROXENSE_BRANCH    — branch / tag / SHA to check out (default: main)
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
REPO_BRANCH="${JT_PROXENSE_BRANCH:-main}"
INSTALL_DIR="${JT_PROXENSE_INSTALL_DIR:-/opt/jt-proxense}"
SERVICE_USER="${JT_PROXENSE_USER:-jt-proxense}"
HTTP_PORT="${JT_PROXENSE_PORT:-8098}"
SERVICE_NAME="jt-proxense"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

# v0.2: when the CLI prints a one-time password we capture it here so the
# closing summary can show it prominently to the operator.
ADMIN_BOOTSTRAP_PW=""
ADMIN_BOOTSTRAP_USER=""

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
say "[1/7] Network preflight (8s timeout per host)..."
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
say "[2/7] Installing OS prerequisites (python3, git)..."
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
say "[3/7] Service user '${SERVICE_USER}'..."
if id "$SERVICE_USER" >/dev/null 2>&1; then
    ok "user already exists"
else
    useradd --system --shell /usr/sbin/nologin --home-dir "$INSTALL_DIR" --no-create-home "$SERVICE_USER"
    ok "user created"
fi

# ---------- 4. clone or update source ----------
say "[4/7] Source code at ${INSTALL_DIR}..."
mkdir -p "$INSTALL_DIR"

# Mark install dir as safe.directory before any git op (service-user owns it,
# but we run git as root). See SOP §2 Linux 特例.
export GIT_CONFIG_KEY_0=safe.directory
export GIT_CONFIG_VALUE_0="$INSTALL_DIR"
export GIT_CONFIG_COUNT=1

if [ -d "$INSTALL_DIR/.git" ]; then
    # Use an explicit refspec so shallow clones can fetch any branch.
    git -C "$INSTALL_DIR" fetch --quiet --depth=1 origin \
        "+refs/heads/${REPO_BRANCH}:refs/remotes/origin/${REPO_BRANCH}"
    git -C "$INSTALL_DIR" reset --hard --quiet "origin/${REPO_BRANCH}"
    ok "updated from ${REPO_URL} (${REPO_BRANCH})"
else
    if [ -e "$INSTALL_DIR/run.py" ]; then
        die "${INSTALL_DIR} is non-empty but not a git checkout. Refusing to overwrite. Move it aside or set JT_PROXENSE_INSTALL_DIR."
    fi
    git clone --depth 1 --quiet --branch "${REPO_BRANCH}" "$REPO_URL" "$INSTALL_DIR"
    ok "cloned ${REPO_URL} (${REPO_BRANCH})"
fi

# ---------- 5. python deps ----------
say "[5/7] Python dependencies (system pip)..."
PIP_OPTS="--quiet --root-user-action=ignore"
python3 -m pip install $PIP_OPTS --upgrade pip >/dev/null 2>&1 || true
python3 -m pip install $PIP_OPTS -r "$INSTALL_DIR/requirements.txt"
ok "dependencies installed"

# Smoke test imports — every runtime dep listed here.
# Adding a new runtime dep? Update this line AND requirements.txt (SOP §7.1).
python3 -c "import aiohttp, aiohttp_cors, yaml, certifi, aiosqlite, argon2, pyotp, qrcode, pam" \
    || die "Smoke test failed — a runtime module did not import. Check requirements.txt."
ok "import smoke test passed"

# ---------- 6. config.yaml + state dir + ownership + systemd ----------
say "[6/7] Configuration, state directory, ownership, systemd unit..."
if [ ! -f "$INSTALL_DIR/config.yaml" ]; then
    cp "$INSTALL_DIR/config.example.yaml" "$INSTALL_DIR/config.yaml"
    ok "created config.yaml from example (edit it before starting!)"
else
    ok "config.yaml already exists — left untouched"
fi

# v0.2+: SQLite-backed auth/audit lives in /var/lib/jt-proxense.
STATE_DIR="/var/lib/jt-proxense"
mkdir -p "$STATE_DIR"
chown "${SERVICE_USER}:${SERVICE_USER}" "$STATE_DIR"
chmod 750 "$STATE_DIR"
ok "state dir ${STATE_DIR} ready"

# v0.3+: encrypted secret store master key. Kept outside $STATE_DIR
# (which is the Proxmox / data dir) so an accidental data dir restore
# from a different host doesn't drag the wrong key with it.
KEY_DIR="/etc/jt-proxense"
mkdir -p "$KEY_DIR"
chown "${SERVICE_USER}:${SERVICE_USER}" "$KEY_DIR"
chmod 750 "$KEY_DIR"
ok "key dir ${KEY_DIR} ready"

# Symlink the CLI back door so operators can run `jt-proxense ...` from anywhere.
if [ -f "$INSTALL_DIR/bin/jt-proxense" ]; then
    chmod +x "$INSTALL_DIR/bin/jt-proxense"
    ln -sf "$INSTALL_DIR/bin/jt-proxense" /usr/local/bin/jt-proxense
    ok "CLI back door installed at /usr/local/bin/jt-proxense"
fi

# Hand the whole tree to the service user (root may have written .git refs / .pyc)
chown -R "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR"
ok "ownership set to ${SERVICE_USER}:${SERVICE_USER}"

# Install systemd unit
install -m 0644 "$INSTALL_DIR/packaging/${SERVICE_NAME}.service" "$SERVICE_FILE"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1 || true
ok "systemd unit installed and enabled"

# ---------- 7. authentication bootstrap (v0.2+) ----------
say "[7/7] Authentication setup..."

# Detect whether auth is already enabled or any user already exists in the DB.
# If either is true, we leave the auth state alone (idempotent across re-runs).
AUTH_ENABLED=$(JTPROXENSE_DB_PATH="${STATE_DIR}/jt-proxense.db" \
    JTPROXENSE_CONFIG="$INSTALL_DIR/config.yaml" \
    sudo -u "$SERVICE_USER" "$INSTALL_DIR/bin/jt-proxense" auth show 2>/dev/null \
    | python3 -c "import json,sys;d=json.loads(sys.stdin.read() or '{}'); print('1' if d.get('auth.enabled') else '0', d.get('user_count') or 0)" \
    2>/dev/null || echo "0 0")

CURRENT_AUTH=$(echo "$AUTH_ENABLED" | awk '{print $1}')
USER_COUNT=$(echo "$AUTH_ENABLED" | awk '{print $2}')

if [ "$CURRENT_AUTH" = "1" ] || [ "$USER_COUNT" != "0" ]; then
    ok "auth already configured (enabled=${CURRENT_AUTH}, users=${USER_COUNT}) — left untouched"
else
    if ask_yes_no "Enable authentication and bootstrap an 'admin' user?" y; then
        # 1) flip auth on
        sudo -u "$SERVICE_USER" "$INSTALL_DIR/bin/jt-proxense" auth set-local >/dev/null
        # 2) create admin with auto-generated password; capture stdout for the OTP
        BOOT_OUT=$(sudo -u "$SERVICE_USER" \
            "$INSTALL_DIR/bin/jt-proxense" user add admin --role admin 2>&1) || \
            { warn "admin bootstrap failed: $BOOT_OUT"; }
        ADMIN_BOOTSTRAP_PW=$(echo "$BOOT_OUT" | awk -F': ' '/one-time password/ {print $2}')
        ADMIN_BOOTSTRAP_USER="admin"
        if [ -n "$ADMIN_BOOTSTRAP_PW" ]; then
            ok "admin user created with one-time password (shown below)"
        else
            ok "admin user already existed (left untouched)"
        fi
    else
        ok "auth left disabled — anyone reaching :${HTTP_PORT} can read everything."
        warn "Bind only to 127.0.0.1 (server.host in config.yaml) until auth is set up."
    fi
fi

# v0.3+: sweep any plaintext PVE password in config.yaml into the encrypted
# secret store, then blank the yaml field. Idempotent — safe to run on
# every install / re-run / upgrade.
MIGR=$(sudo -u "$SERVICE_USER" "$INSTALL_DIR/bin/jt-proxense" secret migrate-yaml 2>&1 || true)
if echo "$MIGR" | grep -q ": ok"; then
    N=$(echo "$MIGR" | grep -c ": ok")
    ok "migrated ${N} cluster password(s) from config.yaml → encrypted store at ${KEY_DIR}/master.key"
fi

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
if [ -n "$ADMIN_BOOTSTRAP_PW" ]; then
    cat <<EOF
   ┌──────────────────────────────────────────────────────────┐
   │  ONE-TIME ADMIN CREDENTIALS — copy these now              │
   ├──────────────────────────────────────────────────────────┤
   │  username:  ${ADMIN_BOOTSTRAP_USER}
   │  password:  ${ADMIN_BOOTSTRAP_PW}
   ├──────────────────────────────────────────────────────────┤
   │  Sign in at  http://${HOST_IP}:${HTTP_PORT}/login
   │  This password is NOT written to disk — store it now.
   │  Reset later with: sudo jt-proxense reset-password admin
   └──────────────────────────────────────────────────────────┘

EOF
fi
echo "   Emergency recovery (if you lock yourself out):"
echo "     sudo jt-proxense auth disable"
echo "     sudo jt-proxense reset-password <user>"
echo
echo "   Audit log viewer (admin only):  http://${HOST_IP}:${HTTP_PORT}/audit"
echo
