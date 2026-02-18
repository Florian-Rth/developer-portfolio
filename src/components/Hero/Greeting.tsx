import { cn } from "@lib/utils";
import type React from "react";

type GreetingProps = {
  children: React.ReactNode;
  className?: string;
};

export const Greeting: React.FC<GreetingProps> = ({ children, className }) => {
  return (
    <span className={cn("block text-muted-foreground text-sm md:text-base mb-1", className)}>
      {children}
    </span>
  );
};
