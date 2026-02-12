import type React from "react";

type ScriptAccentProps = {
  children: React.ReactNode;
  className?: string;
};

export const ScriptAccent: React.FC<ScriptAccentProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`block font-script text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender bg-clip-text text-transparent mt-1 ${className}`}
    >
      {children}
    </span>
  );
};
