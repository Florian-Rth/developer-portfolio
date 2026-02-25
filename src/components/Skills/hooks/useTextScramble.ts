import { useCallback, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const SCRAMBLE_DURATION = 400;
const SCRAMBLE_FPS = 30;

export const useTextScramble = (
  originalText: string,
): { displayText: string; trigger: () => void } => {
  const [displayText, setDisplayText] = useState(originalText);
  const animatingRef = useRef(false);

  const trigger = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const frameInterval = 1000 / SCRAMBLE_FPS;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);

      // Number of characters settled
      const settledCount = Math.floor(progress * originalText.length);

      const scrambled = originalText
        .split("")
        .map((char, i) => {
          if (i < settledCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        setTimeout(() => requestAnimationFrame(animate), frameInterval);
      } else {
        setDisplayText(originalText);
        animatingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  }, [originalText]);

  return { displayText, trigger };
};
