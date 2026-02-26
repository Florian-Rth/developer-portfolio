# Phase 6 (Redesign): Skills Section — TCG Card System

Entschieden: 2026-02-26
Ersetzt: SKILLS-SPEC.md (The Lab Carousel — verworfen)

## Konzept
Trading Card Game Style Skills-Showcase.
1. Section zeigt einen **Karten-Stapel** in der Mitte
2. **Klick auf Stapel** → Karten breiten sich frei verstreut aus
3. **Hover** → Karte wird hervorgehoben (scale, glow, tilt)
4. **Klick auf Karte** → Detail-Drawer öffnet sich

## Zwei Versionen (beide werden gebaut, Florian entscheidet)

### Version A — 2D (Framer Motion)
- Karten als HTML/CSS Divs
- Framer Motion für Scatter-Animation + Drag & Drop
- Realistisch, bewährt, smooth

### Version B — 3D (React Three Fiber + Rapier Physics)
- Karten als 3D-Meshes in einer R3F Canvas
- Echte Physik via `@react-three/rapier`: Karten fallen, prallen, haben Gewicht
- Interaktiv: Karten aufheben und verschieben
- Detail-Drawer als DOM-Overlay über Canvas

---

## Karten-Design

### Anatomie (3:4.2 Aspekt-Ratio, ca. Pokémon-Karten-Größe)

```
┌─────────────────────────────┐
│ [Category Badge]  [Rarity]  │  ← Header (16px padding)
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │   ARTWORK AREA      │    │  ← 45% der Kartenhöhe
│  │  (R3F/SVG/Code)     │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  SKILL NAME                 │  ← DM Sans 700, 20px
│  ─────────────────────────  │
│  Power       ████████░░ 8   │
│  Speed       █████████░ 9   │  ← Stats Bars
│  Versatility █████████░ 9   │
│  Impact      ██████████ 10  │
│  ─────────────────────────  │
│  "Flavour text hier..."     │  ← Pacifico italic, 12px
└─────────────────────────────┘
```

### Seltenheit → Visuelle Hierarchie
- **Legendary** → Goldener Rand + Holo-Shimmer + gelber Glow
- **Epic** → Lavender-Rand + lila Glow
- **Rare** → Dusty Rose-Rand + rose Glow
- **Uncommon** → Peach-Rand
- **Common** → Sage-Rand

### Card Material / Stil
- Background: Warm white (`var(--surface)`)
- Leichter Holographic-Shimmer auf dem gesamten Hintergrund (CSS `background` gradient, rotiert auf Mausbewegung)
- Artwork-Bereich: abgerundetes Rechteck, leicht getönter BG passend zur Kategorie-Farbe
- Alle Texte: DM Sans (Stats, Name) / Pacifico (Flavour Text, Rarity Label)

### Artwork pro Skill
- **React** → R3F Mini-Canvas: Atom mit Ringen (blau, wie React-Logo)
- **TypeScript** → Code-Block: `const x: number = 42` mit Syntax-Highlighting
- **JavaScript** → Animiertes `console.log('Hello!')` — Text tippt sich ein
- **C#** → R3F Mini-Canvas: Rotierendes Oktaeder/Kristall (Dusty Rose)
- **Tailwind CSS** → Farbige Utility-Class Chips nebeneinander
- **HTML/CSS** → SVG DOM-Tree Visualisierung
- **.NET Core** → SVG Orbital-Ringe
- **REST APIs** → Animierter Request/Response Pfeil
- **Docker** → R3F Mini-Canvas: Würfel/Container
- **Kubernetes** → SVG Hexagon-Netzwerk
- **CI/CD** → SVG Pipeline-Flow mit Checkmarks
- **GitHub Actions** → SVG Workflow-Diagramm
- **GitOps** → SVG Git-Branch-Diagramm
- **Git** → SVG Branch-Visualisierung
- **Vite** → SVG Blitz-Symbol animiert

---

## Section Container

- Background: `var(--background)`
- Min-height: 100vh (genug Platz für ausgebreitete Karten)
- Position: relative
- Overflow: hidden
- Watermark: "SKILLS" (SectionWatermark — gleich wie About)
- Padding-top: pt-36 / md:pt-52 / lg:pt-60 (konsistent)

---

## Stapel-Ansicht (Initial State)

- 5-7 Karten leicht versetzt übereinander gestapelt
- Leichte Rotation jeder Karte (-3° bis +3°) für natürlichen Look
- Sichtbar: oberste Karte (zufällige) + Kanten der darunter liegenden
- "Click to explore" Annotation (Pacifico, mit Pfeil)
- Hover auf Stapel: leichte Lift-Animation, Cursor ändert sich

