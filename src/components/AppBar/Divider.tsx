import brushDivider from "@assets/svg/brush-divider-thin.svg";
import { cn } from "@lib/utils";
import type React from "react";

type DividerProps = {
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      <img
        src={brushDivider}
        alt=""
        className="w-full h-[12px] block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};
