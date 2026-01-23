# Architecture

**Analysis Date:** 2024-01-23

## Pattern Overview

**Overall:** Feature-based Monorepo with Composition Pattern

**Key Characteristics:**
- React + TypeScript with Vite build system
- Feature-based organization with clear separation of concerns
- Composition Pattern for complex UI components
- Component-based architecture with inline styles
- Test-driven development with Vitest + React Testing Library
- React Compiler enabled for performance optimization

## Layers

**Application Layer:**
- Purpose: Root application entry point and main layout
- Location: `/Users/florian/sources/portfolio/src/main.tsx` (entry point), `/Users/florian/sources/portfolio/src/App.tsx`
- Contains: Application initialization, root component, basic styling
- Depends on: React, ReactDOM
- Used by: Browser rendering

**Feature Layer:**
- Purpose: Business logic and feature-specific components
- Location: `/Users/florian/sources/portfolio/src/features/`
- Contains: Feature directories (home, about, etc.)
- Depends on: Component layer, utilities, types
- Used by: Application layer through routing

**Component Layer:**
- Purpose: Reusable UI components and design system
- Location: `/Users/florian/sources/portfolio/src/components/`
- Contains: UI components with Composition Pattern
- Depends on: React, types, utilities
- Used by: Feature layer, application layer

**Utility Layer:**
- Purpose: Shared utilities and helper functions
- Location: `/Users/florian/sources/portfolio/src/utils/`
- Contains: Common utilities and helper functions
- Depends on: Core JavaScript, TypeScript
- Used by: All layers above

**Type Layer:**
- Purpose: TypeScript type definitions and interfaces
- Location: `/Users/florian/sources/portfolio/src/types/`
- Contains: Type definitions for components, utilities, and features
- Depends on: TypeScript core types
- Used by: All layers

**Test Layer:**
- Purpose: Unit and integration testing
- Location: `/Users/florian/sources/portfolio/src/test/`
- Contains: Test utilities and shared test setup
- Depends on: Vitest, Testing Library, jest-dom matchers
- Used by: Development workflow

## Data Flow

**Application Initialization Flow:**

1. `main.tsx` - Creates React root and renders App in StrictMode
2. `App.tsx` - Root component with container styling and placeholder content
3. Feature components - To be implemented in future phases
4. UI components - To be created in Phase 2

**Component Composition Flow:**

1. Main component exports from index.ts
2. Sub-components attached as properties
3. Context passed through composition hierarchy
4. Styling applied via inline styles

**Development Flow:**

1. Write tests using TDD approach
2. Implement components to pass tests
3. Run TypeScript checks: `npm run build`
4. Run Biome checks: `npm run lint`
5. Run tests: `npm run test`

## Key Abstractions

**Feature Component:**
- Purpose: Represents a complete feature section
- Examples: `/Users/florian/sources/portfolio/src/features/home/` (planned)
- Pattern: Container + presentation components with own file organization

**UI Component:**
- Purpose: Reusable primitive components
- Examples: `/Users/florian/sources/portfolio/src/components/ui/` (planned)
- Pattern: Composition Pattern with named exports and property attachment

**Utility Function:**
- Purpose: Shared business logic and helpers
- Examples: `/Users/florian/sources/portfolio/src/utils/` (to be implemented)
- Pattern: Pure functions with clear single responsibilities

**Hook:**
- Purpose: React state and lifecycle management
- Examples: `/Users/florian/sources/portfolio/src/hooks/` (to be implemented)
- Pattern: Custom hooks with consistent naming pattern

## Entry Points

**Application Entry:**
- Location: `/Users/florian/sources/portfolio/src/main.tsx`
- Triggers: React DOM rendering
- Responsibilities: Root creation, error handling, StrictMode

**Component Entry:**
- Location: `/Users/florian/sources/portfolio/src/App.tsx`
- Triggers: Main application rendering
- Responsibilities: Basic layout, placeholder content

**Build Entry:**
- Location: `/Users/florian/sources/portfolio/vite.config.ts`
- Triggers: Development server and production builds
- Responsibilities: Plugin configuration, bundling setup

**Test Entry:**
- Location: `/Users/florian/sources/portfolio/src/test/setup.ts`
- Triggers: Test environment setup
- Responsibilities: Testing utilities, matchers, cleanup

## Error Handling

**Strategy:** Defensive programming with clear error messages

**Patterns:**
- Root element validation in main.tsx
- TypeScript strict mode for compile-time checks
- Biome linting rules for code quality
- Vitest for test coverage

## Cross-Cutting Concerns

**Logging:** Currently using console.log (to be enhanced with logging library)
**Validation:** TypeScript types and runtime checks
**Styling:** Inline styles for component styling (to be enhanced with theme system)

---

*Architecture analysis: 2024-01-23*