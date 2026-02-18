import type React from "react";
import { useContext, useState } from "react";
import { SplashScreenContext } from "./SplashScreenContext";

type SplashScreenProviderProps = {
  children: React.ReactNode;
};

export const SplashScreenProvider: React.FC<SplashScreenProviderProps> = ({ children }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const onAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <SplashScreenContext.Provider value={{ isAnimationComplete, onAnimationComplete }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const useSplashScreenContext = () => {
  const context = useContext(SplashScreenContext);
  if (!context) {
    throw new Error("SplashScreen parts must be used within SplashScreen");
  }
  return context;
};
