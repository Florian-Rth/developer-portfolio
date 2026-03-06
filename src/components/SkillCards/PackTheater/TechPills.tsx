import type React from "react";

const PILLS = [
  { name: "React",      color: "#0EA5E9", bg: "rgba(14,165,233,0.12)"  },
  { name: "C#",         color: "#7C3AED", bg: "rgba(124,58,237,0.1)"   },
  { name: "TypeScript", color: "#2563EB", bg: "rgba(37,99,235,0.1)"    },
  { name: "Docker",     color: "#0891B2", bg: "rgba(8,145,178,0.1)"    },
  { name: ".NET",       color: "#9333EA", bg: "rgba(147,51,234,0.1)"   },
  { name: "Git",        color: "#E2521A", bg: "rgba(226,82,26,0.1)"    },
  { name: "+ 10 more",  color: "#8B5CF6", bg: "rgba(139,92,246,0.08)"  },
] as const;

export const TechPills: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-lg">
    {PILLS.map((pill) => (
      <span
        key={pill.name}
        className="font-sans text-sm font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full transition-all hover:scale-105"
        style={{
          border: `1.5px solid ${pill.color}50`,
          color: pill.color,
          background: pill.bg,
          boxShadow: `0 2px 8px ${pill.color}15`,
        }}
      >
        {pill.name}
      </span>
    ))}
  </div>
);
