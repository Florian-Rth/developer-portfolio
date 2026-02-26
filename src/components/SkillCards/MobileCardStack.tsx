import type { Skill } from "@/data/skills";
import { skills } from "@/data/skills";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import type React from "react";
import { useCallback, useState } from "react";
import { SkillCard } from "./SkillCard";

const SWIPE_THRESHOLD = 80;
const STACK_SIZE = 3; // cards visible behind top card

type MobileCardStackProps = {
  onSelect: (skill: Skill) => void;
};

export const MobileCardStack: React.FC<MobileCardStackProps> = ({ onSelect }) => {
  const [queue, setQueue] = useState<Skill[]>(skills);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const opacity = useTransform(x, [-200, -80, 0, 80, 200], [0.5, 1, 1, 1, 0.5]);

  const cycleCard = useCallback(() => {
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    x.set(0);
  }, [x]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      setIsDragging(false);
      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
        cycleCard();
      } else {
        x.set(0);
      }
    },
    [cycleCard, x],
  );

  const handleTap = useCallback(() => {
    if (!isDragging) {
      onSelect(queue[0]);
    }
  }, [isDragging, onSelect, queue]);

  const current = queue[0];
  const behind = queue.slice(1, 1 + STACK_SIZE);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Counter */}
      <p className="font-sans text-xs text-foreground/40 tracking-widest uppercase">
        {skills.indexOf(current) + 1} / {skills.length}
      </p>

      {/* Card stack */}
      <div className="relative" style={{ width: 220, height: 320 }}>
        {/* Background cards (static, stacked look) */}
        {behind.map((skill, i) => (
          <div
            key={skill.id}
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateY(${(i + 1) * -6}px) scale(${1 - (i + 1) * 0.04})`,
              zIndex: STACK_SIZE - i,
              opacity: 1 - (i + 1) * 0.15,
            }}
          >
            <SkillCard skill={skill} />
          </div>
        ))}

        {/* Top card — draggable */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ x, rotate, opacity, zIndex: STACK_SIZE + 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            whileTap={{ scale: isDragging ? 1 : 1.02 }}
          >
            <SkillCard skill={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe hint */}
      <div className="flex items-center gap-4 text-foreground/30">
        <span className="font-sans text-xs">← swipe</span>
        <span className="font-sans text-xs">·</span>
        <span className="font-sans text-xs">tap to open</span>
        <span className="font-sans text-xs">·</span>
        <span className="font-sans text-xs">swipe →</span>
      </div>
    </div>
  );
};
