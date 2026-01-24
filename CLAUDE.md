# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Developer Profile

Full Stack Web Developer

- Frontend: React + TypeScript
- Backend: C# .NET

## Technology Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Compiler**: React Compiler enabled
- **Linting/Formatting**: Biome (warnings treated as errors)
- **Testing**: Vitest + React Testing Library

## Coding Standards & Rules

### 1. Dependencies

Use as few libraries as possible - prefer writing custom solutions over adding dependencies.

### 2. Function Declarations

Always use arrow functions.

```typescript
// Good
const handleClick = () => { ... }

// Bad
function handleClick() { ... }
```

### 3. Variable Declarations

- Use `const` by default (whenever possible)
- Use `var` instead of `let` (when reassignment is needed)
- Never use `let`

```typescript
// Good - const for immutability
const componentName = "Button";

// Good - var when reassignment is needed
var counter = 0;
counter = counter + 1;

// Bad - never use let
let counter = 0;
```

### 4. Component Organization

- Each component must have its own file
- Use named exports (`export const ComponentName`) instead of default exports
- Follow the **Composition Pattern** as the primary architectural pattern

```typescript
// Good - named export
export const Button = () => { ... };

// Bad - default export
export default function Button() { ... }
```

### 5. Error Handling

Treat compiler warnings as errors. The build must fail on any warning.

### 6. Development Methodology

Spec and Test Driven Development (TDD):

- Write specs/tests first
- Then implement to make tests pass
- Tests cover all critical functionality

### 7. Code Quality Workflow

**Before implementing new code:**

- Think about and write tests first (TDD approach)

**After implementing code:**

1. Run TypeScript checks: `npm run build` (runs `tsc -b`)
2. Run Biome checks: `npm run lint`
3. Fix any errors found
4. Run tests: `npm run test -- --run`

This workflow ensures code quality and catches issues early.

### 8. Storybook

Storybook is configured for component development and documentation.

#### Running Storybook

```bash
npm run storybook
```

#### Building Storybook

```bash
npm run build-storybook
```

#### Story Conventions

- **File Location**: Place stories next to components: `Component.stories.tsx`
- **Format**: Use CSF3 (Component Story Format 3)
- **Exports**: Named exports only (no default exports)
- **Meta Object**: Use `satisfies Meta<typeof Component>` for type safety
- **Title Pattern**: Use hierarchical naming (e.g., "UI/Button", "Features/Auth/LoginForm")
- **Tags**: Add `autodocs` tag for automatic documentation generation
- **Layout**: Use `layout: "centered"` for UI components

### 8.1 UI Component Development Workflow

When implementing new UI components, follow this workflow for visual inspection and testing:

**Workflow Steps:**

