// Skills data — edit this file to add/remove/modify skill cards
// The card system is fully dynamic based on this config

export type SkillRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'tools';
export type ArtworkType = 'svg' | 'code-block' | 'animation' | 'icon';

export type SkillStats = {
  power: number;       // Overall mastery (1-10)
  speed: number;       // How fast I can ship with it (1-10)
  versatility: number; // Breadth of use cases (1-10)
  impact: number;      // Business/project impact (1-10)
};

export type SkillDetail = {
  learned: string;     // When / how learned
  usedIn: string;      // Where applied (projects, contexts)
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  rarity: SkillRarity;
  artwork: ArtworkType;
  stats: SkillStats;
  flavourText: string;
  detail: SkillDetail;
};

export const skills: Skill[] = [
  // ── FRONTEND ────────────────────────────────────────────────────────────────
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    rarity: 'legendary',
    artwork: 'svg',
    stats: { power: 9, speed: 9, versatility: 10, impact: 10 },
    flavourText: 'My native language. Everything else is just transpiled to it.',
    detail: {
      learned: 'Seit dem 2. Ausbildungsjahr — gelernt durch einfach loslegen und produktiv werden.',
      usedIn: 'Täglich im Job (ProductionStar-Frontend), dieses Portfolio, alle privaten Projekte.',
    },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    rarity: 'epic',
    artwork: 'code-block',
    stats: { power: 8, speed: 8, versatility: 9, impact: 9 },
    flavourText: 'Writing types is not overhead — it\'s documentation that bites back when you\'re wrong.',
    detail: {
      learned: 'Parallel zu React. Kein Zurück mehr zu reinem JS danach.',
      usedIn: 'Alle React-Projekte, APIs, Tooling-Scripts.',
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    rarity: 'rare',
    artwork: 'animation',
    stats: { power: 8, speed: 9, versatility: 9, impact: 8 },
    flavourText: 'undefined is not a function — but I know why, and that\'s power.',
    detail: {
      learned: 'Der Startpunkt von allem. Kein Framework, nur Browser und console.log.',
      usedIn: 'Basis für alle Web-Projekte, Scripting, schnelle Prototypen.',
    },
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    rarity: 'rare',
    artwork: 'animation',
    stats: { power: 8, speed: 10, versatility: 8, impact: 8 },
    flavourText: 'className="flex items-center justify-between" — poetry in utility classes.',
    detail: {
      learned: 'Umgestiegen von klassischem CSS/SCSS. Seitdem keine Stylesheets mehr bereut.',
      usedIn: 'Dieses Portfolio, Second Brain UI, alle neueren Projekte.',
    },
  },
  {
    id: 'html-css',
    name: 'HTML / CSS',
    category: 'frontend',
    rarity: 'uncommon',
    artwork: 'svg',
    stats: { power: 7, speed: 8, versatility: 7, impact: 6 },
    flavourText: 'The foundation everyone skips until something breaks in production.',
    detail: {
      learned: 'Klassisch — mit dem ersten „Hallo Welt" im Browser.',
      usedIn: 'Jedes Web-Projekt. Unvermeidbar und unterschätzt.',
    },
  },

  // ── BACKEND ──────────────────────────────────────────────────────────────────
  {
    id: 'csharp',
    name: 'C#',
    category: 'backend',
    rarity: 'epic',
    artwork: 'svg',
    stats: { power: 8, speed: 7, versatility: 8, impact: 9 },
    flavourText: 'Strongly typed, object-oriented, and responsible for my salary. Respect.',
    detail: {
      learned: 'Ausbildung bei Schulz Systemtechnik. Tiefer Einstieg durch echte Produktionssoftware.',
      usedIn: 'ProductionStar (Kernprodukt), ApiServerCore, alle Backend-Services.',
    },
  },
  {
    id: 'dotnet',
    name: '.NET Core',
    category: 'backend',
    rarity: 'rare',
    artwork: 'svg',
    stats: { power: 8, speed: 7, versatility: 8, impact: 9 },
    flavourText: 'Cross-platform. Production-grade. Runs everywhere — even in containers it built itself.',
    detail: {
      learned: 'Hand in Hand mit C#. REST APIs, Background Services, das ganze Ökosystem.',
      usedIn: 'ProductionStar Backend, REST APIs, Microservices.',
    },
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    rarity: 'rare',
    artwork: 'animation',
    stats: { power: 8, speed: 8, versatility: 10, impact: 9 },
    flavourText: '200 OK. The two words every developer lives for.',
    detail: {
      learned: 'Durch Backend-Entwicklung und die Arbeit mit verschiedenen externen APIs.',
      usedIn: 'Alle Projekte die Frontend und Backend verbinden — also alle.',
    },
  },

  // ── DEVOPS ───────────────────────────────────────────────────────────────────
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    rarity: 'rare',
    artwork: 'svg',
    stats: { power: 8, speed: 8, versatility: 9, impact: 9 },
    flavourText: 'Works on my machine — and now yours. That\'s the whole point.',
    detail: {
      learned: 'Selbst erarbeitet für CI/CD-Modernisierung. Kein Zurück zu bare-metal Deployments.',
      usedIn: 'Alle Deployments (Job + privat), Container-basierte CI/CD-Pipelines.',
    },
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    rarity: 'rare',
    artwork: 'svg',
    stats: { power: 7, speed: 6, versatility: 8, impact: 9 },
    flavourText: 'Complexity that pays off when your service needs to scale to three replicas at 3AM.',
    detail: {
      learned: 'Im Job — vollständiges K8s-Cluster-Setup von Grund auf aufgebaut.',
      usedIn: 'ProductionStar-Infrastruktur, automatisierte Rollouts.',
    },
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'devops',
    rarity: 'rare',
    artwork: 'animation',
    stats: { power: 8, speed: 9, versatility: 8, impact: 9 },
    flavourText: 'Push to main and go make coffee. Pipeline does the rest.',
    detail: {
      learned: 'Im Job durch Aufbau kompletter Deployment-Pipelines.',
      usedIn: 'Alle Projekte — automatisierte Tests, Builds, Deployments.',
    },
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'devops',
    rarity: 'uncommon',
    artwork: 'svg',
    stats: { power: 7, speed: 8, versatility: 8, impact: 8 },
    flavourText: 'YAML-as-a-career. Surprisingly enjoyable once you stop fighting the indentation.',
    detail: {
      learned: 'Für CI/CD-Modernisierung im Job. Inzwischen Default für alle neuen Projekte.',
      usedIn: 'Alle GitHub-Projekte (inkl. dieses Portfolio), Job-Pipelines.',
    },
  },
  {
    id: 'gitops',
    name: 'GitOps',
    category: 'devops',
    rarity: 'uncommon',
    artwork: 'svg',
    stats: { power: 7, speed: 7, versatility: 7, impact: 8 },
    flavourText: 'The cluster\'s desired state is in a repo. Trust the repo.',
    detail: {
      learned: 'Im Job für Infrastructure-as-Code und Cluster-Management.',
      usedIn: 'K8s-Cluster-Konfiguration, automatisierte Deployments.',
    },
  },

  // ── TOOLS ────────────────────────────────────────────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    rarity: 'rare',
    artwork: 'svg',
    stats: { power: 8, speed: 9, versatility: 9, impact: 8 },
    flavourText: 'git blame — the most diplomatic way to ask "who did this?"',
    detail: {
      learned: 'Ausbildung. Täglich. Unverzichtbar.',
      usedIn: 'Jedes einzelne Projekt. Kein Ausnahmen.',
    },
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'tools',
    rarity: 'uncommon',
    artwork: 'svg',
    stats: { power: 7, speed: 10, versatility: 7, impact: 7 },
    flavourText: 'HMR so fast you\'ll think the browser is lying to you.',
    detail: {
      learned: 'Für dieses Portfolio und neuere React-Projekte. Kein Create-React-App mehr.',
      usedIn: 'Dieses Portfolio, alle neuen React-Projekte.',
    },
  },
];

