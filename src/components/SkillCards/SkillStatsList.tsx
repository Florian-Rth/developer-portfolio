import type { Skill, SkillStats } from "@/data/skills";
import { STAT_LABELS } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { StatBar } from "./StatBar";

type SkillStatsListProps = {
  skill: Skill;
  color: string;
  className?: string;
};

const STAT_KEYS = Object.keys(STAT_LABELS) as (keyof SkillStats)[];

export const SkillStatsList: React.FC<SkillStatsListProps> = ({ skill, color, className }) => (
  <div className={cn("flex flex-col gap-0.5", className)}>
    {STAT_KEYS.map((key) => (
      <StatBar key={key} label={STAT_LABELS[key]} value={skill.stats[key]} color={color} />
    ))}
  </div>
);
