import { cn } from "@lib/utils";
import type React from "react";
import { BrushUnderline } from "./BrushUnderline";

type PullQuoteProps = {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
};

export const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution, className }) => {
  return (
    <blockquote
      className={cn("col-span-full", "text-center py-10 my-5", "max-w-[700px] mx-auto", className)}
    >
      <p
        className={cn(
          "font-script text-[28px] lg:text-[48px] leading-[1.4] pb-2",
          "bg-gradient-to-br from-gradient-peach via-gradient-dusty-rose to-gradient-lavender",
          "bg-clip-text text-transparent",
          "[text-shadow:none] decoration-clone",
        )}
      >
        &ldquo;{children}&rdquo;
      </p>
      {attribution && (
        <footer
          className={cn(
            "mt-1 mr-4 text-right",
            "font-script text-[16px] lg:text-[22px]",
            "bg-gradient-to-br from-gradient-peach via-gradient-dusty-rose to-gradient-lavender",
            "bg-clip-text text-transparent",
            "opacity-60",
          )}
        >
          — {attribution}
        </footer>
      )}
      <BrushUnderline className="mt-3" />
    </blockquote>
  );
};
