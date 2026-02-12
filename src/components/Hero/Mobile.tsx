import type React from "react";

type MobileProps = {
  children: React.ReactNode;
  className?: string;
};

export const Mobile: React.FC<MobileProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`flex md:hidden flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-[var(--appbar-height-mobile)] pb-8 px-4 ${className}`}
    >
      {children}
    </div>
  );
};
