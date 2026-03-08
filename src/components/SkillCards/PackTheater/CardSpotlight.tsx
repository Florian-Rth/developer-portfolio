import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";

const PARTICLE_KEYS = Array.from({ length: 20 }, (_, i) => `gp-${i}`);

type CardSpotlightProps = {
  visible: boolean;
  skillName: string;
  isHireMe?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  visible,
  skillName: _skillName,
  isHireMe = false,
  children,
  className,
}) => (
  <AnimatePresence>
    {visible && (
      <div
        className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center", className)}
      >
        {/* Dim overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Spotlight glow behind card */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background: isHireMe
              ? "radial-gradient(ellipse at center, rgba(244,208,63,0.25) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(184,169,212,0.2) 0%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card container — scaled up */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.5, y: -80, opacity: 0 }}
          animate={{ scale: 1.25, y: 0, opacity: 1 }}
          exit={{ scale: 0.6, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 26, mass: 1.1 }}
        >
          {children}
        </motion.div>

        {/* Gold particles for Hire Me */}
        {isHireMe && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {PARTICLE_KEYS.map((key, i) => (
              <div
                key={key}
                className="absolute rounded-full"
                style={{
                  width: 3 + (i % 3) * 2,
                  height: 3 + (i % 3) * 2,
                  background: `rgba(244,208,63,${0.4 + (i % 4) * 0.15})`,
                  left: `${10 + ((i * 4.2) % 80)}%`,
                  bottom: "30%",
                  animation: `goldParticleRise ${1.5 + (i % 5) * 0.3}s ease-out ${(i % 8) * 0.1}s infinite`,
                  boxShadow: "0 0 4px rgba(244,208,63,0.5)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    )}
  </AnimatePresence>
);
