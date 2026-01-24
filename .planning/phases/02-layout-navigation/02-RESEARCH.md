# Phase 2: Layout & Navigation - Research

**Researched:** 2026-01-24
**Domain:** React Layout System, Navigation Components, Animation, Smooth Scrolling
**Confidence:** HIGH

## Summary

This research investigated how to implement a polished layout and navigation system for a React portfolio using Framer Motion (now branded as Motion), Tailwind CSS v4, and standard web APIs. The standard approach in 2026 combines CSS-only smooth scrolling with JavaScript-powered scroll detection and animations, using Motion for sophisticated animation effects and Intersection Observer API for performance-optimized scroll tracking.

**Key findings:**
1. **Framer Motion rebranding**: The library is now branded as "Motion" but the `framer-motion` npm package remains the standard installation (v12.29.0 as of January 2026)
2. **Motion imports from `motion/react`**: New import path, but the package name is still `framer-motion`
3. **CSS scroll-padding-top**: Native CSS solution for fixed header offset (no JavaScript needed)
4. **CSS scroll-behavior: smooth**: Native smooth scrolling (widely available since March 2022)
5. **Intersection Observer API**: Performance-optimized scroll detection (available since March 2019)
6. **Tailwind backdrop-blur**: Built-in utilities for glassmorphism effects (backdrop-blur-sm through backdrop-blur-3xl)
7. **HugeIcons installed**: Package `@hugeicons/react` v1.1.4 already in project

**Primary recommendation:** Use CSS native scroll-padding-top and scroll-behavior for smooth scrolling with fixed header, Motion for scroll-based animations and header transformations, and Intersection Observer for active section tracking. Install Motion via `npm install framer-motion` and use `import { motion } from "motion/react"`.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Motion (Framer Motion) | 12.29.0 (latest) | Animation library for scroll effects, header transitions, logo stroke animation | Production-grade, actively maintained, React 19 support, industry standard for 2026 |
| React | 19.2.0 (installed) | UI library | Already in project |
| Tailwind CSS v4 | (@tailwindcss/vite) | Styling, glass effects, responsive design | Already configured from Phase 1, native backdrop-blur utilities |
| @hugeicons/react | 1.1.4 (installed) | Navigation icons (user, briefcase, etc.) | Already installed, selected in Phase 1 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Intersection Observer API | Native (Web API) | Scroll-based section detection, active nav tracking | Built into modern browsers, performant scroll detection |
| CSS scroll-behavior | Native (CSS) | Smooth scrolling between sections | Widely available (March 2022), zero JavaScript |
| CSS scroll-padding | Native (CSS) | Offset scroll position for fixed header | Native solution, no JavaScript needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS scroll-behavior | JavaScript smooth scroll (element.scrollIntoView) | CSS is native and simpler; JS offers more control but unnecessary for this use case |
| Intersection Observer | window.addEventListener('scroll') | Intersection Observer is off main thread and more performant; scroll events run on main thread |
| Motion for animations | CSS animations/transitions | Motion provides more sophisticated animations (scroll-linked, layout animations), easier to maintain |
| backdrop-blur utilities | Custom backdrop-filter CSS | Tailwind utilities are standardized, easier to use, cover all common cases |

**Installation:**

```bash
# Install Motion (Framer Motion)
npm install framer-motion

# Note: HugeIcons already installed (v1.1.4)
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn components (from Phase 1)
│   └── layout/           # Layout-specific components (NEW)
│       ├── Header/
│       │   ├── Header.tsx
│       │   ├── DesktopNav.tsx
│       │   ├── MobileNav.tsx
│       │   ├── HeaderContext.tsx
│       │   ├── HeaderProvider.tsx
│       │   └── index.ts
│       ├── Footer/
│       │   ├── Footer.tsx
│       │   └── index.ts
│       └── MainLayout/
│           ├── MainLayout.tsx
│           └── index.ts
├── features/
│   └── sections/         # Portfolio section components
│       ├── AboutSection.tsx
│       ├── WorkSection.tsx
│       ├── SkillsSection.tsx
│       └── ContactSection.tsx
├── hooks/
│   └── useScrollProgress.ts  # Custom hook for scroll progress
├── styles/
│   └── globals.css       # Global styles with scroll settings
└── App.tsx
```

