import { cn } from "@lib/utils";
import type React from "react";

type TaglineProps = {
  children: React.ReactNode;
  className?: string;
};

export const Tagline: React.FC<TaglineProps> = ({ children, className }) => {
  return (
    <p className={cn("text-muted-foreground text-base md:text-lg mt-4 max-w-md", className)}>
      {children}
    </p>
  );
};