1. **Write the Component**: Implement the component following coding standards
2. **Write a Story**: Create a `.stories.tsx` file next to the component
3. **Start Storybook**: Run `npm run storybook` in background mode
4. **Visual Inspection**: Use Playwright MCP to inspect the component
   - Navigate to the story URL (typically http://localhost:6006)
   - Take accessibility snapshot to verify structure
   - Optionally take screenshot for visual verification
5. **Adjust**: Make any necessary adjustments based on observations
6. **Stop Storybook**: Clean up background process when done

**Storybook URL Pattern:**

- Storybook runs on http://localhost:6006
- Individual story URLs: `http://localhost:6006/?path=/story/{title}`
  - Example: `http://localhost:6006/?path=/story/ui-button--default`

**URL Construction Rules:**

- Lowercase the title from the meta object
- Replace `/` with `-`
- Replace spaces with `-`
- Append `--{story-name}`

**Playwright MCP Tools:**

- `browser_navigate` - Navigate to Storybook URL
- `browser_snapshot` - **Primary tool** - Get accessibility tree (LLM-friendly)
- `browser_take_screenshot` - Optional visual verification
- `browser_click` - Interact with components
- `browser_evaluate` - Run JavaScript in browser
- `browser_close` - Clean up browser session

### 9. Code Quality

Clean Code principles and best practices are paramount:

- Meaningful names
- Small, focused functions
- Single responsibility principle
- DRY (Don't Repeat Yourself)

### 10. Composition Pattern

The Composition Pattern is the primary architectural pattern for building complex UI components.

#### 10.1 Component Structure

- **Multi-File Organization**: Each part of a compound component lives in its own file
- **Component Folder**: All parts organized in a folder named after the component
- **Named Exports**: Each part uses named exports
- **Property Attachment**: Sub-components attached as properties via index.ts (e.g., `Dialog.Header`)
- **Arrow Functions**: All components use arrow functions
- **Type Safety**: Full TypeScript support with proper typing

#### 10.2 File Structure

```
Dialog/
├── Dialog.tsx           # Main component
├── Header.tsx           # Sub-component
├── Content.tsx          # Sub-component
├── Footer.tsx           # Sub-component
├── Close.tsx            # Sub-component
├── DialogContext.tsx    # Context definition only
├── DialogProvider.tsx   # Provider + hook
├── index.ts             # Assembles everything, exports Dialog with parts
└── __tests__/
    └── Dialog.test.tsx  # Tests for all parts
```

#### 10.3 Naming Convention

```typescript
// File names: PascalCase, matching the exported component
// Dialog.tsx exports Dialog
// Header.tsx exports Header (not DialogHeader)

// Main component: PascalCase
export const Dialog = () => { ... };

// Sub-components: PascalCase (named after their function)
export const Header = () => { ... };
export const Content = () => { ... };

// In index.ts, attach as properties
Dialog.Header = Header;
Dialog.Content = Content;
```

**Usage:**

```tsx
import { Dialog } from "./components/ui/Dialog";

<Dialog isOpen={true} onClose={handleClose}>
  <Dialog.Header>Title</Dialog.Header>
  <Dialog.Content>Body</Dialog.Content>
  <Dialog.Footer>Actions</Dialog.Footer>
</Dialog>;
```

#### 10.4 File Content Structure

**Main Component (Dialog.tsx)**

```typescript
import type React from "react";
import { DialogProvider } from "./DialogProvider";

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Dialog: React.FC<DialogProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <DialogProvider isOpen={isOpen} onClose={onClose}>
      <div style={dialogStyles}>{children}</div>
    </DialogProvider>
  );
};
```

**Context (DialogContext.tsx)**

```typescript
import { createContext } from "react";

type DialogContextValue = {
  isOpen: boolean;
  onClose: () => void;
};

export const DialogContext = createContext<DialogContextValue | null>(
  null,
);
```

**Provider + Hook (DialogProvider.tsx)**

```typescript
import { useContext } from "react";
import { DialogContext } from "./DialogContext";
import type { DialogContextValue } from "./DialogContext";

type DialogProviderProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const DialogProvider = ({ children, isOpen, onClose }: DialogProviderProps) => {
  const value: DialogContextValue = { isOpen, onClose };
  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextValue => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog parts must be used within Dialog");
  return context;
};
```

**Sub-Component (Header.tsx)**

```typescript
import type React from "react";

type HeaderProps = { children: React.ReactNode };

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div style={headerStyles}>{children}</div>;
};
```

**Sub-Component with Context (Close.tsx)**

```typescript
import { useDialogContext } from "./DialogProvider";

export const Close = () => {
  const { onClose } = useDialogContext();
  return <button onClick={onClose}>Close</button>;
};
```

**Assembly File (index.ts)**

```typescript
import { Dialog } from "./Dialog";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Close } from "./Close";

Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Footer = Footer;
Dialog.Close = Close;

export { Dialog };
```

#### 10.5 Common Sub-Component Names

Establish consistent naming for common patterns:

| Component | Parts                          | File Names                   |
| --------- | ------------------------------ | ---------------------------- |
| Dialog    | Header, Content, Footer, Close | Header.tsx, Content.tsx, ... |
| Card      | Header, Content, Footer, Image | Header.tsx, Content.tsx, ... |
| Form      | Field, Label, Input, Error     | Field.tsx, Label.tsx, ...    |
| Tabs      | List, Tab, Panels, Panel       | List.tsx, Tab.tsx, ...       |

#### 10.6 Testing Strategy

**Location:** `Dialog/__tests__/Dialog.test.tsx`

**Structure:**

```typescript
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "../Dialog";

describe("Dialog", () => {
  describe("Main Component", () => {
    it("should render when isOpen is true", () => {
      render(<Dialog isOpen={true} onClose={vi.fn()}><Dialog.Content>Test</Dialog.Content></Dialog>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  describe("Dialog.Header", () => {
    it("should render header content", () => {
      render(<Dialog isOpen={true} onClose={vi.fn()}><Dialog.Header>Test</Dialog.Header></Dialog>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should render complete dialog with all parts", () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()}>
          <Dialog.Header><h2>Title</h2></Dialog.Header>
          <Dialog.Content><p>Content</p></Dialog.Content>
          <Dialog.Footer><button>Action</button></Dialog.Footer>
        </Dialog>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
```

**Coverage:** Rendering, styles, context consumption, integration, edge cases.

#### 10.7 Best Practices

**DO:**

- ✅ Keep sub-components simple and focused
- ✅ Separate Context.tsx (definition) and Provider.tsx (provider + hook)
- ✅ Write tests in **tests**/ folder
- ✅ Export only the main component with attached parts from index.ts
- ✅ Use inline styles

**DON'T:**

- ❌ Put multiple components in one file (except index.ts)
- ❌ Use default exports
- ❌ Export individual parts from index.ts

## Project Management Approach

- Work in multiple phases
- After each completed task, review and update CLAUDE.md with important learnings
- Remove unnecessary information from CLAUDE.md to keep it lean

## Git Information

- Repository: `/Users/florian/sources/portfolio`
- Initial commit: January 15, 2026
- Current branch: `main`
