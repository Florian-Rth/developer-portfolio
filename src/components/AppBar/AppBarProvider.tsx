import type React from "react";
import { useContext, useState } from "react";
import { AppBarContext } from "./AppBarContext";

type AppBarProviderProps = {
  children: React.ReactNode;
};

export const AppBarProvider: React.FC<AppBarProviderProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const value = {
    isMobileMenuOpen,
    setMobileMenuOpen,
  };

  return <AppBarContext.Provider value={value}>{children}</AppBarContext.Provider>;
};

export const useAppBarContext = () => {
  const context = useContext(AppBarContext);
  if (!context) {
    throw new Error("AppBar parts must be used within AppBar");
  }
  return context;
};
