# 4:3 slide deck screenshots

The same views as `docs/screenshots/`, captured at 1600×1200 (4:3) for use in
presentations where a 16:9 shot would letterbox badly.

Regenerate from a live instance:

    python3 scripts/capture_landing.py --user <account> \
        --aspect 4:3 --out github/slides-4x3

These are **not** referenced by the landing page — they exist purely as a
deck-ready set. Serials are redacted the same way as the gallery: bus prefix and
model stay readable, the serial tail is blurred.
