import { FInitial } from "@components/FInitial";
import { cn } from "@lib/utils";
import type React from "react";

type Background3DProps = {
  className?: string;
};

export const Background3D: React.FC<Background3DProps> = ({ className }) => {
  return (
    <div
      className={cn("absolute inset-0 left-[40%] z-20 hidden md:block", className)}
      aria-hidden="true"
    >
      <FInitial />
    </div>
  );
};
