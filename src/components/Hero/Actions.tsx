import { cn } from "@lib/utils";
import type React from "react";

type ActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Actions: React.FC<ActionsProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col sm:flex-row gap-3 mt-6", className)}>{children}</div>;
};
