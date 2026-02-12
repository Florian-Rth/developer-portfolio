import type React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export const Main: React.FC<MainProps> = ({ children, className = "" }) => {
  return (
    <main
      className={`flex-1 pt-[var(--appbar-height-mobile)] md:pt-[var(--appbar-height-desktop)] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">{children}</div>
    </main>
  );
};