---

## Scatter-Animation (Nach Klick auf Stapel)

### Version A (2D)
- Framer Motion `AnimatePresence` + `motion.div` für jede Karte
- Jede Karte: random finale Position (x: -40% bis +40%, y: -30% bis +30%)
- Random Rotation: -15° bis +15°
- Staggered: 30ms Delay zwischen Karten
- Spring physics: `stiffness: 200, damping: 25`
- Karten können danach gedraggt werden (Framer `drag`)

### Version B (3D)
- Karten als R3F RigidBody (Rapier)
- Initialer Impuls: random Kraft in x/y, leichte z-Rotation
- Karten fallen aus der Mitte und verteilen sich physikalisch
- Liegen dann auf einer "Tisch"-Ebene
- Drag: Karte aufheben (pointer down → kein Gravity, folgt Maus), ablegen (pointer up → Gravity an)

---

## Hover-State

- Scale: 1.08
- Z-Index: nach oben
- Box-Shadow: stärker, Rarity-Color
- 3D-Tilt zur Maus (Perspective Transform)
- Holo-Shimmer bewegt sich mit Mausposition

---

## Detail-Drawer

- Öffnet sich von rechts (Desktop) oder von unten (Mobile)
- Breite: 380px (Desktop)
- Inhalt:
  - Skill-Name + Rarity-Badge groß
  - Artwork (größere Version)
  - Stats als animierte Bars (fill animation on open)
  - **Gelernt:** kurzer Text
  - **Eingesetzt in:** kurzer Text
  - Close-Button (×)
- Framer Motion slide-in: `x: 380 → 0` (Desktop) / `y: 100% → 0` (Mobile)

---

## Detail-Drawer Back-Side

Drawer zeigt quasi die "Rückseite" der Karte mit Langtext:
- Flavour Text groß und dekorativ (Pacifico)
- Seperator (Brush-Wave)
- Learned + UsedIn Abschnitte
- Schließen via × Button oder Klick außerhalb

---

## Data Layer

```
src/data/skills.ts   ← EINZIGE Datei die man anfassen muss um Skills zu ändern
```

Typen: `Skill`, `SkillRarity`, `SkillCategory`, `SkillStats`, `SkillDetail`

---

## Komponenten-Struktur

```
src/components/SkillCards/
├── SkillCardSection.tsx        # Section wrapper + Watermark
├── CardDeck.tsx                # Stapel-Ansicht
├── CardScatter.tsx             # Scatter-Container (Version A)
├── SkillCard.tsx               # Einzelne Karte (2D)
├── CardArtwork.tsx             # Artwork-Dispatcher (wählt je nach skill.artwork)
├── artworks/
│   ├── ReactArtwork.tsx        # R3F Atom
│   ├── TypeScriptArtwork.tsx   # Code-Block
│   ├── JavaScriptArtwork.tsx   # console.log Animation
│   ├── CSharpArtwork.tsx       # R3F Kristall
│   ├── TailwindArtwork.tsx     # Utility Chips
│   ├── HtmlCssArtwork.tsx      # SVG DOM-Tree
│   ├── DotNetArtwork.tsx       # SVG Orbital
│   ├── RestApiArtwork.tsx      # Animation Request/Response
│   ├── DockerArtwork.tsx       # R3F Würfel
│   ├── KubernetesArtwork.tsx   # SVG Hexagons
│   ├── CiCdArtwork.tsx         # SVG Pipeline
│   ├── GithubActionsArtwork.tsx# SVG Workflow
│   ├── GitArtwork.tsx          # SVG Branches
│   ├── GitOpsArtwork.tsx       # SVG
│   └── ViteArtwork.tsx         # SVG Blitz
├── StatBar.tsx                 # Einzelner Stat-Balken
├── RarityBadge.tsx             # Seltenheits-Badge
├── DetailDrawer.tsx            # Slide-in Drawer
├── r3f/
│   └── CardScatter3D.tsx       # Version B: R3F + Rapier (komplett separat)
├── __tests__/
│   └── SkillCards.test.tsx
└── index.ts
```

---

## Coding Rules (wie immer)
- Composition Pattern
- Nur `const`, keine `let`
- Named Exports
- Arrow Functions
- Biome
- TDD

---

## Status
- [x] Konzept final
- [x] `src/data/skills.ts` definiert (15 Skills)
- [x] Spec geschrieben
- [ ] Version A (2D) bauen
- [ ] Version B (3D+Physik) bauen
- [ ] Florian entscheidet
- [ ] Detail-Drawer für gewählte Version feinschleifen
- [ ] PR
