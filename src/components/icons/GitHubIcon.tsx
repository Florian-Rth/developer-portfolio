import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type GitHubIconProps = {
  size?: number;
  className?: string;
};

export const GitHubIcon = ({ size = 20, className }: GitHubIconProps) => {
  return <HugeiconsIcon icon={GithubIcon} size={size} className={className} aria-hidden="true" />;
};
