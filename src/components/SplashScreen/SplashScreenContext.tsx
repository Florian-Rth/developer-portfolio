import { createContext } from "react";

type SplashScreenContextValue = {
  isAnimationComplete: boolean;
  onAnimationComplete: () => void;
};

export const SplashScreenContext = createContext<SplashScreenContextValue | null>(null);
