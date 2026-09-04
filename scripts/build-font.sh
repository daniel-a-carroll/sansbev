#!/usr/bin/env bash
# Regenerates public/fonts/archivo-subset-var.woff2
#
# Archivo (Omnibus-Type, SIL Open Font License 1.1) is self-hosted, not hotlinked.
# The upstream latin-subset variable font is 90KB because it carries the full
# weight (100-900) and width (62-125) axis ranges. We only use wght 400-700 and
# wdth 100-112, so we instance those ranges away: 90KB -> 52KB.
#
# Requires fonttools + brotli. Run only when the axis ranges in
# src/styles/tokens.css change.
set -euo pipefail

UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CSS_URL="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap"

python3 -m venv /tmp/fontvenv
/tmp/fontvenv/bin/pip install --quiet fonttools brotli

curl -s -A "$UA" "$CSS_URL" -o /tmp/archivo.css
LATIN=$(grep -B4 'U+0000-00FF' /tmp/archivo.css | grep -o 'https[^)]*')
curl -s -A "$UA" "$LATIN" -o /tmp/archivo-full.woff2

/tmp/fontvenv/bin/python -m fontTools.varLib.instancer \
  /tmp/archivo-full.woff2 "wght=400:700" "wdth=100:112" \
  --output=/tmp/archivo-inst.ttf
/tmp/fontvenv/bin/python -m fontTools.ttLib.woff2 compress \
  /tmp/archivo-inst.ttf -o public/fonts/archivo-subset-var.woff2

ls -l public/fonts/archivo-subset-var.woff2
