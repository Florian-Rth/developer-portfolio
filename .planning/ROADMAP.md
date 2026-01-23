# Roadmap: Personal Developer Portfolio

## Overview

The portfolio website is built in 8 phases, starting with the design system foundation that all other components depend on, then creating the layout and navigation structure, followed by implementing each content section sequentially, and culminating with the interactive 3D animoji centerpiece that brings the site to life. Each phase delivers a complete, verifiable capability before moving to the next.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System Foundation** - Establish visual language and component primitives
- [ ] **Phase 2: Layout & Navigation** - Create page structure and navigation system
- [ ] **Phase 3: About Section** - Implement hero area and professional background
- [ ] **Phase 4: Career Timeline** - Display career progression visually
- [ ] **Phase 5: Skills & Technologies** - Showcase technical capabilities
- [ ] **Phase 6: Work Projects** - Present team projects and contributions
- [ ] **Phase 7: Contact Section** - Enable connection and social links
- [ ] **Phase 8: 3D Animoji** - Integrate interactive 3D centerpiece

## Phase Details

### Phase 1: Design System Foundation

**Goal**: Set up shadcn/ui infrastructure with Tailwind CSS v4, Base UI primitives, and category-based path aliases for a soft modern design system with dark mode support.

**Depends on**: Nothing (first phase)

**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, DS-06, DS-07

**Success Criteria** (what must be TRUE):
1. shadcn/ui is properly installed and configured with components.json file (Nova style, Zinc base color)
2. Tailwind CSS v4 is installed with Vite plugin configured as first plugin
3. Category-based path aliases (@components, @lib, @utils, etc.) are configured in both Vite and TypeScript
4. CSS variables with OKLCH format are defined for theming (light/dark mode)
5. Base utilities (cn helper) are available in src/lib/utils.ts
6. ThemeProvider component enables runtime theme switching with system preference detection
7. Components can be added via shadcn CLI when needed in later phases

**Plans**: 5 plans in 3 waves

Plans:
- [ ] 01-01: Run shadcn CLI to install base infrastructure (Tailwind v4, Base UI, cn utility)
- [ ] 01-02: Configure Vite with Tailwind plugin and category-based path aliases
- [ ] 01-03: Configure TypeScript path aliases to match Vite configuration
- [ ] 01-04: Create globals.css with design tokens (Nova style, Zinc palette, dark mode)
- [ ] 01-05: Create ThemeProvider component for runtime theme switching

### Phase 2: Layout & Navigation

**Goal**: Create the main page structure and navigation system that enables users to move between sections smoothly.

**Depends on**: Phase 1 (Design System Foundation)

**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05

**Success Criteria** (what must be TRUE):
1. Fixed header is visible at the top of the page with navigation links to all sections
2. Footer is visible at the bottom with social links and copyright information
3. Clicking navigation links smoothly scrolls to the corresponding section
4. Navigation is responsive and works on mobile devices (hamburger menu or similar)
5. Main layout container manages section spacing and overall page structure appropriately

**Plans**: TBD (refined during planning)

Plans:
- [ ] 02-01: Create fixed header component with navigation links
- [ ] 02-02: Create footer component with social links
- [ ] 02-03: Implement smooth scroll behavior between sections
- [ ] 02-04: Create mobile responsive navigation
- [ ] 02-05: Create main layout container and integrate header/footer

### Phase 3: About Section

**Goal**: Introduce the developer with a professional background summary and clear positioning statement.

**Depends on**: Phase 2 (Layout & Navigation)

**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04

**Success Criteria** (what must be TRUE):
1. Hero area displays the developer's name and title (Full Stack Web Developer + DevOps)
2. Professional background summary communicates apprenticeship completion and experience level
3. Positioning statement conveys both technical skills and creativity
4. Reserved space for 3D animoji is visible and properly positioned (placeholder for later phase)

**Plans**: TBD (refined during planning)

Plans:
- [ ] 03-01: Create hero area component with name and title
- [ ] 03-02: Write and display professional background summary
- [ ] 03-03: Add positioning statement about technical skills and creativity
- [ ] 03-04: Create placeholder space for 3D animoji
- [ ] 03-05: Integrate About section into main layout

### Phase 4: Career Timeline

**Goal**: Visually display career progression from apprenticeship to present with key milestones highlighted.

**Depends on**: Phase 3 (About Section)

**Requirements**: CAREER-01, CAREER-02, CAREER-03, CAREER-04

**Success Criteria** (what must be TRUE):
1. Timeline component visually displays career progression from apprenticeship to present
2. Each career entry shows role, company, dates, and key responsibilities
3. Key milestones (apprenticeship completion, first job, promotions) are highlighted visually
4. Timeline layout is responsive (horizontal on desktop, vertical on mobile)

**Plans**: TBD (refined during planning)

