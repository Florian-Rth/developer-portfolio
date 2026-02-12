import { cn } from "@lib/utils";
import type React from "react";

type NameProps = {
  children: React.ReactNode;
  className?: string;
};

export const Name: React.FC<NameProps> = ({ children, className }) => {
  return (
    <h1
      className={cn(
        "relative z-10 font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
};
