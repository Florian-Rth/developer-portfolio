import type React from "react";
import { useAppBarContext } from "./AppBarProvider";
import { DarkModeToggle } from "./DarkModeToggle";
import { MobileNavLinks } from "./MobileNavLinks";

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
    <dialog
      className={`fixed inset-0 top-[var(--appbar-height-mobile)] z-40 bg-background md:hidden ${className}`}
      open
      aria-label="Mobile navigation menu"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
        <MobileNavLinks onLinkClick={handleLinkClick} />
        <div className="mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </dialog>
  );
};
