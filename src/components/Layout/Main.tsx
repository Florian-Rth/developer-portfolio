import type React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export const Main: React.FC<MainProps> = ({ children, className = "" }) => {
  return <main className={`flex-1 ${className}`}>{children}</main>;
};