// Helpers
export const skillsByCategory = (category: SkillCategory) =>
  skills.filter((s) => s.category === category);

export const rarityOrder: Record<SkillRarity, number> = {
  legendary: 5,
  epic: 4,
  rare: 3,
  uncommon: 2,
  common: 1,
};

export const rarityColors: Record<SkillRarity, { border: string; glow: string; badge: string }> = {
  legendary: { border: '#F4D03F', glow: 'rgba(244,208,63,0.4)', badge: '#F39C12' },
  epic:      { border: '#B8A9D4', glow: 'rgba(184,169,212,0.4)', badge: '#9B59B6' },
  rare:      { border: '#D4929B', glow: 'rgba(212,146,155,0.4)', badge: '#E74C3C' },
  uncommon:  { border: '#E8B4A0', glow: 'rgba(232,180,160,0.35)', badge: '#E67E22' },
  common:    { border: '#A8C4B8', glow: 'rgba(168,196,184,0.3)', badge: '#27AE60' },
};

export const categoryColors: Record<SkillCategory, string> = {
  frontend: '#B8A9D4', // Lavender
  backend:  '#D4929B', // Dusty Rose
  devops:   '#E8B4A0', // Peach
  tools:    '#A8C4B8', // Sage
};

export const rarityLabel: Record<SkillRarity, string> = {
  legendary: '★ LEGENDARY',
  epic:      '◆ EPIC',
  rare:      '▲ RARE',
  uncommon:  '● UNCOMMON',
  common:    '○ COMMON',
};
