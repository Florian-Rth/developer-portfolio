import tapeSvg from "@assets/svg/tape.svg";
import { cn } from "@lib/utils";
import type React from "react";

type TapeProps = {
  className?: string;
};

export const Tape: React.FC<TapeProps> = ({ className }) => {
  return (
    <img
      src={tapeSvg}
      alt=""
      data-testid="hero-tape"
      aria-hidden="true"
      className={cn("absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7", className)}
    />
  );
};
