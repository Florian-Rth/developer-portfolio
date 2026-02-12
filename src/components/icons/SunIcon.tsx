import { Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type SunIconProps = {
  size?: number;
  className?: string;
};

export const SunIcon = ({ size = 20, className }: SunIconProps) => {
  return <HugeiconsIcon icon={Sun03Icon} size={size} className={className} aria-hidden="true" />;
};
