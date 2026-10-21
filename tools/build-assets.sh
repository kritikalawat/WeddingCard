#!/usr/bin/env bash
# Regenerates og-image.jpg + favicons from assets/logo.png.
# Usage:  bash tools/build-assets.sh            (uses your logo)
#         bash tools/build-assets.sh --placeholder   (re-renders the placeholder monogram first)
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --default-background-color=00000000 --window-size="$2" --screenshot="$3" "file://${PWD// /%20}/$1" >/dev/null 2>&1; }

if [[ "${1:-}" == "--placeholder" ]]; then
  shot tools/logo-placeholder.html 600,600 assets/logo.png
fi
[[ -f assets/logo.png ]] || { echo "Put your logo at assets/logo.png first"; exit 1; }

shot tools/og.html 1200,630 /tmp/og-raw.png

python3 - <<'EOF'
from PIL import Image
og = Image.open('/tmp/og-raw.png').convert('RGB').resize((1200, 630))
og.save('assets/og-image.jpg', quality=86, optimize=True, progressive=True)

logo = Image.open('assets/logo.png').convert('RGBA')
def icon(size, pad, bg):
    canvas = Image.new('RGBA', (size, size), bg)
    inner = size - 2 * pad
    l = logo.copy(); l.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(l, ((size - l.width) // 2, (size - l.height) // 2))
    return canvas
icon(32, 1, (0, 0, 0, 0)).save('assets/favicon-32.png')
icon(180, 14, (251, 247, 239, 255)).convert('RGB').save('assets/apple-touch-icon.png')
icon(64, 2, (0, 0, 0, 0)).save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print('og-image.jpg, favicon-32.png, apple-touch-icon.png, favicon.ico updated')
EOF
