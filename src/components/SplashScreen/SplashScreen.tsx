import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { SplashScreenProvider } from "./SplashScreenProvider";

type SplashScreenProps = {
  children: React.ReactNode;
  className?: string;
  onComplete?: () => void;
};

const FADE_OUT_DURATION = 700;
const SPLASH_ANIMATION_COMPLETE_EVENT = "splashAnimationComplete";

export const SplashScreen: React.FC<SplashScreenProps> = ({ children, className, onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsFadingOut(true);
  }, []);

  useEffect(() => {
    window.addEventListener(SPLASH_ANIMATION_COMPLETE_EVENT, handleAnimationComplete);
    return () => {
      window.removeEventListener(SPLASH_ANIMATION_COMPLETE_EVENT, handleAnimationComplete);
    };
  }, [handleAnimationComplete]);

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        setIsRemoved(true);
        onComplete?.();
      }, FADE_OUT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, onComplete]);

  if (isRemoved) return null;

  return (
    <SplashScreenProvider>
      <div
        className={cn("splash-screen-exit", isFadingOut && "splash-screen-exit-active", className)}
        aria-hidden={isFadingOut}
      >
        {children}
      </div>
    </SplashScreenProvider>
  );
};

export const dispatchSplashComplete = () => {
  window.dispatchEvent(new CustomEvent(SPLASH_ANIMATION_COMPLETE_EVENT));
};
