#!/usr/bin/env bash
#
# JT-PROXENSE — one-liner installer (Linux only)
#
# Usage (requires sudo / root):
#   curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh | sudo bash
#
# Environment overrides (for testing):
#   JT_PROXENSE_REPO_URL  — git URL to clone from (default: GitHub repo)
#   JT_PROXENSE_REF       — branch / tag / SHA to install
#                           (default: the newest vX.Y.Z release tag)
#   JT_PROXENSE_BRANCH    — branch used only when the repo has no tags yet
#   JT_PROXENSE_INSTALL_DIR — target directory (default: /opt/jt-proxense)
#   JT_PROXENSE_USER      — service user (default: jt-proxense)
#   JT_PROXENSE_PORT      — HTTP port written into config.yaml (default: 8098)
#
set -euo pipefail
# Everything this script creates under the install dir (the checkout, the venv)
# must be readable by the service account. Hardened hosts run root with umask
# 077, which would leave the code and the interpreter unreadable to it. Files
# that must stay private (config.yaml) set their own mode explicitly.
umask 022

# ---------- pretty output ----------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
say()  { printf "%b%s%b\n" "$CYAN" "$*" "$NC"; }
ok()   { printf "%b  ✓ %s%b\n" "$GREEN" "$*" "$NC"; }
warn() { printf "%b  ! %s%b\n" "$YELLOW" "$*" "$NC"; }
die()  { printf "%b  ✗ %s%b\n" "$RED" "$*" "$NC" >&2; help_line; exit 1; }

# ---------- where to send someone when this goes wrong ----------
# Picked from the machine's locale: a Chinese system gets the Chinese page,
# everything else gets English. Checked in the order the C library resolves
# them (LC_ALL wins, then LC_MESSAGES, then LANG).
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
            printf "%b  → 安裝與升級疑難排解：%s%b\n" "$CYAN" "$(help_url)" "$NC" >&2 ;;
        *)  printf "%b  → Install & upgrade troubleshooting: %s%b\n" "$CYAN" "$(help_url)" "$NC" >&2 ;;
    esac
}

# ---------- python runtime helpers (exercised by tests/test_install_python.py) ----------
# BEGIN python-runtime helpers

# Print "<command> <major.minor>" for the interpreter to install for.
# Prefer the stable `python3` when it is new enough: a versioned path such as
# /usr/bin/python3.10 written into the unit disappears with the next OS release
# upgrade (Ubuntu 22.04 -> 24.04, Debian 12 -> 13), and the service then cannot
# even start to say why. Only when python3 is too old (RHEL/SUSE keep 3.6/3.9
# as python3 after installing 3.11/3.12) fall back to the newest versioned one.
pick_python() {
    local cand v maj min
    for cand in python3 python3.14 python3.13 python3.12 python3.11 python3.10; do
        command -v "$cand" >/dev/null 2>&1 || continue
        v=$("$cand" -c 'import sys; print("%d.%d" % sys.version_info[:2])' 2>/dev/null) || continue
        maj=${v%.*}; min=${v#*.}
        if [ "$maj" -eq 3 ] && [ "$min" -ge 10 ]; then
            echo "$cand $v"
            return 0
        fi
    done
    return 1
}

# Create (or reuse) the virtual environment the dependencies live in.
# The system interpreter is NOT installed into: on Ubuntu 26.04 the newest
# asyncssh needs cryptography >= 48 while the distro ships 46 as a Debian
# package, which pip cannot uninstall ("no RECORD file") -- and forcing a newer
# copy over it breaks the distro's own pyOpenSSL. A venv sidesteps both.
# Reused only when it was built for the same MAJOR.MINOR and still runs; an OS
# release upgrade changes the version, and its site-packages then belong to an
# interpreter that no longer exists, so it is rebuilt from scratch.
# Built from the stable path (/usr/bin/python3), so bin/python3 links there and
# keeps starting after such an upgrade -- long enough for runtime_guard to
# explain what happened instead of systemd reporting 203/EXEC.
ensure_venv() {  # <venv dir, must end in /.venv> <base interpreter> <major.minor>
    case "$1" in */.venv) ;; *) echo "ensure_venv: refusing $1" >&2; return 2 ;; esac
    local have=""
    if [ -f "$1/pyvenv.cfg" ]; then
        have=$(sed -n -E 's/^version[[:space:]]*=[[:space:]]*([0-9]+\.[0-9]+).*/\1/p' "$1/pyvenv.cfg" | head -1)
    fi
    if [ "$have" = "$3" ] && "$1/bin/python3" -c 'import sys' >/dev/null 2>&1; then
        echo reused
        return 0
    fi
    rm -rf "$1"
    if "$2" -m venv "$1" >/dev/null 2>&1; then
        echo created
        return 0
    fi
    rm -rf "$1"   # a half-built venv (no ensurepip) would look reusable next time
    return 1
}

