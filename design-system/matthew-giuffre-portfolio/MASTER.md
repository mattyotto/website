# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Matthew Giuffre Portfolio
**Updated:** 2026-03-28
**Theme:** Personal Sketchbook — Riso-print zine aesthetic

---

## Concept

A personal sketchbook brought to life. Loose hand-drawn line art with marker fill that bleeds outside the lines.
Think risograph printing, 90s DIY zine culture, biro sketches coloured in with Copic markers on the wrong setting.
Colour is flat, bright, and slightly translucent. Lines are casual, wobbly, never clean.
Off-register colour overlap. Naive illustration rawness. Imperfection is the point.

**Mood references:** Riso-print zines · 90s DIY photocopied flyers · loose editorial illustration · highlighter-over-biro · Copic marker bleed

---

## Color Palette

Riso-print inspired — maximum 3–4 colours total, used flat with translucency.
Colours don't stay inside the lines. That's intentional.

| Role | Hex | Riso equivalent | Usage |
|------|-----|----------------|-------|
| Paper | `#FAF8F3` | Uncoated cream stock | Page background |
| Ink | `#1C1C2E` | Black / dark navy biro | Line art, primary text |
| Yellow | `#FFE566` | Fluorescent Yellow | Highlight fills, bleeds, marker swipes |
| Coral | `#FF6B6B` | Fluorescent Pink / Red | Accent fills, circle callouts, emphasis |
| Blue | `#4A90D9` | Blue riso | Secondary accent, underlines |
| Muted text | `#5A5A6E` | — | Secondary body text |

**Colour rules:**
- Always apply at 60–80% opacity so fills feel translucent like real marker
- Fills should visually overflow their containing line art by 3–8px
- Never use more than 2 accent colours on one section
- No gradients — flat only
- Off-register effect: use a 2–3px offset duplicate in a second colour on hero type

---

## Typography

| Role | Font | Weight | Feel |
|------|------|--------|------|
| Hero / Headers | `Kalam` | 400, 700 | Casual handwriting, slightly uneven baseline |
| Annotations / Labels | `Caveat` | 400, 600 | Quick scribbled notes, margin text |
| Body / Typewriter | `Special Elite` | 400 | Worn typewriter, slightly smudged letterforms |
| Emphasis / Stamps | `Permanent Marker` | 400 | Bold marker, used for 1–2 word pops only |

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Caveat:wght@400;600;700&family=Special+Elite&family=Permanent+Marker&display=swap');
```

**Type rules:**
- Never perfectly centre-align body text — slight left-lean feels more natural
- Vary letter-spacing slightly between headings for a hand-lettered feel
- Use `letter-spacing: -0.02em` on large Kalam headings
- Labels in Caveat, all lowercase, with `opacity: 0.75`

---

## Texture & Surface Techniques

### Paper background
```css
background-color: #FAF8F3;
```

### Ruled lines (secondary sections only)
```css
background-image: repeating-linear-gradient(
  transparent,
  transparent 27px,
  rgba(28, 28, 46, 0.06) 28px
);
background-size: 100% 28px;
```

### Marker fill bleed (key technique)
Simulate colour bleeding outside line art using a blurred, offset background:
```css
.marker-fill {
  position: relative;
}
.marker-fill::before {
  content: '';
  position: absolute;
  inset: -4px -6px;
  background: #FFE566;
  opacity: 0.65;
  border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
  transform: rotate(-1deg);
  z-index: -1;
  filter: blur(1px);
}
```

### Off-register text effect
For hero name — duplicate offset by 2–3px in coral:
```css
.hero-name {
  position: relative;
  color: #1C1C2E;
}
.hero-name::before {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  top: 3px;
  color: #FF6B6B;
  opacity: 0.4;
  z-index: -1;
}
```

---

## Hand-drawn SVG Elements

All borders, underlines, circles, and decorative lines must be hand-drawn SVGs — never CSS borders.

### Wobbly underline
```svg
<path d="M0,4 Q20,0 40,4 Q60,8 80,4 Q100,0 120,4"
  stroke="#FFE566" stroke-width="6" fill="none"
  stroke-linecap="round" opacity="0.7"/>
```

### Imperfect circle callout (metric highlights)
```svg
<ellipse cx="50" cy="50" rx="48" ry="45"
  stroke="#FF6B6B" stroke-width="3" fill="#FF6B6B" fill-opacity="0.15"
  transform="rotate(-3)" stroke-dasharray="2 1"/>
```

### Sketched arrow
```svg
<path d="M0,0 C20,-5 40,5 60,0" stroke="#1C1C2E" stroke-width="2"
  fill="none" stroke-linecap="round"/>
<path d="M55,-4 L62,0 L55,4" stroke="#1C1C2E" stroke-width="2"
  fill="none" stroke-linecap="round"/>
```

---

## Component Patterns

### Section headers
- Kalam 700, large (2.5–4rem)
- Yellow marker-fill bleed behind the text
- Slight rotation: `transform: rotate(-1deg)`

### Metric callouts ("3x quota", "$30M", "+10%")
- Permanent Marker font
- Imperfect SVG circle around the number
- Coral fill at 15% opacity inside circle
- Annotation below in Caveat: "consecutive quarters" etc.

### Experience timeline
- Vertical line: hand-drawn SVG path, slightly wobbly
- Nodes: imperfect filled circles, not perfect
- Company name: Kalam bold
- Date / role: Caveat, muted
- Description: Special Elite body text

### Skill tags
- Hand-drawn rectangular SVG border (not CSS)
- Yellow or coral marker fill bleeding slightly outside
- Special Elite text inside

### CTA Buttons
- SVG hand-drawn rectangle path as border — no CSS border-radius
- Fill: yellow at 70% opacity
- Text: Kalam or Permanent Marker
- Hover: slight rotation `rotate(1deg)` over 200ms

---

## Animation Guidelines

- **Entrance:** Elements draw in like someone sketching — SVG `pathLength` 0→1
- **Hover states:** Slight wobble `rotate(-1deg) → rotate(1deg)` over 200ms
- **Scroll reveals:** Fade + slight upward drift, staggered 60ms apart
- **No slick/smooth animations** — slightly imperfect timing is intentional
- **Respect `prefers-reduced-motion`** — disable all animations

---

## Anti-Patterns (Do NOT Use)

- ❌ Clean CSS borders — hand-drawn SVG paths only
- ❌ Perfect circles — always slightly off with organic rotation/shape
- ❌ Gradients or drop shadows — flat only
- ❌ Polished fonts (no Inter, Helvetica, Geist, etc.)
- ❌ Pixel-perfect alignment — slight offsets are intentional
- ❌ More than 3 accent colours at once
- ❌ Solid colour fills — always semi-transparent (55–80% opacity)
- ❌ Smooth app-like interactions — keep it tactile and imperfect

---

## Pre-Delivery Checklist

- [ ] Paper background `#FAF8F3` applied
- [ ] All decorative borders are hand-drawn SVGs, not CSS
- [ ] Marker fills bleed 3–8px outside line art at 60–80% opacity
- [ ] Off-register hero text effect applied
- [ ] No more than 3 accent colours per section
- [ ] Kalam for headers, Caveat for annotations, Special Elite for body
- [ ] Metric callouts circled with imperfect SVG ellipses
- [ ] Hover states include slight rotation/wobble
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px / 768px / 1024px / 1440px
