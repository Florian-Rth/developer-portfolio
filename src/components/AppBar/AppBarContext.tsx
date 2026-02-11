import { createContext } from "react";

type AppBarContextValue = {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export const AppBarContext = createContext<AppBarContextValue | null>(null);
