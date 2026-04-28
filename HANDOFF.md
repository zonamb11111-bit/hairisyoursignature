# Handoff: kommons LP (HIKARU TERADA / hairisyoursignature)

## Overview

LP (landing page) for **kommons** — an English-speaking private hair salon in Koenji, Tokyo, run by stylist HIKARU TERADA. Plus a companion **Local guide to Koenji** map page (44 hand-picked spots in the neighborhood, curated by Hikaru).

The site is bilingual (EN/JP), one-on-one consultation focused, and intentionally avoids "salon-y" tropes (no glossy gradients, no stock-y imagery, no pill-button spam). Reference moodboard: goyemon, innthe-people — warm minimal, lots of whitespace, no accent color.

## About the Design Files

The files in this bundle are **design references created in HTML** — single-file prototypes showing intended look and behavior, **not production code to copy directly**. The task is to **recreate these designs in the target codebase's existing environment** (Next.js / Astro / whatever the team picks) using its established patterns and component library — or, if there's no codebase yet, choose the most appropriate framework and implement the designs there.

A reasonable target stack would be **Next.js (App Router) + Tailwind**, or **Astro** for a content-led static site. CMS optional (the menu/FAQ data is small enough to live in TS files).

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, copy, animations, and interaction states are all settled. Recreate pixel-perfectly.

The one caveat: a few `<video>` references in the **Style Archive** carousel point to .mp4 files that haven't been delivered yet (only `middle-fade.mp4` is real — the rest 404). The dev should expect those slots to fail until production footage lands. See "Pending assets" below.

## Files in this bundle

```
design_handoff_kommons_lp/
├── README.md                    ← this file
├── DESIGN.md                    ← original design spec (warm-minimal direction)
├── kommons_v2.html              ← main LP, single file (~2800 lines)
├── koenji-guide.html            ← /guide companion page (Mapbox-based local guide)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── hikaru.png               ← stylist portrait (used in About)
    ├── salon-interior.jpg       ← salon photo (used in Access)
    ├── keraffect.png            ← KERAFFECT product (used in Access)
    ├── hairis-logo.png          ← logo mark
    ├── hero.mp4                 ← hero background loop
    ├── HAIR_ICONS_STICKER.mp4   ← Sticker section loop
    └── middle-fade.mp4          ← Style Archive — slot 1
```

`kommons_v2.html` is self-contained: all CSS is in `<style>` blocks, all JS inline at bottom. There is no build step. Fonts come from Google Fonts (DM Sans, Zen Kaku Gothic New, DM Mono).

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | page background |
| `--text` | `#1C1C1A` | primary text, dark sections |
| `--muted` | `#888884` | secondary text |
| `--muted2` | `#B8B5AE` | tertiary text, decorative |
| `--border` | `#E8E6E1` | warm hairlines, dividers |
| `--black` | `#1C1C1A` | buttons, dark blocks |
| `--white` | `#FFFFFF` | inverted text |

**Per DESIGN.md**: no accent color. Anything that wants to "pop" should use weight, scale, or whitespace — not hue.

The **Mood Curator** section is the one exception that uses a dark background (`#1C1C1A`) for visual rhythm.

### Typography

| Variable | Stack |
|---|---|
| `--font-en` | `'DM Sans', sans-serif` |
| `--font-jp` | `'Zen Kaku Gothic New', sans-serif` |
| `--font-logo` | `'Futura', 'Futura PT', 'Jost', 'Trebuchet MS', sans-serif` |
| `--font-mono` | `'DM Mono', monospace` (used in /guide page only) |

Weight scale used in CSS:
- `--bw` (body weight): `400`
- `--nw` (nav weight): `500`
- `--lw` (label weight): `500`
- `--hw` (headline weight): `600`

Font sizes are mostly fixed (px) with `clamp()` only on the hero headline. Line-heights are loose for JP (2.0–2.2) and tighter for EN (1.18 hero, 1.7 body).

### Geometry

- **Border radius**: `2px` everywhere (DESIGN.md spec — no soft pillows)
- **Section padding**: `clamp(80px, 12vw, 160px)` vertical
- **Page max-width**: `1200px` stage (`.section` container)
- **Hairline width**: `1px` solid `var(--border)`

### Animation

- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)` (fast-out, slow-in)
- Fade-in on scroll: `opacity` + `translateY(12px → 0)`, 500–600ms
- Hover: `transform: translateY(-2px)` + subtle shadow on cards/buttons
- Animations are restrained — nothing bouncy, no parallax, no AOS-style fanfare

---

## Page structure (kommons_v2.html)

Top to bottom:

1. **Top nav** — fixed, transparent until scroll. Centered logo wordmark (`HIKARU TERADA` in Futura), inline links: ABOUT · ACCESS · GUIDE · FAQ · BOOK
2. **Lang toggle** — fixed top-left, segmented `EN | JP` (auto-detects browser language on load)
3. **Hero** — full-bleed video (`assets/hero.mp4`), centered headline overlay, BOOK NOW CTA, `↓ SCROLL` indicator
4. **Concept** — short poetic copy fragments (different EN/JP versions, JP not a literal translation)
5. **Style Archive** — horizontal scroll carousel of 10 video tiles (only slot 1 has real footage as of now)
6. **About / Profile** — Hikaru's portrait (left, vertical frame, `object-position: center 28%`) + bio + facts (15+ years, 40+ countries, …) + tag list
7. **Voice strip** — 3 client quotes (testimonials)
8. **Mood Curator** (dark section, `#1C1C1A`) — promo for the Signature Finder mini-tool, links to `https://find.hairisyoursignature.jp/`
9. **Menu** — numbered list (01–08): Cut, Color, Double Color/Balayage, Perm, Treatment, Head Spa, etc. with prices in ¥
10. **Access** — address + Google Map (custom-styled, grayscale, kommons pin with ripple animation) + 3-image grid (salon interior, KERAFFECT product)
11. **Sticker** — `HAIR_ICONS_STICKER.mp4` loop, no headline (intentionally bare)
12. **FAQ** — accordion, separate EN and JP question banks, grouped by Pre-visit / Practical / Hair-specific
13. **Booking** — final CTA. EN → Setmore (`https://hairisyoursignature4dnk.setmore.com/`). JP → Stekina LINE-integrated (`https://stekina.com/profile/6N5Z-2N79?stype=lp`)
14. **Footer** — minimal: location, social links (Instagram, TikTok, Google Reviews)

### Floating chrome (always-visible)
- **Bottom-right stack** of pill buttons: Book / Instagram / LINE
- **Bottom-left** Google review badge (5.0 ★, 86 reviews) → click opens slide-up panel showing the latest reviews

### Tweaks panel (design-review only)
There's a `<aside>` Tweaks panel for variant comparison (hero size, layout width, FAQ style, button style, sticker poster vs autoplay). **Drop this entirely in the production build** — it's a design-time tool only. Search for `Tweaks` / `t-` body class toggles to identify it. The tweak toggles in the rendered LP are: `t-hero-small`, `t-hero-meta`, `t-wide-stage`, `t-concept-fragments`, `t-float-min`, `t-menu-nonum`, `t-faq-underline`, `t-btn-unified`, `t-sticker-poster`.

---

## Bilingual behavior (EN / JP)

Every translatable element exists **twice** in the DOM, tagged with `class="lang-en"` or `class="lang-jp"`. The `setLang(lang)` function in JS toggles `display: none` on the inactive set.

```js
// Auto-detect on load
function detectLang() {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return browserLang.startsWith('ja') ? 'jp' : 'en';
}
window.addEventListener('load', () => setLang(detectLang()));
```

The toggle button is fixed top-left with two `lang-btn` segments. `document.documentElement.lang` is updated to `ja` or `en` on switch.

In a real codebase, replace this with i18n routing (e.g. Next.js `app/[locale]/...` or middleware-based detection). **Do not duplicate DOM nodes** — use a translation file (`en.json`, `ja.json`) and a `t()` helper.

JP copy is **not a literal translation of EN** in many places (especially the Concept section and FAQ). The dev should preserve both as authored, not auto-translate.

---

## External links / IDs (current state)

| Use | EN URL | JP URL |
|---|---|---|
| Booking | `https://hairisyoursignature4dnk.setmore.com/` | `https://stekina.com/profile/6N5Z-2N79?stype=lp` |
| Instagram (consultation DM) | `https://www.instagram.com/zonamb/` | `https://www.instagram.com/zonamb/` |
| LINE | `https://lin.ee/OjJQtyi` | (same) |
| TikTok | `https://www.tiktok.com/@hikaruterada` | (same) |
| Google Reviews | `https://g.page/r/CT7_5B4h1H3FEBM/review` | (same) |
| Mood Curator / Signature Finder | `https://find.hairisyoursignature.jp/` | (same) |
| Local guide map | `koenji-guide.html` (relative) | (same) |

**Important — Instagram handle**: All Instagram links currently point to `@zonamb`. Schema.org `sameAs` and on-page text mentions are also `@zonamb`. (The `hairisyoursignature` handle was previously used but is currently inaccessible.)

---

## Companion page: koenji-guide.html

A standalone Mapbox-powered local guide. Uses **Mapbox GL JS v3.3.0** (CDN). Token is in the source — **rotate it** before deploying to a public domain.

