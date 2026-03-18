import { cn } from "@lib/utils";
import type React from "react";

type ContactProps = {
  children: React.ReactNode;
  className?: string;
};

export const Contact: React.FC<ContactProps> = ({ children, className }) => {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className={cn("relative bg-background overflow-hidden", className)}
    >
      {/* Ambient radial glow — subtle, not loud */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(184,169,212,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 70%, rgba(232,180,160,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </section>
  );
};
