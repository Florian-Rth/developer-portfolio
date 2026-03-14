# Phase 8: Projects Section — Implementation Prompt

**Status:** SPEC FERTIG, IMPLEMENTIERUNG OFFEN (Stand 2026-03-14)

---

## Kontext

Dies ist Phase 8 des Developer Portfolio Projekts. Die vorherigen Phasen (1-7) sind bereits vollständig implementiert und gemerget:

- **Phase 1-4:** Grundlayout, About Section, Skills Section (TCG MVP fertig)
- **Phase 6:** Skills TCG System (15 Skills, Pack-Opening, Foil/Holo, Mobile Support)
- **Phase 7:** TCG MVP Features (Scissor-Tear, Card Reveal, Scattered State)

**Aktuelle Aufgabe:** Implementiere die Projects Section (Bento Grid mit 5 Projekten, Mesh Gradient Artworks, 3D Tilt, FLIP Expand Detail-View).

---

## Deine Aufgabe

Implementiere die Projects Section gemäß der folgenden detaillierten Spec. Achte auf:

1. **Code-Qualität:** Clean Architecture, Composition Pattern, Type-safe
2. **Consistency:** Nutze existierende UI Patterns aus Skills Section (Watermarks, Annotations, Theme-aware Styling)
3. **Performance:** Effiziente Animationen (CSS over JS wo möglich), Lazy Loading für Detail-View Content
4. **Responsive:** Mobile-first Approach, Breakpoints: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)
5. **Accessibility:** ARIA Labels, Keyboard Navigation, Screen Reader Support, `prefers-reduced-motion` Support

---

## Spezifikation

### 1. Section Container (`src/components/Projects/Projects.tsx`)

```tsx
<section id="projects" className="relative overflow-hidden py-[120px] px-10 max-w-[1200px] mx-auto bg-[var(--background)]">
  <Projects.Watermark />
  <Projects.Annotation />
  <Projects.Grid projects={projects} />
</section>
```

