# Phase 2: Layout & Navigation - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

## Phase Boundary

Create the main page structure and navigation system that enables users to move between sections smoothly. Delivers fixed header with navigation, footer with social links, smooth scroll behavior, and mobile-responsive navigation.

## Implementation Decisions

### Desktop navigation behavior

**Creative navbar with animated logo:**
- Logo (hand-written name) on left with stroke animation on page load (one-time)
- Navigation links centered
- Links are simple text with hover effects (no pills or icons)
- Active section link is highlighted
- Horizontal progress line under the active link only — fills as user scrolls through that section

**Scroll-triggered header transformation:**
- Header has solid background at top
- On scroll: shrinks in height, becomes glass/transparent background, divider becomes visible
- Transformation timing is at Claude's discretion
- Creative and nice animations for all transitions

**Navigation interaction:**
- Smooth animated scroll when clicking nav links
- Scroll indicator (down arrow or similar) on initial view suggesting more content
- Active section link highlighted with style at Claude's discretion

### Mobile navigation

**Header (visual-only):**
- Shows logo centered in middle (same hand-written animated name as desktop, smaller)
- Glass style on scroll, same transformations as desktop
- No navigation links in header

**Bottom floating navigation:**
- Floating glass-style pill at bottom of screen
- Shows section icons with semantic meaning (e.g., user for About, briefcase for Work)
- Only active section shows a label
- Glowing ring around active pill that fills with progress through current section
- Slide animation when switching between active sections
- No hamburger menu or trigger icon

### Section spacing & layout

**Section heights:**
- Each section is min-100vh (minimum full viewport height)
- Sections grow as needed if content overflows

**Spacing between sections:**
- Generous gaps: 120-160px between sections
- Internal section padding at Claude's discretion

**Scroll behavior:**
- Smooth scroll with easing at Claude's discretion
- Native CSS scroll-behavior or custom JS easing

### Visual hierarchy & branding

**Header layout:**
- Logo on left, nav links centered (asymmetric balance)
- Text-only navigation links (no icons or pills)

**Footer:**
- Social links (icon-only) + copyright
- Centered alignment
- Social links presented as icons only (no labels)

**Mobile footer:**
- Handled by bottom nav (no separate footer)

### Animation library

**Use Framer Motion:**
- Approved exception to "minimal dependencies" rule
- Justified by need for polished animations:
  - Hand-written logo stroke animation
  - Header transformation effects
  - Mobile bottom nav progress ring
  - Slide transitions between sections
  - Smooth scroll-triggered animations

## Specific Ideas

- Creative navbar — user wants something unique and memorable
- Hand-written logo style for personal branding feel
- Progress indicators in navigation (desktop: line under active link, mobile: glowing ring)
- Glass-style aesthetic with blur effects
- Mobile bottom nav is distinctive — not typical hamburger menu

## Claude's Discretion

**Header transformation timing** — When scroll threshold triggers shrink/glass effects
**Active link highlight style** — How the active link is visually distinguished (underline, color, etc.)
**Scroll animation easing** — Native smooth scroll vs custom JS easing
**Section internal padding** — How much padding within each section
**Mobile nav label style** — How the active section label appears
**Progress line styling** — Exact appearance of horizontal progress line under active link

## Deferred Ideas

None — discussion stayed within phase scope.

---

*Phase: 02-layout-navigation*
*Context gathered: 2026-01-24*
