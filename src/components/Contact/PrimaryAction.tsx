import { cn } from "@lib/utils";
import type React from "react";

type PrimaryActionProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const PrimaryAction: React.FC<PrimaryActionProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "flex-1 rounded-full px-5 py-2.5",
        "text-sm font-medium tracking-wide text-foreground",
        "border border-border/80 bg-transparent",
        "transition-all duration-200",
        "hover:bg-accent/8 hover:border-accent/60 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </a>
  );
};
