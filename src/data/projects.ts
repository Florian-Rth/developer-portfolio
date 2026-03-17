export type GradientConfig = {
  primary: string;
  secondary: string;
  accent: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  highlights: string[];
  tech: string[];
  techPills: string[];
  gradient: GradientConfig;
  isPublic?: boolean;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "machine-eye",
    title: "Machine-Eye",
    tagline: "Echtzeit-Monitoring-Plattform für industrielle Maschinenanbindung",
    description:
      "Verbindet Maschinenequipment (OPC-UA, Siemens S7, Modbus, MQTT) mit einer Web-Oberfläche. Echtzeit-Datenerfassung, Regelwerk, Benachrichtigungen — konfigurierbar ohne Code.",
    category: "Industrial IoT",
    highlights: [
      "Protocol-agnostic Plugin-System",
      "Dual-DB Strategie (PostgreSQL + TimescaleDB)",
      "Real-time via SignalR + RabbitMQ Inbox/Outbox",
      "Clean Architecture + Result<T> Error Handling",
      "React Compiler (auto-memoization)",
    ],
    tech: [
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
    techPills: [".NET 10", "React 19", "RabbitMQ", "TimescaleDB", "+3"],
    gradient: { primary: "#B8A9D4", secondary: "#E8B4A0", accent: "#8C9FE0" },
  },
  {
    id: "cr3-scheduler",
    title: "CR3-Scheduler",
    tagline: "Graph-basiertes Scheduling-System für Logistik & Produktion",
    description:
      "Eigener Graph-Algorithmus für Multi-Faktor-Optimierung von Touren, Schichten und Ressourcen. Pipeline Pattern, Drag-and-Drop, Graph-Visualisierung via xyflow.",
    category: "Scheduling",
    highlights: [
      "Eigener Graph-Algorithmus für Tourenplanung",
      "Pipeline Pattern für Verarbeitungsketten",
      "Drag-and-Drop Scheduling UI",
      "Multi-Faktor Optimierung",
      "Graph-Visualisierung mit xyflow",
    ],
    tech: [".NET 9", "React 19", "TanStack Query", "dnd-kit", "xyflow", "SQL Server"],
    techPills: [".NET 9", "React 19", "Graph-Algo", "DnD", "SQL Server"],
    gradient: { primary: "#E8B4A0", secondary: "#D4929B", accent: "#F0C8A0" },
  },
  {
    id: "yard-logistics",
    title: "Yard Logistics",
    tagline: "Komplettes Yard-Management-System für LKW-Tracking & Ladeabläufe",
    description:
      "3 unabhängige Apps in einem NX-Monorepo. SVG-Werkshallenplan, Live-Camera-Feed, DCS-Simulation und Multi-Auth.",
    category: "Logistics",
    highlights: [
      "3 unabhängige Apps im NX Monorepo",
      "SVG Werkshallenplan (interaktiv)",
      "Live Camera Feed (ffmpeg + OvenPlayer)",
      "DCS-Simulation für Testzwecke",
      "Multi-Auth mit JWT",
    ],
    tech: [".NET 9", "React 19", "NX Monorepo", "JWT", "ffmpeg", "OvenPlayer", "SQLite"],
    techPills: [".NET 9", "NX Monorepo", "React 19", "Live Camera", "+2"],
    gradient: { primary: "#D4929B", secondary: "#B8A9D4", accent: "#E8A0B0" },
  },
  {
    id: "cicd-actions",
    title: "CI/CD Automation",
    tagline: "GitHub Actions Suite für vollständige Delivery-Automatisierung",
    description:
      "5 fokussierte GitHub Actions für Versionierung, Docker-Builds, K8s-Deployments, Semantic Releases und Scaffolding mit Copier.",
    category: "DevOps",
    highlights: [
      "5 fokussierte GitHub Actions",
      "Multi-Format Version Extraction",
      "Semantic Versioning Pipeline",
      "K8s Manifest Patching",
      "Copier Template Scaffolding",
    ],
    tech: [
      "Node.js 20",
      "GitHub Actions",
      "Docker Hub API",
      "Kubernetes",
      "Copier",
      "Jinja2",
      "Jest",
    ],
    techPills: ["GitHub Actions", "Kubernetes", "Docker", "Node.js", "Copier"],
    gradient: { primary: "#A8C4B8", secondary: "#E8B4A0", accent: "#90C4A8" },
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    tagline: "Dieses Portfolio — React SPA mit TCG-Skill-Section & Pack-Opening-Mechanik",
    description:
      "TCG Card System mit Pack-Opening-Animation, Foil/Holo-Effekte, Framer Motion FLIP, Dark/Light Mode, Mobile-first.",
    category: "Portfolio",
    highlights: [
      "TCG Card System mit Pack-Opening-Animation",
      "Foil/Holo-Effekte auf Skill-Karten",
      "Framer Motion FLIP Animationen",
      "Dark/Light Mode mit warmem Pastell-Theme",
      "Mobile-first, Performance-optimiert",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Biome"],
    techPills: ["React 19", "TypeScript", "Framer Motion", "Tailwind", "Vite"],
    gradient: { primary: "#B8A9D4", secondary: "#E8B4A0", accent: "#D4929B" },
    isPublic: true,
    githubUrl: "https://github.com/Florian-Rth/developer-portfolio",
  },
];
