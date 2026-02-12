import type React from "react";

type HeroProps = {
  children: React.ReactNode;
  className?: string;
};

export const Hero: React.FC<HeroProps> = ({ children, className = "" }) => {
  return (
    <section
      id="home"
      aria-label="Hero"
      className={`relative min-h-screen bg-background overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