- Sidebar list (left, 380px) of 44 stores grouped by zone (Eat / Find / Stay)
- Custom map style (warm sand ground `#E3D8C1`, dimmed, with film-grain overlay and vignette)
- Custom pins with category color rings
- Click a pin or row → store detail card animates open
- Filter buttons (All / Eat / Find / Stay) at top of sidebar
- "← HIKARU TERADA" back link returns to `kommons_v2.html`
- Bilingual (same EN/JP toggle pattern as main LP)

The store data is a JS array (`const stores = [...]`) with ~44 entries, each: `name, jp, genre, addr, lat, lng, en, jp_text, ef` (English-friendly flag). Migrate to a JSON file or CMS in production.

---

## Pending assets (素材待ち)

The following Style Archive videos are referenced but the files don't exist yet:
- `soft-wolf-cut.mp4`
- `hush-cut.mp4`
- `french-pixie.mp4`
- `reverse-balayage.mp4`
- `ice-blue-layered.mp4`
- + 4 more

These produce console errors in the current LP — harmless visually (the player just shows a blank slot), but the dev should add a graceful fallback (`<picture>` poster image) until footage arrives.

**File-naming rule**: half-width alphanumeric only. The design environment couldn't read Japanese-named uploaded files.

---

## Interaction details

### Top nav
- Background transparent on top of page; gains `border-bottom: 1px solid var(--border)` after 80px scroll (`.nav.scrolled` class toggled via scroll listener)

### Hero
- Background `<video>` autoplay loop muted playsinline. Falls back to first-frame poster on iOS low-power.
- Headline animates in: `opacity 0→1`, `translateY(12px → 0)`, 600ms, on `window.load`

### Style Archive carousel
- Horizontal `overflow-x: auto`, snap points (`scroll-snap-type: x mandatory`)
- "Swipe →" hint pulses
- Each tile is a muted autoplay loop on hover (desktop) / always (mobile)

### Menu items
- Fade in on scroll, staggered 60ms apart (IntersectionObserver)
- No hover effect — they're list rows, not cards

### Map (Access section)
- Embedded as `<iframe>` Google Maps with `filter: grayscale(1)` by default
- On hover (desktop): `filter: grayscale(0)` — color returns
- Custom kommons pin overlaid with CSS (black dot + ripple animation + label)

### FAQ accordion
- `<button class="faq-q">` toggles its sibling `<div class="faq-a">`
- `aria-expanded` is updated for screen readers
- Plus icon rotates 45° to become an X

### Review panel
- Click `.review-badge` (bottom-left) → `.review-panel` slides up from bottom
- `.review-overlay` darkens the page; click to close
- Reviews are hard-coded in HTML (5 visible + "See all on Google" link)

### Floating CTAs
- Stack of 3 pills bottom-right: Book / Instagram / LINE
- All `position: fixed`, drop-shadow on hover, target=_blank with rel=noopener

---

## A11y / SEO

- `<html lang>` updates on language switch
- `aria-pressed` on lang toggle, `aria-expanded` on FAQ buttons, `aria-label` on icon buttons
- Focus styles: 2px solid `var(--text)`, 3px offset
- Multiple JSON-LD blocks: `LocalBusiness`, `WebPage`, `FAQPage`, `HowTo`, `Person`. Keep these for SEO/AIO.
- Meta tags include OG / Twitter / canonical / `hreflang` (en + ja-jp)
- A `<noscript>` block in /guide page for crawlers

---

## What to keep vs. drop when porting

**Keep:**
- All design tokens (colors, type, radius, spacing)
- The exact copy (EN and JP) — it's been edited carefully
- All structured data blocks (JSON-LD)
- The menu prices and FAQ content
- Animation easings and timings
- The 1-on-1, no-rush tone of the entire page

**Drop / refactor:**
- The Tweaks panel (design-time only)
- Inline duplicate DOM for EN/JP — use real i18n
- Inline `<style>` and `<script>` — split per component
- Hard-coded reviews — pull from Google Places API or maintain in CMS
- Hard-coded store list in /guide — JSON file or CMS
- Mapbox token — rotate and put in env var

**Verify with stakeholder before changing:**
- The "no accent color" rule. Don't quietly add a brand color.
- The Concept section's poetic fragmented copy — it's intentional, not a translation TODO.
- The Sticker section being headline-less.

---

## Open questions for the developer

1. Target framework / repo? (Next.js + Tailwind recommended for static perf + i18n routing)
2. CMS or static? (Menu / FAQ / reviews / store list could all be static TS files for now)
3. Booking integration — keep external Setmore + Stekina deep-links, or build native booking? (External is fine for v1)
4. Analytics? (None in current build)
5. Will the Mood Curator (Signature Finder) and the booking forms be moved into the same repo, or stay on subdomains?

Hand off the questions back to the project owner before starting implementation.
