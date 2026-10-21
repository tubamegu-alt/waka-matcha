# WAKA MATCHA — Event Flyers

Print-ready, black-and-white event handouts. US Letter, portrait.

Three versions:
- **Version A — Minimal/Editorial**: two identical 8.5"×5.5" half-sheets per page (cut in half).
- **Version B — Framed**: same half-sheet cut layout, with a thin double-rule frame, a small 和 (harmony) kanji mark, a ◆ divider, and a faint chawan + chasen (tea bowl + whisk) watermark behind the headline.
- **Version C — Full Letter Flyer**: the Version B aesthetic scaled up to fill the *entire* 8.5"×11" page as a single flyer — no cut line, larger QR code, more breathing room. Hand out as one complete sheet.

## Files

| File | What it is |
|---|---|
| `flyer-a.html` / `flyer-b.html` / `flyer-c.html` | **Editable source.** Plain HTML/CSS — open in any browser, or edit text/spacing directly. |
| `WAKA-MATCHA-Flyer-A-Minimal.pdf` / `-B-Framed.pdf` / `-C-FullPage.pdf` | **Print-ready PDF**, exactly 1 page, 8.5"×11" (612×792pt), zero margins, vector text. Send straight to a printer. |
| `WAKA-MATCHA-Flyer-A-Minimal-300dpi.png` / `-B-Framed-300dpi.png` / `-C-FullPage-300dpi.png` | High-resolution raster export (2550×3300px, 300 DPI) of the full sheet — use if a print shop wants an image file instead of a PDF. |
| `qr-code.svg` / `qr-code.png` | The QR code used in all three flyers, linking to `https://waka-matcha.netlify.app`. SVG is vector (scales to any size); PNG is 2400×2400px. Verified to decode correctly (error-correction level H) — including a decode test run directly against the rendered flyer pixels, not just the standalone file. |

## Editing later

1. Edit any `flyer-*.html` directly (text, spacing, the `qr-code.svg` reference, etc.) — no build step needed, just open it in a browser to preview.
2. Check it still fits before exporting:
   - A / B (half-sheet, 5.5" tall panel): keep `.panel__inner` content under ~430px tall at 816×1056 (96dpi).
   - C (full page, inside a 0.65in-inset frame): keep `.panel__inner` content under ~900px tall.
   ```js
   document.querySelectorAll('.panel')[0].querySelector('.panel__inner').scrollHeight
   ```
3. Regenerate the PDF + PNG exports:
   ```bash
   cd print
   npm install
   node render-pdf.js
   ```
   This requires Google Chrome installed locally (it drives headless Chrome's print engine via `chrome-remote-interface` for exact zero-margin, single-page output — the plain `chrome --print-to-pdf` command-line flag does not reliably honor `@page` margins).

## Design notes

- Black ink only, no gray fills or photographic backgrounds, per the "no heavy ink coverage" brief — safe for home/office printers.
- A / B: a thin dashed "Cut Here" guide sits exactly at the 5.5" midpoint (positioned absolutely so it can't push content onto a second page). C has no cut line.
- The chawan + chasen watermark (B and C) is pure line art — stroke only, no fill, ~9% opacity — positioned behind the headline block and kept well clear of the QR code so it never affects scan reliability.
- Typography matches the website: Cormorant Garamond (display) + EB Garamond (body) + Noto Serif JP (kanji), loaded from Google Fonts.
