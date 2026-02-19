import { cn } from "@lib/utils";
import type React from "react";

type PhotoCardProps = {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
};

export const PhotoCard: React.FC<PhotoCardProps> = ({ src, alt, children, className }) => {
  const hasImage = src && !src.includes("placeholder");

  return (
    <div className="relative">
      <div
        data-testid="photo-card"
        className={cn(
          "relative overflow-hidden",
          "w-[240px] h-[280px] lg:w-[320px] lg:h-[380px]",
          "bg-card border-[10px] border-card rounded-md",
          "shadow-[6px_8px_24px_rgba(0,0,0,0.10)] dark:shadow-[6px_8px_24px_rgba(0,0,0,0.30)]",
          "rotate-[-4deg]",
          "transition-transform duration-300 ease-out",
          "hover:rotate-[-2deg] hover:scale-[1.02]",
          className,
        )}
      >
        {hasImage ? (
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="w-full h-full bg-gradient-to-br from-gradient-peach via-gradient-dusty-rose to-gradient-lavender"
          />
        )}
      </div>
      {children}
    </div>
  );
};
