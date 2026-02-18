import { cn } from "@lib/utils";
import type React from "react";

type CopyrightProps = {
  className?: string;
};

export const Copyright: React.FC<CopyrightProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      &copy; {currentYear} Florian Rätsch
    </p>
  );
};
