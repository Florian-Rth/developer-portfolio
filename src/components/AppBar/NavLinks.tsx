import type React from "react";

type NavLink = {
  label: string;
  href: string;
};

const leftLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Über mich", href: "#about" },
];

const rightLinks: NavLink[] = [
  { label: "Projekte", href: "#projects" },
  { label: "Kontakt", href: "#contact" },
];

type NavLinksProps = {
  position: "left" | "right";
  className?: string;
};

export const NavLinks: React.FC<NavLinksProps> = ({ position, className = "" }) => {
  const links = position === "left" ? leftLinks : rightLinks;

  return (
    <nav className={`hidden md:flex items-center gap-8 ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-sans font-medium text-foreground hover:text-accent transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