Plans:
- [ ] 04-01: Create timeline component structure
- [ ] 04-02: Define and implement career data (roles, companies, dates, responsibilities)
- [ ] 04-03: Add visual highlighting for key milestones
- [ ] 04-04: Implement responsive layout (horizontal desktop, vertical mobile)
- [ ] 04-05: Integrate Career Timeline section into main layout

### Phase 5: Skills & Technologies

**Goal**: Showcase technical capabilities with categorized skills and visual indicators of proficiency.

**Depends on**: Phase 4 (Career Timeline)

**Requirements**: SKILLS-01, SKILLS-02, SKILLS-03, SKILLS-04

**Success Criteria** (what must be TRUE):
1. Skills are categorized into clear sections (Frontend, Backend, DevOps, Tools)
2. Each skill displays with name and visual indicator (proficiency level or experience)
3. Skills are visually organized with clear grouping and hierarchy
4. Technology stack badges or icons provide visual appeal and quick recognition

**Plans**: TBD (refined during planning)

Plans:
- [ ] 05-01: Create skills section component with category structure
- [ ] 05-02: Define and implement skills data with categories
- [ ] 05-03: Add visual indicators for proficiency levels
- [ ] 05-04: Create technology stack badges or icons
- [ ] 05-05: Integrate Skills section into main layout

### Phase 6: Work Projects

**Goal**: Present team projects worked on with clear emphasis on individual contributions and tech stack used.

**Depends on**: Phase 5 (Skills & Technologies)

**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05

**Success Criteria** (what must be TRUE):
1. Project cards display team projects worked on
2. Each project shows project name, company, description, and individual contributions
3. Tech stack is clearly displayed for each project
4. Links to live projects or repositories are provided (if available/public)
5. Projects are framed as team projects with "My contributions" clearly highlighted

**Plans**: TBD (refined during planning)

Plans:
- [ ] 06-01: Create project card component with structure for project details
- [ ] 06-02: Define and implement project data (team projects, contributions, tech stack)
- [ ] 06-03: Add tech stack display to project cards
- [ ] 06-04: Add links to live projects or repositories
- [ ] 06-05: Emphasize "My contributions" in project descriptions
- [ ] 06-06: Integrate Projects section into main layout

### Phase 7: Contact Section

**Goal**: Enable visitors to connect through various social and professional channels.

**Depends on**: Phase 6 (Work Projects)

**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, CONTACT-05

**Success Criteria** (what must be TRUE):
1. Email link (mailto:) is present and functional
2. LinkedIn profile link is present and functional
3. GitHub profile link is present and functional
4. Optional additional social links (Twitter/X, etc.) are present if applicable
5. Contact information is visually presented with icons for quick recognition

**Plans**: TBD (refined during planning)

Plans:
- [ ] 07-01: Create contact section component
- [ ] 07-02: Add email link with mailto: functionality
- [ ] 07-03: Add LinkedIn profile link
- [ ] 07-04: Add GitHub profile link
- [ ] 07-05: Add optional additional social links
- [ ] 07-06: Present contact information with icons
- [ ] 07-07: Integrate Contact section into main layout

### Phase 8: 3D Animoji

**Goal**: Integrate an interactive 3D animoji head that tracks mouse movement and reacts to page context.

**Depends on**: Phase 7 (Contact Section) - all content sections must exist first

**Requirements**: 3D-01, 3D-02, 3D-03, 3D-04, 3D-05, 3D-06, 3D-07, 3D-08

**Success Criteria** (what must be TRUE):
1. 3D animoji head is rendered in the About section using React Three Fiber
2. Head tracks mouse movement (eyes/head follow cursor)
3. Head reacts to section scroll/viewing (orientation changes)
4. Facial expressions change based on page context or user interaction
5. 3D animations are smooth (60fps) and don't significantly impact page load
6. Cartoony/memoji visual style is achieved

**Plans**: TBD (refined during planning)

Plans:
- [ ] 08-01: Install and configure React Three Fiber, Three.js, and @react-three/drei
- [ ] 08-02: Create 3D scene canvas component
- [ ] 08-03: Integrate 3D canvas into About section (replacing placeholder)
- [ ] 08-04: Load and render cartoony/memoji-style head model
- [ ] 08-05: Implement mouse tracking (eyes/head follow cursor)
- [ ] 08-06: Implement section scroll/viewing reactions
- [ ] 08-07: Implement facial expression changes based on context
- [ ] 08-08: Optimize performance (60fps, lazy loading, code splitting)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System Foundation | 0/5 | Not started | - |
| 2. Layout & Navigation | 0/5 | Not started | - |
| 3. About Section | 0/5 | Not started | - |
| 4. Career Timeline | 0/5 | Not started | - |
| 5. Skills & Technologies | 0/5 | Not started | - |
| 6. Work Projects | 0/6 | Not started | - |
| 7. Contact Section | 0/7 | Not started | - |
| 8. 3D Animoji | 0/8 | Not started | - |

**Overall Progress:** [░░░░░░░░░░] 0% (0/45 plans complete)
