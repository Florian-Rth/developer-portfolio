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
        "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(212,146,155,0.28)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_18px_42px_rgba(212,146,155,0.34)] md:px-8 md:py-4 md:text-base",
        className,
      )}
    >
      {children}
    </a>
  );
};
