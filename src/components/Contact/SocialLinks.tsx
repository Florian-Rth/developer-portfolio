import { cn } from "@lib/utils";
import type React from "react";

type SocialLinksProps = {
  children: React.ReactNode;
  className?: string;
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ children, className }) => {
  return <div className={cn("flex items-center justify-center gap-3", className)}>{children}</div>;
};
