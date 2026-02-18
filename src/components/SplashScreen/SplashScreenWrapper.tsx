import type React from "react";
import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SplashScreen } from "./SplashScreen";

type SplashScreenWrapperProps = {
  children: React.ReactNode;
};

export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
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
