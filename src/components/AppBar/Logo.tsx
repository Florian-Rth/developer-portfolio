import type React from "react";

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <a
      href="#home"
      className={`font-script text-2xl md:text-3xl hover:opacity-80 transition-opacity ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--gradient-lavender), var(--gradient-peach), var(--gradient-dusty-rose))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      FlorianRth
    </a>
  );
};
