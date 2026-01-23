import { useTheme } from "@hooks/use-theme";
import type React from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  gap: "2rem",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "2rem",
  fontWeight: "bold",
};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  color: "#666",
};

export const App: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background text-foreground p-4" style={containerStyle}>
      <h1 style={headingStyle}>Developer Portfolio</h1>
      <p style={textStyle}>Coming soon...</p>
      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Toggle theme (current: {theme})
      </button>
    </div>
  );
};
