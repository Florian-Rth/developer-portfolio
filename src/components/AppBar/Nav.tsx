import { cn } from "@lib/utils";
import type React from "react";

type NavProps = {
  children: React.ReactNode;
  className?: string;
};

export const Nav: React.FC<NavProps> = ({ children, className }) => {
  return <nav className={cn("flex items-center gap-8", className)}>{children}</nav>;
};
