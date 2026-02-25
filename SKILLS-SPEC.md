# Phase 6: Skills Section — Detaillierte Komponentenspezifikation

Basiert auf: Konzept A "The Lab" — 3D Card Carousel
Entschieden: 2026-02-25

## Referenz-Mocks
- Hauptkonzept: `2026-02-25-skills-concept-1-lab-carousel.png`
- Backend-Szenen: `2026-02-25-backend-scene-concepts.png`
- DevOps-Szenen: `2026-02-25-devops-scene-concepts.png`

---

## 1. Section Container

### Desktop (≥1024px)
- **Element:** `<section id="skills">`
- **Background:** `var(--background)` (#F5F0E8 light / #1A1816 dark)
- **Max-width:** 1200px, zentriert (`margin: 0 auto`)
- **Padding:** 120px vertical, 40px horizontal
- **Position:** relative (für Watermark + Annotationen)
- **Overflow:** hidden (Watermark)

### Mobile (<1024px)
- **Padding:** 60px vertical, 20px horizontal

---

## 2. Watermark "SKILLS"

Identisches Pattern wie "ABOUT" in der About-Section:

- **Element:** `<span aria-hidden="true">`
- **Text:** "SKILLS" (Desktop) / "skills" in Pacifico (Mobile)
- **Font:** DM Sans, 800 weight (Desktop) / Pacifico (Mobile)
- **Font-Size:** Desktop ~280px / Mobile ~120px
- **Color:** `var(--text)` mit `opacity: 0.04`
- **Position:** `absolute`, top: -40px, left: 50%, transform: translateX(-50%)
- **Text-transform:** uppercase (Desktop)
- **Letter-spacing:** 20px (Desktop)
- **User-select:** none, **pointer-events:** none
- **Z-index:** 0

---

## 3. Desktop Layout — Card Grid

### Card Grid (≥1024px)
- **Display:** flex, justify-content: center, gap: 32px
- **Alle 3 Cards** gleichzeitig sichtbar, gleichgroß
- **Kein Carousel auf Desktop** — alle nebeneinander

### Card-Proportionen
- **Breite:** ~320px (Desktop) / ~280px (Tablet 768-1023px)
- **Aspekt-Ratio:** 3:4 (hochkant)
- **Höhe:** ~427px (Desktop) / ~373px (Tablet)

---

## 4. SkillCard Komponente

### Äußere Card
- **Background:** `var(--surface)` (#FFFDF9 light / #252220 dark)
- **Border-radius:** 16px
- **Box-shadow:** `0 4px 24px rgba(0,0,0,0.06)` (Light) / `rgba(0,0,0,0.25)` (Dark)
- **Border:** 2px solid transparent (wird beim Hover durch Glow ersetzt)
- **Overflow:** hidden
- **Transition:** transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease
- **Position:** relative (für Shine-Overlay)

### Card Innenlayout
```
┌─────────────────────┐
│                     │
│   3D Scene (R3F)    │  ← 70% der Card-Höhe
│                     │
│   sanftes Ausblenden│  ← untere ~40px: gradient fade
│                     │
├─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│  Kategorie-Titel    │  ← DM Sans 700, 20px
│  [Tag] [Tag] [Tag]  │  ← Skill Pills, dynamisch wrappend
└─────────────────────┘
```

### Scene → Text Übergang
- **Kein harter Trenner**
- Untere ~50px der Scene: `background: linear-gradient(to bottom, transparent, var(--surface))`
- Scene fließt organisch in den Card-Hintergrund aus

### Text-Bereich
- **Padding:** 0 20px 20px 20px
- **Kategorie-Titel:** DM Sans, 700 weight, 18px, `var(--text)`
- **Margin-bottom:** 10px
- **Tags:** flex-wrap, gap: 8px

---

## 5. Skill-Tags (SkillTag)

- **Background:** `var(--muted)` (#E8DDD0 light / #3A3533 dark)
- **Color:** `var(--text-secondary)`
- **Font:** DM Sans, 500 weight, 12px
- **Padding:** 4px 10px
- **Border-radius:** 20px (Pill)
- **Dynamisch:** alle Skills der Kategorie, wrappen automatisch
- **Keine feste Anzahl** — passt sich dem Inhalt an

### Skills pro Kategorie
- **Frontend:** React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS
- **Backend:** C#, .NET, .NET Core, REST APIs
- **DevOps:** Docker, Kubernetes, CI/CD, GitHub Actions, GitOps

---

## 6. 3D-Scenes (CardScene / R3F)

### Technischer Aufbau
- **Library:** `@react-three/fiber`, `@react-three/drei`
- **Pro Card:** eine isolierte R3F `<Canvas>`-Instanz
- **Canvas-Größe:** 100% Breite × 70% Card-Höhe
- **Background:** transparent (Card-Surface durchscheinen lassen)
- **Camera:** perspective, fov: 40, position: [0, 0, 4]

### ⚠️ Placeholder-Strategie (aktuell)
Echte 3D-Modelle kommen in einem späteren Schritt. Für jetzt:
- Jede Scene zeigt das offizielle Logo als **PNG-Textur auf einer R3F `<mesh>` Plane**
- Plane schwimmt leicht hoch und runter (idle bob) + dreht sich langsam um Y-Achse
- Einfach austauschbar gegen echte GLTF-Modelle später

### Szene 1 — Frontend (React)
- **Placeholder:** React-Logo PNG, blau (#61DAFB), auf Plane
- **Idle:** langsame Y-Rotation (0.003 rad/frame) + leichtes Bob (sin wave, amplitude 0.05)
- **Hover:** Rotation beschleunigt (+0.015 rad/frame), Electrons-Effekt (3 orbitierende Ringe via `<torus>`)
- **Farbe der Hover-Elemente:** Blau #61DAFB

### Szene 2 — Backend (C# / .NET)
- **Placeholder:** C#-Logo PNG (lila #9B4993) + kleines .NET-Logo daneben, auf Plane
- **Idle:** sanfte Y-Rotation + Bob, beide Logos leicht versetzt rotieren
- **Hover:** Logos kreisen umeinander (orbital movement)
- **Modell-Zielrichtung:** Crystal & Orb oder Orbital (Entscheidung steht noch aus)

### Szene 3 — DevOps (Docker + Kubernetes)
- **Placeholder:** Docker-Logo (blau #2496ED) + K8s-Logo (blau #326CE5) auf je einer Plane, nebeneinander
- **Idle:** Docker-Plane bobbt, K8s-Plane rotiert langsam
- **Hover:** Docker-Plane bewegt sich nach oben, K8s dreht schneller (wie schwebende Pods)
- **Modell-Zielrichtung:** Whale + Pods oder Helm Wheel (Entscheidung steht noch aus)

### Licht-Setup (alle Scenes)
- **Ambient Light:** intensity 0.6
- **Directional Light:** position [2, 3, 2], intensity 0.8, `var(--text)` tint
- **Point Light (Hover):** position [0, 0, 2], color = Kategorie-Glow-Farbe, intensity 0 → 1.2 bei Hover-In

---

## 7. Hover-Verhalten

### Trigger
- `onPointerEnter` / `onPointerLeave` auf der Card
- `onPointerMove` für Mouse-Tracking (x/y Position relativ zur Card)

### 7a. Card Scale + Tilt (CSS Transform)
```css
/* Hover: */
transform: scale(1.05) perspective(800px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
```
- Tilt-Intensität: max ±8° auf beiden Achsen
- Berechnung: `(mouseY / cardHeight - 0.5) * -8` für rotateX, `(mouseX / cardWidth - 0.5) * 8` für rotateY
- CSS Custom Properties per `element.style.setProperty()` aus `useCardHover` Hook

### 7b. Cursor-Parallax auf 3D-Scene
- Mouse-Position wird via Ref an die R3F Scene weitergegeben
- `useFrame`: Scene-Gruppe verschiebt sich minimal zur Maus (max ±0.2 units)
- Formel: `group.position.x = lerp(group.position.x, (mouseX - 0.5) * 0.4, 0.08)`
- Wirkt als wäre das 3D-Objekt ein echtes Objekt das man betrachtet

### 7c. Gradient Border Glow
- **Implementierung:** `box-shadow` inset + outline, nicht border (um Layout-Shift zu vermeiden)
- **Frontend:** `box-shadow: 0 0 0 2px #B8A9D4, 0 8px 32px rgba(184,169,212,0.3)`
- **Backend:** `box-shadow: 0 0 0 2px #D4929B, 0 8px 32px rgba(212,146,155,0.3)`
- **DevOps:** `box-shadow: 0 0 0 2px #E8B4A0, 0 8px 32px rgba(232,180,160,0.3)`
- **Dark Mode:** Glow-Intensität erhöht (+50% opacity auf dem outer shadow)
- **Transition:** `box-shadow 0.25s ease`

### 7d. Text Scramble (Kategorie-Titel)
- Auf `pointerenter`: Titel-Text scrambled durch zufällige Zeichen (ASCII 33-126)
- Duration: ~400ms, dann settle auf echten Text
- Implementierung: custom `useTextScramble` Hook (requestAnimationFrame-basiert)
- Framerate: ~30fps für den Scramble-Effekt
- Nur Hover-In, nicht Hover-Out

### 7e. Shine Sweep
- **Element:** `::after` Pseudo-Element auf der Card
- **Gradient:** `linear-gradient(var(--shine-angle), transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`
- **--shine-angle:** wird aus aktuellem Tilt berechnet (synced zur Rotation der Card)
  - `--shine-angle = 90deg + tiltY * 4deg` (bewegt sich mit der Kippung)
- **Transition:** sanft, 0.15s ease
- **Pointer-events:** none

### Nicht-gehovered Cards
- **Keine Extra-Effekte** — normaler Render-Zustand
- Kein Dim, kein Scale-down

---

## 8. Entry-Animation — Fan-out

### Ablauf (Scroll-triggered via IntersectionObserver)
1. Initial-State: alle 3 Cards an der gleichen Position (übereinandergestapelt), `opacity: 0`
2. Wenn Section 30% sichtbar: Animation startet
3. Cards "fächern" sich nach außen — spring physics
4. Timing: alle starten gleichzeitig, leichter Stagger (50ms zwischen den Cards)

### Implementierung (Framer Motion)
```tsx
// Initiale Position (gestapelt, Mitte):
initial={{ x: 0, opacity: 0, scale: 0.9 }}

// Ziel-Position (auseinander):
// Linke Card:
animate={{ x: 0, opacity: 1, scale: 1 }}  // bereits in der richtigen Grid-Position
// mit spring: { type: 'spring', stiffness: 120, damping: 20, delay: 0 }

// Center Card:
animate={{ x: 0, opacity: 1, scale: 1 }}
// spring: { stiffness: 120, damping: 20, delay: 0.05 }

// Rechte Card:
animate={{ x: 0, opacity: 1, scale: 1 }}
// spring: { stiffness: 120, damping: 20, delay: 0.1 }
```

> Hinweis: "Fan-out" = Cards starten alle an X:0 (Mitte), Framer Motion animiert sie in ihre
> Grid-Positionen. Da Grid die endgültige Position bestimmt, entsteht organisch der Fächer-Effekt.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Kein Fan-out — direkt einblenden */
}
```

---

## 9. Mobile Carousel

### Layout (< 1024px)
- **Display:** overflow-x: scroll, scroll-snap-type: x mandatory
- Jede Card: scroll-snap-align: center
- **Card-Breite:** 80vw (max 280px)
- **Peek:** nächste/vorherige Card jeweils ~10% sichtbar
- **Gap:** 16px zwischen Cards
- **Padding-x:** 10vw (damit erste und letzte Card zentriert sind)

### Swipe
- Native Touch-Scroll mit CSS Scroll-Snap
- Momentum-Scrolling: `-webkit-overflow-scrolling: touch`

### Brush-Tupfen Dots
- **Position:** unterhalb des Carousels, zentriert, margin-top: 24px
- **Form:** SVG Circles mit leicht unregelmäßigen Radien (5-7px) — simuliert Pinsel-Tupfen
- **Farbe aktiv:** `var(--accent)` (#D4929B) mit leichtem Splatter-Effekt (2-3 winzige Satellite-Dots)
- **Farbe inaktiv:** `var(--muted)` (#E8DDD0)
- **Transition:** `fill 0.3s ease`, aktiver Dot wächst leicht (scale 1.3)
- **Implementierung:** SVG mit 3 `<circle>`-Elementen, aktiver bekommt kleine Satellite-Kreise

### Auto-play
- **Interval:** 4000ms (langsam)
- **Pausiert bei:** touch start / pointer down
- **Restart nach:** 120000ms (2 Minuten) Inaktivität seit letztem Touch
- **State-Tracking:** `useRef` für lastInteractionTime, `setInterval` für Auto-play
- **Indikator:** kein visueller Fortschrittsbalken — Dots reichen

---

## 10. Annotationen

Pacifico-Annotationen mit SVG-Pfeil (gleicher Stil wie About-Section), wo es visuell Sinn ergibt.
Werden iterativ hinzugefügt und per Screenshot bewertet. Vorschläge:

- **„hover me!"** → Pfeil auf eine der Cards (Desktop, nur erste Landung)
- **„it's 3D!"** → Pfeil auf die R3F-Scene einer Card
- **„interactive!"** → wie im Original-Mock, Pfeil auf Carousel-Bereich

Position: absolut innerhalb der Section, nicht innerhalb einer Card (damit sie nicht abgeschnitten werden).
Nur Desktop — auf Mobile zu eng.

---

## 11. Dark Mode

- **Cards:** Surface `#252220`, Box-shadow stärker (`rgba(0,0,0,0.4)`)
- **Tags:** Background `#3A3533`, Text `#A89F95`
- **Kategorie-Titel:** `#F0EBE3`
- **Gradient Glow:** Opacity des outer glow ×1.5 (mehr Leuchten im Dunkeln)
- **Shine Sweep:** Opacity auf `rgba(255,255,255,0.08)` (dezenter im Dark Mode)
- **R3F Scenes:** Ambient Light leicht reduziert (0.5), Point Light intensiver (1.8 bei Hover)

---

## 12. Responsive Breakpoints

| Element | Desktop ≥1024px | Tablet 768-1023px | Mobile <768px |
|---|---|---|---|
| Layout | 3 Cards nebeneinander | 3 Cards (kleinere Gap) | Carousel |
| Card-Breite | ~320px | ~240px | 80vw |
| Card-Höhe | ~427px | ~320px | ~375px |
| Watermark | "SKILLS" 280px DM Sans | 200px | "skills" 120px Pacifico |
| Annotationen | 3 Stück | 1-2 | keine |
| Section Padding | 120px 40px | 80px 24px | 60px 20px |

---

## 13. Komponenten-Struktur (Composition Pattern)

```
src/components/Skills/
├── Skills.tsx                # Section-Wrapper <section id="skills">
├── SkillsWatermark.tsx       # "SKILLS" Hintergrund-Text
├── SkillCardGrid.tsx         # Desktop: flex grid, Mobile: carousel container
├── SkillCard.tsx             # Einzelne Card mit allen Hover-Effekten
├── CardScene.tsx             # R3F <Canvas> Wrapper, nimmt SceneComponent als Prop
├── scenes/
│   ├── FrontendScene.tsx     # React Atom (Placeholder: React Logo Plane)
│   ├── BackendScene.tsx      # C# / .NET (Placeholder: Logo Planes)
│   └── DevOpsScene.tsx       # Docker + K8s (Placeholder: Logo Planes)
├── SkillTag.tsx              # Einzelner Tag-Pill
├── CarouselDots.tsx          # Brush-Tupfen Dots (Mobile)
├── hooks/
│   ├── useCardHover.ts       # Mouse-Tracking, Tilt-Berechnung, Shine-Angle
│   └── useTextScramble.ts    # Text Scramble Effect
├── __tests__/
│   └── Skills.test.tsx
└── index.ts                  # Composition Pattern Exports
```

### Composition Pattern Usage
```tsx
<Skills>
  <Skills.Watermark />
  <Skills.CardGrid>
    <Skills.Card
      category="Frontend"
      skills={['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS']}
      glowColor="#B8A9D4"
    >
      <Skills.Scene component={FrontendScene} />
    </Skills.Card>
    <Skills.Card
      category="Backend"
      skills={['C#', '.NET', '.NET Core', 'REST APIs']}
      glowColor="#D4929B"
    >
      <Skills.Scene component={BackendScene} />
    </Skills.Card>
    <Skills.Card
      category="DevOps"
      skills={['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'GitOps']}
      glowColor="#E8B4A0"
    >
      <Skills.Scene component={DevOpsScene} />
    </Skills.Card>
  </Skills.CardGrid>
  <Skills.Annotation text="hover me!" direction="bottom-right" desktopOnly />
</Skills>
```

---

## 14. Abhängigkeiten (neu)

```json
{
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x",
  "three": "^0.x",
  "framer-motion": "^11.x"
}
```

> `framer-motion` ggf. schon im Projekt — prüfen ob bereits vorhanden.

---

## 15. Offene Entscheidungen

- [ ] Backend 3D-Scene Zielrichtung: Orbital / Crystal & Orb / Rotating Cube
- [ ] DevOps 3D-Scene Zielrichtung: Whale + Pods / Helm Wheel / Pipeline
- [ ] Brush-Divider nach der Skills-Section (wie nach About)? → noch nicht besprochen
- [ ] Annotiations-Positionen — iterativ nach Screenshots festlegen

---

## Status

- [x] Konzept gewählt (The Lab, 2026-02-25)
- [x] Spec geschrieben
- [ ] Feature Branch erstellen
- [ ] Abhängigkeiten installieren
- [ ] TDD: Tests schreiben
- [ ] Implementierung
