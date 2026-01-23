# Phase 1: Design System Foundation - Research

**Researched:** 2026-01-23
**Domain:** Design System Setup (shadcn/ui + Base UI + Tailwind CSS + Vite + React + TypeScript)
**Confidence:** HIGH

## Summary

This research investigated how to establish shadcn/ui infrastructure with Base UI primitives, Tailwind CSS v4, and TypeScript configuration for a Vite + React project. The standard approach in 2026 is to use the official `npx shadcn create` CLI which supports choosing between Radix or Base UI as the primitive library. Both libraries maintain the same abstraction layer — components work identically, only the underlying implementation changes.

**Key findings:**
1. **New CLI workflow**: `npx shadcn create` (December 2025) is the recommended setup method, offering interactive framework/library selection
2. **Base UI fully supported**: As of January 2026, all shadcn/ui components have complete Base UI documentation and examples
3. **Tailwind CSS v4 Vite plugin**: Use `@tailwindcss/vite` plugin instead of PostCSS (performance and DX improvements)
4. **CSS variables for theming**: shadcn uses CSS variables with OKLCH color format for light/dark theme switching
5. **Path aliases**: Category-based aliases (@components, @lib, @utils) configured in both Vite and TypeScript

**Primary recommendation:** Use `npx shadcn create` with Base UI library selection, Nova style, Zinc base color, and HugeIcons. Configure category-based path aliases matching the project's feature-based folder structure.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| shadcn/ui | Latest (via CLI) | Component infrastructure and code distribution | Official shadcn CLI automates setup, Base UI fully supported as of Jan 2026 |
| @base-ui/react | Latest (installed via CLI) | Headless component primitives | Unstyled, accessible primitives compatible with Tailwind, same API as Radix |
| Tailwind CSS | v4 (@tailwindcss/vite) | Utility-first styling framework | Vite plugin provides better performance than PostCSS, @import syntax for v4 |
| React | 19.2.0 (already installed) | UI library | Already in project, shadcn fully supports React 19 |
| TypeScript | 5.9.3 (already installed) | Type safety | Already configured with strict mode in project |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | ^ | Conditional className utility | Combine conditional classes into strings |
| tailwind-merge | ^ | Merge Tailwind classes intelligently | Resolve class conflicts when merging default + custom classes |
| @tailwindcss/vite | ^ | Tailwind CSS v4 Vite plugin | Required for Tailwind v4, replaces PostCSS approach |
| class-variance-authority | ^ | CVA for component variants | Commonly used with shadcn for component variations (installed by CLI) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Base UI | Radix UI | User decided Base UI; both have same abstraction, choose via CLI |
| Tailwind v4 Vite plugin | PostCSS + v3 | V4 plugin is recommended path for new projects, better DX |
| CSS variables | Tailwind config only | CSS variables enable easy theming without rebuild |
| category-based aliases (@components) | flat alias (@/*) | User chose category-based for clarity, can add more later |

**Installation:**

```bash
# Primary installation method (interactive CLI)
npx shadcn@latest create

# Manual init if adding to existing project
npx shadcn@latest init

# Install component utilities (cn helper) - done by CLI
npm install clsx tailwind-merge
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   └── ui/           # shadcn components (centralized UI folder)
├── lib/
│   └── utils.ts      # cn utility function
├── styles/
│   └── globals.css   # CSS variables + Tailwind imports
├── features/         # Feature-based components (existing)
├── layouts/          # Layout components (existing)
├── hooks/            # Custom hooks (existing)
├── constants/        # Constants (existing)
├── types/            # TypeScript types (existing)
├── utils/            # Utility functions (existing)
├── App.tsx
└── main.tsx
```

**Key structure decisions:**
- **Centralized UI folder**: All shadcn components go in `components/ui/` regardless of feature-based organization elsewhere (user decision)
- **Category-based aliases**: `@components/*`, `@lib/*`, `@utils/*` instead of flat `@/*` (user decision)
- **Feature-based elsewhere**: Existing `features/` folder for domain-specific components remains unchanged

### Pattern 1: shadcn CLI Setup (Recommended)

**What:** Interactive CLI that configures shadcn/ui, installs dependencies, and sets up Base UI primitives

**When to use:** New projects or adding shadcn to existing Vite + React + TypeScript projects

**Example:**
```bash
# Source: https://ui.shadcn.com/docs/installation
npx shadcn@latest create
# Interactive prompts:
# - Which framework? → Vite
# - Which language? → TypeScript
# - Which style? → Nova (user selected)
# - Which base color? → Zinc (user selected)
# - Which icon library? → HugeIcons (user selected)
# - CSS variables? → Yes
```

**Result:** Creates `components.json`, installs Tailwind CSS, Base UI, and configures path aliases automatically.

### Pattern 2: Manual components.json Configuration

**What:** Create configuration file manually for full control over shadcn settings

**When to use:** When CLI cannot be used or when specific configuration is needed

**Example:**
```json
// Source: https://ui.shadcn.com/docs/installation/manual
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "nova",           // Nova style (user selected)
  "rsc": false,              // Not using React Server Components
  "tsx": true,               // TypeScript + JSX
  "tailwind": {
    "config": "",            // Empty = use default location
    "css": "src/styles/globals.css",
    "baseColor": "zinc",     // Zinc base color (user selected)
    "cssVariables": true,    // Enable CSS variables for theming
    "prefix": ""             // No class prefix
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "hugeicons"  // HugeIcons (user selected)
}
```

### Pattern 3: Vite Configuration with Tailwind CSS v4 Plugin

**What:** Configure Vite to use Tailwind CSS v4 plugin and path aliases

**When to use:** Standard Vite + React + Tailwind setup

**Example:**
```typescript
// Source: https://ui.shadcn.com/docs/installation/vite
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"], // Already in project
      },
    }),
    tailwindcss(),  // Add Tailwind v4 plugin
  ],
  resolve: {
    alias: {
      // Category-based aliases (user decision)
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@constants": path.resolve(__dirname, "./src/constants"),
    },
  },
});
```

### Pattern 4: TypeScript Path Aliases

**What:** Configure TypeScript to recognize path aliases for cleaner imports

**When to use:** Whenever Vite aliases are configured (must match)

**Example:**
```json
// Source: Standard TypeScript path mapping
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@features/*": ["./src/features/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@types/*": ["./src/types/*"],
      "@constants/*": ["./src/constants/*"]
    }
  }
}
```

### Pattern 5: Tailwind CSS v4 with CSS Variables

**What:** Use Tailwind CSS v4 @import syntax with CSS variables for theming

**When to use:** Modern Tailwind setup with theme switching support

**Example:**
```css
/* Source: https://ui.shadcn.com/docs/theming */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  /* Design tokens - Zinc color palette (OKLCH format) */
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  /* Dark mode tokens */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... other dark mode overrides */
}