# Install the CLI as a wrapper that runs it under the interpreter the
# dependencies were installed for. Its shebang (`env python3`) is a different
# interpreter on RHEL/SUSE, where python3 is older than the one chosen above.
# An older install left a SYMLINK here: remove it first, or writing to this
# path would go through the link and overwrite bin/jt-proxense itself.
install_cli_wrapper() {  # <dest> <python path> <cli script>
    rm -f "$1"
    cat > "$1" <<WRAPPER
#!/bin/sh
# Written by the jt-proxense installer: run the CLI with the interpreter its
# Python dependencies were installed for. Re-running the installer updates it.
exec "$2" "$3" "\$@"
WRAPPER
    chmod 0755 "$1"
}

# Record which interpreter the dependencies were installed for, so the service
# and the CLI can say "the system Python changed" instead of failing with
# ModuleNotFoundError after an OS upgrade (server/runtime_guard.py reads it).
record_python_runtime() {  # <file> <python path>
    local ver real
    ver=$("$2" -c 'import sys; print("%d.%d" % sys.version_info[:2])')
    real=$(readlink -f "$2" 2>/dev/null || echo "$2")
    printf 'version=%s\nexecutable=%s\n' "$ver" "$real" > "$1"
    chmod 0644 "$1"
}

# END python-runtime helpers


# ---------- config ----------
REPO_URL="${JT_PROXENSE_REPO_URL:-https://github.com/jasoncheng7115/jt-proxense.git}"
# What to install. Default is the newest RELEASE TAG, not the tip of main:
# tracking a branch means two operators running the same one-liner a day apart
# get different code, and there is nothing to roll back TO. Set
# JT_PROXENSE_REF=main to follow the development branch deliberately.
REPO_BRANCH="${JT_PROXENSE_BRANCH:-main}"
REPO_REF="${JT_PROXENSE_REF:-}"
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
    if { command -v curl >/dev/null 2>&1 && curl -fsSI --connect-timeout 8 --max-time 8 "https://${host}/" >/dev/null 2>&1; } \
    || { command -v wget >/dev/null 2>&1 && wget -q --spider --timeout=8 "https://${host}/" 2>/dev/null; }; then
        ok "${host} reachable"
    else
        warn "${host} not reachable (or no curl/wget yet to check) — continuing anyway"
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

