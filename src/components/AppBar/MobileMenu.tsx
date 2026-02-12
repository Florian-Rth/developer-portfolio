import type React from "react";
import { useAppBarContext } from "./AppBarProvider";

type MobileMenuProps = {
  children: React.ReactNode;
  className?: string;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ children, className = "" }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppBarContext();

  if (!isMobileMenuOpen) return null;

  const handleChildClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <dialog
      className={`fixed inset-0 top-[var(--appbar-height-mobile)] z-40 bg-background md:hidden ${className}`}
      open
      aria-label="Mobile navigation menu"
      onClick={handleChildClick}
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
        {children}
      </div>
    </dialog>
  );
};
