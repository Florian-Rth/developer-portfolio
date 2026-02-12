import type React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className = "" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-sans font-medium text-foreground hover:text-accent transition-colors ${className}`}
    >
      {children}
    </a>
  );
};
