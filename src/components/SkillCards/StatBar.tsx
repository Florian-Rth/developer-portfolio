import { cn } from "@lib/utils";
import type React from "react";

type StatBarProps = {
  label: string;
  value: number;
  color: string;
  className?: string;
};

export const StatBar: React.FC<StatBarProps> = ({ label, value, color, className }) => {
  const percentage = (value / 10) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-sans text-[10px] font-medium uppercase tracking-wide text-foreground/70 w-[52px] shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-sans text-[11px] font-semibold text-foreground/80 w-4 text-right shrink-0">
        {value}
      </span>
    </div>
  );
};