**Key structure decisions:**
- **Layout components folder**: Separate from UI components (shadcn) because layout is domain-specific
- **Header as compound component**: Following Composition Pattern from CLAUDE.md
- **Custom hooks folder**: Reusable scroll logic separate from components

### Pattern 1: Native CSS Smooth Scrolling with Fixed Header Offset

**What:** Use CSS `scroll-behavior: smooth` and `scroll-padding-top` to enable smooth scrolling with proper offset for fixed headers

**When to use:** Any page with fixed navigation and anchor link scrolling (this phase)

**Example:**
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Offset for fixed header */
}

/* Note: scroll-behavior on html element applies to viewport */
/* scroll-behavior on body does NOT propagate to viewport */
```

**Why this pattern:**
- Native browser performance (hardware accelerated)
- Zero JavaScript required
- Widely supported (March 2022+)
- Works automatically with anchor links (`<a href="#section">`)

### Pattern 2: Motion Component for Animations

**What:** Use Motion's `motion` components to animate elements based on scroll, gestures, and layout changes

**When to use:** Header transformation on scroll, logo stroke animation, mobile nav transitions, progress indicators

**Example:**
```tsx
// Source: https://motion.dev/docs/react-animation
import { motion } from "motion/react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, height: 80 }}
      animate={{
        y: 0,
        height: isScrolled ? 60 : 80,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 1)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/50"
    >
      {/* Header content */}
    </motion.header>
  );
};
```

**Key Motion features:**
- `initial`: Starting animation state
- `animate`: Target state to animate to
- `transition`: Animation timing and easing
- Gestures: `whileHover`, `whileTap`, `whileInView`
- Layout animations: `layout` prop for automatic layout transitions

### Pattern 3: Intersection Observer for Active Section Tracking

**What:** Use Intersection Observer API to detect which section is currently visible and update navigation accordingly

**When to use:** Active link highlighting in navigation, scroll progress indicators, triggering animations when sections enter viewport

**Example:**
```tsx
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { useEffect, useState } from "react";

type SectionId = "about" | "work" | "skills" | "contact";

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is near top of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeSection;
};
```

**Why this pattern:**
- Off main thread (better performance than scroll events)
- Asynchronous observation
- Configurable thresholds
- Native browser API (no dependencies)

### Pattern 4: Tailwind Glassmorphism with Backdrop Blur

**What:** Use Tailwind's `backdrop-blur-*` utilities with semi-transparent backgrounds for frosted glass effect

**When to use:** Header background on scroll, mobile bottom nav, any glass-style UI elements

**Example:**
```tsx
// Source: https://tailwindcss.com/docs/backdrop-filter-blur
<div className="bg-white/80 backdrop-blur-md border-b border-border/50">
  {/* Content with glass effect */}
</div>
```

**Available backdrop-blur utilities:**
- `backdrop-blur-none` - 0px
- `backdrop-blur-xs` - 4px
- `backdrop-blur-sm` - 8px
- `backdrop-blur-md` - 12px
- `backdrop-blur-lg` - 16px
- `backdrop-blur-xl` - 24px
- `backdrop-blur-2xl` - 40px
- `backdrop-blur-3xl` - 64px
- `backdrop-blur-[<custom-value>]` - Arbitrary values

**Recommended combination:**
```tsx
// Glass-style header
className="bg-background/80 backdrop-blur-md border-b border-border/50"

// Mobile floating nav
className="bg-background/90 backdrop-blur-lg border border-border/50 rounded-full shadow-lg"
```

### Pattern 5: Header Compound Component (Composition Pattern)

**What:** Follow Composition Pattern from CLAUDE.md with Header as compound component

**When to use:** Multi-part components with shared state (Header with navigation parts)

**Example:**
```tsx
// Header.tsx - Main component
import type React from "react";
import { HeaderProvider } from "./HeaderProvider";

type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <HeaderProvider>
      <motion.header className="fixed top-0 left-0 right-0 z-50">
        {children}
      </motion.header>
    </HeaderProvider>
  );
};

// DesktopNav.tsx - Sub-component
import { useHeaderContext } from "./HeaderProvider";

