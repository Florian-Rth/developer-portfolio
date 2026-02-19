import { cn } from "@lib/utils";
import type React from "react";
import { BrushUnderline } from "./BrushUnderline";

type PullQuoteProps = {
  children: React.ReactNode;
  className?: string;
};

export const PullQuote: React.FC<PullQuoteProps> = ({ children, className }) => {
  return (
    <blockquote
      className={cn("col-span-full", "text-center py-10 my-5", "max-w-[700px] mx-auto", className)}
    >
      <p
        className={cn(
          "font-script text-[28px] lg:text-[48px] leading-[1.4]",
          "bg-gradient-to-br from-gradient-peach via-gradient-dusty-rose to-gradient-lavender",
          "bg-clip-text text-transparent",
        )}
      >
        {children}
      </p>
      <BrushUnderline className="mt-4" />
    </blockquote>
  );
};
