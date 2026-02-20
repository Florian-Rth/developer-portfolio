import { cn } from "@lib/utils";
import type React from "react";

type StoryProps = {
  children: React.ReactNode;
  className?: string;
};

export const Story: React.FC<StoryProps> = ({ children, className }) => {
  return (
    <article className={cn("max-w-[520px]", className)}>
      <h2 className={cn("font-dm-sans font-bold text-text", "text-[28px] md:text-[36px]", "mb-6")}>
        My Story.
      </h2>
      <div
        className={cn("font-dm-sans font-normal text-text-secondary", "text-base leading-[1.8]")}
      >
        {children}
      </div>
    </article>
  );
};
