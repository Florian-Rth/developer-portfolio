import { cn } from "@lib/utils";
import type React from "react";

type OutlineButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export const OutlineButton: React.FC<OutlineButtonProps> = ({ children, href, className }) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-foreground/20 text-foreground font-medium text-sm md:text-base hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200",
        className,
      )}
    >
      {children}
    </a>
  );
};
