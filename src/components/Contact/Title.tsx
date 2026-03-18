import { cn } from "@lib/utils";
import type React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <p className={cn("text-sm font-medium text-muted-foreground tracking-wide", className)}>
      {children}
    </p>
  );
};
