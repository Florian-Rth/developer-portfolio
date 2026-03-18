import { cn } from "@lib/utils";
import type React from "react";

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const Body: React.FC<BodyProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        "text-muted-foreground text-base md:text-lg leading-relaxed max-w-[38ch]",
        className,
      )}
    >
      {children}
    </p>
  );
};
