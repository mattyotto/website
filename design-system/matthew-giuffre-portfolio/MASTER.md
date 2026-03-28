# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Matthew Giuffre Portfolio
**Updated:** 2026-03-28
**Theme:** Blueprint / Builder — graph paper aesthetic, handwritten accents, architectural personality

---

## Concept

"Builder's Blueprint" — the site looks like a talented person left their working drafts on a drafting table.
Light graph paper base, faint blueprint grid, hand-drawn typographic accents, technical mono labels.
Confident and creative without being corporate or generic.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Background | `#F8FAFF` | `--color-background` | Cool off-white, slight blue tint |
| Surface | `#FFFFFF` | `--color-surface` | Cards sit on pure white |
| Grid lines | `#BFCFE8` | `--color-grid` | Use at 30% opacity for blueprint grid texture |
| Text Primary | `#0F1A2E` | `--color-text` | Deep navy — not pure black |
| Text Muted | `#5A7396` | `--color-text-muted` | Blueprint-toned grey for labels/meta |
| Accent | `#0077CC` | `--color-accent` | Blueprint blue — CTAs, links, highlights |
| Accent Light | `#00BFFF` | `--color-accent-light` | Cyan — hover states, active elements |
| Border | `#C8D9EE` | `--color-border` | Soft blueprint blue dividers |
| Destructive | `#DC2626` | `--color-destructive` | Errors only |

**Color Notes:** Light base (graph paper white) + blueprint blue accent. Accent used sparingly — CTAs and hover states only. Never use pure black (#000) or pure white (#FFF) for large surfaces.

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Hero | `Caveat` | 600–700 | Hero name draw-in animation, section headers |
| Technical Labels | `Space Mono` | 400–700 | Job titles, dates, company names, annotations |
| Body | `Inter` | 400–500 | Paragraph text, descriptions, readable content |

**Mood:** Architectural drafting meets personal portfolio — handwritten + technical + clean

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
```

**Tailwind fontFamily config:**
```js
fontFamily: {
  display: ['Caveat', 'cursive'],      // Hero titles, section headers
  mono: ['Space Mono', 'monospace'],   // Labels, dates, annotations
  body: ['Inter', 'sans-serif'],       // Body text
}
```

**Type Scale:**
| Token | Size | Font | Usage |
|-------|------|------|-------|
| Hero | `clamp(3rem, 8vw, 6rem)` | Caveat 700 | Name in hero |
| H1 | `2.5rem / 40px` | Caveat 600 | Page-level section headers |
| H2 | `1.75rem / 28px` | Caveat 600 | Sub-section headers |
| Label | `0.75rem / 12px` | Space Mono 400 uppercase | Dates, tags, annotations |
| Body | `1rem / 16px` | Inter 400 | All paragraph text |
| Small | `0.875rem / 14px` | Inter 400 | Secondary descriptions |

### Blueprint Grid Texture

Apply as a CSS background to the root layout:
```css
background-color: #F8FAFF;
background-image:
  linear-gradient(rgba(191, 207, 232, 0.3) 1px, transparent 1px),
  linear-gradient(90deg, rgba(191, 207, 232, 0.3) 1px, transparent 1px);
background-size: 32px 32px;
```

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight inline gaps |
| `--space-sm` | `8px` | Icon gaps, tag spacing |
| `--space-md` | `16px` | Standard component padding |
| `--space-lg` | `24px` | Card padding |
| `--space-xl` | `32px` | Section inner padding |
| `--space-2xl` | `48px` | Between sections (mobile) |
| `--space-3xl` | `80px` | Between sections (desktop) |

### Shadows

Shadows should be blue-tinted, not grey (matches blueprint palette):

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0, 119, 204, 0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(0, 119, 204, 0.12)` | Cards, buttons |
| `--shadow-lg` | `0 8px 24px rgba(0, 119, 204, 0.16)` | Modals, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary — blueprint blue */
.btn-primary {
  background: #0077CC;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-primary:hover {
  background: #0088EE;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Secondary — outlined */
.btn-secondary {
  background: transparent;
  color: #0077CC;
  border: 1.5px solid #C8D9EE;
  padding: 12px 24px;
  border-radius: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-secondary:hover {
  border-color: #0077CC;
  background: rgba(0, 119, 204, 0.04);
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #C8D9EE;
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 250ms ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #0077CC;
  transform: translateY(-2px);
}
```

### Annotation Labels (Space Mono)

Small technical labels styled like drafting annotations:
```css
.annotation {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #5A7396;
}
```

---

## Animation Guidelines

- **Hero name:** SVG path draw-in via Framer Motion (`pathLength` 0→1, duration 2.5s)
- **Section headers:** Fade + slide up on scroll (`y: 20 → 0`, opacity 0→1, duration 0.6s)
- **Cards:** Stagger entrance 50ms apart on scroll entry
- **Timing:** Micro-interactions 150–250ms ease-out; entrances 400–600ms ease-out
- **Reduced motion:** All animations must respect `prefers-reduced-motion`

---

## Style Guidelines

**Theme:** Blueprint / Builder
**Style:** Architectural minimalism with handwritten personality
**Key Effects:** Blueprint grid texture, SVG path draw-in, scroll-triggered entrances, blueprint ink hover states

### Page Section Order
1. Hero — Name (Caveat draw-in), role (Space Mono), avatar, CTA buttons
2. About — Bio, bridges technical + business, handwritten header
3. Experience — Timeline/cards with annotation-style dates
4. Skills — Blueprint-styled category grid
5. Education — Clean card list
6. Awards — Highlighted card
7. Contact — Email + LinkedIn sign-off

---

## Anti-Patterns (Do NOT Use)

- ❌ Dark backgrounds — this is a light blueprint theme
- ❌ Generic blue (`#2563EB`) — use blueprint blue (`#0077CC`) only
- ❌ Orange/warm CTAs — clashes with blueprint palette
- ❌ Rounded pill buttons — use subtle radius (6px) for a drafting aesthetic
- ❌ Emoji as icons — use Lucide React SVG icons only
- ❌ Missing `cursor: pointer` on clickable elements
- ❌ Instant state changes — always transition 150–300ms
- ❌ Low contrast text — maintain 4.5:1 minimum

---

## Pre-Delivery Checklist

- [ ] Blueprint grid texture applied to root layout
- [ ] Caveat used only for display/headers — not body text
- [ ] Space Mono used for all labels, dates, annotations
- [ ] Inter used for all body/paragraph text
- [ ] Accent `#0077CC` used sparingly (CTAs, links, hover)
- [ ] No emojis — Lucide icons only
- [ ] `cursor-pointer` on all interactive elements
- [ ] Hover transitions 150–300ms
- [ ] Text contrast 4.5:1 minimum
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] No horizontal scroll on mobile
