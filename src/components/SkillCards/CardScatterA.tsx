import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { DetailDrawer } from "./DetailDrawer";
import { SkillCard } from "./SkillCard";

type CardScatterAProps = {
  skills: Skill[];
  className?: string;
};

const seededRandom = (seed: number) => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generatePositions = (count: number) => {
  const cols = Math.ceil(Math.sqrt(count));

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const rows = Math.ceil(count / cols);
    const baseX = (col - (cols - 1) / 2) * 230;
    const baseY = (row - (rows - 1) / 2) * 310;
    const jitterX = (seededRandom(i * 7 + 1) - 0.5) * 40;
    const jitterY = (seededRandom(i * 13 + 3) - 0.5) * 40;
    const rotation = (seededRandom(i * 17 + 5) - 0.5) * 20;

    return {
      x: baseX + jitterX,
      y: baseY + jitterY,
      rotation,
    };
  });
};

export const CardScatterA: React.FC<CardScatterAProps> = ({ skills: allSkills, className }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const positions = useMemo(() => generatePositions(allSkills.length), [allSkills.length]);

  const handleSelect = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  return (
    <>
      <div
        className={cn(
          "relative w-full flex items-center justify-center",
          "min-h-[800px]",
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
                  initial={{ x: -100, y: -140, rotate: 0, opacity: 0 }}
                  animate={{
                    x: pos.x - 100,
                    y: pos.y - 140,
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
                  <SkillCard skill={skill} onSelect={() => handleSelect(skill)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <DetailDrawer skill={selectedSkill} onClose={handleCloseDrawer} />
    </>
  );
};
