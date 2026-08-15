# Contributing

> 中文版本：[CONTRIBUTING_zh-tw.md](CONTRIBUTING_zh-tw.md)

This is a privately maintained project. **Pull requests are not accepted.**

## How you can help

| You want to | Do this |
|---|---|
| Report a bug | Open a GitHub issue. Include the version (`jt-proxense version`), distro, and full systemd journal output (`journalctl -u jt-proxense -n 200`). |
| Request a feature | Open a GitHub issue describing the use case. Mention what part of operating Proxmox you're trying to make easier — concrete scenarios beat abstract requests. |
| Report a security vulnerability | See [SECURITY.md](SECURITY.md). **Do not file a public issue for security bugs.** |
| Ask a question | Open a GitHub discussion (preferred) or issue. |

## What we will and won't do

- **We will:** investigate every reproducible bug, address every confirmed security issue, and consider every feature request.
- **We won't:** merge community code into `main`. The codebase is privately maintained for consistency. If a feature is widely useful and the maintainer agrees it fits, it will be reimplemented from scratch.

## Local development

Quickstart on a Linux box:

```bash
git clone https://github.com/jasoncheng7115/jt-proxense.git
cd jt-proxense

# Backend
python3 -m pip install -r requirements.txt
python3 -m pip install pytest pytest-asyncio pytest-aiohttp
python3 -m pytest tests/

# Frontend (only if you want to rebuild dist/)
npm install
npm run build           # production build
npm run dev             # HMR dev server, proxies API to backend on :8098
```

Run the server:

```bash
cp config.example.yaml config.yaml
# edit config.yaml with at least one cluster
python3 run.py
```

Open <http://127.0.0.1:8098/>.

## Code style

- Python: stdlib + the libraries already in `requirements.txt`. Format with whatever your editor does — there's no enforced formatter yet, but PEP 8 is the baseline. Type hints on public functions.
- TypeScript / React: existing app conventions (functional components, hooks, no class components). Prettier-compatible.
- Bash: `bash -n` clean, `set -euo pipefail` at the top of every script.
- New SQL: forward-only migrations under `server/migrations/NNN_<name>.sql`. Never edit a released migration.
- Keep tests green. Adding a feature without tests is a half-feature. The bar is "doing this would have caught the bug."

## What's important to us

- **Cyberpunk look stays.** Every UI surface uses Orbitron / Rajdhani / Share Tech Mono and the existing dark palette. No stock component libraries (MUI / Bootstrap / antd).
- **Cool AND practical.** Animations on entry / hover are fine; never on Refresh / submit / filter. Tables stay information-dense and copy-paste friendly.
- **Self-hosted, single machine.** No cloud telemetry, no opt-out analytics, no calls home.
- **AGPL-3.0-or-later.** Anything that can't be redistributed under the AGPL
  doesn't get pulled in. By contributing you agree your work is licensed under
  AGPL-3.0-or-later.