- Background: `var(--background)` (#F5F0E8 light, #1A1816 dark)
- Padding: Desktop 120px/40px, Mobile 60px/20px
- Max-width: 1200px, zentriert
- Overflow: hidden (für Watermark)

---

### 2. PROJECTS Watermark (`src/components/Projects/Watermark.tsx`)

Identisches Pattern wie About/Skills:

- Text: "PROJECTS"
- Font: DM Sans, weight 800
- Size: Desktop ~220px, Mobile ~80px
- Color: `var(--text)`, opacity 0.022 (light) / 0.018 (dark)
- Position: absolute, top: 40px, left: 50%, translateX(-50%)
- User-select: none, pointer-events: none, aria-hidden

---

### 3. Pacifico Annotation (`src/components/Projects/Annotation.tsx`)

- Text: "things I built ✦"
- Font: Pacifico, 16px
- Color: `var(--accent)` (#D4929B)
- Position: absolute, top-right der Section
- Rotation: -5deg
- SVG-Pfeil: curved arrow zeigt zur Grid
- Scroll Reveal: fade-in + translateY(-10px → 0), 400ms, nach Cards

---

### 4. Bento Grid Layout (`src/components/Projects/ProjectsGrid.tsx`)

**Desktop (≥1024px):**
```
Row 1: 2 Cards, je 50%, height 320px
Row 2: 3 Cards, je 33%, height 280px
Gap: 16px
Border-radius: 16px
```

**Tablet (768-1023px):**
- 2-Spalten Grid
- Row 1: 2 Cards
- Row 2+3: je 2 + 1 (centered)

**Mobile (<768px):**
- Single Column Stack
- Alle Cards height: 300px
- Gap: 12px

---

### 5. Project Card (`src/components/Projects/ProjectCard.tsx`)

**Structure:**
```
┌──────────────────────────────────┐
│   MESH GRADIENT ARTWORK (45%)    │  ← animiert, grain overlay
├──────────────────────────────────┤
│  [Category Badge]                │
│  Project Title                   │  ← DM Sans 700, 22px
│  One-line description            │  ← DM Sans 400, 14px, secondary
│  [React] [.NET] [C#] [+2]        │  ← Tech Pills (max 3)
└──────────────────────────────────┘
```

**Styles:**
- Background: `var(--surface)` (#FFFDF9 light, #252220 dark)
- Border: 1px solid `var(--muted)` → gradient border on hover
- Border-radius: 16px
- Cursor: pointer
- Overflow: hidden
- Transition: box-shadow 300ms ease, transform 300ms ease

**Category Badge (`CategoryBadge.tsx`):**
- Position: absolute, top-left über Artwork
- Padding: 4px 10px
- Border-radius: 20px
- Background: `var(--background)` mit 80% opacity (backdrop-blur)
- Font: DM Sans 500, 11px, uppercase, letter-spacing 1.5px
- Farben:
  - Industrial IoT → Lavender #B8A9D4
  - Scheduling → Peach #E8B4A0
  - Logistics → Dusty Rose #D4929B
  - DevOps → Muted Sage #A8C4B8
  - Portfolio → Gradient (alle drei)

**Tech Pills (`TechPills.tsx`):**
- Background: `var(--muted)` (#E8DDD0 light, #3A3533 dark)
- Font: DM Sans 500, 11px
- Padding: 3px 10px
- Border-radius: 20px
- Max 3 anzeigen + "+N" overflow badge

---

### 6. Mesh Gradient Artwork (`src/components/Projects/MeshGradient.tsx`)

**Reusable Component:**
```tsx
interface MeshGradientProps {
  colors: string[]       // 3 Farben pro Projekt
  seed: number           // für unique animation-delay
  className?: string
}
```

**Implementation Details:**
- Technik: CSS `@keyframes` + mehrere überlagerte radial Gradienten mit `mix-blend-mode: multiply`
- Animation: 8–12s loop, `ease-in-out`, unique `animation-delay` per seed
- Noise Overlay: SVG `<feTurbulence>` + `<feColorMatrix>` als pseudo-element (opacity 0.08–0.12)
- Dark Mode: Gradienten 30% dunkler, opacity +0.05

**Farben pro Projekt:**

| Projekt | Primär | Sekundär | Akzent |
|---|---|---|---|
| Machine-Eye | Lavender #B8A9D4 | Peach #E8B4A0 | #8C9FE0 |
| CR3-Scheduler | Peach #E8B4A0 | Dusty Rose #D4929B | #F0C8A0 |
| Yard Logistics | Dusty Rose #D4929B | Lavender #B8A9D4 | #E8A0B0 |
| CI/CD Platform | Sage #A8C4B8 | Peach #E8B4A0 | #90C4A8 |
| Developer Portfolio | Alle drei | — | Rainbow subtle |

---

### 7. Hover-Effekte

**7a — 3D Tilt (`useCardTilt.ts`):**

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

- Transition: `transform 150ms ease` (enter) / `transform 400ms ease` (leave)
- Mobile: Tilt deaktiviert (kein Hover)

**7b — Gradient Border:**

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
```

**7c — Artwork Parallax:**
- On hover: Mesh-Gradient verschiebt sich leicht gegen Tilt-Richtung
- Max ±8px Versatz

**7d — Section Spotlight (`useSectionSpotlight.ts`):**

```tsx
// Radial gradient folgt Cursor über gesamte Grid-Section
const sectionStyle = {
  background: `radial-gradient(600px at ${mouseX}px ${mouseY}px,
    rgba(184,169,212,0.07), transparent 80%)`
}
```

- Desktop: ✅ aktiv
- Mobile: ❌ deaktiviert

---

### 8. Detail-View FLIP Expand (`src/components/Projects/ProjectDetail.tsx`)

**Konzept:** Karte expandiert in-place per Framer Motion `layoutId` auf Fullscreen.

**Implementation:**

```tsx
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

- Duration: ~400ms, `spring({ damping: 30, stiffness: 300 })`
- Background Dim: AnimatePresence fade-in `rgba(0,0,0,0.4)` backdrop (light) / `rgba(0,0,0,0.6)` (dark)
- Body Scroll: blockieren während offen (`overflow: hidden` auf body)
- Close: X-Button oben rechts + ESC-Key + Click auf Backdrop

**Detail-View Structure:**

```
┌─────────────────────────────────────────────────┐
│  [X]                               [Category]   │
│                                                  │
│  ████ MESH GRADIENT ARTWORK (300px) ████        │
│                                                  │
│  Project Title (DM Sans 700, 36px)              │
│  Category Tagline (DM Sans 400, 18px)           │
│                                                  │
│  ─────────────────────────────────────────────  │
│                                                  │
│  Was ist es?                                     │  ← DM Sans 600, 14px uppercase
│  [description text]                             │  ← DM Sans 400, 15px, max-w 600px
│                                                  │
│  Was ich gebaut habe                             │
│  • [highlight 1]                                 │
│  • [highlight 2]                                 │
│  • [highlight 3]                                 │
│  • [highlight 4]                                 │
│  • [highlight 5]                                 │
│                                                  │
│  Tech Stack                                      │
│  [pill] [pill] [pill] [pill] [pill]             │
│                                                  │
│  ─────────────────────────────────────────────  │
│  🔒 Vertraulich · Details gerne im Gespräch     │  ← für private Projekte
└─────────────────────────────────────────────────┘
```

- Max-width: 760px, zentriert
- Scroll: intern scrollbar wenn Inhalt zu lang
- Artwork: selbe MeshGradient Komponente, aber 300px height
- Backdrop: onClick → close
- Public Projekte: GitHub + Live Links im Detail-View
- Private Projekte: Nur "Vertraulich" Hinweis

---

### 9. Scroll-Animationen

- **Cards:** Stagger fade-in + `translateY(24px → 0)` beim Scroll-in-View
  - Delays: 0ms, 100ms, 200ms, 300ms, 400ms
  - IntersectionObserver: threshold 0.15, once: true
  - Duration: 600ms, ease-out
- **Annotation:** delay 600ms nach den Cards

---

### 10. Projektdaten (`src/data/projects.ts`)

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
  gradient: {
    primary: string
    secondary: string
    accent: string
  }
  isPublic?: boolean
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  // 5 Projekte siehe unten
]
```

---

### 11. Die 5 Projekte

#### 1. Machine-Eye
```typescript
{
  id: "machine-eye",
  title: "Machine-Eye",
  tagline: "Echtzeit-Monitoring-Plattform für industrielle Maschinenanbindung",
  category: "Industrial IoT",
  description: "Verbindet Maschinenequipment (OPC-UA, Siemens S7, Modbus, MQTT) mit einer Web-Oberfläche. Echtzeit-Datenerfassung, Regelwerk, Benachrichtigungen — konfigurierbar ohne Code.",
  highlights: [
    "Protocol-agnostic Plugin-System (OPC-UA, S7, Modbus, MQTT)",
    "Dual-DB Strategie (PostgreSQL + TimescaleDB) für Zeitreihen",
    "Real-time Updates via SignalR + RabbitMQ Inbox/Outbox Pattern",
    "Clean Architecture + Result<T> Error Handling",
    "React Compiler (auto-memoization)"
  ],
  tech: [".NET 10", "React 19", "RabbitMQ", "PostgreSQL", "TimescaleDB", "SignalR", "OPC-UA", "Siemens S7", "Modbus", "MQTT", "Docker"],
  techPills: [".NET 10", "React 19", "RabbitMQ", "TimescaleDB", "+3"],
  gradient: {
    primary: "#B8A9D4",
    secondary: "#E8B4A0",
    accent: "#8C9FE0"
  },
  isPublic: false
}
```

#### 2. CR3-Scheduler
```typescript
{
  id: "cr3-scheduler",
  title: "CR3-Scheduler",
  tagline: "Graph-basiertes Scheduling-System für Logistik & Produktion",
  category: "Scheduling",
  description: "Graph-basierter Algorithmus für komplexe Scheduling-Probleme. Drag-and-Drop Pipeline, Multi-Faktor Optimierung, visuelle Graph-Representation.",
  highlights: [
    "Eigener Graph-Algorithmus für Constraint-Satisfaction",
    "Pipeline Pattern für Task-Execution",
    "Drag-and-Drop Interface mit dnd-kit",
    "Multi-Faktor Optimierung (Zeit, Kosten, Ressourcen)",
    "Graph-Visualisierung mit xyflow"
  ],
  tech: [".NET 9", "React 19", "TanStack Query", "dnd-kit", "xyflow", "SQL Server"],
  techPills: [".NET 9", "React 19", "Graph-Algo", "DnD", "SQL Server"],
  gradient: {
    primary: "#E8B4A0",
    secondary: "#D4929B",
    accent: "#F0C8A0"
  },
  isPublic: false
}
```

#### 3. Yard Logistics
```typescript
{
  id: "yard-logistics",
  title: "Yard Logistics",
  tagline: "Komplettes Yard-Management-System für LKW-Tracking & Ladeabläufe",
  category: "Logistics",
  description: "NX Monorepo mit 3 unabhängigen Apps (Admin, Driver, Gate). SVG Werkshallenplan mit interaktiven Slots, Live Camera Feed Integration, DCS-Simulation.",
  highlights: [
    "NX Monorepo mit 3 Apps (Admin, Driver, Gate)",
    "Interaktiver SVG Werkshallenplan mit Slots",
    "Live Camera Feed Integration (ffmpeg, OvenPlayer)",
    "DCS-Simulation für Testing",
    "Multi-Auth (JWT, Role-based)"
  ],
  tech: [".NET 9", "React 19", "NX Monorepo", "JWT", "ffmpeg", "OvenPlayer", "SQLite"],
  techPills: [".NET 9", "NX Monorepo", "React 19", "Live Camera", "+2"],
  gradient: {
    primary: "#D4929B",
    secondary: "#B8A9D4",
    accent: "#E8A0B0"
  },
  isPublic: false
}
```

#### 4. CI/CD Automation
```typescript
{
  id: "cicd-automation",
  title: "CI/CD Automation",
  tagline: "GitHub Actions Suite für vollständige Delivery-Automatisierung",
  category: "DevOps",
  description: "5 fokussierte GitHub Actions für Version-Extraction, Docker Build/Push, Kubernetes Manifest Patching, Semantic Versioning, und Project Scaffolding via Copier.",
  highlights: [
    "5 fokussierte GitHub Actions (Extract, Build, Deploy, Version, Scaffold)",
    "Multi-Format Version Extraction (package.json, AssemblyInfo, pyproject.toml)",
    "Semantic Versioning mit Conventional Commits",
    "Kubernetes Manifest Patching mit yq/jq",
    "Copier Scaffolding für neue Projekte"
  ],
  tech: ["Node.js 20", "GitHub Actions", "Docker Hub API", "Kubernetes", "Copier", "Jinja2", "Jest"],
  techPills: ["GitHub Actions", "Kubernetes", "Docker", "Node.js", "Copier"],
  gradient: {
    primary: "#A8C4B8",
    secondary: "#E8B4A0",
    accent: "#90C4A8"
  },
  isPublic: true,
  githubUrl: "https://github.com/Florian-Rth/ci-cd-actions"
}
```

#### 5. Developer Portfolio
```typescript
{
  id: "developer-portfolio",
  title: "Developer Portfolio",
  tagline: "Dieses Portfolio — React SPA mit TCG-Skill-Section & Pack-Opening-Mechanik",
  category: "Portfolio",
  description: "React SPA mit TCG Trading Card System für Skills, Pack-Opening-Animation, Foil/Holo-Effekte, Framer Motion FLIP, Dark/Light Mode, Mobile-first.",
  highlights: [
    "TCG Card System mit Pack-Opening-Animation (Scissor-Tear)",
    "Foil/Holo-Effekte mit CSS Gradients",
    "Framer Motion FLIP Transitions",
    "Dark/Light Mode mit theme-aware SVGs",
    "Mobile-first Design"
  ],
  tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Biome"],
  techPills: ["React 19", "TypeScript", "Framer Motion", "Tailwind", "Vite"],
  gradient: {
    primary: "#B8A9D4",
    secondary: "#E8B4A0",
    accent: "#D4929B"
  },
  isPublic: true,
  githubUrl: "https://github.com/Florian-Rth/developer-portfolio",
  liveUrl: "https://florian-raetsch.de" // oder die Preview URL
}
```

---

### 12. Komponenten-Struktur

```
src/
├── data/
│   └── projects.ts                    # Projektdaten + Interface
│
└── components/
    └── Projects/
        ├── Projects.tsx               # Section Container
        ├── Watermark.tsx              # "PROJECTS" Hintergrundtext
        ├── Annotation.tsx            # "things I built ✦"
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

**Composition Pattern Usage:**

```tsx
// In App.tsx oder main.tsx
<Projects>
  <Projects.Watermark />
  <Projects.Annotation />
  <Projects.Grid projects={projects} />
</Projects>
```

---

### 13. Responsive Breakpoints Summary

| Element | Desktop (≥1024px) | Mobile (<768px) |
|---|---|---|
| Grid | 2+3 Bento | Single Column |
| Card Height (Row 1) | 320px | 300px |
| Card Height (Row 2) | 280px | 300px |
| Artwork Height | 45% | 45% |
| 3D Tilt | ✅ | ❌ (deaktiviert) |
| Gradient Border | ✅ | ✅ (touch: active state) |
| Section Spotlight | ✅ | ❌ |
| Tech Pills Max | 3 + "+N" | 3 + "+N" |
| Detail-View | FLIP Fullscreen | FLIP Fullscreen (volle Breite) |

---

### 14. Dark Mode Support

- **Mesh Gradient:** Gradienten 30% dunkler, opacity +0.05
- **Noise Overlay:** opacity +0.04
- **Gradient Border:** `opacity: 0.85` statt 1.0 (etwa dezenter)
- **Detail Backdrop:** `rgba(0,0,0,0.6)` statt 0.4
- **Category Badge Background:** `var(--surface)` mit 90% opacity

Nutze `var(--card)` für theme-aware SVGs (best practice aus vorherigen Phasen).

---

### 15. Accessibility Requirements

- `<article>` Element für jede Card
- `aria-label={project.title}`
- `role="button"` + `tabIndex={0}` + `onKeyDown` (Enter/Space → expand)
- Detail-View: `role="dialog"`, `aria-modal="true"`, Focus Trap
- ESC schließt Detail-View
- `prefers-reduced-motion`: Tilt, Spotlight und Gradient-Animation deaktivieren; FLIP auf 150ms reduzieren

---

### 16. Testing

Füge Tests hinzu in `__tests__/Projects.test.tsx`:

- Component Rendering
- Props Validation
- User Interactions (Click to expand, ESC to close)
- Responsive Behavior (mock viewport)
- Accessibility (ARIA attributes)

---

### 17. Integration mit existentem Code

- Nutze existierende UI Patterns aus Skills Section (Watermark, Annotation)
- Nutze existierende Theme CSS Variables (`var(--background)`, `var(--surface)`, `var(--muted)`, `var(--accent)`, `var(--text)`, `var(--card)`)
- Nutze Framer Motion für alle Animationen (bereits installiert)
- Nutze IntersectionObserver Pattern aus vorherigen Sections für Scroll-Animationen
- Nutze useIsMobile Hook falls existent (ansonsten neu erstellen)

---

### 18. Performance Optimierungen

- Lazy Load Detail-View Content (nur laden wenn expanded)
- `will-change` Properties für Tilt Animation
- GPU-accelerated Transforms statt Layout-Affecting Properties
- Debounce Mouse Events für Spotlight (throttle zu 16ms)
- CSS Animation für Mesh Gradient statt JS Loop

---

## Deliverables

1. **Alle Komponenten** implementiert in `src/components/Projects/`
2. **Projektdaten** in `src/data/projects.ts` mit allen 5 Projekten
3. **Hooks** für Tilt, Spotlight, Expand State
4. **Responsive Design** getestet auf Desktop, Tablet, Mobile
5. **Dark Mode** support mit theme-aware Variablen
6. **Accessibility** fully implemented (ARIA, Keyboard, Screen Reader)
7. **Tests** für Core Components
8. **TypeScript** strict mode, keine any
9. **Linting** mit Biome (wie restliches Projekt)

---

## Next Steps nach Implementierung

1. Lokal testen: `npm run dev`
2. Preview auf Port 8090 bereitstellen
3. Code Review durchführen
4. Merge auf main
5. Deployment vorbereiten

---

## Referenzen

- **Spec Details:** `PROJECTS-SPEC.md` (diese Datei enthält die komplette Spec)
- **Existierender Code:** `src/components/Skills/` für Patterns (Watermark, Annotations)
- **Theme Variables:** `src/styles/globals.css` oder `tailwind.config.ts`
- **Preview URL:** `http://100.80.222.85:8090` (mit `?nosplash` für direkten Zugriff)

---

## Notes

- **Kreativität erwünscht:** Wenn du Ideen für zusätzliche Annotationen oder Micro-Interactions hast, setze sie um!
- **Iterative Verbesserung:** Start mit MVP, dann feilen (Animation timing, Colors, Spacing)
- **Feedback Loops:** Frag nach Feedback wenn du unsicher bist (z.B. Gradient Colors, Card Layout)

---

**Viel Spaß beim Implementieren! 🚀**
