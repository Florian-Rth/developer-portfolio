import { cn } from "@lib/utils";
import type React from "react";

type InfoTextProps = {
  children: React.ReactNode;
  className?: string;
};

export const InfoText: React.FC<InfoTextProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        "font-dm-sans font-normal text-text-secondary",
        "text-base leading-[1.7]",
        "max-w-[480px]",
        className,
      )}
    >
      {children}
    </p>
  );
};
