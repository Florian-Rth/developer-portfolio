import { useTheme } from "@components/ThemeProvider";
import { MoonIcon, SunIcon } from "@components/icons";
import { cn } from "@lib/utils";
import type React from "react";

type DarkModeToggleProps = {
  className?: string;
};

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn("p-2 rounded-lg hover:bg-secondary transition-colors", className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <SunIcon size={20} className="text-foreground" />
      ) : (
        <MoonIcon size={20} className="text-foreground" />
      )}
    </button>
  );
};
