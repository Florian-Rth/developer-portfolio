import type React from "react";
import { useAppBarContext } from "./AppBarProvider";
import { DarkModeToggle } from "./DarkModeToggle";
import { MobileNavLinks } from "./NavLinks";

type MobileMenuProps = {
  className?: string;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ className = "" }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppBarContext();

  if (!isMobileMenuOpen) return null;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 top-[65px] z-40 bg-background md:hidden ${className}`}
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
        <MobileNavLinks onLinkClick={handleLinkClick} />
        <div className="mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};