# curl is how this script usually arrived, so it is normally present already.
# Asking for it anyway breaks RHEL / Rocky / Alma 9, whose default curl-minimal
# CONFLICTS with the curl package: dnf refused the whole transaction and, under
# set -e, the installer stopped at step 2 without a word.
CURL_PKG=curl
command -v curl >/dev/null 2>&1 && CURL_PKG=""
PREREQ_FAIL="Installing the prerequisites with ${PM} failed (see the error above). Install python3, python3-pip, python3-venv and git by hand, then re-run this installer."
case "$PM" in
    apt)    DEBIAN_FRONTEND=noninteractive apt-get update -qq || die "$PREREQ_FAIL"
            DEBIAN_FRONTEND=noninteractive apt-get install -y -q python3 python3-pip python3-venv git $CURL_PKG ca-certificates >/dev/null \
                || die "$PREREQ_FAIL" ;;
    dnf|yum) "$PM" install -y -q python3 python3-pip git $CURL_PKG ca-certificates >/dev/null || die "$PREREQ_FAIL"
            # RHEL/Rocky/Alma 9 default python3 is 3.9 (< our 3.10 floor); pull
            # a modern interpreter from AppStream. Best-effort: newest first.
            for v in 3.12 3.11; do
                "$PM" install -y -q "python$v" "python$v-pip" >/dev/null 2>&1 && break
            done ;;
    pacman) pacman -Sy --noconfirm --needed python python-pip git $CURL_PKG ca-certificates >/dev/null || die "$PREREQ_FAIL" ;;
    zypper) zypper --non-interactive install -y python3 python3-pip git $CURL_PKG ca-certificates >/dev/null || die "$PREREQ_FAIL"
            # openSUSE Leap default python3 can be < 3.10; pull a modern one.
            for v in 312 311; do
                zypper --non-interactive install -y "python$v" "python$v-pip" >/dev/null 2>&1 && break
            done ;;
esac

# Pick the interpreter (see pick_python above for why python3 comes first).
if PICK=$(pick_python); then
    PY_BIN=${PICK% *}; PY_VER=${PICK#* }
else
    die "Python 3.10+ required (found $(python3 -V 2>&1)). On RHEL/Rocky/Alma run: sudo $PM install python3.11 python3.11-pip"
fi
BASE_PY=$(command -v "$PY_BIN")
ok "python ${PY_VER} (${PY_BIN}), git $(git --version | awk '{print $3}') ready"

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

# Resolve what to check out. Prefer the highest semver release tag; fall back to
# the branch when the repo has no tags yet (or the operator asked for a branch).
resolve_ref() {
    if [ -n "$REPO_REF" ]; then
        echo "$REPO_REF"; return
    fi
    local latest
    latest=$(git ls-remote --tags --refs "$REPO_URL" 'v[0-9]*' 2>/dev/null \
        | sed 's#.*refs/tags/##' \
        | sort -V | tail -1)
    if [ -n "$latest" ]; then
        echo "$latest"
    else
        echo "$REPO_BRANCH"
    fi
}
TARGET_REF=$(resolve_ref)

# Fresh installs and upgrades take the same path: init + fetch + reset. A plain
# `git clone --branch <tag>` of an ANNOTATED tag makes git 2.53 print
# "warning: refs/tags/vX.Y.Z ... is not a commit!" plus a page of detached-HEAD
# advice, which reads like a failure to anyone installing for the first time.
if [ -d "$INSTALL_DIR/.git" ]; then
    FETCHED="updated"
else
    if [ -e "$INSTALL_DIR/run.py" ]; then
        die "${INSTALL_DIR} is non-empty but not a git checkout. Refusing to overwrite. Move it aside or set JT_PROXENSE_INSTALL_DIR."
    fi
    git init --quiet "$INSTALL_DIR"
    git -C "$INSTALL_DIR" remote add origin "$REPO_URL"
    FETCHED="cloned"
fi
# Explicit refspecs so a shallow fetch can take either a tag or a branch.
git -C "$INSTALL_DIR" fetch --quiet --depth=1 origin \
    "+refs/tags/${TARGET_REF}:refs/tags/${TARGET_REF}" 2>/dev/null \
  || git -C "$INSTALL_DIR" fetch --quiet --depth=1 origin \
    "+refs/heads/${TARGET_REF}:refs/remotes/origin/${TARGET_REF}" \
  || die "Could not fetch ${TARGET_REF} from ${REPO_URL}."
git -C "$INSTALL_DIR" reset --hard --quiet \
    "$(git -C "$INSTALL_DIR" rev-parse --verify --quiet "refs/tags/${TARGET_REF}^{commit}" \
       || echo "origin/${TARGET_REF}")"
ok "${FETCHED} from ${REPO_URL} (${TARGET_REF})"

# ---------- 5. python deps ----------
say "[5/7] Python dependencies (virtual environment)..."
# Everything goes into $INSTALL_DIR/.venv (see ensure_venv above). Installs made
# before v1.2.0 put the dependencies into the system Python; those copies are
# simply no longer used and are left alone, since other software may use them.
VENV_DIR="$INSTALL_DIR/.venv"
case "$PM" in
    apt) VENV_HINT="sudo apt-get install python3-venv python${PY_VER}-venv" ;;
    *)   VENV_HINT="install the venv module for ${BASE_PY}" ;;
