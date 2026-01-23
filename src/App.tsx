import { Button } from "@components/ui/button";
import { useTheme } from "@hooks/use-theme";
import type React from "react";

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
};

export const App: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8" style={containerStyle}>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Design System Test</h1>

        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="flex gap-2">
          <Button size="default">Default Size</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>

        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle theme (current: {theme})
        </Button>

        <p className="text-muted-foreground">
          If you see styled buttons above with proper colors, the design system is working!
          Toggle theme to verify dark mode.
        </p>
      </div>
    </div>
  );
};
