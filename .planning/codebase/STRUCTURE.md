# Codebase Structure

**Analysis Date:** 2024-01-23

## Directory Layout

```
/Users/florian/sources/portfolio/
├── src/                    # Source code directory
│   ├── main.tsx           # Application entry point
│   ├── App.tsx            # Root component
│   ├── components/        # Reusable components
│   │   └── ui/            # UI components directory (empty)
│   │       └── __tests__/ # UI component tests
│   ├── features/          # Feature-specific code
│   │   ├── home/          # Home feature directory (empty)
│   │   └── about/         # About feature directory (empty)
│   ├── layouts/          # Layout components (empty)
│   ├── hooks/            # Custom React hooks (empty)
│   ├── types/            # TypeScript definitions (empty)
│   ├── utils/            # Utility functions (empty)
│   └── test/             # Test utilities
│       └── setup.ts      # Test environment setup
├── public/               # Static assets
├── .planning/           # Project planning
│   └── codebase/        # Codebase analysis
├── dist/                # Build output
├── node_modules/        # Dependencies
└── config files         # Build and dev configs
```

## Directory Purposes

**src/** - Main source code directory containing all application code

**src/components/** - Reusable UI components
- Purpose: Self-contained, reusable UI elements
- Contains: UI component directory with __tests__ subdirectory
- Key files: `src/components/ui/__tests__/` (test location)

**src/features/** - Feature-based organization
- Purpose: Business features and page components
- Contains: Feature directories (home, about)
- Key files: To be created in future phases

**src/layouts/** - Layout components
- Purpose: Page-level layout components
- Contains: Layout directories (currently empty)
- Key files: To be created in Phase 2

**src/hooks/** - Custom React hooks
- Purpose: Reusable state and logic hooks
- Contains: Hook directories (currently empty)
- Key files: To be created as needed

**src/types/** - TypeScript definitions
- Purpose: Type definitions for the entire application
- Contains: Type directories (currently empty)
- Key files: To be created as needed

**src/utils/** - Utility functions
- Purpose: Shared helper functions and utilities
- Contains: Utility directories (currently empty)
- Key files: To be created as needed

**src/test/** - Test utilities and setup
- Purpose: Shared test configuration and utilities
- Contains: Test setup files
- Key files: `/Users/florian/sources/portfolio/src/test/setup.ts`

## Key File Locations

**Entry Points:**
- `/Users/florian/sources/portfolio/src/main.tsx`: Application entry point
- `/Users/florian/sources/portfolio/src/App.tsx`: Root component
- `/Users/florian/sources/portfolio/index.html`: HTML template

**Configuration:**
- `/Users/florian/sources/portfolio/package.json`: Project dependencies and scripts
- `/Users/florian/sources/portfolio/vite.config.ts`: Vite build configuration
- `/Users/florian/sources/portfolio/vitest.config.ts`: Vitest configuration
- `/Users/florian/sources/portfolio/tsconfig.json`: TypeScript configuration
- `/Users/florian/sources/portfolio/biome.json`: Linting and formatting configuration

**Core Logic:**
- `/Users/florian/sources/portfolio/src/App.tsx`: Application container
- `/Users/florian/sources/portfolio/src/test/setup.ts`: Test environment setup

**Testing:**
- `/Users/florian/sources/portfolio/src/App.test.tsx`: App component tests
- `/Users/florian/sources/portfolio/src/main.test.tsx`: Main component tests
- `/Users/florian/sources/portfolio/src/test/setup.ts`: Shared test setup

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `App.tsx`, `Dialog.tsx`)
- Features: lowercase (e.g., `home/`, `about/`)
- Utilities: camelCase (e.g., `utils/helpers.ts`)
- Tests: `.test.tsx` or `.spec.tsx` suffix

**Directories:**
- Components: PascalCase (e.g., `components/`, `ui/`)
- Features: lowercase (e.g., `features/`, `home/`)
- Utilities: lowercase (e.g., `utils/`, `hooks/`)

**Exports:**
- Components: Named exports (e.g., `export const App = () => {}`)
- Utilities: Named exports (e.g., `export const utility = () => {}`)
- Default exports: Not used except for entry points

## Where to Add New Code

**New Feature:**
- Primary code: `src/features/[feature-name]/`
- Tests: `src/features/[feature-name]/__tests__/`

**New Component/Module:**
- Implementation: `src/components/ui/[ComponentName]/`
  - Main component: `src/components/ui/[ComponentName]/[ComponentName].tsx`
  - Sub-components: `src/components/ui/[ComponentName]/[Part].tsx`
  - Tests: `src/components/ui/[ComponentName]/__tests__/[ComponentName].test.tsx`
- Assembly: `src/components/ui/index.ts` (if multiple components)

**Utilities:**
- Shared helpers: `src/utils/[utility].ts`
- Hooks: `src/hooks/[useHookName].ts`

## Special Directories

**node_modules/**:
- Purpose: Dependencies installation
- Generated: Yes
- Committed: No (in .gitignore)

**dist/**:
- Purpose: Build output
- Generated: Yes
- Committed: No (in .gitignore)

**.planning/**:
- Purpose: Project planning and documentation
- Generated: Yes
- Committed: Yes (contains analysis documents)

**public/**:
- Purpose: Static assets
- Generated: No (user content)
- Committed: Yes

---

*Structure analysis: 2024-01-23*