export const DesktopNav = () => {
  const { activeSection } = useHeaderContext();

  return (
    <nav className="hidden md:flex gap-8">
      <NavLinks />
    </nav>
  );
};

// MobileNav.tsx - Sub-component with context
export const MobileNav = () => {
  const { activeSection } = useHeaderContext();

  return (
    <motion.nav
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      {/* Mobile nav icons */}
    </motion.nav>
  );
};

// index.ts - Assembly file
import { Header } from "./Header";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

Header.DesktopNav = DesktopNav;
Header.MobileNav = MobileNav;

export { Header };
```

### Anti-Patterns to Avoid

- **JavaScript scroll event listeners for smooth scrolling**: Use CSS `scroll-behavior: smooth` instead (native, performant)
- **scroll-padding-top on body**: Apply to `html` element, not body (body doesn't propagate to viewport)
- **Multiple scroll listeners**: Use single Intersection Observer for all section tracking
- **Manual backdrop-filter CSS**: Use Tailwind utilities instead (`backdrop-blur-md`)
- **Legacy Framer Motion imports**: Use `import { motion } from "motion/react"` not `"framer-motion"`

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scrolling | Custom scroll animation with requestAnimationFrame | CSS `scroll-behavior: smooth` | Native browser optimization, simpler, hardware accelerated |
| Scroll position detection | window.addEventListener('scroll') loop | Intersection Observer API | Off main thread, better performance, asynchronous |
| Active section tracking | Manual scroll position calculation | Intersection Observer with thresholds | Built-in visibility detection, no math required |
| Header glass effect | Custom backdrop-filter CSS | Tailwind `backdrop-blur-*` utilities | Standardized values, easier customization, responsive variants |
| Layout animations | Manual CSS transitions | Motion `layout` prop | Automatic FLIP animations, transforms only (performant) |
| SVG stroke animation | Manual stroke-dasharray/dashoffset CSS | Motion for SVG or React Spring | Easier to implement, better timing control |

**Key insight:** Intersection Observer is deceptively complex to implement manually. Detecting when elements enter/exit viewport requires calculating bounding client rects, handling nested scroll containers, and managing performance. Intersection Observer encapsulates all of this complexity with a performant, off-main-thread API.

## Common Pitfalls

### Pitfall 1: scroll-behavior on body Element

**What goes wrong:** Setting `scroll-behavior: smooth` on `body` element doesn't work

**Why it happens:** MDN explicitly states "This property specified on the `body` element will not propagate to the viewport"

**How to avoid:** Always apply `scroll-behavior` to `html` element, not `body`

```css
/* WRONG */
body {
  scroll-behavior: smooth;
}

/* CORRECT */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
```

**Warning signs:** Smooth scrolling doesn't work, no errors in console

### Pitfall 2: Missing scroll-padding-top for Fixed Header

**What goes wrong:** When clicking nav links, section titles are hidden behind fixed header

**Why it happens:** Anchor links scroll to the exact position of the element, without accounting for fixed header height

**How to avoid:** Always set `scroll-padding-top` on `html` element equal to or greater than header height

```css
html {
  scroll-padding-top: 80px; /* Match your fixed header height */
}
```

**Warning signs:** Section content appears cut off at top when navigating via anchor links

### Pitfall 3: Motion Import Path Confusion

**What goes wrong:** Import from "framer-motion" works but may show deprecation warnings

**Why it happens:** Motion rebranded from "framer-motion" to "motion" but npm package name remains "framer-motion"

**How to avoid:** Use new import path: `import { motion } from "motion/react"`

```tsx
// Old way (still works but not recommended)
import { motion } from "framer-motion";

// New way (recommended)
import { motion } from "motion/react";
```

**Warning signs:** None (old imports still work), but follow current best practices

### Pitfall 4: Intersection Observer Without Cleanup

**What goes wrong:** Multiple observers created as component mounts/unmounts, causing memory leaks

**Why it happens:** Forgetting to call `observer.disconnect()` in useEffect cleanup

**How to avoid:** Always return cleanup function from useEffect

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(callback, options);
  targets.forEach((target) => observer.observe(target));

  // CRITICAL: Cleanup on unmount
  return () => observer.disconnect();
}, []);
```

