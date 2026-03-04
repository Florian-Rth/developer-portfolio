import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import type React from "react";
import { useMemo } from "react";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";
import { useSkillCards } from "./SkillCardsProvider";

type CardDeckProps = {
  className?: string;
  cardScale?: number;
};

const DECK_SIZE = 7;

export const CardDeck: React.FC<CardDeckProps> = ({ className, cardScale = 1 }) => {
  const { skills, scattered, isMobile, setScattered } = useSkillCards();

  const deckSkills = useMemo(() => skills.slice(0, DECK_SIZE), [skills]);

  if (scattered || isMobile) return null;

  const containerW = CARD_W * cardScale;
  const containerH = CARD_H * cardScale;

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 min-h-[500px]", className)}>
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ y: -16 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setScattered(true)}
        style={{ width: containerW, height: containerH }}
      >
        {deckSkills.map((skill, i) => {
          const rotation = (i - Math.floor(DECK_SIZE / 2)) * 3;
          const offsetX = (i - Math.floor(DECK_SIZE / 2)) * 4;
          const offsetY = -i * 3;
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
