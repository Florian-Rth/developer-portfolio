import { cn } from "@lib/utils";
import type React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
};
