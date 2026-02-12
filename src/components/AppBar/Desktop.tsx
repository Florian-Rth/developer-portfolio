import type React from "react";

type DesktopProps = {
  children: React.ReactNode;
  className?: string;
};

export const Desktop: React.FC<DesktopProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
