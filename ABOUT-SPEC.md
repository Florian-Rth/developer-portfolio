# Phase 4: About Section — Detaillierte Komponentenspezifikation

Basiert auf: Mock 4 (Editorial Desktop) + Mock 4 Mobile B + Elemente von Mock 2 (Watermark, Brush Divider)

## Referenz-Mocks
- Desktop: http://100.80.222.85:8092/2026-02-18-about-mock-4-editorial.png
- Mobile: http://100.80.222.85:8092/2026-02-18-about-mock-4-mobile-b.png

---

## 1. Section Container

### Desktop (≥1024px)
- **Element:** `<section id="about">`
- **Background:** `var(--background)` (#F5F0E8 light / #1A1816 dark)
- **Max-width:** 1200px, zentriert (`margin: 0 auto`)
- **Padding:** 120px vertical, 40px horizontal
- **Position:** relative (für Watermark + Annotationen)
- **Overflow:** hidden (Watermark darf nicht horizontal scrollen)

### Mobile (<1024px)
- **Padding:** 60px vertical, 20px horizontal
- **Layout:** Einspaltiger vertikaler Stack, zentriert

---

## 2. Watermark "ABOUT" (von Mock 2 übernommen)

- **Element:** Dekoratives `<span>` oder `<div>`, `aria-hidden="true"`
- **Text:** "ABOUT" (Desktop) / "about" in Script (Mobile)
- **Font:** DM Sans, 800 weight (Desktop) / Pacifico (Mobile)
- **Font-Size:** Desktop: ~280px / Mobile: ~120px
- **Color:** `var(--text)` mit `opacity: 0.04` (kaum sichtbar, Ton-in-Ton)
- **Position:** `absolute`, top: -40px, left: 50%, transform: translateX(-50%)
- **Text-transform:** uppercase (Desktop)
- **Letter-spacing:** 20px (Desktop)
- **User-select:** none
- **Z-index:** 0 (hinter allem Content)
- **Pointer-events:** none

---

## 3. Layout Grid (Desktop)

```
┌─────────────────────────────────────────────────────────┐
│                    "ABOUT" Watermark                     │
│  ┌──────────┐   ┌─────────────────────────────────────┐ │
│  │          │   │ Text rechts oben                     │ │
│  │  Foto    │   │ (Persönliches, Hobbys)              │ │
│  │  Card    │   │                        ┌──────────┐ │ │
│  │          │   │                        │ Counter  │ │ │
│  └──────────┘   │                        │ 3+ Jahre │ │ │
│                  └────────────────────────┴──────────┘ │ │
│        ┌──────────────────────────────┐                 │
│        │  Pull-Quote (Pacifico)       │                 │
│        │  + Brush Underline           │                 │
│        └──────────────────────────────┘                 │
│  ┌──────────────────┐  ┌────────────────────────────┐   │
│  │ "My Story"       │  │ Code-Snippet Block         │   │
│  │ Fließtext        │  │ (React Component)          │   │
│  │ + Annotationen   │  │ + Annotationen             │   │
│  └──────────────────┘  └────────────────────────────┘   │
│                                                          │
│  ═══════════ Brush Wave Divider ══════════════          │
└─────────────────────────────────────────────────────────┘
```

- **Grid:** CSS Grid, `grid-template-columns: 1fr 1fr`
- **Gap:** 60px horizontal, 40px vertical
- **Grid Areas:**
  - Row 1: Foto (links) + Info-Text mit Counter (rechts)
  - Row 2: Pull-Quote (volle Breite, `grid-column: 1 / -1`)
  - Row 3: Story-Text (links) + Code-Block (rechts)
  - Row 4: Brush Divider (volle Breite)

### Positionierung: Hybrid-Ansatz (responsive Editorial Look)

Die Elemente leben in einem **responsiven CSS Grid**, der "Editorial-Chaos-Look" entsteht durch
**relative Offsets + Rotation innerhalb der Grid-Zellen**:

- **Desktop (≥1024px):** 2-Column Grid (`1fr 1fr`), Elemente bekommen `position: relative` +
  `transform` (rotate, translateX/Y) für den "zufällig platzierten" Look. Offsets in `%` oder `vw`
  statt `px`, damit es skaliert.
- **Tablet (768-1023px):** Gleiches Grid, aber Offsets/Rotationen reduziert, Elemente rücken
  näher zusammen.
- **Mobile (<768px):** Komplett anderes Layout — einfacher Stack (`grid-template-columns: 1fr`),
  keine Überlappungen, keine wilden Offsets.

**Wichtig:**
- Annotationen sind `position: absolute` relativ zu ihrem **Parent-Element** (nicht zur Section)
- Grid-Zellen haben `position: relative` als Positioning Context
- Keine hardcoded px-Werte für Layout-Offsets — `%`, `vw`, oder Tailwind-Spacing

---

## 4. Foto-Card

### Container
- **Breite:** Desktop 320px / Mobile 240px
- **Höhe:** Desktop 380px / Mobile 280px
- **Background:** `var(--surface)` (#FFFDF9 / #252220)
- **Border:** 10px solid `var(--surface)` (Polaroid-Effekt)
- **Border-radius:** 6px
- **Rotation:** `transform: rotate(-4deg)`
- **Box-shadow:** `6px 8px 24px rgba(0,0,0,0.10)`
- **Overflow:** hidden (für das Bild)
- **Transition:** `transform 0.3s ease` (Hover: `rotate(-2deg) scale(1.02)`)

### Bild
- **Object-fit:** cover
- **Object-position:** center top
- **Breite/Höhe:** 100%

### Annotation "This is me! 👋"
- **Position:** absolute, unten-links der Card, versetzt (`bottom: -30px, left: -20px`)
- **Font:** Pacifico, 16px
- **Color:** `var(--accent)` (#D4929B)
- **Rotation:** `rotate(-6deg)`
- **+ SVG-Pfeil:** Handgezeichneter Curved Arrow, zeigt von Text zur Card
  - Stroke: `var(--accent)`, stroke-width: 1.5px
  - Größe: ca. 40x30px
  - Path: organische Kurve, nicht gerade

---

## 5. Handschriftliche Annotationen (Allgemein)

Alle Annotationen folgen diesem Pattern:

- **Font:** Pacifico, 14-18px
- **Color:** `var(--accent)` (#D4929B) oder `var(--text-secondary)` (#6B6560)
- **Rotation:** Leichte Rotation (-8° bis +8°), jede anders
- **Position:** absolute, relativ zum Parent-Element
- **SVG-Pfeil:** Immer dabei, handgezeichnet (curved path)
  - Stroke: gleiche Farbe wie Text
  - Stroke-width: 1.5-2px
  - Stroke-linecap: round
  - Fill: none
  - Pfeilspitze: einfaches offenes Dreieck (2 Linien)
- **Animate on Scroll:** Fade-in + leichtes translate-y (-10px → 0), 300ms ease, staggered delay
- **Pointer-events:** none (sollen nicht klickbar sein)
- **Z-index:** 10 (über Content-Elementen)

### Annotation-Liste Desktop:
1. **"This is me! 👋"** → Pfeil zur Foto-Card (links unten)
2. **"Headshot!"** → Pfeil zum Foto (rechts oben der Card) — nur Desktop
3. **"Love this font!"** → Pfeil zum Pull-Quote (links oben)
4. **"Playful self-intro code 😄"** → Pfeil zum Code-Block (unten mitte)
5. **"My tech stack & personality!"** → Pfeil zum Code-Block (rechts)
6. **"Growing fact! 🌱"** → Pfeil zum Counter (rechts oben)

### Mobile: Nur 3-4 Annotationen (reduziert um Platz zu sparen):
1. **"Headshot!"** → Pfeil zum Foto
2. **"love this!"** → Pfeil zum Pull-Quote oder Story-Heading
3. **"My tech stack & personality!"** → Pfeil zum Code-Block
4. **"Growing every day!"** → Pfeil zum Counter

---

## 6. Info-Text Block (Desktop rechts oben)

- **Position:** Grid rechte Spalte, oben
- **Inhalt:** Kurzer persönlicher Text, 2-3 Sätze über Persönlichkeit/Hobbys
- **Font:** DM Sans, 400 weight, 16px, line-height 1.7
- **Color:** `var(--text-secondary)` (#6B6560)
- **Max-width:** 480px

### Beispieltext:
> When I'm not coding or designing, you can find me exploring art galleries, hiking in the mountains, or brewing the perfect cup of pour-over coffee. I believe in continuous learning and staying curious.

---

## 7. Counter "3+ Jahre"

### Container
- **Position:** Desktop: rechts oben im Grid, neben Info-Text / Mobile: unter dem Code-Block
- **Display:** flex, align-items: baseline, gap: 8px
- **Padding:** 16px 24px
- **Border:** 2px solid `var(--muted)` (#E8DDD0), border-radius: 50% (ovale Form, ca. 160x100px)
- **Text-align:** center

### Zahl "3+"
- **Font:** DM Sans, 800 weight, 64px (Desktop) / 48px (Mobile)
- **Color:** `var(--text)` (#2D2A26)
- **Animation:** Count-up von 0 auf 3 beim Scroll-in-View
  - Duration: 1.5s
  - Easing: ease-out
  - Triggered via Intersection Observer (threshold: 0.5)
  - Das "+" erscheint nach dem Count-up (fade-in, 200ms)

### Label "Jahre Experience"
- **Font:** DM Sans, 500 weight, 14px
- **Color:** `var(--text-secondary)`
- **Text-transform:** uppercase
- **Letter-spacing:** 1.5px

### Annotation "Growing fact! 🌱"
- Rechts oben versetzt, Pacifico, 14px, rotiert +5°, mit Curved Arrow

---

## 8. Pull-Quote

### Container
- **Grid-Position:** Volle Breite (`grid-column: 1 / -1`)
- **Text-align:** center
- **Padding:** 40px 0
- **Margin:** 20px 0

### Text
- **Inhalt:** "Code is my canvas, pixels are my paint."
- **Font:** Pacifico, 48px (Desktop) / 28px (Mobile)
- **Color:** `var(--accent)` (#D4929B) — oder Logo-Gradient:
  ```css
  background: linear-gradient(135deg, #E8B4A0, #D4929B, #B8A9D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```
- **Line-height:** 1.4
- **Max-width:** 700px, margin: 0 auto

### Brush Underline
- **Element:** SVG, direkt unter dem Text
- **Breite:** ~60% der Text-Breite, zentriert
- **Höhe:** 12px
- **Path:** Organische Welle, nicht gleichmäßig (hand-drawn feel)
- **Fill:** `linear-gradient(90deg, #E8B4A0, #D4929B, #B8A9D4)`
- **Opacity:** 0.7
- **Animation:** Draw-on bei Scroll (stroke-dasharray + stroke-dashoffset Transition, 800ms)

---

## 9. "My Story" Text-Block

### Heading
- **Text:** "My Story."
- **Font:** DM Sans, 700 weight, 36px (Desktop) / 28px (Mobile)
- **Color:** `var(--text)`
- **Margin-bottom:** 24px

### Fließtext
- **Font:** DM Sans, 400 weight, 16px, line-height 1.8
- **Color:** `var(--text-secondary)`
- **Max-width:** 520px

### Gradient Text Highlights
Bestimmte Keywords im Text werden hervorgehoben:

- **Technik:** `<mark>` oder `<span class="highlight">`
- **Background:** Brush-Stroke PNG/SVG als background-image
  - Peach-Ton (#E8B4A0), opacity 0.4
  - Background-size: 100% 40% (nur untere Hälfte des Textes bedeckt, wie mit Textmarker)
  - Background-position: 0 90%
  - Background-repeat: no-repeat
- **Hervorgehobene Wörter (Beispiel):**
  - "creative developer"
  - "digital experiences"
  - "intuitive interfaces"
- **Font-weight:** 600 für hervorgehobene Wörter
- **Animation:** Background-size von `0% 40%` auf `100% 40%` beim Scroll-in-View (400ms ease)

### Beispieltext:
> I'm a passionate **creative developer** based in Leipzig, crafting **digital experiences** that blend design and functionality. My journey started with a curiosity for how things work, leading me to explore both visual arts and programming. I believe in building **intuitive interfaces** that tell a story and connect with users on a deeper level.

---

## 10. Code-Snippet Block

### Container
- **Position:** Desktop: rechte Spalte in Row 3 / Mobile: volle Breite
- **Background:** #1E1B19 (Dark Terminal Style, NICHT theme-abhängig — immer dunkel)
- **Border-radius:** 12px
- **Box-shadow:** `0 8px 32px rgba(0,0,0,0.15)`
- **Padding:** 24px
- **Max-width:** Desktop 480px / Mobile 100%
- **Font-family:** JetBrains Mono, monospace
- **Font-size:** 13px (Desktop) / 12px (Mobile)
- **Line-height:** 1.6
- **Overflow-x:** auto (falls Code zu breit)

### Title Bar (macOS Style)
- **Höhe:** 36px
- **Background:** #2A2725
- **Border-radius:** 12px 12px 0 0
- **Padding:** 0 16px
- **3 Dots:** Links, jeweils 10px Durchmesser, gap 6px
  - Rot: #FF5F56
  - Gelb: #FFBD2E
  - Grün: #27C93F
- **Dateiname:** Mitte, "AboutMe.tsx", Font: JetBrains Mono, 12px, color: #8A8480

### Syntax Highlighting (Pastell-Farben aus Styling Guide)
- **Keywords** (import, from, const, return, export, default): `#B8A9D4` (Lavender)
- **Strings** ('react', 'Florian', 'Creative Developer'): `#D4929B` (Dusty Rose)
- **Component/Function Names** (AboutMe, SelfDescription): `#E8B4A0` (Peach)
- **JSX Tags** (<div>, <h1>, <p>, <span>): `#C4B5A0` (Warm Muted Gold)
- **Props/Attributes** (className, role, loves): `#A8C4B8` (Muted Sage)
- **Comments** (// My digital persona): `#6B6560` (Text Secondary), italic
- **Punctuation/Brackets:** `#8A8480`
- **Plain Text / Values:** `#F0EBE3` (Light Cream)

### Code-Inhalt (React Component als Selbstbeschreibung):
```tsx
import React from 'react';

// My digital persona
const AboutMe = () => {
  const self = {
    name: 'Florian',
    role: 'Creative Developer',
    loves: ['React', 'UI/UX', 'Typography', 'Coffee'],
    currentlyExploring: 'Three.js & WebGL',
  };

  return (
    <div className="creative-soul">
      <h1>
        <span>Hello, world!</span> I'm {self.name}.
      </h1>
      <p className="description">
        Crafting engaging experiences as a {self.role}.
      </p>
      <ul>
        {self.loves.map((love, index) => (
          <li key={index}>❤️ {love}</li>
        ))}
      </ul>
      <p className="status">
        Currently exploring {self.currentlyExploring}...
      </p>
    </div>
  );
};

export default AboutMe;
```

### Annotationen zum Code-Block:
1. **"Playful self-intro code 😄"** — unten-links, Pfeil zeigt nach oben zum Block
2. **"My tech stack & personality!"** — rechts-mitte, Pfeil zeigt nach links zum Block

---

## 11. Brush Wave Divider (von Mock 2 übernommen)

- **Position:** Am Ende der About Section, volle Breite
- **Element:** Inline SVG
- **Breite:** 100% viewport
- **Höhe:** 60-80px
- **Form:** Organische Welle, 2-3 Bögen, variable Strichbreite
  - Links: dünn/flach
  - Mitte: breiter/expressiver
  - Rechts: wieder auslaufend
- **Fill:** `linear-gradient(90deg, #E8B4A0, #D4929B, #B8A9D4)` via `<linearGradient>` im SVG
- **Opacity:** 0.8
- **Margin-top:** 80px (Desktop) / 40px (Mobile)
- **Zweck:** Trennt About Section von nächster Section

---

## 12. Mobile Layout Stack (< 1024px)

Vertikaler Stack, alles zentriert:

```
┌──────────────────────┐
│   "about" Watermark   │
│                        │
│   ┌──────────────┐     │
│   │  Foto Card   │     │  ← 240x280px, rotate(-3deg)
│   │  + Annotation│     │
│   └──────────────┘     │
│         ↕ 32px         │
│   ┌──────────────────┐ │
│   │ Pull-Quote       │ │  ← Pacifico, 28px, Gradient
│   │ + Brush Underline│ │
│   └──────────────────┘ │
│         ↕ 32px         │
│   "My Story."          │  ← DM Sans, 28px, bold
│   Fließtext mit        │
│   Highlights           │
│   + Annotationen       │
│         ↕ 32px         │
│   ┌──────────────────┐ │
│   │ Code-Snippet     │ │  ← Volle Breite, Terminal-Style
│   │ Block            │ │
│   │ + Annotationen   │ │
│   └──────────────────┘ │
│         ↕ 24px         │
│   ┌────────────────┐   │
│   │  3+ Jahre      │   │  ← Counter, zentriert
│   │  Experience    │   │
│   │  + Annotation  │   │
│   └────────────────┘   │
│         ↕ 40px         │
│   ══ Brush Divider ══  │
└──────────────────────────┘
```

---

## 13. Scroll-Animationen

Alle Animationen nutzen **Intersection Observer** (custom Hook `useScrollReveal`):

### Basis-Animation (alle Elemente):
```css
/* Initial State */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Revealed State */
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Staggered Delays:
- Foto Card: 0ms
- Pull-Quote: 150ms
- Story Heading: 300ms
- Story Text: 400ms
- Text Highlights: 500ms (background-size Animation)
- Code Block: 450ms
- Counter: 550ms (+ Count-up Animation startet)
- Annotationen: 600-800ms (erscheinen zuletzt, nacheinander)

### Intersection Observer Config:
- **threshold:** 0.2 (Element 20% sichtbar)
- **rootMargin:** "0px 0px -50px 0px" (leicht verzögert)
- **once:** true (nur einmal animieren)

### Reduced Motion:
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 14. Brush Underline für AppBar Links (Neues Feature!)

Von Mock 4 inspiriert — Active Nav-Link bekommt wellige Underline:

- **Element:** SVG-Underline, `position: absolute`, `bottom: -4px`
- **Breite:** 100% des Link-Textes
- **Höhe:** 6px
- **Path:** Leichte Welle (2 Bögen)
- **Stroke:** `var(--accent)` (#D4929B)
- **Stroke-width:** 2px
- **Fill:** none
- **Animation:** Draw-on beim Hover/Active (stroke-dasharray Transition, 300ms)

---

## 15. Responsive Breakpoints

| Element | Desktop (≥1024px) | Mobile (<1024px) |
|---|---|---|
| Layout | 2-Column Grid | Single Column Stack |
| Watermark | "ABOUT" 280px, DM Sans | "about" 120px, Pacifico |
| Foto Card | 320x380px, rotate(-4deg) | 240x280px, rotate(-3deg), zentriert |
| Pull-Quote | Pacifico 48px | Pacifico 28px |
| Story Heading | DM Sans 36px | DM Sans 28px |
| Code Block | 480px max-width | 100% width |
| Counter Zahl | 64px | 48px |
| Annotationen | 6 Stück | 3-4 Stück (reduziert) |
| Section Padding | 120px 40px | 60px 20px |

---

## 16. Dark Mode Anpassungen

- **Watermark:** `opacity: 0.03` (noch dezenter im Dark Mode)
- **Foto Card Border:** `var(--surface)` (#252220)
- **Foto Card Shadow:** `rgba(0,0,0,0.3)` (stärker)
- **Text Highlights:** Brush-Background mit opacity 0.2 statt 0.4
- **Code Block:** Bleibt dunkel (kein Unterschied)
- **Counter Border:** `var(--muted)` (#3A3533)
- **Brush Divider:** opacity 0.6 statt 0.8
- **Annotationen:** `var(--accent-hover)` (#E0A5AE) für bessere Lesbarkeit

---

## 17. Komponenten-Struktur (React)

```
src/components/About/
├── About.tsx              # Wrapper <section>
├── Watermark.tsx          # "ABOUT" Background Text
├── PhotoCard.tsx          # Polaroid-Style Foto
├── PullQuote.tsx          # Zitat + Brush Underline
├── Story.tsx              # "My Story" Heading + Text
├── TextHighlight.tsx      # Brush-Marker Highlight Wrapper
├── CodeSnippet.tsx        # Terminal-Style Code Block
├── Counter.tsx            # Animierter Counter "3+ Jahre"
├── Annotation.tsx         # Handschriftliche Annotation + SVG-Pfeil
├── BrushUnderline.tsx     # Wellige SVG Underline (wiederverwendbar)
├── __tests__/
│   └── About.test.tsx
└── index.ts               # Composition Pattern Exports
```

### Composition Pattern Usage:
```tsx
<About>
  <About.Watermark />
  <About.PhotoCard src={headshot} alt="Florian Rätsch">
    <About.Annotation text="This is me! 👋" direction="bottom-left" />
  </About.PhotoCard>
  <About.PullQuote>
    Code is my canvas, pixels are my paint.
  </About.PullQuote>
  <About.Story>
    I'm a passionate <About.TextHighlight>creative developer</About.TextHighlight> based in Leipzig...
  </About.Story>
  <About.CodeSnippet />
  <About.Counter value={3} suffix="+" label="Jahre Experience" />
</About>
```
