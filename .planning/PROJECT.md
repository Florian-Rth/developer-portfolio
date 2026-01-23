# Personal Developer Portfolio

## What This Is

A personal portfolio website for a full stack web developer with DevOps skills. The site showcases professional skills, career journey, and work projects through a clean, modern design with an interactive 3D animoji centerpiece that demonstrates both technical creativity and attention to user experience.

## Core Value

The 3D animoji head creates an immediate memorable impression that reflects creativity and technical skill, while the content sections clearly communicate professional capabilities, career progression, and tangible contributions to real-world projects.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ React + TypeScript + Vite project structure — existing
- ✓ Feature-based folder architecture — existing
- ✓ Composition Pattern for UI components — existing
- ✓ Vitest + React Testing Library configured — existing
- ✓ Biome linting with warnings-as-errors — existing
- ✓ React Compiler enabled for performance — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Interactive 3D animoji head (React Three Fiber)
  - Cartoony/memoji visual style
  - Mouse tracking (eyes/head follow cursor)
  - Section interactions (reacts to scrolling/viewing different sections)
  - Expression changes based on page context
- [ ] Design system (shadcn-style on BaseUI)
  - Soft modern aesthetic (gentle colors, rounded corners, soft shadows, Notion-esque)
  - Component library with Composition Pattern
  - Theme provider with design tokens
- [ ] About/Bio section
  - Professional background
  - Apprenticeship completion highlight
  - Full stack + DevOps positioning
- [ ] Career timeline section
  - Visual timeline from apprenticeship to present
  - Key milestones and roles
- [ ] Skills & Technologies section
  - Categorized skill display (Frontend, Backend, DevOps, Tools)
  - Proficiency indicators or experience levels
- [ ] Work Projects section
  - Team projects with individual contributions highlighted
  - Tech stack used
  - Impact and achievements
- [ ] Contact section
  - Email, LinkedIn, GitHub links
  - Social connections

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Authentication/login — portfolio is public, no user accounts needed
- Backend/database — static site, no server-side features
- Blog functionality — out of scope for v1, portfolio focus only
- Real portfolio data management — manual content updates sufficient
- Multi-language support — single language (English) for v1
- Downloadable resume PDF — link to external PDF/LinkedIn sufficient

## Context

**Professional Background:**
- Full stack web developer with DevOps skills
- Completed apprenticeship ~1 year ago
- Has worked on multiple projects at work (team-based efforts)
- Wants to emphasize technical skills AND creativity

**Technical Environment:**
- Modern React 19.2.0 with TypeScript 5.9.3
- Vite 5.1.2 build system
- React Compiler enabled for automatic optimization
- Feature-based architecture with Composition Pattern
- Strong testing culture (TDD with Vitest + RTL)

**Design Philosophy:**
- "Clean looking" interpreted as soft modern style (gentle colors, rounded corners, Notion-esque)
- 3D animoji as creative centerpiece without being overwhelming
- Professional enough for job applications while showing personality
- Component library: shadcn-style patterns built on BaseUI (not Radix)

**Content Status:**
- All content needs to be created from scratch
- No existing copy, images, or project descriptions prepared
- 3D model of head will need to be sourced or created

## Constraints

- **Tech Stack**: React + TypeScript, React Three Fiber for 3D, BaseUI for component primitives — aligned with existing architecture and user preference
- **Design System**: shadcn-style on BaseUI — must follow this pattern, not shadcn/ui (Radix-based)
- **Hosting**: Static deployment (Vite build) — no backend/database, must work on static hosting
- **Performance**: 3D animations must be smooth (60fps), not impact page load significantly
- **Browser Support**: Modern browsers with ES2022 support — can use latest web standards
- **Content Creation**: All portfolio content (copy, images, project details) needs to be created during implementation

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Three Fiber for 3D | User-specified, excellent React integration, strong ecosystem | — Pending |
| shadcn-style on BaseUI | User-specified combination, not standard shadcn/ui (Radix) | — Pending |
| Soft modern design | User preference for "clean" aesthetic, Notion-esque feel | — Pending |
| Cartoony animoji style | More approachable, easier to pull off than realistic, shows creativity | — Pending |
| Include work projects | Team projects with clear contributions demonstrate real-world experience | — Pending |
| Static site only | No backend needed for portfolio, enables simple hosting, lower maintenance | — Pending |

---
*Last updated: 2026-01-23 after initialization*
