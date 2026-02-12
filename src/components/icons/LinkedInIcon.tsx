import { Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type LinkedInIconProps = {
  size?: number;
  className?: string;
};

export const LinkedInIcon = ({ size = 20, className }: LinkedInIconProps) => {
  return (
    <HugeiconsIcon icon={Linkedin01Icon} size={size} className={className} aria-hidden="true" />
  );
};
