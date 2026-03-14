import { cn } from "@lib/utils";
import type React from "react";

type StatBarProps = {
  label: string;
  value: number;
  /** Optional override — if omitted the bar uses its stat-specific default color */
  color?: string;
  statKey?: string;
  className?: string;
};

/** Per-stat accent colors — distinct but harmonious with the card palette */
const STAT_COLORS: Record<string, string> = {
  mastery: "#D4A843", // warm gold
  speed: "#E07B72", // coral red
  range: "#6BA89A", // teal
  impact: "#7B9DD4", // soft blue
};

export const StatBar: React.FC<StatBarProps> = ({ label, value, color, statKey, className }) => {
  const percentage = (value / 10) * 100;
  const barColor = color ?? (statKey ? STAT_COLORS[statKey] : undefined) ?? "#B8A9D4";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-foreground/70 w-[52px] shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
      <span
        className="font-sans text-[11px] font-semibold w-4 text-right shrink-0"
        style={{ color: barColor }}
      >
        {value}
      </span>
    </div>
  );
};
