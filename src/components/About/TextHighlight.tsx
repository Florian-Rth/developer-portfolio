import { cn } from "@lib/utils";
import type React from "react";

type TextHighlightProps = {
  children: React.ReactNode;
  className?: string;
};

export const TextHighlight: React.FC<TextHighlightProps> = ({ children, className }) => {
  return (
    <mark
      className={cn("font-semibold bg-no-repeat", "text-inherit", className)}
      style={{
        backgroundColor: "transparent",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10' fill='none' stroke='%23E8B4A0' stroke-width='20' stroke-opacity='0.4' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundSize: "100% 40%",
        backgroundPosition: "0 90%",
      }}
    >
      {children}
    </mark>
  );
};
