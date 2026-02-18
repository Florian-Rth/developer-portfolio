import { CloseIcon, MenuIcon } from "@components/icons";
import { cn } from "@lib/utils";
import type React from "react";
import { useAppBarContext } from "./AppBarProvider";

type MenuButtonProps = {
  className?: string;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ className }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppBarContext();

  return (
    <button
      type="button"
      onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      className={cn("md:hidden p-2 rounded-lg hover:bg-secondary transition-colors", className)}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? (
        <CloseIcon size={24} className="text-foreground" />
      ) : (
        <MenuIcon size={24} className="text-foreground" />
      )}
    </button>
  );
};