**Warning signs:** Performance degrades over time, multiple callbacks firing for same elements

### Pitfall 5: Backdrop Blur Without Transparent Background

**What goes wrong:** backdrop-blur doesn't create visible glass effect

**Why it happens:** backdrop-filter only blurs what's BEHIND the element; element itself needs semi-transparent background

**How to avoid:** Always pair backdrop-blur with transparent background color

```tsx
// WRONG - no transparency
<div className="bg-background backdrop-blur-md">

// CORRECT - semi-transparent background
<div className="bg-background/80 backdrop-blur-md">

// Tailwind opacity syntax: /80 = 80% opacity = 20% transparent
```

**Warning signs:** No glass effect visible, element looks solid

### Pitfall 6: Z-Index Wars Between Header and Mobile Nav

**What goes wrong:** Elements appear above/below each other unexpectedly

**Why it happens:** Fixed positioning creates new stacking contexts; z-index values conflict

**How to avoid:** Establish clear z-index hierarchy and stick to it

```css
/* Recommended z-index values for layout */
:root {
  --z-header: 50;
  --z-mobile-nav: 40;
  --z-dropdown: 60;
  --z-modal: 100;
}

/* In components */
<header className="z-[var(--z-header)]" />
<nav className="z-[var(--z-mobile-nav)]" />
```

**Warning signs:** Elements hiding each other, unexpected layering

## Code Examples

Verified patterns from official sources:

### Installing Motion and Creating Basic Animation

```bash
# Source: https://www.npmjs.com/package/framer-motion
npm install framer-motion
```

```tsx
// Source: https://motion.dev/docs/react-animation
import { motion } from "motion/react";

export const FadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

### Scroll-Triggered Header Animation

```tsx
// Source: https://motion.dev/docs/react-animation
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const AnimatedHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/50"
      initial={{ height: 80 }}
      animate={{ height: scrolled ? 60 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav>
        {/* Navigation content */}
      </nav>
    </motion.header>
  );
};
```

### Active Section Detection with Intersection Observer

```tsx
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { useEffect, useState } from "react";

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px", // Trigger when section near top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
```

### HugeIcons Usage

```tsx
// Source: https://hugeicons.com/react-icons
// Note: @hugeicons/react v1.1.4 already installed
import { User, Briefcase01, Mail01 } from "@hugeicons/react";

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <a href="#about">
        <User className="w-6 h-6" />
      </a>
      <a href="#work">
        <Briefcase01 className="w-6 h-6" />
      </a>
      <a href="#contact">
        <Mail01 className="w-6 h-6" />
      </a>
    </nav>
  );
};
```

### Complete Layout Structure

```tsx
// App.tsx
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { MainLayout } from "@components/layout/MainLayout";

