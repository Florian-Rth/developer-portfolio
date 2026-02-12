import { Moon02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type MoonIconProps = {
  size?: number;
  className?: string;
};

export const MoonIcon = ({ size = 20, className }: MoonIconProps) => {
  return <HugeiconsIcon icon={Moon02Icon} size={size} className={className} aria-hidden="true" />;
};
