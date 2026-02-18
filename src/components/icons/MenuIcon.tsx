import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type MenuIconProps = {
  size?: number;
  className?: string;
};

export const MenuIcon = ({ size = 24, className }: MenuIconProps) => {
  return <HugeiconsIcon icon={Menu01Icon} size={size} className={className} aria-hidden="true" />;
};
