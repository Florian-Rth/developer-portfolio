/**
 * Backdrop — generic full-screen overlay via React Portal.
 *
 * Renders directly into document.body so `fixed` positioning is immune to
 * parent transforms, filters, or overflow clipping.
 *
 * Internal structure (bottom → top):
 *   1. Dim layer      — absolute inset-0, pointer-events: none (click-through)
 *   2. Content layer  — absolute inset-0, flex-center, pointer-events: none
 *        └─ children  — each child manages its own pointer-events
 *
 * Usage:
 *   <Backdrop visible={open} onDismiss={() => setOpen(false)} blockScroll>
 *     <motion.div className="absolute bottom-8 right-8">
 *       <SkipButton />
 *     </motion.div>
 *     <div className="relative z-10 flex flex-col items-center gap-6">
 *       <Card />
 *     </div>
 *   </Backdrop>
 */

import { LAYERS } from "@/lib/layers";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export type BackdropProps = {
  /** Show/hide the backdrop (AnimatePresence handles exit animation) */
  visible: boolean;
  /** CSS z-index — default LAYERS.theater (1000), sits above AppBar */
  zIndex?: number;
  /** Background color for the dim layer — default "rgba(10,8,12,0.55)" */
  dimColor?: string;
  /** Fade in/out duration in seconds — default 0.45 */
  fadeDuration?: number;
  /**
   * Called when the user clicks the dim layer.
   * If omitted, clicks on the dim are ignored (pointer-events: none).
   */
  onDismiss?: () => void;
  /** Lock body scroll while backdrop is visible — default false */
  blockScroll?: boolean;
  /** Content rendered above the dim layer */
  children?: React.ReactNode;
};

export const Backdrop: React.FC<BackdropProps> = ({
  visible,
  zIndex = LAYERS.theater,
  dimColor = "rgba(10,8,12,0.55)",
  fadeDuration = 0.45,
  onDismiss,
  blockScroll = false,
  children,
}) => {
  // Lock / unlock body scroll
  useEffect(() => {
    if (!blockScroll || !visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [blockScroll, visible]);

  // SSR guard
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="backdrop-root"
          style={{ position: "fixed", inset: 0, zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration }}
        >
          {/* ── 1. Dim layer ──────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            onClick={onDismiss}
            style={{
              position: "absolute",
              inset: 0,
              background: dimColor,
              pointerEvents: onDismiss ? "auto" : "none",
              cursor: onDismiss ? "default" : undefined,
            }}
          />

          {/* ── 2. Content layer ──────────────────────────────────────────── */}
          {/*
           * absolute inset-0 so absolute-positioned children use the
           * viewport as their containing block (fixed inset-0 parent).
           * pointer-events: none here — each child opts in individually.
           */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
