import type { Skill } from "@/data/skills";
import { categoryColors } from "@/data/skills";
import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { CardArtwork } from "./CardArtwork";
import { RarityBadge } from "./RarityBadge";
import { StatBar } from "./StatBar";

type DetailDrawerProps = {
  skill: Skill | null;
  onClose: () => void;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ skill, onClose }) => {
  const isMobile = useIsMobile();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (skill) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [skill, handleEscape]);

  const isOpen = skill !== null;
  const catColor = skill ? categoryColors[skill.category] : "#888";

  const drawerAnimation = isMobile
    ? {
        initial: { y: "100%" as const, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%" as const, opacity: 0 },
      }
    : {
        initial: { x: "100%" as const, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%" as const, opacity: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && skill && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer — Desktop: right, Mobile: bottom */}
          <motion.div
            className={cn(
              "fixed z-[999] bg-[var(--surface,#f5f0e8)]",
              "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:h-[70vh] max-md:rounded-t-2xl max-md:overflow-hidden",
              "md:top-0 md:right-0 md:h-full md:w-[380px] md:overflow-y-auto",
            )}
            style={{ boxShadow: isMobile ? "0 -4px 40px rgba(0,0,0,0.12)" : "-4px 0 40px rgba(0,0,0,0.12)" }}
            {...drawerAnimation}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Mobile drag handle + swipe-to-close zone */}
            {isMobile && (
              <motion.div
                className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.4 }}
                onDragEnd={(_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) onClose();
                }}
              >
                <div className="w-10 h-1 rounded-full bg-foreground/20" />
              </motion.div>
            )}

            {/* Scrollable content */}
            <div className="overflow-y-auto h-full pb-8">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <div>
                <h2 className="font-sans text-xl font-bold text-foreground">{skill.name}</h2>
                <RarityBadge rarity={skill.rarity} />
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors"
                type="button"
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            {/* Artwork */}
            <CardArtwork skill={skill} className="mx-6 h-[120px] rounded-lg overflow-hidden" />

            {/* Stats */}
            <div className="px-6 pt-4 flex flex-col gap-2">
              <StatBar label="Mastery" value={skill.stats.power} color={catColor} />
              <StatBar label="Speed" value={skill.stats.speed} color={catColor} />
              <StatBar label="Range" value={skill.stats.versatility} color={catColor} />
              <StatBar label="Impact" value={skill.stats.impact} color={catColor} />
            </div>

            {/* Flavour Text */}
            <p className="px-6 pt-4 font-script text-sm text-[#D4929B] italic leading-relaxed">
              "{skill.flavourText}"
            </p>

            {/* Brush separator */}
            <div className="px-6 py-3">
              <svg
                viewBox="0 0 300 12"
                className="w-full h-3 text-foreground/10"
                aria-hidden="true"
              >
                <path
                  d="M0,6 Q50,0 100,6 T200,6 T300,6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Detail sections */}
            <div className="px-6 pb-4 flex flex-col gap-4">
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-1">
                  Gelernt:
                </h4>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {skill.detail.learned}
                </p>
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-1">
                  Eingesetzt in:
                </h4>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {skill.detail.usedIn}
                </p>
              </div>
            </div>
            </div>{/* end scrollable */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
