# Coding Conventions

**Analysis Date:** 2024-01-23

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `App.tsx`)
- Test files: `.test.tsx` suffix (e.g., `App.test.tsx`)
- Setup files: Descriptive names (e.g., `setup.ts`)

**Functions:**
- Arrow functions exclusively
- Component names: PascalCase (e.g., `App`)
- Export style: Named exports (`export const App`)

**Variables:**
- `const` by default for immutability
- `var` when reassignment is needed
- Never use `let`
- Descriptive, camelCase names (e.g., `containerStyle`, `rootElement`)

**Types:**
- Interface names descriptive (e.g., `React.FC`)
- Type annotations explicit where needed
- Inferred types when clear from context

## Code Style

**Formatting:**
- Tool: Biome configured in `biome.json`
- Indent: 2 spaces
- Line width: 100 characters
- Semicolons: Always
- Quotes: Double quotes for JSX
- Trailing commas: All

**Linting:**
- Tool: Biome with warnings treated as errors
- Key rules enforced:
  - `useConst`: error (prefer const)
  - `noVar`: off (but var only when needed)
  - `noExplicitAny`: warn
  - All recommended rules enabled

## Import Organization

**Order:**
1. React imports (e.g., `import type React from "react"`)
2. Third-party imports (e.g., `import { render } from "@testing-library/react"`)
3. Local imports (e.g., `import { App } from "./App"`)

**Path Aliases:**
- Not configured in current setup
- Relative imports used throughout

## Error Handling

**Patterns:**
- Runtime errors thrown when conditions fail (e.g., root element not found)
- Type safety enforced through TypeScript strict mode
- Biome linter catches potential issues early

**Current Examples:**
```typescript
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
```

## Logging

**Framework:** Not implemented yet

**Patterns:**
- No logging framework currently configured
- Debug logging would need to be added

## Comments

**When to Comment:**
- Complex logic
- Important business rules
- Edge cases
- Not on self-explanatory code

**JSDoc/TSDoc:**
- Not currently used in the codebase
- Could be added for complex components and utilities

## Function Design

**Size:** Currently simple and focused
- App component: 8 lines
- Main component: 16 lines

**Parameters:** Component props follow React.FC pattern
```typescript
export const App: React.FC = () => { ... };
```

**Return Values:** React JSX elements

## Module Design

**Exports:**
- Named exports exclusively
- No default exports
- No barrel files yet

**Structure:**
- Components in separate files
- Test files co-located with components (e.g., `App.tsx` + `App.test.tsx`)
- Setup file in dedicated test directory

---

*Convention analysis: 2024-01-23*