import { cn } from "@lib/utils";
import type React from "react";

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <footer className={cn("bg-background border-t border-border py-8", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {children}
      </div>
    </footer>
  );
};
