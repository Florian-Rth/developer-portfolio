import type React from "react";
import { useAppBarContext } from "./AppBarProvider";

type MenuButtonProps = {
  className?: string;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ className = "" }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppBarContext();

  return (
    <button
      type="button"
      onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      className={`md:hidden p-2 rounded-lg hover:bg-secondary transition-colors ${className}`}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
          aria-hidden="true"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      )}
    </button>
  );
};
