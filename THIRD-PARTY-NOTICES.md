# Third-Party Notices

JT-PROXENSE is licensed under the GNU Affero General Public License v3.0 or
later (see [LICENSE](LICENSE)). Releases up to and including v0.9.9 were
published under Apache 2.0; that grant is irrevocable and still applies to
those versions.
It bundles or depends on the following third-party software. Each component is
distributed under its own license, reproduced or referenced below.

---

## Python runtime dependencies

These are installed by `pip install -r requirements.txt` and run server-side.

| Package | License | Project |
|---|---|---|
| **aiohttp** | Apache-2.0 | <https://github.com/aio-libs/aiohttp> |
| **aiohttp-cors** | Apache-2.0 | <https://github.com/aio-libs/aiohttp-cors> |
| **PyYAML** | MIT | <https://github.com/yaml/pyyaml> |
| **certifi** | MPL-2.0 | <https://github.com/certifi/python-certifi> |
| **typing-extensions** | PSF-2.0 | <https://github.com/python/typing_extensions> |
| **aiosqlite** | MIT | <https://github.com/omnilib/aiosqlite> |
| **argon2-cffi** | MIT | <https://github.com/hynek/argon2-cffi> |
| **pyotp** | MIT | <https://github.com/pyauth/pyotp> |
| **qrcode** | BSD-3-Clause | <https://github.com/lincolnloop/python-qrcode> |
| **cryptography** | Apache-2.0 OR BSD-3-Clause | <https://github.com/pyca/cryptography> |
| **python-pam** | MIT | <https://github.com/FirefighterBlu3/python-pam> |
| **ldap3** | LGPL-3.0 | <https://github.com/cannatag/ldap3> |
| **six** | MIT | <https://github.com/benjaminp/six> |
| **pyte** | LGPL-3.0 | <https://github.com/selectel/pyte> |
| **asyncssh** | EPL-2.0 **OR** GPL-2.0-or-later | <https://github.com/ronf/asyncssh> |

> **asyncssh is used under the GPL-2.0-or-later branch of its dual licence.**
> EPL-2.0 on its own is not compatible with the (A)GPL, so the GPL branch is
> the one that permits combining it with this project. GPL-2.0-or-later allows
> use under GPL-3.0, which AGPL-3.0 is compatible with.
>
> **pyte** and **ldap3** are LGPL-3.0, which combines with AGPL-3.0.

`aiohttp[speedups]` additionally pulls in:

| Package | License | Project |
|---|---|---|
| **aiodns** | MIT | <https://github.com/saghul/aiodns> |
| **Brotli** | MIT | <https://github.com/google/brotli> |
| **cchardet** / **charset-normalizer** | MIT | <https://github.com/Ousret/charset_normalizer> |

---

## Frontend bundle (shipped pre-built in `dist/`)

The compiled JavaScript / CSS in `dist/assets/` was produced from these
dependencies. They are not re-fetched at runtime.

| Package | License | Project |
|---|---|---|
| **React** | MIT | <https://github.com/facebook/react> |
| **React DOM** | MIT | <https://github.com/facebook/react> |
| **D3** | ISC | <https://github.com/d3/d3> |
| **three.js** | MIT | <https://github.com/mrdoob/three.js> |
| **Vite** *(build-time only)* | MIT | <https://github.com/vitejs/vite> |
| **TypeScript** *(build-time only)* | Apache-2.0 | <https://github.com/microsoft/TypeScript> |

### Vendored browser assets

Shipped verbatim under `dist/assets/` rather than bundled, so their sources are
the upstream projects':

| Component | License | Project |
|---|---|---|
| **noVNC** | MPL-2.0 | <https://github.com/novnc/noVNC> |
| **xterm.js** *(+ addon-fit)* | MIT | <https://github.com/xtermjs/xterm.js> |

MPL-2.0 is explicitly compatible with the (A)GPL, so noVNC combines with this
project's AGPL-3.0 licence.

---

## Fonts (shipped in `dist/fonts/`)

| Font | License | Source |
|---|---|---|
| **Orbitron** | SIL Open Font License 1.1 | <https://fonts.google.com/specimen/Orbitron> |
| **Rajdhani** | SIL Open Font License 1.1 | <https://fonts.google.com/specimen/Rajdhani> |
| **Share Tech Mono** | SIL Open Font License 1.1 | <https://fonts.google.com/specimen/Share+Tech+Mono> |
| **Plix 普力士** (IBM Plex Sans CJK merge; CJK glyphs) | SIL Open Font License 1.1 | <https://github.com/cathree3/Plix> |

The SIL Open Font License 1.1 permits redistribution and embedding in any
product, including commercial ones, provided the fonts are not sold by
themselves and the license text is preserved. Full text:
<https://openfontlicense.org/open-font-license-official-text/>.

---

## License texts

The full text of the **Apache License, Version 2.0** is reproduced in
[LICENSE](LICENSE).

The full text of the **MIT License** is short enough to reproduce here:

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

For ISC, MPL-2.0, PSF-2.0, and the SIL OFL 1.1, refer to each project's
upstream repository linked in the tables above.

---

If you spot a missing attribution, please open an issue on the project tracker.

---

## Media

### Demo video soundtrack

`docs/demo.mp4` uses:

> "Heroic Age" Kevin MacLeod (incompetech.com)
> Licensed under Creative Commons: By Attribution 4.0
> https://creativecommons.org/licenses/by/4.0/

No other third-party audio or imagery is bundled; the screenshots and the
screen recording are of this software running on the author's own hardware.
