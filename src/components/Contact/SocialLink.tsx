import { cn } from "@lib/utils";
import type React from "react";

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const SocialLink: React.FC<SocialLinkProps> = ({ href, label, children, className }) => {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center",
        "size-10 rounded-full",
        "text-muted-foreground",
        "bg-secondary/60 border border-border/50",
        "transition-all duration-200",
        "hover:bg-accent/12 hover:text-foreground hover:border-accent/40 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </a>
  );
};
