# Phase 8: Projects Section — Implementation Prompt

**Status:** SPEC READY, IMPLEMENTATION OPEN (2026-03-14)

---

## Context

This is Phase 8 of the Developer Portfolio project. Previous phases (1-7) are fully implemented and merged:

- **Phase 1-4:** Core layout, About Section, Skills Section (TCG MVP complete)
- **Phase 6:** Skills TCG System (15 skills, Pack-Opening, Foil/Holo, mobile support)
- **Phase 7:** TCG MVP Features (Scissor-Tear, Card Reveal, Scattered State)

**Task:** Implement the Projects Section (Bento Grid with 5 projects, mesh gradient artworks, 3D tilt, FLIP expand detail view).

---

## Task Overview

Implement the Projects Section based on this specification. Focus on:

1. **Code Quality:** Clean architecture, composition pattern, type-safe
2. **Consistency:** Follow existing UI patterns from Skills Section (watermarks, annotations, theme-aware styling)
3. **Performance:** Efficient animations (CSS over JS where possible), lazy loading for detail view content
4. **Responsive:** Mobile-first approach, breakpoints: mobile (<768px), tablet (768-1023px), desktop (≥1024px)
5. **Accessibility:** ARIA labels, keyboard navigation, screen reader support, `prefers-reduced-motion` support

---

## Specification

### Section Layout

Create a section with a "PROJECTS" watermark in the background (similar to About/Skills sections), a Pacifico annotation ("things I built ✦"), and a responsive bento grid layout showing 5 project cards.

**Desktop layout (≥1024px):**
- Row 1: 2 cards, 50% width each, taller height
- Row 2: 3 cards, 33% width each, shorter height
- Gap between cards: 16px

**Tablet layout (768-1023px):**
- 2-column grid
- Cards adapt accordingly

**Mobile layout (<768px):**
- Single column stack
- All cards same height
- Smaller gap

---

### Project Card Design

Each card should have:

1. **Top half:** Animated mesh gradient artwork with noise/grain overlay
2. **Category badge:** Top-left floating badge with unique color per category
3. **Project info below artwork:**
   - Project title (bold, larger)
   - One-line tagline/description
   - Tech stack pills (max 3 shown, "+N" overflow if more)

**Visual style:**
- Background using theme surface color
- Subtle border that becomes animated gradient on hover
- Rounded corners (16px)
- Pointer cursor

**Card content categories:**
- Industrial IoT
- Scheduling
- Logistics
- DevOps
- Portfolio

Each category gets a unique badge color theme.

---

### Mesh Gradient Artworks

Each card displays a unique, slowly animated mesh gradient artwork using a blend of colors. The animation should be a slow loop (8-12 seconds) with each card having a different animation delay so they don't all move in sync.

**Key features:**
- Multiple overlapping radial gradients
- Subtle noise/grain overlay
- Dark mode: slightly darker colors, slightly higher opacity
- Each card uses a different color combination (see project list below)

---

### Hover Effects

Implement these interactive hover effects (desktop only):

1. **3D Tilt:** Card tilts based on mouse position (perspective effect, max ~6 degrees, scales slightly up)
2. **Gradient Border:** Animated gradient border appears around card on hover
3. **Artwork Parallax:** Mesh gradient moves slightly opposite to tilt direction
4. **Section Spotlight:** Subtle radial gradient follows cursor across entire grid area

Mobile: Disable tilt and spotlight (no hover), but keep gradient border on touch active state.

---

### Detail View (FLIP Expand)

When a card is clicked, it expands to a full-screen detail view using Framer Motion's FLIP technique (layoutId pattern). The card itself grows into the modal—not a separate overlay.

**Detail view content:**
- Larger mesh gradient artwork at top
- Project title and category tagline
- Description text
- "What I built" section with bullet points highlighting key features
- Full tech stack list (all items)
- Links (GitHub, live site) for public projects
- "Confidential" note for private projects

**Interaction:**
- Click card to expand
- Click X button, backdrop, or press ESC to close
- Backdrop dims background
- Body scroll locked while detail view is open
- Smooth spring animation (~400ms)

---

### Scroll Animations

Cards should animate in when they come into view:

