import type React from "react";
import { Copyright } from "./Copyright";
import { SocialLinks } from "./SocialLinks";

type FooterProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Footer: React.FC<FooterProps> = ({ children, className = "" }) => {
  return (
    <footer className={`bg-background border-t border-border py-8 ${className}`}>
      {children || (
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Copyright />
          <SocialLinks />
        </div>
      )}
    </footer>
  );
};
