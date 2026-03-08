/**
 * Z-index layer system — single source of truth for all overlay stacking.
 * AppBar uses Tailwind z-50 (= 50), everything else references these constants.
 */
export const LAYERS = {
  /** Tailwind z-50 — matches AppBar */
  appBar: 50,
  /** Detail drawer and similar panels */
  drawer: 500,
  /** Pack theater / fullscreen overlays — sits above everything incl. AppBar */
  theater: 1000,
  /** Toasts, alerts */
  toast: 2000,
} as const;

export type Layer = (typeof LAYERS)[keyof typeof LAYERS];
