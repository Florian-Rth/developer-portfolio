// Projects data — edit this file to add/remove/modify project cards
// The projects section is fully dynamic based on this config

export type ProjectCategory = "iot" | "scheduling" | "logistics" | "devops" | "portfolio";

export type GradientColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  highlights: string[];
  /** Full tech stack shown in detail view */
  techStack: string[];
  /** Max 5 items shown as pills on the card */
  techPills: string[];
  gradientColors: GradientColors;
  isPublic: boolean;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "machine-eye",
    title: "Machine-Eye",
    tagline: "Real-time monitoring platform for industrial machine connectivity",
    description:
      "Connects industrial equipment (OPC-UA, Siemens S7, Modbus, MQTT) to a web interface. Real-time data capture, configurable rule engine, and notifications — all without writing code.",
    category: "iot",
    highlights: [
      "Protocol-agnostic plugin system (OPC-UA, S7, Modbus, MQTT)",
      "Dual-DB strategy (PostgreSQL + TimescaleDB) for time-series data",
      "Real-time updates via SignalR + RabbitMQ inbox/outbox pattern",
      "Clean architecture + Result<T> error handling throughout",
      "React compiler with automatic memoization",
    ],
    techStack: [
      ".NET 10",
      "React 19",
      "RabbitMQ",
      "PostgreSQL",
      "TimescaleDB",
      "SignalR",
      "OPC-UA",
      "Siemens S7",
      "Modbus",
      "MQTT",
      "Docker",
    ],
    techPills: [".NET 10", "React 19", "SignalR", "RabbitMQ", "TimescaleDB"],
    gradientColors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#06B6D4",
    },
    isPublic: false,
  },
  {
    id: "cr3-scheduler",
    title: "CR3-Scheduler",
    tagline: "Graph-based scheduling system for logistics and production",
    description:
      "Graph-based algorithm for complex scheduling problems. Drag-and-drop pipeline, multi-factor optimization (time, cost, resources), and interactive visual graph representation.",
    category: "scheduling",
    highlights: [
      "Custom graph algorithm for constraint satisfaction",
      "Pipeline pattern for composable task execution",
      "Drag-and-drop interface built with dnd-kit",
      "Multi-factor optimization across time, cost, and resources",
      "Graph visualization with xyflow",
    ],
    techStack: [".NET 9", "React 19", "TanStack Query", "dnd-kit", "xyflow", "SQL Server"],
    techPills: [".NET 9", "React 19", "TanStack Query", "dnd-kit", "xyflow"],
    gradientColors: {
      primary: "#10B981",
      secondary: "#F59E0B",
      accent: "#3B82F6",
    },
    isPublic: false,
  },
  {
    id: "yard-logistics",
    title: "Yard Logistics",
    tagline: "Complete yard management system for truck tracking and loading operations",
    description:
      "NX monorepo with 3 independent apps (Admin, Driver, Gate). Interactive SVG warehouse floor plan with slot management, live camera feed integration, and a DCS simulation for testing.",
    category: "logistics",
    highlights: [
      "NX monorepo architecture with 3 apps (Admin, Driver, Gate)",
      "Interactive SVG warehouse floor plan with dynamic slots",
      "Live camera feed integration (ffmpeg + OvenPlayer)",
      "DCS simulation layer for end-to-end testing without hardware",
      "Multi-auth with JWT and role-based access control",
    ],
    techStack: [".NET 9", "React 19", "NX Monorepo", "JWT", "ffmpeg", "OvenPlayer", "SQLite"],
    techPills: [".NET 9", "React 19", "NX Monorepo", "ffmpeg", "OvenPlayer"],
    gradientColors: {
      primary: "#F97316",
      secondary: "#EF4444",
      accent: "#FBBF24",
    },
    isPublic: false,
  },
  {
    id: "cicd-actions",
    title: "CI/CD Automation",
    tagline: "GitHub Actions suite for complete delivery automation",
    description:
      "5 focused GitHub Actions for version extraction, Docker build/push, Kubernetes manifest patching, semantic versioning, and project scaffolding via Copier.",
    category: "devops",
    highlights: [
      "5 focused Actions: Extract, Build, Deploy, Version, Scaffold",
      "Multi-format version extraction (package.json, AssemblyInfo, pyproject.toml)",
      "Semantic versioning driven by conventional commits",
      "Kubernetes manifest patching with yq/jq",
      "Copier scaffolding for new projects with Jinja2 templates",
    ],
    techStack: [
      "Node.js 20",
      "GitHub Actions",
      "Docker Hub API",
      "Kubernetes",
      "Copier",
      "Jinja2",
      "Jest",
    ],
    techPills: ["Node.js 20", "GitHub Actions", "Docker", "Kubernetes", "Copier"],
    gradientColors: {
      primary: "#8B5CF6",
      secondary: "#EC4899",
      accent: "#06B6D4",
    },
    isPublic: true,
    githubUrl: "https://github.com/Florian-Rth/ci-cd-actions",
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    tagline: "This portfolio — React SPA with TCG skill cards and pack-opening mechanics",
    description:
      "React SPA featuring a TCG trading card system for skills, pack-opening animation with scissor-tear effect, foil/holo CSS gradients, Framer Motion FLIP transitions, dark/light mode, and full mobile-first design.",
    category: "portfolio",
    highlights: [
      "TCG card system with pack-opening animation (scissor-tear)",
      "Foil/holo effects built entirely with CSS gradients",
      "Framer Motion FLIP transitions throughout",
      "Dark/light mode with theme-aware SVGs via CSS variables",
      "Mobile-first design with responsive breakpoints",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Biome"],
    techPills: ["React 19", "TypeScript", "Framer Motion", "Tailwind CSS", "Vite"],
    gradientColors: {
      primary: "#D4929B",
      secondary: "#B8A9D4",
      accent: "#E8B4A0",
    },
    isPublic: true,
    githubUrl: "https://github.com/Florian-Rth/developer-portfolio",
    liveUrl: "/",
  },
];

// Helpers
export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

export const categoryLabels: Record<ProjectCategory, string> = {
  iot: "Industrial IoT",
  scheduling: "Scheduling",
  logistics: "Logistics",
  devops: "DevOps",
  portfolio: "Portfolio",
};

export const categoryColors: Record<
  ProjectCategory,
  { bg: string; fg: string; darkBg: string; darkFg: string }
> = {
  iot: { bg: "#DBEAFE", fg: "#1E40AF", darkBg: "#1E3A5F", darkFg: "#93C5FD" },
  scheduling: { bg: "#D1FAE5", fg: "#065F46", darkBg: "#1A3D30", darkFg: "#6EE7B7" },
  logistics: { bg: "#FFEDD5", fg: "#9A3412", darkBg: "#3D1F0A", darkFg: "#FDBA74" },
  devops: { bg: "#EDE9FE", fg: "#5B21B6", darkBg: "#2E1A5F", darkFg: "#C4B5FD" },
  portfolio: { bg: "#FCE7F3", fg: "#9D174D", darkBg: "#3D1027", darkFg: "#F9A8D4" },
};
