import { cn } from "@lib/utils";
import type React from "react";
import { useEffect, useRef } from "react";
import { useAppBarContext } from "./AppBarProvider";

type MobileMenuProps = {
  children: React.ReactNode;
  className?: string;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ children, className }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppBarContext();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  const handleChildClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className={cn(
        "fixed inset-0 top-[var(--appbar-height-mobile)] z-40 bg-background md:hidden",
        className,
      )}
      onClick={handleChildClick}
      onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
    >
      <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">{children}</div>
    </div>
  );
};
