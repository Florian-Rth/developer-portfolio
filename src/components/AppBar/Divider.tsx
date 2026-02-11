import type React from "react";

type DividerProps = {
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({ className = "" }) => {
  return (
    <div
      className={`h-[2px] w-full ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--gradient-lavender), var(--gradient-peach), var(--gradient-dusty-rose))",
      }}
      aria-hidden="true"
    />
  );
};