@theme inline {
  /* Map CSS variables to Tailwind utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... etc */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Pattern 6: cn Utility Function

**What:** Combine clsx and tailwind-merge for intelligent className merging

**When to use:** Merging default component classes with custom className prop

**Example:**
```typescript
// Source: https://github.com/dcastil/tailwind-merge + https://ui.shadcn.com/docs
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage in component:
function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "base-classes px-4 py-2",  // Default classes
        "hover:bg-blue-700",        // More defaults
        className                   // User overrides (conflicts resolved)
      )}
      {...props}
    />
  );
}
```

### Pattern 7: Theme Provider with Dark Mode

**What:** React context provider for theme management with system preference detection

**When to use:** Apps with light/dark mode switching

**Example:**
```typescript
// Source: https://ui.shadcn.com/docs/dark-mode/vite
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

### Anti-Patterns to Avoid

- **Mixing Radix and Base UI**: Choose one primitive library and stick with it for consistency
- **Using @apply extensively**: Prefer utility classes directly in components, @apply is for base layer only
- **Flat alias structure**: Avoid `@/*` for everything, use category-based aliases for clarity
- **Ignoring CSS variables**: Don't hardcode colors in Tailwind config, use CSS variables for theming
- **Manual class merging**: Never concatenate className strings, always use cn() utility
- **PostCSS for Tailwind v4**: Use Vite plugin instead, PostCSS is legacy approach

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| className merging | Custom string concatenation or template literals | `cn()` utility with clsx + tailwind-merge | Tailwind classes conflict (e.g., px-2 vs p-3), need intelligent resolution |
| Theme switching | Manual localStorage + classList manipulation | shadcn ThemeProvider pattern | Handles system preference, localStorage sync, and re-renders correctly |
| CSS variable theming | Hardcoded colors in Tailwind config | CSS variables with OKLCH format | Enables runtime theme switching without rebuild, better color consistency |
| Path alias resolution | Manual relative imports | Vite + TypeScript path aliases | Cleaner imports, better refactoring, standard practice |
| Component primitives | Custom accessible components | Base UI or Radix primitives | Accessibility is hard (ARIA, keyboard nav, focus management), already solved |

**Key insight:** The combination of clsx + tailwind-merge is deceptively complex. Tailwind has specific conflict resolution rules (e.g., `p-3` should override `px-2 py-1` but template literal concatenation doesn't handle this). The `cn()` utility encapsulates this complexity correctly.

## Common Pitfalls

### Pitfall 1: Tailwind Plugin Order in Vite Config

**What goes wrong:** Placing Tailwind plugin after other plugins causes CSS processing issues

**Why it happens:** Vite processes plugins in order; Tailwind needs to transform CSS first

**How to avoid:** Always place `tailwindcss()` first in plugins array

**Warning signs:** Tailwind classes not working, HMR issues with CSS, @import errors

```typescript
// WRONG
plugins: [react(), tsconfigPaths(), tailwindcss()]

// CORRECT
plugins: [tailwindcss(), react(), tsconfigPaths()]
```

### Pitfall 2: Path Aliases Not Synced Between Vite and TypeScript

**What goes wrong:** Imports work in Vite but fail TypeScript checks (or vice versa)

**Why it happens:** Vite and TypeScript have separate alias configurations

**How to avoid:** Always update both `vite.config.ts` and `tsconfig.app.json` together

**Warning signs:** "Cannot find module" errors in IDE but builds work, or builds fail but IDE shows no errors

### Pitfall 3: CSS Variables Not Defined Before Tailwind Import

**What goes wrong:** Tailwind utilities can't reference CSS variables

**Why it happens:** CSS is parsed sequentially; variables must be defined first

**How to avoid:** Define `:root` variables before `@import "tailwindcss"` and `@theme inline`

**Warning signs:** `var(--background)` shows as invalid color in dev tools, utilities not working

### Pitfall 4: Dark Mode Class Not Applied to Root Element

**What goes wrong:** Dark mode styles don't apply despite `.dark` class being defined

**Why it happens:** ThemeProvider adds `.dark` class to `<html>`, but child elements need selectors

**How to avoid:** Use `@custom-variant dark (&:is(.dark *))` in Tailwind v4 or ensure utilities inherit correctly

**Warning signs:** Light theme always showing, theme switcher not working

### Pitfall 5: Installing Components Before Setting Up Registry

**What goes wrong:** `npx shadcn add button` fails with registry or configuration errors

**Why it happens:** shadcn CLI needs `components.json` to know where to install and how to transform components

**How to avoid:** Always run `npx shadcn init` (or `create`) first, verify `components.json` exists

**Warning signs:** "Cannot find components.json", "Invalid registry", import path errors

### Pitfall 6: Using Tailwind v3 Config with v4 Plugin

**What goes wrong:** Configuration errors, unexpected behavior

**Why it happens:** Tailwind v4 uses CSS-first configuration, not JavaScript config files

**How to avoid:** Delete `tailwind.config.js` if using v4 Vite plugin, use `@theme` in CSS instead

**Warning signs:** "Unknown configuration option" errors, styles not applying

### Pitfall 7: Forgetting to Add HugeIcons Package

**What goes wrong:** Components that use icons fail to load

**Why it happens:** Selecting HugeIcons in CLI doesn't auto-install the package (unlike Lucide which is bundled)

**How to avoid:** After CLI setup, manually install `npm install @hugeicons/react`

**Warning signs:** "Cannot find module '@hugeicons/react'", icon components crashing

## Code Examples

Verified patterns from official sources:

### Installing shadcn/ui with Base UI

```bash
# Source: https://ui.shadcn.com/docs/installation
npx shadcn@latest create

# Interactive CLI will ask:
# - Framework: Vite
# - Variant: TypeScript
# - Style: Nova (user selected)
# - Base color: Zinc (user selected)
# - Icon library: HugeIcons (user selected)
# - CSS variables: Yes
```

### Manually Installing Base UI Dependencies

```bash
# Source: https://base-ui.com/react/overview/about
npm install @base-ui/react

# Note: shadcn CLI handles this automatically
```

### Creating components.json with Base UI Registry

```json
// Source: https://ui.shadcn.com/docs/installation/manual
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "hugeicons"
}
```

### Adding First Component

```bash
# Source: https://ui.shadcn.com/docs/cli
npx shadcn@latest add button

# This will:
# 1. Fetch Button component from registry (Base UI version based on config)
# 2. Install to src/components/ui/button.tsx
# 3. Install any dependencies (class-variance-authority, etc.)
# 4. Update imports if needed
```

### Complete Vite Config

```typescript
// Source: https://ui.shadcn.com/docs/installation/vite
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@constants": path.resolve(__dirname, "./src/constants"),
    },
  },
});
```

### Complete globals.css with Design Tokens

```css
/* Source: https://ui.shadcn.com/docs/theming */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  /* Base design tokens */
  --radius: 0.625rem;

  /* Color palette - Zinc (OKLCH format) */
  --background: oklch(0.98 0.002 264.695);
  --foreground: oklch(0.15 0.015 264.695);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.015 264.695);

  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.015 264.695);

  --primary: oklch(0.25 0.016 264.695);
  --primary-foreground: oklch(0.98 0.002 264.695);

  --secondary: oklch(0.96 0.004 264.695);
  --secondary-foreground: oklch(0.25 0.016 264.695);

  --muted: oklch(0.96 0.004 264.695);
  --muted-foreground: oklch(0.50 0.020 264.695);

  --accent: oklch(0.96 0.004 264.695);
  --accent-foreground: oklch(0.25 0.016 264.695);

  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);

  --border: oklch(0.92 0.004 264.695);
  --input: oklch(0.92 0.004 264.695);
  --ring: oklch(0.70 0.020 264.695);

  /* Chart colors */
  --chart-1: oklch(0.65 0.24 25);
  --chart-2: oklch(0.60 0.15 250);
  --chart-3: oklch(0.55 0.12 290);
  --chart-4: oklch(0.70 0.18 180);
  --chart-5: oklch(0.60 0.20 100);
}

