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
        "inline-flex items-center justify-center rounded-full border border-foreground/15 bg-background/55 px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(45,42,38,0.04)] backdrop-blur-sm transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/5 md:px-8 md:py-4 md:text-base",
        className,
      )}
    >
      {children}
    </a>
  );
};