export const App = () => {
  return (
    <MainLayout>
      <Header />
      <main>
        <section id="about" className="min-h-screen">
          {/* About content */}
        </section>
        <section id="work" className="min-h-screen">
          {/* Work content */}
        </section>
        <section id="skills" className="min-h-screen">
          {/* Skills content */}
        </section>
        <section id="contact" className="min-h-screen">
          {/* Contact content */}
        </section>
      </main>
      <Footer />
    </MainLayout>
  );
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Framer Motion imports | Motion (motion/react) imports | 2025-2026 | New import path is standard, but npm package name remains framer-motion |
| JavaScript smooth scroll | CSS scroll-behavior: smooth | March 2022 | Native smooth scrolling is now widely supported |
| scroll event listeners | Intersection Observer API | March 2019 | Off-main-thread scroll detection, better performance |
| Manual backdrop-filter CSS | Tailwind backdrop-blur utilities | Tailwind v3+ | Standardized utility classes, easier responsive variants |
| Fixed header offset with JS | CSS scroll-padding-top | 2019+ | Native CSS solution, no JavaScript needed |

**Deprecated/outdated:**
- **element.scrollIntoView() for smooth scrolling**: Use CSS `scroll-behavior: smooth` instead (simpler, native)
- **window.addEventListener('scroll') for section tracking**: Use Intersection Observer instead (better performance)
- **@import "framer-motion"**: Use `import { motion } from "motion/react"` (new standard)
- **Manual scroll padding calculation**: Use `scroll-padding-top` CSS property (native, simpler)

## Open Questions

1. **Exact HugeIcons icon names for portfolio sections**
   - What we know: @hugeicons/react v1.1.4 is installed, package has 4,600+ icons
   - What's unclear: Exact icon component names for "user", "briefcase", "mail", etc.
   - Recommendation: Browse HugeIcons website or check package exports after installation; likely `User`, `Briefcase01`, `Mail01` based on naming conventions

2. **Motion scroll hooks availability**
   - What we know: Motion has `useScroll` and `useTransform` hooks for scroll-linked animations
   - What's unclear: Whether these are needed given our simpler requirements
   - Recommendation: Start with Intersection Observer for active section detection; use Motion hooks only if sophisticated scroll-linked animations are needed (e.g., scroll progress bar, parallax)

3. **Logo stroke animation implementation**
   - What we know: Context mentions "hand-written logo stroke animation"
   - What's unclear: Whether this requires SVG path animation or can use Motion's SVG animation features
   - Recommendation: Use Motion's SVG animation capabilities with `stroke-dasharray` and `stroke-dashoffset` CSS properties animated via Motion

4. **Mobile bottom nav progress ring**
   - What we know: Context mentions "glowing ring around active pill that fills with progress"
   - What's unclear: Exact visual design and progress calculation method
   - Recommendation: Use Motion's `animate` prop with SVG circle stroke animation, progress calculated from Intersection Observer data

## Sources

### Primary (HIGH confidence)

- **[Motion - React Animation](https://motion.dev/docs/react-animation)** - Official Motion documentation for React animations, motion components, animation props, variants, and transitions
- **[Tailwind CSS - backdrop-filter: blur()](https://tailwindcss.com/docs/backdrop-filter-blur)** - Official Tailwind CSS v4 documentation for backdrop blur utilities and glassmorphism effects
- **[MDN - scroll-behavior CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)** - MDN documentation for CSS scroll-behavior property (widely available since March 2022)
- **[MDN - Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)** - MDN documentation for Intersection Observer API (available since March 2019)
- **[npm - framer-motion](https://www.npmjs.com/package/framer-motion)** - Official npm package for Motion (Framer Motion) v12.29.0

### Secondary (MEDIUM confidence)

- **[Dev.to: Fixed Navigations and Sections - Here is scroll-padding](https://dev.to/einlinuus/fixed-navigations-and-sections-here-is-scroll-padding-25nb)** - Practical example of scroll-padding-top for fixed header offset (verified against MDN)
- **[Stack Overflow: React sticky header flickers on scroll](https://stackoverflow.com/questions/78992932/react-sticky-header-flickers-on-scroll-intersectionobserver-and-css-issues)** - Discussion of Intersection Observer vs CSS for scroll detection
- **[HugeIcons - The Best React Icon Library for Developers](https://hugeicons.com/react-icons)** - HugeIcons React package information (verified @hugeicons/react is installed in project)
- **[Hacker Noon: Creating a Dynamic Header in React](https://hackernoon.com/creating-a-dynamic-header-in-react-shrink-on-scroll-expand-on-top)** - Tutorial on scroll-triggered header transformations
- **[Medium: Advanced Framer Motion Animation Techniques for 2026](https://luxisdesign.io/blog/mastering-advanced-framer-motion-animation-techniques-in-2026)** - Current best practices for Motion animations in 2026

### Tertiary (LOW confidence)

- **[Web search: @hugeicons/react npm documentation](https://www.npmjs.com/package/@hugeicons/react)** - Package exists but exact icon names not verified
- **[Web search: Motion useScroll hook documentation](https://motion.dev/)** - Mentioned in navigation but specific page 404'd; capabilities known from general Motion knowledge

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified from official sources (Motion docs, Tailwind docs, MDN)
- Architecture: HIGH - Patterns verified against official documentation (Motion, MDN, Tailwind)
- Pitfalls: HIGH - Common issues documented in official guides and MDN warnings

**Research date:** 2026-01-24
**Valid until:** 2026-02-23 (30 days - Motion and Tailwind v4 are stable but actively developed; Intersection Observer and CSS features are stable)
