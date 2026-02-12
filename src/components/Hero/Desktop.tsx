import type React from "react";

type DesktopProps = {
  children: React.ReactNode;
  className?: string;
};

export const Desktop: React.FC<DesktopProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`hidden md:flex flex-col items-center justify-center text-center min-h-screen pt-[var(--appbar-height-desktop)] pb-24 px-4 ${className}`}
    >
      {children}
    </div>
  );
};