- Staggered fade-in with upward translation
- Each card has slightly different delay
- Animation only runs once per page load
- Annotation fades in after cards

---

### Project Data Structure

Create a data structure for projects with these fields:
- Unique ID
- Title
- Tagline (one sentence)
- Description (2-3 sentences for detail view)
- Category
- Highlights (bullet points of key features built)
- Tech stack (all technologies used)
- Tech pills display list (max 5 for card)
- Gradient colors (primary, secondary, accent)
- Public/private flag
- Optional GitHub URL
- Optional live URL

---

## The 5 Projects

### 1. Machine-Eye
- **Category:** Industrial IoT
- **Tagline:** Real-time monitoring platform for industrial machine connectivity
- **Description:** Connects industrial equipment (OPC-UA, Siemens S7, Modbus, MQTT) to a web interface. Real-time data capture, rule engine, notifications—configurable without code.
- **Highlights:**
  - Protocol-agnostic plugin system (OPC-UA, S7, Modbus, MQTT)
  - Dual-DB strategy (PostgreSQL + TimescaleDB) for time-series
  - Real-time updates via SignalR + RabbitMQ inbox/outbox pattern
  - Clean architecture + Result<T> error handling
  - React compiler (auto-memoization)
- **Tech Stack:** .NET 10, React 19, RabbitMQ, PostgreSQL, TimescaleDB, SignalR, OPC-UA, Siemens S7, Modbus, MQTT, Docker
- **Public:** No

### 2. CR3-Scheduler
- **Category:** Scheduling
- **Tagline:** Graph-based scheduling system for logistics and production
- **Description:** Graph-based algorithm for complex scheduling problems. Drag-and-drop pipeline, multi-factor optimization, visual graph representation.
- **Highlights:**
  - Custom graph algorithm for constraint satisfaction
  - Pipeline pattern for task execution
  - Drag-and-drop interface with dnd-kit
  - Multi-factor optimization (time, cost, resources)
  - Graph visualization with xyflow
- **Tech Stack:** .NET 9, React 19, TanStack Query, dnd-kit, xyflow, SQL Server
- **Public:** No

### 3. Yard Logistics
- **Category:** Logistics
- **Tagline:** Complete yard management system for truck tracking and loading operations
- **Description:** NX monorepo with 3 independent apps (Admin, Driver, Gate). Interactive SVG warehouse floor plan with slots, live camera feed integration, DCS simulation.
- **Highlights:**
  - NX monorepo with 3 apps (Admin, Driver, Gate)
  - Interactive SVG warehouse floor plan with slots
  - Live camera feed integration (ffmpeg, OvenPlayer)
  - DCS simulation for testing
  - Multi-auth (JWT, role-based)
- **Tech Stack:** .NET 9, React 19, NX Monorepo, JWT, ffmpeg, OvenPlayer, SQLite
- **Public:** No

### 4. CI/CD Automation
- **Category:** DevOps
- **Tagline:** GitHub Actions suite for complete delivery automation
- **Description:** 5 focused GitHub Actions for version extraction, Docker build/push, Kubernetes manifest patching, semantic versioning, and project scaffolding via Copier.
- **Highlights:**
  - 5 focused GitHub Actions (Extract, Build, Deploy, Version, Scaffold)
  - Multi-format version extraction (package.json, AssemblyInfo, pyproject.toml)
  - Semantic versioning with conventional commits
  - Kubernetes manifest patching with yq/jq
  - Copier scaffolding for new projects
- **Tech Stack:** Node.js 20, GitHub Actions, Docker Hub API, Kubernetes, Copier, Jinja2, Jest
- **Public:** Yes
- **GitHub:** https://github.com/Florian-Rth/ci-cd-actions

### 5. Developer Portfolio
- **Category:** Portfolio
- **Tagline:** This portfolio—React SPA with TCG skill section and pack-opening mechanics
- **Description:** React SPA with TCG trading card system for skills, pack-opening animation, foil/holo effects, Framer Motion FLIP, dark/light mode, mobile-first.
- **Highlights:**
  - TCG card system with pack-opening animation (scissor-tear)
  - Foil/holo effects with CSS gradients
  - Framer Motion FLIP transitions
  - Dark/light mode with theme-aware SVGs
  - Mobile-first design
