import { cn } from "@lib/utils";
import type React from "react";

type TopicChipsProps = {
  children: React.ReactNode;
  className?: string;
};

export const TopicChips: React.FC<TopicChipsProps> = ({ children, className }) => {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
};
