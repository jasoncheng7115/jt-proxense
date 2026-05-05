# Changelog

> 中文版本：[CHANGELOG_zh-tw.md](CHANGELOG_zh-tw.md)

All notable changes to JT-PROXENSE are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned

- **Local-only authentication** — opt-in basic auth that listens only on `127.0.0.1` and authenticates against system accounts. Will ship with an emergency CLI back door (`jt-proxense auth disable`, `jt-proxense reset-password <user>`) so that a misconfigured auth layer cannot lock the operator out of the host.
- **macOS / Windows installers** — current release is Linux-only.

---

## [0.1.0] — 2026-05-05

First public release.

### Added

- **Six visualization views**: Dashboard, Nodes (ECG-style metric monitors), Matrix (VM grid), Radar (anomaly detection), Storage (treemap), Ceph (cluster topology).
- **Multi-cluster polling** with per-cluster `priority`-ordered API failover; one unhealthy node does not stall the whole cluster's data refresh.
- **WebSocket live push** — clients receive incremental cluster state without re-polling.
- **One-line Linux installer** (`install.sh`) that:
  - runs a network preflight (github.com, pypi.org) to fail fast when offline;
  - detects apt / dnf / yum / pacman / zypper and installs `python3`, `pip`, `git`;
  - creates a dedicated `jt-proxense` system user (no shell, no home);
  - clones into `/opt/jt-proxense`, installs deps, runs an import smoke test of every runtime module, and `chown`s the tree to the service user;
  - installs a hardened systemd unit (`NoNewPrivileges`, `ProtectSystem=strict`, `ProtectHome`, etc.);
  - reads interactive prompts from `/dev/tty` so it works under `curl … | sudo bash`.
- **Hardened systemd unit** at `packaging/jt-proxense.service` with `User=jt-proxense`, restricted filesystem and capability surface.
- **Bilingual documentation** — English `README.md` (default) plus `README_zh-tw.md`; same for `CHANGELOG`.
- **Apache 2.0** license; full third-party dependency notice in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

### Security note

This release intentionally **does not include built-in authentication.** The HTTP listener exposes both read and write API endpoints (`POST /api/config` mutates runtime configuration). Operators must put the service behind a reverse proxy with auth, or bind it to a trusted interface only, before exposing it to a network. See the README "Security" section.

### Known limitations

- Linux only. macOS and Windows installers are not yet provided.
- Sub-path reverse-proxy mounts (e.g. `/proxense/`) are not supported — the app must be mounted at `/`.
- The frontend `dist/` is committed to the repository; rebuilding requires Node.js 18+ and `npm install`.
