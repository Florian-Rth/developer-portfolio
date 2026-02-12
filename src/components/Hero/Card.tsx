import { cn } from "@lib/utils";
import type React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative bg-card rounded-[20px] md:rounded-[24px] shadow-lg p-6 md:p-8 w-[85%] max-w-md mx-auto -rotate-1",
        className,
      )}
    >
      {children}
    </div>
  );
};
