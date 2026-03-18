import { cn } from "@lib/utils";
import type React from "react";

type ChipVariant = "rose" | "peach" | "lavender" | "default";

type ChipProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ChipVariant;
  className?: string;
};

const variantStyles: Record<ChipVariant, React.CSSProperties> = {
  rose: {
    background: "rgba(212,146,155,0.18)",
    color: "#7a4a52",
  },
  peach: {
    background: "rgba(232,180,160,0.25)",
    color: "#7a5040",
  },
  lavender: {
    background: "rgba(184,169,212,0.22)",
    color: "#5f4f7a",
  },
  default: {},
};

export const Chip: React.FC<ChipProps> = ({ children, href, variant = "default", className }) => {
  const baseClass = cn(
    "inline-flex items-center px-3.5 py-1.5",
    "rounded-full text-xs font-medium tracking-wide",
    "transition-colors duration-200 cursor-default",
    variant === "default" &&
      "bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-foreground",
    className,
  );

  const style = variant !== "default" ? variantStyles[variant] : undefined;

  if (href) {
    return (
      <a href={href} className={cn(baseClass, "cursor-pointer")} style={style}>
        {children}
      </a>
    );
  }

  return (
    <span className={baseClass} style={style}>
      {children}
    </span>
  );
};