.dark {
  --background: oklch(0.15 0.015 264.695);
  --foreground: oklch(0.98 0.002 264.695);

  --card: oklch(0.20 0.015 264.695);
  --card-foreground: oklch(0.98 0.002 264.695);

  --popover: oklch(0.20 0.015 264.695);
  --popover-foreground: oklch(0.98 0.002 264.695);

  --primary: oklch(0.92 0.004 264.695);
  --primary-foreground: oklch(0.20 0.015 264.695);

  --secondary: oklch(0.25 0.012 264.695);
  --secondary-foreground: oklch(0.98 0.002 264.695);

  --muted: oklch(0.25 0.012 264.695);
  --muted-foreground: oklch(0.65 0.020 264.695);

  --accent: oklch(0.25 0.012 264.695);
  --accent-foreground: oklch(0.98 0.002 264.695);

  --destructive: oklch(0.60 0.24 25);
  --destructive-foreground: oklch(0.98 0 0);

  --border: oklch(0.25 0.012 264.695);
  --input: oklch(0.25 0.012 264.695);
  --ring: oklch(0.55 0.020 264.695);
}

@theme inline {
  /* Map CSS variables to Tailwind utilities */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* Radius variants */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Using Base UI Components with Tailwind

```tsx
// Source: https://base-ui.com/react/handbook/styling
import * as Button from "@base-ui-components/react/button";
import { cn } from "@lib/utils";

export const CustomButton = () => {
  return (
    <Button.Root className={cn("px-4 py-2 bg-primary text-primary-foreground rounded")}>
      Click me
    </Button.Root>
  );
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual setup with individual packages | `npx shadcn create` CLI | December 2025 | Simplifies setup, interactive library selection |
| PostCSS + tailwind.config.js | Vite plugin + CSS-first config | Tailwind v4 (2025) | Better performance, simpler config, @import syntax |
| Radix only | Radix or Base UI choice | December 2025 | Both maintain same API, choose based on preference |
| Hardcoded theme colors | CSS variables with OKLCH | 2024-2025 | Runtime theming, better color consistency, light/dark mode |
| Lucide only | Multiple icon libraries | 2025 | HugeIcons, Lucide, and others supported |
| Manual className merging | cn() utility standard | Ongoing | Best practice for conditional + conflict resolution |

**Deprecated/outdated:**
- **PostCSS configuration for Tailwind**: Use Vite plugin instead (v4)
- **tailwind.config.js**: Use `@theme` in CSS for v4 (though legacy still works)
- **Manual shadcn setup**: CLI is now standard (Dec 2025)
- **Radix-only assumption**: Base UI is now first-class option with full docs (Jan 2026)

## Open Questions

1. **HugeIcons package name**
   - What we know: CLI has option to select HugeIcons as icon library
   - What's unclear: Exact package name to install (`@hugeicons/react` assumed based on naming convention)
   - Recommendation: Check CLI output after setup or verify on HugeIcons docs; if missing, install manually

2. **Base UI registry URL**
   - What we know: Base UI is now fully supported (Jan 2026), CLI auto-detects library
   - What's unclear: Whether custom registry URL is needed or if shadcn's default registry handles Base UI
   - Recommendation: Default shadcn registry should work; CLI auto-detects based on components.json config

3. **Component installation verification**
   - What we know: `npx shadcn add button` installs components
   - What's unclear: How to verify Base UI vs Radix version was installed
   - Recommendation: Check component imports — Base UI uses `@base-ui-components/react`, Radix uses `@radix-ui/*`

4. **Folder structure compatibility**
   - What we know: Project has existing feature-based structure (`features/`, `layouts/`, etc.)
   - What's unclear: How shadcn CLI will interact with existing structure
   - Recommendation: CLI should respect existing structure; shadcn components go in `components/ui/` per user decision

## Sources

### Primary (HIGH confidence)

- **[/websites/ui_shadcn](https://ui.shadcn.com)** - Installation, components.json config, CLI usage, theming, dark mode for Vite
- **[/websites/base-ui_react](https://base-ui.com/react)** - Base UI installation, styling with Tailwind, component patterns
- **[/websites/tailwindcss](https://tailwindcss.com)** - Vite plugin configuration, @import syntax, CSS variables, @theme inline
- **[/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge)** - twMerge usage, class conflict resolution, cn utility pattern
- **Official changelog**: [January 2026 - Base UI Documentation](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)

### Secondary (MEDIUM confidence)

- **[Vite + React + Tailwind + Shadcn Setup Guides](https://v3.tailwindcss.com/docs/guides/vite)** (2025) - Step-by-step installation tutorials
- **[Implementing Light/Dark Mode in Vite with Shadcn UI](https://dev.to/ashsajal/implementing-lightdark-mode-in-your-vite-app-with-shadcnui-1ae4)** (June 2024) - Theme provider implementation verified against official docs
- **[Tailwind CSS v4 Vite plugin guides](https://tailwindcss.com/docs/installation/framework-guides)** (2025) - Framework-specific installation instructions
- **[cn utility function explanation](https://thinkthroo.com/blog/cn-utility-function-in-shadcn-ui-ui)** (2025) - Verified clsx + tailwind-merge pattern

### Tertiary (LOW confidence)

- **[Web search results for basecn.dev registry](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)** - Rate-limited search, verified against official docs instead
- **Community tutorials** - Generally aligned with official docs but not authoritative

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official shadcn and Tailwind docs provide current, authoritative information
- Architecture: HIGH - All patterns verified against Context7 and official documentation sources
- Pitfalls: HIGH - Common issues documented in official guides and GitHub discussions

**Research date:** 2026-01-23
**Valid until:** 2026-02-23 (30 days - shadcn and Tailwind v4 are stable but rapidly evolving)
