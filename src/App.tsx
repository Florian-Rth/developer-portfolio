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
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Developer Portfolio</h1>
      <p style={textStyle}>Coming soon...</p>
    </div>
  );
};
