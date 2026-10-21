# WAKA MATCHA — Event Flyer

Print-ready, black-and-white event handout. US Letter, portrait, two identical
8.5" × 5.5" flyers per sheet (cut in half for two handouts).

## Files

| File | What it is |
|---|---|
| `flyer-a.html` / `flyer-b.html` | **Editable source.** Plain HTML/CSS — open in any browser, or edit text/spacing directly. Version A is minimal/editorial; Version B adds a thin double-rule frame, a small 和 (harmony) kanji mark, and a ◆ divider. |
| `WAKA-MATCHA-Flyer-A-Minimal.pdf` / `WAKA-MATCHA-Flyer-B-Framed.pdf` | **Print-ready PDF**, exactly 1 page, 8.5"×11" (612×792pt), zero margins, vector text. Send straight to a printer. |
| `WAKA-MATCHA-Flyer-A-Minimal-300dpi.png` / `WAKA-MATCHA-Flyer-B-Framed-300dpi.png` | High-resolution raster export (2550×3300px, 300 DPI) of the full sheet — use if a print shop wants an image file instead of a PDF. |
| `qr-code.svg` / `qr-code.png` | The QR code used in both flyers, linking to `https://waka-matcha.netlify.app`. SVG is vector (scales to any size); PNG is 2400×2400px. Verified to decode correctly (error-correction level H). |

## Editing later

1. Edit `flyer-a.html` or `flyer-b.html` directly (text, spacing, the `qr-code.svg` reference, etc.) — no build step needed, just open it in a browser to preview.
2. Keep each panel's content under ~430px tall when viewed at 816×1056 (8.5"×11" at 96dpi) so it doesn't overflow the 5.5" half — check with:
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
- A thin dashed "Cut Here" guide sits exactly at the 5.5" midpoint (positioned absolutely so it can't push content onto a second page).
- Typography matches the website: Cormorant Garamond (display) + EB Garamond (body), loaded from Google Fonts.
