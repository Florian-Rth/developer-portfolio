import type React from "react";

type CopyrightProps = {
  className?: string;
};

export const Copyright: React.FC<CopyrightProps> = ({ className = "" }) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>&copy; 2026 Florian Rätsch</p>;
};
