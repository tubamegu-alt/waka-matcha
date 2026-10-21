# WAKA MATCHA — Landing Page

A single-page, mobile-first landing site for WAKA MATCHA. Plain HTML/CSS/JS,
no build step, ready to deploy to Netlify or Vercel as a static site.

## Structure

```
index.html     all five sections (Hero, Heritage, Art of Matcha, Exclusive Access, Footer)
style.css      design tokens + layout + animations
script.js      scroll-reveal, sticky nav state, copy-to-clipboard for the email
images/        drop real photography here (see below)
netlify.toml   static publish config (no build command needed)
vercel.json    clean URLs config
```

## Local preview

No build step is required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `npx serve .` or `python -m http.server`.

## Deploying

**Netlify**: connect the repo, leave the build command empty, publish directory `.`.
**Vercel**: import the repo as a static project (framework preset: "Other"). No build command needed.

## Replacing the placeholder visuals

The hero and content sections currently use minimal gold line-art (SVG circles and
curves) instead of photography, so nothing on the page could be mistaken for an
actual product photo or another brand's imagery. When real photography of the
matcha, chasen (whisk), chawan (bowl), or a tea room is ready:

1. Add the image files to `images/`.
2. In `index.html`, replace the relevant `<svg class="hero__motif">` or
   `<svg class="motif-art">` block with an `<img>` tag pointing at your file
   (e.g. `<img src="images/hero.jpg" alt="" class="hero__photo">`).
3. For the hero, you can instead set a CSS background on `.hero` in `style.css`:
   ```css
   .hero {
     background: linear-gradient(rgba(16,25,15,.55), rgba(16,25,15,.75)), url("images/hero.jpg") center/cover;
   }
   ```
4. Recommended aspect ratios: hero ~ 16:10 or 4:5 for mobile, section images ~ 1:1 or 4:5.
   Keep files reasonably compressed (web-optimized JPEG/WEBP) for mobile load speed.

Do not use stock photography of a different brand's packaging or a specific named
shrine/temple/tea house as a stand-in — keep imagery generic (tea, matcha, utensils,
tea room ambience) until real brand photography is available.

## Content notes

- No prices or online checkout by design — WAKA MATCHA sells exclusively through
  private inquiry to **SHOWCASE TOKYO** (`showcase.tokyo.la@gmail.com`).
- The "Request Purchase Information" button and the footer email link both open
  the visitor's mail app with the recipient, subject, and body pre-filled via a
  `mailto:` link.
- No specific shrine, temple, or tea house is named anywhere in the copy, and no
  awards, certifications, or supplier claims are made beyond what was provided.
