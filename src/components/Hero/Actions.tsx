import { cn } from "@lib/utils";
import type React from "react";

type ActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Actions: React.FC<ActionsProps> = ({ children, className }) => {
  return <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>{children}</div>;
};
