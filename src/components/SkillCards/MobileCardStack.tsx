import type { Skill } from "@/data/skills";
import { skills } from "@/data/skills";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import type React from "react";
import { useCallback, useState } from "react";
import { SkillCard } from "./SkillCard";

const SWIPE_THRESHOLD = 80;
const STACK_SIZE = 3;
const FLY_DISTANCE = 600;

type MobileCardStackProps = {
  onSelect: (skill: Skill) => void;
};

export const MobileCardStack: React.FC<MobileCardStackProps> = ({ onSelect }) => {
  const [queue, setQueue] = useState<Skill[]>(skills);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const cardOpacity = useTransform(x, [-FLY_DISTANCE / 2, -80, 0, 80, FLY_DISTANCE / 2], [0, 1, 1, 1, 0]);

  const cycleCard = useCallback(() => {
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    x.set(0);
    setIsSwiping(false);
  }, [x]);

  const flyOff = useCallback(
    (direction: "left" | "right") => {
      setIsSwiping(true);
      const target = direction === "right" ? FLY_DISTANCE : -FLY_DISTANCE;
      animate(x, target, {
        type: "spring",
        stiffness: 300,
        damping: 28,
        onComplete: cycleCard,
      });
    },
    [x, cycleCard],
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      setIsDragging(false);
      const swipedFar = Math.abs(info.offset.x) > SWIPE_THRESHOLD;
      const swipedFast = Math.abs(info.velocity.x) > 500;

      if (swipedFar || swipedFast) {
        const dir = info.offset.x > 0 ? "right" : "left";
        flyOff(dir);
      } else {
        // Snap back with spring
        animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
      }
    },
    [flyOff, x],
  );

  const handleTap = useCallback(() => {
    if (!isDragging && !isSwiping) {
      onSelect(queue[0]);
    }
  }, [isDragging, isSwiping, onSelect, queue]);

  const current = queue[0];
  const behind = queue.slice(1, 1 + STACK_SIZE);
  const currentIndex = skills.findIndex((s) => s.id === current.id);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Counter */}
      <p className="font-sans text-xs text-foreground/40 tracking-widest uppercase">
        {currentIndex + 1} / {skills.length}
      </p>

      {/* Card stack */}
      <div className="relative" style={{ width: 220, height: 320 }}>
        {/* Background cards — peek behind, animate forward when top card leaves */}
        <AnimatePresence>
          {behind.map((skill, i) => (
            <motion.div
              key={skill.id}
              className="absolute inset-0 pointer-events-none"
              initial={{
                y: (i + 1) * -6,
                scale: 1 - (i + 1) * 0.04,
                opacity: 1 - (i + 1) * 0.15,
                zIndex: STACK_SIZE - i,
              }}
              animate={{
                y: (i + 1) * -6,
                scale: 1 - (i + 1) * 0.04,
                opacity: 1 - (i + 1) * 0.15,
                zIndex: STACK_SIZE - i,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Top card — draggable, flies off on swipe */}
        <motion.div
          key={current.id}
          className="absolute inset-0 touch-none"
          style={{
            x,
            rotate,
            opacity: cardOpacity,
            zIndex: STACK_SIZE + 1,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onTap={handleTap}
        >
          <SkillCard skill={current} />
        </motion.div>
      </div>

      {/* Swipe hint */}
      <div className="flex items-center gap-4 text-foreground/30">
        <span className="font-sans text-xs">← swipe</span>
        <span className="font-script text-sm">·</span>
        <span className="font-sans text-xs">tap to open</span>
        <span className="font-script text-sm">·</span>
        <span className="font-sans text-xs">swipe →</span>
      </div>
    </div>
  );
};
