import type React from "react";
import tapeSvg from "@assets/svg/tape.svg";

type TapeProps = {
  className?: string;
};

export const Tape: React.FC<TapeProps> = ({ className = "" }) => {
  return (
    <img
      src={tapeSvg}
      alt=""
      data-testid="hero-tape"
      aria-hidden="true"
      className={`absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 ${className}`}
    />
  );
};