- **Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Biome
- **Public:** Yes
- **GitHub:** https://github.com/Florian-Rth/developer-portfolio
- **Live:** This portfolio itself

---

## Component Structure

Recommended structure:

```
src/
├── data/
│   └── projects.ts                    # Project data + interface
│
└── components/
    └── Projects/
        ├── Projects.tsx               # Section container
        ├── Watermark.tsx              # "PROJECTS" background text
        ├── Annotation.tsx            # "things I built ✦"
        ├── ProjectsGrid.tsx           # Bento grid layout
        ├── ProjectCard.tsx            # Individual card (idle state)
        ├── ProjectDetail.tsx          # Expanded detail view
        ├── MeshGradient.tsx           # Animated gradient (reusable)
        ├── CategoryBadge.tsx          # Badge top-left
        ├── TechPills.tsx              # Tech stack pills
        ├── useCardTilt.ts             # Hook: mouse tracking for 3D tilt
        ├── useSectionSpotlight.ts     # Hook: cursor spotlight over grid
        ├── useProjectExpand.ts        # Hook: FLIP expand state
        ├── __tests__/
        │   └── Projects.test.tsx
        └── index.ts                   # Composition pattern exports
```

Use the composition pattern similar to the Skills section.

---

## Responsive Behavior Summary

| Element | Desktop (≥1024px) | Mobile (<768px) |
|---|---|---|
| Grid layout | 2+3 bento | Single column |
| Card heights | Different by row | All same |
| 3D tilt | Enabled | Disabled |
| Gradient border | On hover | On touch active |
| Section spotlight | Enabled | Disabled |
| Detail view | FLIP fullscreen | FLIP fullscreen |

---

## Dark Mode Support

- Mesh gradients: slightly darker colors, higher opacity
- Noise overlay: slightly higher opacity
- Gradient border: more subtle (lower opacity)
- Detail backdrop: darker overlay
- Category badge: uses surface color with higher opacity

Use `var(--card)` for theme-aware SVGs (consistent with previous phases).

---

## Accessibility Requirements

- Use `<article>` element for each card
- Include `aria-label` with project title
- Add `role="button"` + keyboard navigation (Enter/Space to expand)
- Detail view: `role="dialog"`, `aria-modal="true"`, focus trap
- ESC key closes detail view
- `prefers-reduced-motion`: Disable tilt, spotlight, and gradient animations; reduce FLIP duration to 150ms

---

## Testing

Add tests for:

- Component rendering
- Props validation
- User interactions (click to expand, ESC to close)
- Responsive behavior (mock viewport)
- Accessibility (ARIA attributes)

---

## Integration with Existing Code

- Follow existing UI patterns from Skills Section (watermarks, annotations)
- Use existing theme CSS variables (background, surface, muted, accent, text, card)
- Use Framer Motion for all animations (already installed)
- Use IntersectionObserver pattern from previous sections for scroll animations
- Create/use `useIsMobile` hook if needed

---

## Performance Optimizations

- Lazy load detail view content (only load when expanded)
- Use `will-change` for tilt animation properties
- Prefer GPU-accelerated transforms over layout-affecting properties
- Debounce mouse events for spotlight
- Use CSS animation for mesh gradient instead of JS loop

---

## Deliverables

1. All components implemented in `src/components/Projects/`
2. Project data in `src/data/projects.ts` with all 5 projects
3. Hooks for tilt, spotlight, expand state
4. Responsive design tested on desktop, tablet, mobile
5. Dark mode support with theme-aware variables
6. Accessibility fully implemented (ARIA, keyboard, screen reader)
7. Tests for core components
8. TypeScript strict mode, no `any`
9. Linting with Biome (consistent with project)

---

## Next Steps After Implementation

1. Test locally: `npm run dev`
2. Deploy preview on port 8090
3. Conduct code review
4. Merge to main
5. Prepare for deployment

---

## Notes

- Be creative: If you have ideas for additional annotations or micro-interactions, implement them
- Iterate: Start with MVP, then refine (animation timing, colors, spacing)
- Ask for feedback: If unsure about design choices (gradient colors, card layout), ask for input

---

**Happy coding! 🚀**
