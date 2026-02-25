import { useCallback, useState } from "react";
import type React from "react";

type CardHoverStyle = {
  transform?: string;
  "--tilt-x"?: number;
  "--tilt-y"?: number;
};

type CardHoverReturn = {
  isHovered: boolean;
  handlers: {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  };
  style: CardHoverStyle;
};

export const useCardHover = (): CardHoverReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const onPointerEnter = useCallback((_e: React.PointerEvent<HTMLDivElement>) => {
    setIsHovered(true);
  }, []);

  const onPointerLeave = useCallback((_e: React.PointerEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isHovered) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTiltX((y - 0.5) * -8);
      setTiltY((x - 0.5) * 8);
    },
    [isHovered],
  );

  const style: CardHoverStyle = isHovered
    ? {
        transform: `scale(1.05) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        "--tilt-x": tiltX,
        "--tilt-y": tiltY,
      }
    : {};

  return {
    isHovered,
    handlers: {
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
    },
    style,
  };
};
