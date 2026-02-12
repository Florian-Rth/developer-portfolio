import type React from "react";

type NavLink = {
  label: string;
  href: string;
};

const allLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Über mich", href: "#about" },
  { label: "Projekte", href: "#projects" },
  { label: "Kontakt", href: "#contact" },
];

type MobileNavLinksProps = {
  onLinkClick?: () => void;
  className?: string;
};

export const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ onLinkClick, className = "" }) => {
  return (
    <nav className={`flex flex-col items-center gap-8 ${className}`}>
      {allLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="font-sans font-medium text-2xl text-foreground hover:text-accent transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
