import type React from "react";
import { useEffect, useState } from "react";
import { AppBarProvider } from "./AppBarProvider";
import { DarkModeToggle } from "./DarkModeToggle";
import { Divider } from "./Divider";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

type AppBarProps = {
  children?: React.ReactNode;
  className?: string;
};

export const AppBar: React.FC<AppBarProps> = ({ children, className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBarProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background"
        } ${className}`}
      >
        {children || (
          <>
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <DarkModeToggle />
                <NavLinks position="left" />
              </div>
              <Logo />
              <NavLinks position="right" />
            </div>

            {/* Mobile Layout */}
            <div className="flex md:hidden items-center justify-between px-4 py-3">
              <div className="w-10" />
              <Logo className="text-xl" />
              <MenuButton />
            </div>

            <Divider />
            <MobileMenu />
          </>
        )}
      </header>
    </AppBarProvider>
  );
};
