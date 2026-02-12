import sectionDivider from "@assets/svg/section-divider.svg";
import type React from "react";

type SectionDividerProps = {
  className?: string;
};

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return (
    <div
      data-testid="section-divider"
      aria-hidden="true"
      className={`absolute -bottom-8 left-0 right-0 w-full ${className}`}
    >
      <img
        src={sectionDivider}
        alt=""
        className="w-full block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};
