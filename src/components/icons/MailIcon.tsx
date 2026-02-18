import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type MailIconProps = {
  size?: number;
  className?: string;
};

export const MailIcon = ({ size = 20, className }: MailIconProps) => {
  return <HugeiconsIcon icon={Mail01Icon} size={size} className={className} aria-hidden="true" />;
};
