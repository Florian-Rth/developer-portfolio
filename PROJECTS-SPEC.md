# Phase 8: Projects Section — Detaillierte Spec

## Status: SPEC FERTIG — Stand 2026-03-10

---

## Übersicht

Bento Grid mit 5 Projekten. Jede Card hat animierte Mesh-Gradient-Artwork, 3D-Tilt + Gradient-Border on Hover, FLIP-Expand für Detail-View. PROJECTS Watermark im Hintergrund.

**Referenz-Mock:** `2026-03-10-projects-concept-b-enhanced.png`

---

## 1. Section Container

```
<section id="projects">
  <Projects.Watermark />
  <Projects.Annotation />
  <Projects.Grid>
    {projects.map(p => <Projects.Card key={p.id} project={p} />)}
  </Projects.Grid>
</section>
```

- **Background:** `var(--background)` (#F5F0E8 / #1A1816)
- **Padding:** 120px vertical, 40px horizontal (Desktop) / 60px 20px (Mobile)
- **Max-width:** 1200px, zentriert
- **Position:** relative (für Watermark + Annotation)
- **Overflow:** hidden (Watermark)

---

## 2. PROJECTS Watermark

Identisches Pattern wie About/Skills:

- **Text:** "PROJECTS"
- **Font:** DM Sans, 800 weight
- **Size:** ~220px (Desktop) / ~80px (Mobile)
- **Color:** `var(--text)`, opacity 0.022 (light) / 0.018 (dark)
- **Position:** absolute, top: 40px, left: 50%, translateX(-50%)
- **User-select:** none, pointer-events: none, aria-hidden

---

## 3. Pacifico Annotation

- **Text:** "things I built ✦"
- **Font:** Pacifico, 16px
- **Color:** `var(--accent)` (#D4929B)
- **Position:** absolute, top-right Bereich der Section
- **Rotation:** -5deg
- **SVG-Pfeil:** curved arrow zeigt zur Grid
- **Scroll Reveal:** fade-in + translateY(-10px → 0), 400ms, nach Cards

---

## 4. Bento Grid Layout

### Desktop (≥1024px)
```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   Machine-Eye       │   CR3-Scheduler     │  ← Row 1: 2 cards, je 50%
│   (wide)            │   (wide)            │
│                     │                     │
├──────────┬──────────┬──────────────────────┤
│          │          │                      │
│  Yard    │  CI/CD   │  Developer           │  ← Row 2: 3 cards, je 33%
│ Logistic │ Platform │  Portfolio           │
│          │          │                      │
└──────────┴──────────┴──────────────────────┘
```

- **Gap:** 16px
- **Row 1 cards:** height 320px
- **Row 2 cards:** height 280px
- **Border-radius:** 16px

### Tablet (768–1023px)
- 2-Spalten Grid
- Row 1: 2 Cards
- Row 2+3: je 2 + 1 (centered)

### Mobile (<768px)
- Single Column Stack
- Alle Cards gleiche Höhe: 300px
- Gap: 12px

---

## 5. Card Anatomie

```
┌──────────────────────────────────┐
│                                  │
│   MESH GRADIENT ARTWORK (45%)    │  ← animiert, grain overlay
│                                  │
├──────────────────────────────────┤
│  [Category Badge]                │
│                                  │
│  Project Title                   │  ← DM Sans 700, 22px
│  One-line description here.      │  ← DM Sans 400, 14px, secondary
│                                  │
│  [React] [.NET] [C#] [+2]        │  ← Tech Pills
│                                  │
└──────────────────────────────────┘
```

### Card Container
- **Background:** `var(--surface)` (#FFFDF9 / #252220)
- **Border:** 1px solid `var(--muted)` (default) → gradient border on hover
- **Border-radius:** 16px
- **Cursor:** pointer
- **Overflow:** hidden (für Artwork)
- **Transition:** box-shadow 300ms ease, transform 300ms ease

### Category Badge
- **Position:** absolute, top-left über dem Artwork
- **Padding:** 4px 10px
- **Border-radius:** 20px
- **Background:** `var(--background)` mit 80% opacity (backdrop-blur)
- **Font:** DM Sans 500, 11px, uppercase, letter-spacing 1.5px
- **Farben je Kategorie:**
  - Industrial IoT → Lavender #B8A9D4
  - Scheduling → Peach #E8B4A0
  - Logistics → Dusty Rose #D4929B
  - DevOps → Muted Sage #A8C4B8
  - Portfolio → Gradient (alle drei)

### Tech Pills
- **Background:** `var(--muted)` (#E8DDD0 / #3A3533)
- **Font:** DM Sans 500, 11px
- **Padding:** 3px 10px
- **Border-radius:** 20px
- **Max anzeigen:** 3 + "+N" overflow badge

---

## 6. Mesh Gradient Artwork (pro Card)

Jede Card hat eine einzigartige, langsam animierte Mesh-Gradient-Artwork.

### Implementierung
```tsx
// MeshGradient.tsx — reusable, konfigurierbar
const MeshGradient: FC<{ colors: string[]; seed: number }> = ...
```

- **Technik:** CSS `@keyframes` + mehrere überlagerte radiale Gradienten mit `mix-blend-mode: multiply`
- **Animation:** 8–12s loop, `ease-in-out`, jede Card mit anderem `animation-delay` (per seed)
- **Noise Overlay:** SVG `<feTurbulence>` + `<feColorMatrix>` als pseudo-element drüber (opacity 0.08–0.12)
- **Dark Mode:** Gradienten dunkler, opacity erhöht

### Farben pro Projekt

| Projekt | Primär | Sekundär | Akzent |
|---|---|---|---|
| Machine-Eye | Lavender #B8A9D4 | Peach #E8B4A0 | #8C9FE0 |
| CR3-Scheduler | Peach #E8B4A0 | Dusty Rose #D4929B | #F0C8A0 |
| Yard Logistics | Dusty Rose #D4929B | Lavender #B8A9D4 | #E8A0B0 |
| CI/CD Platform | Sage #A8C4B8 | Peach #E8B4A0 | #90C4A8 |
| Developer Portfolio | Alle drei | — | Rainbow subtle |

---

## 7. Hover-Effekte

### 7a — 3D Tilt (Mouse Tracking)

```tsx
const handleMouseMove = (e: MouseEvent) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width   // 0–1
  const y = (e.clientY - rect.top) / rect.height    // 0–1
  const rotateX = (y - 0.5) * -12  // max ±6deg
  const rotateY = (x - 0.5) * 12   // max ±6deg
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
}
const handleMouseLeave = () => {
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
}
```

- **Transition:** `transform 150ms ease` (schnell reagieren, langsam zurück: `transform 400ms ease` on leave)
- **Mobile:** Tilt deaktiviert (kein Hover)

### 7b — Gradient Border

```css
.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: linear-gradient(135deg, #B8A9D4, #E8B4A0, #D4929B);
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: -1;
}
.card:hover::before {
  opacity: 1;
}
/* Inner card covers the gradient except the 1px border */
.card-inner {
  position: relative;
  border-radius: 16px;
  background: var(--surface);
}
```

### 7c — Artwork Parallax

- **On hover:** Mesh-Gradient-Artwork verschiebt sich leicht entgegen der Tilt-Richtung
- `background-position` oder `transform: translate(Xpx, Ypx)` auf dem Artwork-Container
- Max ±8px Versatz

### Section-weiter Spotlight

```tsx
// Radial gradient folgt dem Cursor über die gesamte Grid-Section
const sectionStyle = {
  background: `radial-gradient(600px at ${mouseX}px ${mouseY}px,
    rgba(184,169,212,0.07), transparent 80%)`
}
```

---

## 8. Detail-View (FLIP Expand)

### Konzept
Karte expandiert in-place per Framer Motion `layoutId` auf Fullscreen. Kein Drawer, kein klassisches Modal — die Karte selbst wächst.

### Implementierung

```tsx
// AnimatePresence + layoutId Pattern
<AnimatePresence>
  {selected === project.id ? (
    <motion.div
      layoutId={`card-${project.id}`}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <ProjectDetail project={project} onClose={() => setSelected(null)} />
    </motion.div>
  ) : (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => setSelected(project.id)}
    >
      <ProjectCard project={project} />
    </motion.div>
  )}
</AnimatePresence>
```

- **Duration:** ~400ms, `spring({ damping: 30, stiffness: 300 })`
- **Background Dim:** `AnimatePresence` fade-in `rgba(0,0,0,0.4)` backdrop
- **Body Scroll:** blockieren während offen (`overflow: hidden` auf body)
- **Close:** X-Button oben rechts + ESC-Key + Click auf Backdrop

### Detail-View Inhalt

```
┌─────────────────────────────────────────────────┐
│  [X]                               [Category]   │
│                                                  │
│  ████ MESH GRADIENT ARTWORK (300px) ████        │
│                                                  │
│  Machine-Eye                                     │  ← DM Sans 700, 36px
│  Industrial IoT Monitoring Platform              │  ← DM Sans 400, 18px, secondary
│                                                  │
│  ─────────────────────────────────────────────  │
│                                                  │
│  Was ist es?                                     │  ← DM Sans 600, 14px uppercase
│  Verbindet Maschinenequipment (OPC-UA, Siemens   │  ← DM Sans 400, 15px, max-w 600px
│  S7, Modbus, MQTT) mit einer Web-Oberfläche.    │
│  Echtzeit-Datenerfassung, Regelwerk,            │
│  Benachrichtigungen — konfigurierbar ohne Code. │
│                                                  │
│  Was ich gebaut habe                             │
│  • Protocol-agnostic Plugin-System               │
│  • Dual-DB Strategie (PostgreSQL + TimescaleDB)  │
│  • Real-time via SignalR + RabbitMQ Inbox/Outbox │
│  • Clean Architecture + Result<T> Error Handling │
│  • React Compiler (auto-memoization)             │
│                                                  │
│  Tech Stack                                      │
│  [.NET 10] [React 19] [RabbitMQ] [PostgreSQL]   │
│  [TimescaleDB] [SignalR] [OPC-UA] [Docker]       │
│                                                  │
│  ─────────────────────────────────────────────  │
│  🔒 Vertraulich · Details gerne im Gespräch     │  ← subtle, klein
└─────────────────────────────────────────────────┘
```

- **Max-width:** 760px, zentriert
- **Scroll:** intern scrollbar wenn Inhalt zu lang
- **Artwork:** selbe MeshGradient Komponente, aber größer (300px height)
- **Backdrop:** onClick → close

---

## 9. Scroll-Animationen

- **Cards:** Stagger fade-in + `translateY(24px → 0)` beim Scroll-in-View
  - Row 1 Card 1: delay 0ms
  - Row 1 Card 2: delay 100ms
  - Row 2 Card 1: delay 200ms
  - Row 2 Card 2: delay 300ms
  - Row 2 Card 3: delay 400ms
- **IntersectionObserver:** threshold 0.15, once: true
- **Duration:** 600ms, ease-out
- **Annotation:** delay 600ms nach den Cards

---

## 10. Projektdaten (`src/data/projects.ts`)

```typescript
export interface Project {
  id: string
  title: string
  tagline: string        // 1 Satz
  description: string    // 2-3 Sätze für Detail-View
  category: string
  highlights: string[]   // Was ich gebaut habe (Bullet Points)
  tech: string[]         // Alle Tech Stack Items
  techPills: string[]    // Max 5 für Card-Anzeige
  gradient: GradientConfig
  isPublic?: boolean
  githubUrl?: string
  liveUrl?: string
}
```

### Projekte (5 Einträge)

**1. Machine-Eye**
- category: "Industrial IoT"
- tagline: "Echtzeit-Monitoring-Plattform für industrielle Maschinenanbindung"
- tech: .NET 10, React 19, RabbitMQ, PostgreSQL, TimescaleDB, SignalR, OPC-UA, Siemens S7, Modbus, MQTT, Docker
- techPills: [".NET 10", "React 19", "RabbitMQ", "TimescaleDB", "+3"]
- highlights: 5 Punkte (s. Spec Abschnitt 8)

**2. CR3-Scheduler**
- category: "Scheduling"
- tagline: "Graph-basiertes Scheduling-System für Logistik & Produktion"
- tech: .NET 9, React 19, TanStack Query, dnd-kit, xyflow, SQL Server
- techPills: [".NET 9", "React 19", "Graph-Algo", "DnD", "SQL Server"]
- highlights: Eigener Graph-Algorithmus, Pipeline Pattern, Drag-and-Drop, Multi-Faktor Optimierung, Graph-Visualisierung

**3. Yard Logistics**
- category: "Logistics"
- tagline: "Komplettes Yard-Management-System für LKW-Tracking & Ladeabläufe"
- tech: .NET 9, React 19, NX Monorepo (3 Apps), JWT, ffmpeg, OvenPlayer, SQLite
- techPills: [".NET 9", "NX Monorepo", "React 19", "Live Camera", "+2"]
- highlights: 3 unabhängige Apps, SVG Werkshallenplan, Live Camera Feed, DCS-Simulation, Multi-Auth

**4. CI/CD Automation**
- category: "DevOps"
- tagline: "GitHub Actions Suite für vollständige Delivery-Automatisierung"
- tech: Node.js 20, GitHub Actions, Docker Hub API, Kubernetes, Copier, Jinja2, Jest
- techPills: ["GitHub Actions", "Kubernetes", "Docker", "Node.js", "Copier"]
- highlights: 5 fokussierte Actions, Multi-Format Version Extraction, Semantic Versioning, K8s Manifest Patching, Copier Scaffolding

**5. Developer Portfolio**
- category: "Portfolio"
- tagline: "Dieses Portfolio — React SPA mit TCG-Skill-Section & Pack-Opening-Mechanik"
- tech: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Biome
- techPills: ["React 19", "TypeScript", "Framer Motion", "Tailwind", "Vite"]
- isPublic: true
- githubUrl: "https://github.com/Florian-Rth/developer-portfolio"
- liveUrl: (das Portfolio selbst)
- highlights: TCG Card System mit Pack-Opening-Animation, Foil/Holo-Effekte, Framer Motion FLIP, Dark/Light Mode, Mobile-first

---

## 11. Komponenten-Struktur

```
src/
├── data/
│   └── projects.ts                    # Projektdaten + Interface
│
└── components/
    └── Projects/
        ├── Projects.tsx               # Section Container
        ├── Watermark.tsx              # "PROJECTS" Hintergrundtext
        ├── ProjectsGrid.tsx           # Bento Grid Layout
        ├── ProjectCard.tsx            # Einzelne Card (Idle)
        ├── ProjectDetail.tsx          # Expanded Detail-View
        ├── MeshGradient.tsx           # Animierter Gradient (reusable)
        ├── CategoryBadge.tsx          # Badge oben-links
        ├── TechPills.tsx              # Tech Stack Pills
        ├── useCardTilt.ts             # Hook: Mouse-Tracking für 3D Tilt
        ├── useSectionSpotlight.ts     # Hook: Cursor-Spotlight über Grid
        ├── useProjectExpand.ts        # Hook: FLIP Expand State
        ├── __tests__/
        │   └── Projects.test.tsx
        └── index.ts                   # Composition Pattern Exports
```

### Composition Usage
```tsx
<Projects>
  <Projects.Watermark />
  <Projects.Annotation text="things I built ✦" />
  <Projects.Grid projects={projects} />
</Projects>
```

---

## 12. Responsive Breakpoints

| Element | Desktop (≥1024px) | Mobile (<768px) |
|---|---|---|
| Grid | 2+3 Bento | Single Column |
| Card Height (Row 1) | 320px | 300px |
| Card Height (Row 2) | 280px | 300px |
| Artwork Height | 45% der Card | 45% |
| 3D Tilt | ✅ | ❌ (deaktiviert) |
| Gradient Border | ✅ | ✅ (touch: active state) |
| Section Spotlight | ✅ | ❌ |
| Tech Pills Max | 3 + "+N" | 3 + "+N" |
| Detail-View | FLIP Fullscreen | FLIP Fullscreen (volle Breite) |

---

## 13. Dark Mode

- **Mesh Gradient:** Gradienten 30% dunkler, opacity +0.05
- **Noise Overlay:** opacity +0.04
- **Gradient Border:** `opacity: 0.85` statt 1.0 (etwas dezenter)
- **Detail Backdrop:** `rgba(0,0,0,0.6)` statt 0.4
- **Category Badge Background:** `var(--surface)` mit 90% opacity

---

## 14. Accessibility

- `<article>` Element für jede Card
- `aria-label={project.title}`
- `role="button"` + `tabIndex={0}` + `onKeyDown` (Enter/Space → expand)
- Detail-View: `role="dialog"`, `aria-modal="true"`, Focus Trap
- ESC schließt Detail-View
- `prefers-reduced-motion`: Tilt, Spotlight und Gradient-Animation deaktiviert; FLIP auf 150ms reduziert

---

## 15. Entscheidungen (final)

- [x] **Section-Überschrift:** Watermark "PROJECTS" + kleines "Projects." Label oben links (wie Skills Section)
- [x] **Portfolio-Card:** Nur GitHub-Link im Detail-View (Live = diese Seite selbst 😄)
- [x] **Annotationen:** Überall wo es Sinn macht und gut aussieht — dekorativ, Pacifico + SVG-Pfeil. Kandidaten:
  - "things I built ✦" → zeigt auf die Grid
  - "click to explore →" → zeigt auf eine Card (z.B. Machine-Eye)
  - "open source! 🎉" → zeigt auf die Portfolio-Card
  - Weitere spontan beim Implementieren entscheiden