esac
VENV_STATE=$(ensure_venv "$VENV_DIR" "$BASE_PY" "$PY_VER") \
    || die "Could not create a Python virtual environment with ${BASE_PY} (venv/ensurepip missing). Fix: ${VENV_HINT}, then re-run this installer."
ok "virtual environment ${VENV_STATE}: ${VENV_DIR}"
PY_PATH="$VENV_DIR/bin/python3"
PIP_OPTS="--quiet --disable-pip-version-check"
"$PY_PATH" -m pip install $PIP_OPTS --upgrade pip >/dev/null 2>&1 || true
"$PY_PATH" -m pip install $PIP_OPTS -r "$INSTALL_DIR/requirements.txt" \
    || die "pip could not install the Python dependencies (see the error above). Check that pypi.org is reachable, then re-run this installer."
ok "dependencies installed"

# Smoke test imports — every runtime dep listed here.
# Adding a new runtime dep? Update this line AND requirements.txt (SOP §7.1).
"$PY_PATH" -c "import aiohttp, aiohttp_cors, yaml, certifi, aiosqlite, argon2, pyotp, qrcode, pam, cryptography, asyncssh, pyte" \
    || die "Smoke test failed — a runtime module did not import. Check requirements.txt."
ok "import smoke test passed"
record_python_runtime "$INSTALL_DIR/.python-runtime" "$PY_PATH"

# ---------- 6. config.yaml + state dir + ownership + systemd ----------
say "[6/7] Configuration, state directory, ownership, systemd unit..."
if [ ! -f "$INSTALL_DIR/config.yaml" ]; then
    # Start CLEAN — no placeholder clusters. PVE/ESXi connections are added
    # from the web UI (Settings → Clusters), which persists them here and
    # hot-reloads. Copying the example used to leave a dummy cluster that
    # failed to connect on first login and made it look like you *had* to
    # hand-edit this file. config.example.yaml stays as the annotated reference.
    # 0600 BEFORE the first byte: this file grows PVE API tokens as soon as a
    # cluster is added from the UI, and the mode used to be whatever root's
    # umask happened to be (022 -> 0644, world-readable, observed in the wild).
    ( umask 077; : > "$INSTALL_DIR/config.yaml" )
    cat > "$INSTALL_DIR/config.yaml" <<YAML
# JT-PROXENSE configuration.
# You do NOT need to edit this file to add PVE clusters — sign in and use
# Settings -> Clusters in the web UI (persisted + hot-reloaded automatically).
# A fully annotated reference of every option lives in config.example.yaml.
server:
  host: "0.0.0.0"
  http_port: ${HTTP_PORT}

# PVE / ESXi connections. Empty = none yet; add them from the web UI.
clusters: []
YAML
    chmod 600 "$INSTALL_DIR/config.yaml"
    ok "created a clean config.yaml, mode 600 (add clusters in the web UI — no editing needed)"
else
    # Idempotent repair for anything installed before this was fixed.
    if [ "$(stat -c %a "$INSTALL_DIR/config.yaml" 2>/dev/null)" != "600" ]; then
        chmod 600 "$INSTALL_DIR/config.yaml"
        warn "config.yaml was not 600 — tightened (it holds PVE API tokens)"
    fi
    ok "config.yaml already exists — left untouched"
