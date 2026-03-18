import { cn } from "@lib/utils";
import type React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #b8a9d4 0%, #e8b4a0 100%)",
        padding: "1.5px",
        borderRadius: "1.5rem",
      }}
    >
      <div
        className={cn("flex flex-col gap-5 p-7 md:p-9", className)}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 95% 0%, rgba(184,169,212,0.12) 0%, transparent 60%), var(--card)",
          borderRadius: "calc(1.5rem - 1.5px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
