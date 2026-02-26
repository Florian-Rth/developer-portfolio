import { cn } from "@lib/utils";
import { useCallback, useRef } from "react";
import React from "react";
import { SkillTag } from "./SkillTag";
import { useCardHover } from "./hooks/useCardHover";
import { useTextScramble } from "./hooks/useTextScramble";

type SkillCardProps = {
  children: React.ReactNode;
  category: string;
  skills: string[];
  glowColor: string;
  className?: string;
};

export const SkillCard: React.FC<SkillCardProps> = ({
  children,
  category,
  skills,
  glowColor,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isHovered, handlers, style: hoverStyle } = useCardHover();
  const { displayText, trigger: triggerScramble } = useTextScramble(category);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      handlers.onPointerEnter(e);
      triggerScramble();
    },
    [handlers, triggerScramble],
  );

  const glowShadow = isHovered ? `0 0 0 2px ${glowColor}, 0 8px 32px ${glowColor}4D` : undefined;

  return (
    <div
      ref={cardRef}
      data-testid="skill-card"
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-surface",
        "shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        "border-2 border-transparent",
        "transition-all duration-300 ease-out",
        "w-[280px] lg:w-[320px]",
        "snap-center shrink-0",
        "cursor-pointer",
        className,
      )}
      style={{
        aspectRatio: "3 / 4",
        boxShadow: glowShadow,
        ...hoverStyle,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onPointerMove={handlers.onPointerMove}
    >
      {/* 3D Scene area - 70% height */}
      <div className="relative w-full" style={{ height: "70%" }}>
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ isHovered?: boolean }>, { isHovered })
          : children}
      </div>

      {/* Text area */}
      <div className="px-5 pb-5">
        <h3 className="font-dm-sans font-bold text-lg text-text mb-2.5">{displayText}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillTag key={skill}>{skill}</SkillTag>
          ))}
        </div>
      </div>

      {/* Shine sweep overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${90 + (Number(hoverStyle["--tilt-y" as keyof typeof hoverStyle]) || 0)}deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
            transition: "background 0.15s ease",
          }}
        />
      )}
    </div>
  );
};
