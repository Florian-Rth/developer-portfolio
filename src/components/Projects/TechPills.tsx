import { cn } from "@lib/utils";
import type React from "react";

type TechPillsProps = {
  pills: string[];
  total: number;
  className?: string;
};

export const TechPills: React.FC<TechPillsProps> = ({ pills, total, className }) => {
  const overflow = total - pills.length;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tech stack">
      {pills.map((tech) => (
        <li
          key={tech}
          className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
        >
          {tech}
        </li>
      ))}
      {overflow > 0 && (
        <li className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          +{overflow} more
        </li>
      )}
    </ul>
  );
};
