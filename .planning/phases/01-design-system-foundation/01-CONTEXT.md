# Phase 1: Design System Foundation - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

## Phase Boundary

Set up shadcn/ui infrastructure with Tailwind CSS and TypeScript configuration. This phase establishes the tooling and configuration foundation — no actual UI components or features are built yet. The goal is to enable rapid component development in later phases by having the design system primitives ready.

## Implementation Decisions

### Configuration approach
- **Max strictness**: Full TypeScript strict mode, all linters enabled, fail fast on errors
- **Standard dependency ranges**: Use caret (^) ranges, don't pin exact versions
- **Minimal documentation**: Let code speak for itself, only document non-obvious deviations
- **Shadcn conventions**: You have discretion to balance shadcn defaults with project needs

### Path alias structure
- **Category-based aliases**: Use granular aliases like @components/*, @lib/*, @utils/* instead of flat @/*
- **Feature-based folder structure**: Follow CLAUDE.md's feature-based approach, not shadcn's default folder layout
- **Start minimal**: Only define aliases needed for phase 1, add more in later phases as needed

### Component strategy
- **Just-in-time installation**: Install shadcn components when needed in later phases, don't pre-build now
- **Use as-is**: Keep shadcn components in their default style (arrows, default exports) rather than forcing project standards
- **Centralized UI folder**: All shadcn UI components go in components/ui/ regardless of feature-based organization elsewhere

### Theme foundation
- **Dark mode ready**: Support dark mode from the start with system preference detection
- **Nova style**: Use shadcn's Nova style as the base
- **Zinc base color**: Use Zinc as the base color palette
- **HugeIcons**: Use HugeIcons as the icon library
- **Aesthetic direction**: You have discretion on modern portfolio aesthetic choices

## Specific Ideas

- Nova style with Zinc base color and HugeIcons for the design system
- Dark mode support should be implemented from day one
- Balance shadcn defaults with feature-based project structure

## Deferred Ideas

None — discussion stayed within phase scope.

---

*Phase: 01-design-system-foundation*
*Context gathered: 2026-01-23*
