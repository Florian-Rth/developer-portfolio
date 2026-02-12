import { cn } from "@lib/utils";
import type React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return <main className={cn("flex-1", className)}>{children}</main>;
};
