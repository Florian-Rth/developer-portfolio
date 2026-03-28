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
        "relative z-10 font-sans text-4xl font-bold tracking-[-0.04em] text-foreground leading-[0.95] md:text-6xl lg:text-7xl xl:text-[5.8rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
};
