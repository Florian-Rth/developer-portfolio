import type React from "react";

type ActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Actions: React.FC<ActionsProps> = ({ children, className = "" }) => {
  return <div className={`flex flex-col sm:flex-row gap-3 mt-6 ${className}`}>{children}</div>;
};
