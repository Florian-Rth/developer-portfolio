import { cn } from "@lib/utils";
import type React from "react";

type HeadlineProps = {
  children: React.ReactNode;
  className?: string;
};

export const Headline: React.FC<HeadlineProps> = ({ children, className }) => {
  return (
    <h2
      className={cn("font-script", className)}
      style={{
        fontSize: "clamp(3rem, 6vw, 5rem)",
        lineHeight: 1.4,
        background: "linear-gradient(to right, #e8b4a0, #d4929b, #b8a9d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        padding: "0.2em",
        margin: "-0.2em",
      }}
    >
      {children}
    </h2>
  );
};
