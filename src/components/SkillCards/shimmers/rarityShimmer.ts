import type { SkillRarity } from "@/data/skills";
import type React from "react";
import { RainbowFoil } from "./RainbowFoil";
import { SparkleField } from "./SparkleField";
import type { ShimmerProps } from "./types";

type ShimmerConfig = {
  Shimmer: React.ComponentType<ShimmerProps>;
  intensity: NonNullable<ShimmerProps["intensity"]>;
} | null;

/**
 * Single source of truth for rarity → shimmer mapping.
 * Returns null for rarities that get no shimmer effect.
 *
 * Legendary → RainbowFoil max  (full holographic foil)
 * Epic      → SparkleField medium  (star glitter)
 * Rare      → RainbowFoil low  (subtle foil hint)
 * Uncommon  → null
 * Common    → null
 */
export function rarityShimmer(rarity: SkillRarity): ShimmerConfig {
  switch (rarity) {
    case "legendary":
      return { Shimmer: RainbowFoil, intensity: "max" };
    case "epic":
      return { Shimmer: SparkleField, intensity: "medium" };
    case "rare":
      return { Shimmer: RainbowFoil, intensity: "low" };
    default:
      return null;
  }
}