fi
# Backups are shutil.copy2'd from config.yaml, so pre-fix copies inherited the
# loose mode and carry the same tokens.
if [ -d "$INSTALL_DIR/config_backups" ]; then
    chmod 700 "$INSTALL_DIR/config_backups" 2>/dev/null || true
    find "$INSTALL_DIR/config_backups" -type f -name 'config_*.yaml' \
        -exec chmod 600 {} + 2>/dev/null || true
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

# The CLI back door, runnable as `jt-proxense ...` from anywhere, under the
# same interpreter as the service (see install_cli_wrapper above).
if [ -f "$INSTALL_DIR/bin/jt-proxense" ]; then
    chmod +x "$INSTALL_DIR/bin/jt-proxense"
    install_cli_wrapper /usr/local/bin/jt-proxense "$PY_PATH" "$INSTALL_DIR/bin/jt-proxense"
    ok "CLI back door installed at /usr/local/bin/jt-proxense (python ${PY_VER})"
fi

# Ownership: CODE is root's, DATA is the service user's.
#
# This used to hand the entire tree to ${SERVICE_USER}, and the systemd unit
# listed all of /opt/jt-proxense as writable — so the account running the web
# server could rewrite run.py and the whole server/ package, and anything that
# achieved command execution inside that process could persist across a
# restart. The service now owns only what it has to write.
chown -R root:root "$INSTALL_DIR"
# ...and readable by the service. umask 022 above covers what THIS run creates,
# but a checkout made earlier under root's umask 077 keeps its 0700 directories
# through every later `git reset` — the service account then cannot even enter
# $INSTALL_DIR, and the service and every CLI call fail with "command not
# found". The three private paths are left out; their modes are set just below.
find "$INSTALL_DIR" \( -path "$INSTALL_DIR/config.yaml" -o -path "$INSTALL_DIR/config_backups" \
        -o -path "$INSTALL_DIR/.ssh" \) -prune -o -exec chmod u+rwX,go+rX,go-w {} +

# The two things the running service legitimately writes: the config it
# rewrites when you add a cluster from the UI, and the backups it takes first.
# config_backups MUST exist before first start — the app can no longer create
# it, and systemd refuses to start a unit whose ReadWritePaths names a missing
# path.
mkdir -p "$INSTALL_DIR/config_backups"
chown "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR/config_backups"
chmod 700 "$INSTALL_DIR/config_backups"
chown "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR/config.yaml"
chmod 600 "$INSTALL_DIR/config.yaml"

# The service account's home is $INSTALL_DIR, so its SSH keypair lives inside
# the code tree. That key is what reaches the PVE nodes for every SSH-backed
# feature (ZFS, host upgrade, boot mirror, storage download, NTP), and its
# public half is already in each node's authorized_keys — root-owning it here
# would break all of them silently at the next restart.
if [ -d "$INSTALL_DIR/.ssh" ]; then
    chown -R "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR/.ssh"
    chmod 700 "$INSTALL_DIR/.ssh"
    find "$INSTALL_DIR/.ssh" -type f ! -name '*.pub' -exec chmod 600 {} + 2>/dev/null || true
    ok "preserved ${SERVICE_USER} ownership of $INSTALL_DIR/.ssh (PVE node key)"
else
    # Must exist before first start: systemd refuses a unit whose
    # ReadWritePaths names a missing path, and ssh_setup.py generates into it.
    mkdir -p "$INSTALL_DIR/.ssh"
    chown "${SERVICE_USER}:${SERVICE_USER}" "$INSTALL_DIR/.ssh"
    chmod 700 "$INSTALL_DIR/.ssh"
fi
ok "code owned by root (read-only to the service); config, backups and .ssh owned by ${SERVICE_USER}"

