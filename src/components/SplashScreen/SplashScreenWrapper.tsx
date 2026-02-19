import type React from "react";
import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SplashScreen } from "./SplashScreen";

const SPLASH_SHOWN_KEY = "splash-screen-shown";

type SplashScreenWrapperProps = {
  children: React.ReactNode;
};

export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem(SPLASH_SHOWN_KEY) !== "true";
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem(SPLASH_SHOWN_KEY, "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete}>
          <Container>
            <Logo />
          </Container>
        </SplashScreen>
      )}
      {children}
    </>
  );
};
