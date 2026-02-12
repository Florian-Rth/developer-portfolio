import { cn } from "@lib/utils";
import type React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, href, className }) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender text-white font-medium text-sm md:text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200",
        className,
      )}
    >
      {children}
    </a>
  );
};
