import { skills } from "@/data/skills";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import type React from "react";
import { useMemo } from "react";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";

type CardDeckProps = {
  onScatter: () => void;
  className?: string;
  /** Scale factor forwarded to each SkillCard. Container adjusts proportionally. Default: 1 */
  cardScale?: number;
};

const DECK_SIZE = 7;

export const CardDeck: React.FC<CardDeckProps> = ({ onScatter, className, cardScale = 1 }) => {
  const deckSkills = useMemo(() => skills.slice(0, DECK_SIZE), []);

  const containerW = CARD_W * cardScale;
  const containerH = CARD_H * cardScale;

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onScatter}
        style={{ width: containerW, height: containerH }}
      >
        {deckSkills.map((skill, i) => {
          const rotation = (i - Math.floor(DECK_SIZE / 2)) * 1.5;
          const offsetX = (i - Math.floor(DECK_SIZE / 2)) * 2;
          const offsetY = -i * 2;
          return (
            <motion.div
              key={skill.id}
              className="absolute"
              style={{
                top: 0,
                left: 0,
                zIndex: i,
                transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SkillCard skill={skill} scale={cardScale} />
            </motion.div>
          );
        })}
      </motion.div>
      <p className="font-script text-sm text-foreground/40 text-center pointer-events-none select-none">
        Click to explore →
      </p>
    </div>
  );
};
