import heroFRefined from "@assets/hero/hero-f-refined.svg";
import { cn } from "@lib/utils";
import type React from "react";

type HeroMonogramProps = {
  className?: string;
  compact?: boolean;
};

export const HeroMonogram: React.FC<HeroMonogramProps> = ({ className, compact = false }) => {
  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <div
        className={cn(
          "relative isolate flex w-full items-center justify-center overflow-visible",
          compact ? "h-56 max-w-[19rem]" : "h-[36rem] max-w-[42rem] translate-x-[12%] translate-y-[8%]",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_56%,rgba(255,253,249,0.58),rgba(255,253,249,0.06)_44%,transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle_at_58%_56%,rgba(37,34,32,0.5),rgba(37,34,32,0.06)_44%,transparent_72%)]" />
        <div className="absolute inset-x-[18%] top-[18%] h-[60%] rounded-[999px] bg-gradient-to-b from-gradient-lavender/20 via-gradient-dusty-rose/10 to-gradient-peach/8 blur-3xl dark:from-gradient-lavender/14 dark:via-gradient-dusty-rose/8 dark:to-gradient-peach/5" />
        <div className="absolute inset-x-[24%] bottom-[10%] h-14 rounded-full bg-foreground/8 blur-3xl dark:bg-black/24" />

        <img
          src={heroFRefined}
          alt=""
          aria-hidden="true"
          className={cn(
            "relative z-10 select-none object-contain drop-shadow-[0_34px_70px_rgba(45,42,38,0.14)] dark:drop-shadow-[0_28px_60px_rgba(0,0,0,0.34)]",
            compact ? "h-44 w-44" : "h-[36rem] w-[36rem] max-w-none",
          )}
        />
      </div>
    </div>
  );
};
