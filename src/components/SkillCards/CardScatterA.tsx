import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useMemo } from "react";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";

type CardScatterAProps = {
  skills: Skill[];
  onSelect?: (skill: Skill) => void;
  className?: string;
  /** Scale factor forwarded to each SkillCard. Spacing adjusts proportionally. Default: 1 */
  cardScale?: number;
};

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generatePositions = (count: number, scale: number) => {
  const cols = Math.ceil(Math.sqrt(count));

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const rows = Math.ceil(count / cols);
    const baseX = (col - (cols - 1) / 2) * 230 * scale;
    const baseY = (row - (rows - 1) / 2) * 310 * scale;
    const jitterX = (seededRandom(i * 7 + 1) - 0.5) * 40 * scale;
    const jitterY = (seededRandom(i * 13 + 3) - 0.5) * 40 * scale;
    const rotation = (seededRandom(i * 17 + 5) - 0.5) * 20;

    return {
      x: baseX + jitterX,
      y: baseY + jitterY,
      rotation,
    };
  });
};

export const CardScatterA: React.FC<CardScatterAProps> = ({
  skills: allSkills,
  onSelect,
  className,
  cardScale = 1,
}) => {
  const positions = useMemo(
    () => generatePositions(allSkills.length, cardScale),
    [allSkills.length, cardScale],
  );

  // Half the scaled card dimensions — used to centre cards on their anchor point
  const halfW = (CARD_W * cardScale) / 2;
  const halfH = (CARD_H * cardScale) / 2;

  const handleSelect = useCallback(
    (skill: Skill) => {
      onSelect?.(skill);
    },
    [onSelect],
  );

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center",
        "min-h-[1400px]",
        className,
      )}
    >
      <div className="relative" style={{ width: "100%", height: "100%" }}>
        <AnimatePresence>
          {allSkills.map((skill, i) => {
            const pos = positions[i];
            return (
              <motion.div
                key={skill.id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  zIndex: i,
                }}
                initial={{ x: -halfW, y: -halfH, rotate: 0, opacity: 0 }}
                animate={{
                  x: pos.x - halfW,
                  y: pos.y - halfH,
                  rotate: pos.rotation,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  delay: i * 0.03,
                }}
                drag
                dragMomentum={false}
                dragElastic={0.1}
                whileHover={{ zIndex: 50 }}
                whileDrag={{ scale: 1.05, zIndex: 100 }}
              >
                <SkillCard
                  skill={skill}
                  scale={cardScale}
                  onSelect={() => handleSelect(skill)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