# Install systemd unit, pointed at the venv's interpreter (the shipped unit
# already names /opt/jt-proxense/.venv/bin/python3; this keeps it right for any
# other install dir, and replaces the system python3 of pre-v1.2.0 units).
install -m 0644 "$INSTALL_DIR/packaging/${SERVICE_NAME}.service" "$SERVICE_FILE"
sed -i -E "s#(ExecStart=)[^ ]*/python3([[:space:]])#\1${PY_PATH}\2#" "$SERVICE_FILE"
ok "service interpreter: ${PY_PATH}"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1 || true
ok "systemd unit installed and enabled"

# ---------- 7. authentication bootstrap (v0.2+) ----------
say "[7/7] Authentication setup..."

# Detect whether auth is already enabled or any user already exists in the DB.
# If either is true, we leave the auth state alone (idempotent across re-runs).
# Two steps, not one pipeline: under pipefail a failing `auth show` made the
# pipeline print "0 0" AND fall through to `|| echo "0 0"`, so USER_COUNT came
# out as two lines, compared unequal to "0", and the admin bootstrap was skipped
# as "already configured" on a fresh install.
AUTH_JSON=$(JTPROXENSE_DB_PATH="${STATE_DIR}/jt-proxense.db" \
    JTPROXENSE_CONFIG="$INSTALL_DIR/config.yaml" \
    sudo -u "$SERVICE_USER" "$PY_PATH" "$INSTALL_DIR/bin/jt-proxense" auth show 2>/dev/null) \
    || { AUTH_JSON='{}'; warn "could not read the auth state as ${SERVICE_USER}; assuming a fresh install"; }
AUTH_ENABLED=$(printf '%s' "$AUTH_JSON" \
    | "$PY_PATH" -c "import json,sys;d=json.loads(sys.stdin.read() or '{}'); print('1' if d.get('auth.enabled') else '0', d.get('user_count') or 0)" \
    2>/dev/null) || AUTH_ENABLED="0 0"

CURRENT_AUTH=$(echo "$AUTH_ENABLED" | awk '{print $1}')
USER_COUNT=$(echo "$AUTH_ENABLED" | awk '{print $2}')

if [ "$CURRENT_AUTH" = "1" ] || [ "$USER_COUNT" != "0" ]; then
    ok "auth already configured (enabled=${CURRENT_AUTH}, users=${USER_COUNT}) — left untouched"
else
    if ask_yes_no "Enable authentication and bootstrap an 'admin' user?" y; then
        # 1) flip auth on
        sudo -u "$SERVICE_USER" "$PY_PATH" "$INSTALL_DIR/bin/jt-proxense" auth set-local >/dev/null
        # 2) create admin with auto-generated password; capture stdout for the OTP
        BOOT_OUT=$(sudo -u "$SERVICE_USER" \
            "$PY_PATH" "$INSTALL_DIR/bin/jt-proxense" user add admin --role admin 2>&1) || \
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
MIGR=$(sudo -u "$SERVICE_USER" "$PY_PATH" "$INSTALL_DIR/bin/jt-proxense" secret migrate-yaml 2>&1 || true)
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
        help_line
        START_NOW=0
    fi
else
    START_NOW=0
fi

# ---------- summary ----------
# `|| true`: minimal images (UBI, some RHEL 9 installs) have no `hostname`, and
# under set -e + pipefail the failed lookup ended the script HERE — after the
# admin account was created, before its one-time password was printed.
HOST_IP=$(hostname -I 2>/dev/null | awk '{print $1}') || true
[ -z "$HOST_IP" ] && HOST_IP="<your-server-ip>"

cat <<EOF

   ╔═══════════════════════════════════════════════════════════╗
   ║                Installation complete                      ║
   ╚═══════════════════════════════════════════════════════════╝

   Add your PVE clusters — no file editing needed:
       Sign in, then go to  Settings -> Clusters  and add a connection
       (host + user + API token). It's saved and hot-reloaded automatically.
       (Advanced: config.example.yaml documents every option if you prefer YAML.)

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
