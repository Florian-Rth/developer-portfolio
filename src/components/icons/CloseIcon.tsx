import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type CloseIconProps = {
  size?: number;
  className?: string;
};

export const CloseIcon = ({ size = 24, className }: CloseIconProps) => {
  return <HugeiconsIcon icon={Cancel01Icon} size={size} className={className} aria-hidden="true" />;
};
