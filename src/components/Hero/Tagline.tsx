import { cn } from "@lib/utils";
import type React from "react";

type TaglineProps = {
  children: React.ReactNode;
  className?: string;
};

export const Tagline: React.FC<TaglineProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        "mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8",
        className,
      )}
    >
      {children}
    </p>
  );
};
