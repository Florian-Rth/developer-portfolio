import type { Skill } from "@/data/skills";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";
import { useSkillCards } from "./SkillCardsProvider";

const SWIPE_THRESHOLD = 80;
const STACK_SIZE = 3;
const FLY_DISTANCE = 600;

const calcCardScale = () => Math.min(Math.max(window.innerWidth * 0.65, 180), 280) / CARD_W;

type ExitingCard = {
  skill: Skill;
  startX: number;
  startRotation: number;
  direction: "left" | "right";
};

export const MobileCardStack: React.FC = () => {
  const { skills, isMobile, setSelectedSkill } = useSkillCards();

  const [queue, setQueue] = useState<Skill[]>(skills);
  const [isDragging, setIsDragging] = useState(false);
  const [exitingCard, setExitingCard] = useState<ExitingCard | null>(null);
  const [cardScale, setCardScale] = useState(calcCardScale);

  useEffect(() => {
    const onResize = () => setCardScale(calcCardScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cardW = CARD_W * cardScale;
  const cardH = CARD_H * cardScale;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const cardOpacity = useTransform(
    x,
    [-FLY_DISTANCE / 2, -80, 0, 80, FLY_DISTANCE / 2],
    [0, 1, 1, 1, 0],
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      setIsDragging(false);
      const swipedFar = Math.abs(info.offset.x) > SWIPE_THRESHOLD;
      const swipedFast = Math.abs(info.velocity.x) > 500;

      if (swipedFar || swipedFast) {
        const dir = info.offset.x > 0 ? "right" : "left";

        setExitingCard({
          skill: queue[0],
          startX: x.get(),
          startRotation: Math.max(-20, Math.min(20, (x.get() / 200) * 20)),
          direction: dir,
        });

        setQueue((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });

        x.set(0);
      } else {
        animate(x, 0, { type: "spring", stiffness: 600, damping: 35 });
      }
    },
    [queue, x],
  );

  const handleTap = useCallback(() => {
    if (!isDragging && !exitingCard) {
      setSelectedSkill(queue[0]);
    }
  }, [isDragging, exitingCard, setSelectedSkill, queue]);

  if (!isMobile) return null;

  const current = queue[0];
  const behind = queue.slice(1, 1 + STACK_SIZE);
  const currentIndex = skills.findIndex((s) => s.id === current.id);

  return (
    <div className="flex flex-col items-center gap-6 min-h-[500px] justify-center">
      {/* Counter */}
      <p className="font-sans text-xs text-foreground/40 tracking-widest uppercase">
        {currentIndex + 1} / {skills.length}
      </p>

      {/* Card stack */}
      <div className="relative" style={{ width: cardW, height: cardH }}>
        {/* Background cards */}
        <AnimatePresence>
          {behind.map((skill, i) => (
            <motion.div
              key={skill.id}
              className="absolute top-0 left-0 pointer-events-none"
              initial={{
                y: (i + 1) * -7,
                scale: 1 - (i + 1) * 0.04,
                opacity: 1 - (i + 1) * 0.15,
                zIndex: STACK_SIZE - i,
              }}
              animate={{
                y: (i + 1) * -7,
                scale: 1 - (i + 1) * 0.04,
                opacity: 1 - (i + 1) * 0.15,
                zIndex: STACK_SIZE - i,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
            >
              <SkillCard skill={skill} scale={cardScale} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Top card */}
        <motion.div
          key={current.id}
          className="absolute top-0 left-0 touch-none"
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
          <SkillCard skill={current} scale={cardScale} />
        </motion.div>

        {/* Fly-off overlay */}
        <AnimatePresence>
          {exitingCard && (
            <motion.div
              key={`exit-${exitingCard.skill.id}`}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ zIndex: STACK_SIZE + 2 }}
              initial={{
                x: exitingCard.startX,
                rotate: exitingCard.startRotation,
                opacity: 1,
              }}
              animate={{
                x: exitingCard.direction === "right" ? FLY_DISTANCE : -FLY_DISTANCE,
                rotate: exitingCard.direction === "right" ? 30 : -30,
                opacity: 0,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onAnimationComplete={() => setExitingCard(null)}
            >
              <SkillCard skill={exitingCard.skill} scale={cardScale} />
            </motion.div>
          )}
        </AnimatePresence>
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
