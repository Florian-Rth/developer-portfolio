import { motion } from "framer-motion";
import type React from "react";
import { useEffect } from "react";

type PackBurstAnimationProps = {
  onBurstComplete: () => void;
};

const PACK_W = 260;
const PACK_H = 380;
const TEAR_Y = Math.round(PACK_H * 0.28);

const CARD_OFFSETS = [
  { x: -20, rot: -12 },
  { x: 10, rot: 8 },
  { x: -8, rot: -5 },
  { x: 25, rot: 14 },
];

export const PackBurstAnimation: React.FC<PackBurstAnimationProps> = ({ onBurstComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onBurstComplete(), 700);
    return () => clearTimeout(timer);
  }, [onBurstComplete]);

  return (
    <div className="relative w-[260px] h-[380px] select-none" style={{ perspective: "800px" }}>
      {/* Screen flash */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "white", zIndex: 30 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Upper half flies up */}
      <motion.div
        className="absolute left-0 top-0 w-full overflow-hidden rounded-t-2xl"
        style={{ height: TEAR_Y }}
        initial={{ y: 0, rotateX: 0, opacity: 1 }}
        animate={{ y: -300, rotateX: -20, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeIn" }}
      >
        <div
          className="w-full rounded-t-2xl"
          style={{
            height: PACK_H,
            background:
              "linear-gradient(135deg, #B8A9D4 0%, #E8B4A0 40%, #D4929B 70%, #B8A9D4 100%)",
          }}
        />
      </motion.div>

      {/* Lower half flies down */}
      <motion.div
        className="absolute left-0 w-full overflow-hidden rounded-b-2xl"
        style={{ top: TEAR_Y, height: PACK_H - TEAR_Y }}
        initial={{ y: 0, rotateX: 0, opacity: 1 }}
        animate={{ y: 400, rotateX: 15, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <div
          className="w-full rounded-b-2xl"
          style={{
            height: PACK_H,
            marginTop: -TEAR_Y,
            background:
              "linear-gradient(135deg, #B8A9D4 0%, #E8B4A0 40%, #D4929B 70%, #B8A9D4 100%)",
          }}
        />
      </motion.div>

      {/* Card silhouettes bursting upward */}
      {CARD_OFFSETS.map((offset, i) => (
        <motion.div
          key={`burst-card-${offset.x}`}
          className="absolute rounded-lg"
          style={{
            width: 130,
            height: 185,
            left: (PACK_W - 130) / 2 + offset.x,
            top: PACK_H / 2 - 92,
            background: "linear-gradient(135deg, rgba(255,253,249,0.9), rgba(255,253,249,0.7))",
            border: "1px solid rgba(255,255,255,0.5)",
            zIndex: 20 - i,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: -600, rotate: offset.rot, opacity: 0 }}
          transition={{
            delay: i * 0.06,
            type: "spring",
            stiffness: 180,
            damping: 20,
          }}
        />
      ))}

      {/* Warm glow from tear line */}
      <motion.div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          top: TEAR_Y - 60,
          height: 120,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,240,200,0.8), rgba(255,240,180,0.3) 50%, transparent 80%)",
          zIndex: 15,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3, opacity: [0, 1, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
};
