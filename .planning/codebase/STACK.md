# Technology Stack

**Analysis Date:** 2024-01-23

## Languages

**Primary:**
- TypeScript 5.9.3 - Core language for all source files
- JavaScript ES2022 - Target runtime (compiled by TypeScript)

**Secondary:**
- None - TypeScript is used exclusively

## Runtime

**Environment:**
- Node.js 20.11.1 (inferred from project setup notes)
- Browser environment (React DOM)

**Package Manager:**
- npm
- Lockfile: npm-shrinkwrap.json (not present yet, using package-lock.json)

## Frameworks

**Core:**
- React 19.2.0 - Main UI framework
- React DOM 19.2.0 - DOM rendering
- Vite 5.1.2 - Build tool and development server

**Testing:**
- Vitest 2.1.8 - Test runner
- React Testing Library 16.2.0 - Component testing
- @testing-library/jest-dom 6.9.1 - DOM matchers

**Build/Dev:**
- TypeScript 5.9.3 - Compiler
- Biome 1.9.4 - Linting and formatting
- babel-plugin-react-compiler 1.0.0 - React Compiler integration

## Key Dependencies

**Critical:**
- react@^19.2.0 - Core UI framework
- react-dom@^19.2.0 - DOM rendering
- vite@^5.1.2 - Build tool and dev server

**Infrastructure:**
- @vitejs/plugin-react@^5.1.2 - React plugin for Vite
- @types/node@^25.0.9 - Node.js type definitions
- @types/react@^19.2.5 - React type definitions
- @types/react-dom@^19.2.3 - React DOM type definitions

## Configuration

**Environment:**
- No environment variables detected (no .env files)
- Browser-only application (no backend integration)

**Build:**
- tsconfig.json - Project configuration with references
- tsconfig.app.json - TypeScript configuration for app code
- tsconfig.node.json - TypeScript configuration for Node.js files
- vite.config.ts - Vite build configuration with React Compiler
- vitest.config.ts - Vitest test configuration
- biome.json - Linting and formatting rules

## Platform Requirements

**Development:**
- Node.js 20.11.1 (minimum)
- npm package manager
- Modern browser (ES2022 support)

**Production:**
- Static hosting (Vite generates static assets)
- Browser environment with JavaScript support
- No server-side runtime required

---

*Stack analysis: 2024-01-23*