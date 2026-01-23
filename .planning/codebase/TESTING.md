# Testing Patterns

**Analysis Date:** 2024-01-23

## Test Framework

**Runner:**
- Vitest [Version: 2.1.8]
- Config: `vitest.config.ts`
- Test files: Glob pattern `**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`

**Assertion Library:**
- Built-in Vitest assertions
- Extended with `@testing-library/jest-dom` matchers

**Run Commands:**
```bash
npm run test              # Run all tests
npm run test:ui           # Run tests with UI
```

## Test File Organization

**Location:**
- Co-located with source files (e.g., `src/App.tsx` + `src/App.test.tsx`)
- Setup file: `src/test/setup.ts`

**Naming:**
- Test files: `[ComponentName].test.tsx`
- Pattern: `[source file].test.[extension]`

**Structure:**
```
src/
├── App.tsx              # Component
├── App.test.tsx         # Component tests
├── main.tsx             # Entry point
├── main.test.tsx        # Entry point tests
└── test/
    └── setup.ts         # Test setup utilities
```

## Test Structure

**Suite Organization:**
```typescript
describe("ComponentName", () => {
  it("should test specific behavior", () => {
    // Arrange
    // Act
    // Assert
  });
});
```

**Patterns:**
- Test names descriptive and specific
- AAA pattern (Arrange-Act-Assert) used consistently
- Component tests focus on rendering, styles, and content

**Examples from codebase:**
```typescript
describe("App", () => {
  it("should render the heading", () => {
    render(<App />);
    const heading = screen.getByText("Developer Portfolio");
    expect(heading).toBeInTheDocument();
  });

  it("should render the coming soon text", () => {
    render(<App />);
    const text = screen.getByText("Coming soon...");
    expect(text).toBeInTheDocument();
  });

  it("should have the correct container style", () => {
    const { container } = render(<App />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    });
  });
});
```

## Mocking

**Framework:** Not explicitly configured

**Patterns:**
- No mocking framework needed for current tests
- Vitest provides mocking capabilities when needed

**What to Mock:**
- Not applicable yet
- Will need external API calls, DOM APIs in future

**What NOT to Mock:**
- React components
- Basic DOM elements
- Simple text content

## Fixtures and Factories

**Test Data:**
- Simple text content tests
- No complex fixtures or factories yet
- Inline data in tests

**Location:**
- Data defined inline within tests
- No dedicated test utilities yet

## Coverage

**Requirements:** Configured but not enforced

**Config:**
```typescript
coverage: {
  provider: "v8",
  reporter: ["text", "json", "html"],
  exclude: ["node_modules/", "src/test/"],
}
```

**View Coverage:**
```bash
npm run test -- --coverage
```

**Current Status:** Not measured yet

## Test Types

**Unit Tests:**
- Component rendering tests
- Style validation
- Text content verification
- Scope: Individual components

**Integration Tests:**
- Entry point tests (`main.test.tsx`)
- DOM manipulation tests
- Error handling tests

**E2E Tests:**
- Not implemented yet
- Would need additional framework

## Common Patterns

**Async Testing:**
- Not needed yet
- Components are synchronous

**Error Testing:**
```typescript
it("should throw error when root element not found", () => {
  // Would need to mock document.getElementById
  // Implementation not yet present
});
```

**Setup/Teardown:**
```typescript
beforeEach(() => {
  // Setup test DOM
});

afterEach(() => {
  cleanup(); // From @testing-library/react
});
```

---

*Testing analysis: 2024-01-23*