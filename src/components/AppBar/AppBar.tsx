import type React from "react";
import { useEffect, useState } from "react";
import { AppBarProvider } from "./AppBarProvider";

type AppBarProps = {
  children: React.ReactNode;
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
        {children}
      </header>
    </AppBarProvider>
  );
};
