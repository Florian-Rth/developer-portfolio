import { cn } from "@lib/utils";
import type React from "react";
import { useEffect, useRef } from "react";
import { dispatchSplashComplete } from "./SplashScreen";

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const textRef = useRef<SVGTextElement>(null);
  const hasTriggeredComplete = useRef(false);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "splashFill" && !hasTriggeredComplete.current) {
        hasTriggeredComplete.current = true;
        dispatchSplashComplete();
      }
    };

    textElement.addEventListener("animationend", handleAnimationEnd as EventListener);
    return () => {
      textElement.removeEventListener("animationend", handleAnimationEnd as EventListener);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 600 120"
      className={cn("w-full max-w-lg", className)}
      role="img"
      aria-labelledby="splash-logo-title"
    >
      <title id="splash-logo-title">FlorianRth Logo</title>
      <defs>
        <linearGradient id="splashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--gradient-lavender)" />
          <stop offset="50%" stopColor="var(--gradient-peach)" />
          <stop offset="100%" stopColor="var(--gradient-dusty-rose)" />
        </linearGradient>
      </defs>
      <text
        ref={textRef}
        x="300"
        y="85"
        textAnchor="middle"
        className="splash-logo-text"
        fill="url(#splashGradient)"
        stroke="url(#splashGradient)"
      >
        FlorianRth
      </text>
    </svg>
  );
};
