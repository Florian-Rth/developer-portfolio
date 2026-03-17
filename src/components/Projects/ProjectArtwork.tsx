import type { Project } from "@/data/projects";
import type React from "react";

type ProjectArtworkProps = {
  project: Project;
  className?: string;
};

const MachineEyeScene: React.FC = () => (
  <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="p8-me-core" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.7" />
        <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="p8-me-scan" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g opacity="0.28">
      <path d="M32 38H132L165 74" stroke="#67E8F9" strokeWidth="1.5" />
      <path d="M368 44H268L235 76" stroke="#C4B5FD" strokeWidth="1.5" />
      <path d="M38 182H128L162 144" stroke="#67E8F9" strokeWidth="1.5" />
      <path d="M364 178H278L240 144" stroke="#C4B5FD" strokeWidth="1.5" />
    </g>
    <ellipse cx="200" cy="110" rx="122" ry="66" fill="url(#p8-me-core)" opacity="0.85" />
    <ellipse cx="200" cy="110" rx="106" ry="54" stroke="#C4B5FD" strokeOpacity="0.42" strokeWidth="2" />
    <ellipse cx="200" cy="110" rx="90" ry="44" stroke="#67E8F9" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="10 8" />
    <path d="M122 110C142 86 172 72 200 72C228 72 258 86 278 110C258 134 228 148 200 148C172 148 142 134 122 110Z" fill="#0F172A" fillOpacity="0.52" stroke="#E0F2FE" strokeOpacity="0.35" />
    <circle cx="200" cy="110" r="36" fill="#111827" fillOpacity="0.88" stroke="#C4B5FD" strokeOpacity="0.4" />
    <circle cx="200" cy="110" r="24" fill="#06B6D4" fillOpacity="0.18" stroke="#FFFFFF" strokeOpacity="0.4" />
    <circle cx="200" cy="110" r="11" fill="#020617" />
    <circle cx="194" cy="102" r="4.2" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="88" y="102" width="224" height="16" rx="8" fill="url(#p8-me-scan)" opacity="0.7" />
    <circle cx="146" cy="58" r="5" fill="#0F172A" stroke="#67E8F9" strokeWidth="1.2" />
    <circle cx="254" cy="58" r="5" fill="#0F172A" stroke="#C4B5FD" strokeWidth="1.2" />
    <circle cx="146" cy="162" r="5" fill="#0F172A" stroke="#67E8F9" strokeWidth="1.2" />
    <circle cx="254" cy="162" r="5" fill="#0F172A" stroke="#C4B5FD" strokeWidth="1.2" />
  </svg>
);

const SchedulerScene: React.FC = () => (
  <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden="true">
    <g opacity="0.22">
      <rect x="28" y="48" width="344" height="20" rx="10" fill="#FFFFFF" fillOpacity="0.1" />
      <rect x="28" y="98" width="344" height="20" rx="10" fill="#FFFFFF" fillOpacity="0.1" />
      <rect x="28" y="148" width="344" height="20" rx="10" fill="#FFFFFF" fillOpacity="0.1" />
      <line x1="86" y1="32" x2="86" y2="188" stroke="#FDE68A" strokeOpacity="0.25" />
      <line x1="170" y1="32" x2="170" y2="188" stroke="#FDE68A" strokeOpacity="0.25" />
      <line x1="254" y1="32" x2="254" y2="188" stroke="#FDE68A" strokeOpacity="0.25" />
      <line x1="338" y1="32" x2="338" y2="188" stroke="#FDE68A" strokeOpacity="0.25" />
    </g>
    <path d="M60 58C112 58 120 108 168 108C216 108 225 64 278 64C316 64 328 84 346 104" stroke="#FDE68A" strokeOpacity="0.62" strokeWidth="3" strokeLinecap="round" />
    <path d="M60 156C118 156 126 120 176 120C226 120 236 156 292 156C320 156 334 142 346 126" stroke="#F59E0B" strokeOpacity="0.55" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M168 108C193 108 199 88 222 88" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.55" />
    <circle cx="60" cy="58" r="9" fill="#FDE68A" fillOpacity="0.72" />
    <circle cx="168" cy="108" r="11" fill="#10B981" fillOpacity="0.78" />
    <circle cx="222" cy="88" r="7" fill="#60A5FA" fillOpacity="0.74" />
    <circle cx="278" cy="64" r="9" fill="#FDE68A" fillOpacity="0.72" />
    <circle cx="346" cy="104" r="8" fill="#10B981" fillOpacity="0.72" />
    <circle cx="60" cy="156" r="8" fill="#60A5FA" fillOpacity="0.66" />
    <circle cx="176" cy="120" r="8" fill="#FDE68A" fillOpacity="0.66" />
    <circle cx="292" cy="156" r="10" fill="#10B981" fillOpacity="0.76" />
    <rect x="42" y="50" width="42" height="16" rx="8" fill="#0F172A" fillOpacity="0.5" stroke="#FDE68A" strokeOpacity="0.4" />
    <rect x="150" y="100" width="38" height="16" rx="8" fill="#0F172A" fillOpacity="0.5" stroke="#10B981" strokeOpacity="0.45" />
    <rect x="252" y="56" width="48" height="16" rx="8" fill="#0F172A" fillOpacity="0.5" stroke="#60A5FA" strokeOpacity="0.45" />
  </svg>
);

const LogisticsScene: React.FC = () => (
  <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden="true">
    <g opacity="0.24">
      <rect x="36" y="34" width="116" height="56" rx="8" fill="#111827" fillOpacity="0.28" stroke="#FDBA74" strokeOpacity="0.3" />
      <rect x="246" y="30" width="120" height="62" rx="8" fill="#111827" fillOpacity="0.24" stroke="#FCA5A5" strokeOpacity="0.28" />
      <rect x="52" y="130" width="296" height="42" rx="12" fill="#111827" fillOpacity="0.16" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="84" y1="130" x2="84" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="132" y1="130" x2="132" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="180" y1="130" x2="180" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="228" y1="130" x2="228" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="276" y1="130" x2="276" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
      <line x1="324" y1="130" x2="324" y2="172" stroke="#FDBA74" strokeOpacity="0.22" />
    </g>
    <path d="M44 112C82 112 90 148 120 148H336" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.65" />
    <path d="M294 60C294 96 248 96 248 128" stroke="#FCA5A5" strokeWidth="2.5" strokeDasharray="6 5" strokeOpacity="0.55" />
    <path d="M102 60C102 92 158 92 158 128" stroke="#FDBA74" strokeWidth="2" strokeDasharray="5 6" strokeOpacity="0.5" />
    <rect x="58" y="44" width="28" height="18" rx="4" fill="#111827" fillOpacity="0.58" stroke="#FDBA74" strokeOpacity="0.5" />
    <rect x="272" y="46" width="24" height="14" rx="3" fill="#111827" fillOpacity="0.58" stroke="#FCA5A5" strokeOpacity="0.5" />
    <rect x="134" y="138" width="28" height="16" rx="4" fill="#111827" fillOpacity="0.62" stroke="#FED7AA" strokeOpacity="0.5" />
    <rect x="228" y="138" width="28" height="16" rx="4" fill="#111827" fillOpacity="0.62" stroke="#FED7AA" strokeOpacity="0.5" />
    <rect x="320" y="138" width="20" height="16" rx="4" fill="#111827" fillOpacity="0.62" stroke="#FED7AA" strokeOpacity="0.5" />
    <circle cx="44" cy="112" r="6" fill="#FDBA74" fillOpacity="0.82" />
    <circle cx="120" cy="148" r="6" fill="#FED7AA" fillOpacity="0.88" />
    <circle cx="248" cy="128" r="7" fill="#FCA5A5" fillOpacity="0.82" />
    <circle cx="336" cy="148" r="6" fill="#FDBA74" fillOpacity="0.82" />
  </svg>
);

const CicdScene: React.FC = () => (
  <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden="true">
    <line x1="42" y1="112" x2="346" y2="112" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="16" strokeLinecap="round" />
    <line x1="42" y1="112" x2="346" y2="112" stroke="#111827" strokeOpacity="0.22" strokeWidth="3" strokeDasharray="14 10" />
    <path d="M56 112H106" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M134 112H184" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M212 112H262" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M290 112H338" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="78" y="84" width="28" height="56" rx="14" fill="#111827" fillOpacity="0.56" stroke="#22D3EE" strokeOpacity="0.5" />
    <rect x="156" y="78" width="28" height="68" rx="14" fill="#111827" fillOpacity="0.58" stroke="#A78BFA" strokeOpacity="0.5" />
    <rect x="234" y="70" width="28" height="84" rx="14" fill="#111827" fillOpacity="0.6" stroke="#EC4899" strokeOpacity="0.56" />
    <rect x="312" y="80" width="28" height="64" rx="14" fill="#111827" fillOpacity="0.58" stroke="#22D3EE" strokeOpacity="0.5" />
    <circle cx="92" cy="112" r="7" fill="#22D3EE" fillOpacity="0.78" />
    <circle cx="170" cy="112" r="8" fill="#A78BFA" fillOpacity="0.8" />
    <circle cx="248" cy="112" r="10" fill="#EC4899" fillOpacity="0.9" />
    <circle cx="326" cy="112" r="8" fill="#22D3EE" fillOpacity="0.8" />
    <g transform="translate(352 104)">
      <path d="M0 -22C0 -22 -10 -4 -10 10H10C10 -4 0 -22 0 -22Z" fill="#111827" fillOpacity="0.55" stroke="#F8FAFC" strokeOpacity="0.45" />
      <circle cx="0" cy="-8" r="3.5" fill="#F8FAFC" fillOpacity="0.85" />
      <path d="M-6 10L-3 28L0 18L3 28L6 10Z" fill="#FDE68A" fillOpacity="0.76" />
    </g>
  </svg>
);

const PortfolioScene: React.FC = () => (
  <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden="true">
    <path d="M-20 64L128 20L420 84V104L128 42L-20 86Z" fill="#FBCFE8" fillOpacity="0.16" />
    <path d="M-20 132L176 98L420 136V156L176 118L-20 152Z" fill="#DDD6FE" fillOpacity="0.16" />
    <g transform="translate(200 110)">
      <rect x="-56" y="-72" width="112" height="144" rx="14" fill="#111827" fillOpacity="0.2" />
      <rect x="-50" y="-66" width="100" height="132" rx="12" fill="#FFFFFF" fillOpacity="0.18" stroke="#FDE68A" strokeOpacity="0.42" />
      <rect x="-38" y="-50" width="76" height="50" rx="8" fill="#111827" fillOpacity="0.18" stroke="#DDD6FE" strokeOpacity="0.45" />
      <line x1="-28" y1="16" x2="28" y2="16" stroke="#FBCFE8" strokeOpacity="0.36" />
      <line x1="-28" y1="28" x2="20" y2="28" stroke="#DDD6FE" strokeOpacity="0.36" />
      <line x1="-28" y1="40" x2="12" y2="40" stroke="#FDE68A" strokeOpacity="0.36" />
      <polygon points="0,50 2.8,57 10,57 4,61.5 6.5,69 0,64.5 -6.5,69 -4,61.5 -10,57 -2.8,57" fill="#FDE68A" fillOpacity="0.82" />
    </g>
    <polyline points="100,58 76,110 100,162" stroke="#DDD6FE" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.68" />
    <polyline points="300,58 324,110 300,162" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.68" />
    <line x1="218" y1="36" x2="184" y2="184" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
    <circle cx="70" cy="36" r="3" fill="#FDE68A" fillOpacity="0.85" />
    <circle cx="338" cy="44" r="3" fill="#DDD6FE" fillOpacity="0.8" />
    <circle cx="56" cy="168" r="2.6" fill="#FBCFE8" fillOpacity="0.82" />
    <circle cx="352" cy="160" r="2.6" fill="#DDD6FE" fillOpacity="0.82" />
  </svg>
);

const artworkMap: Record<Project["id"], React.FC> = {
  "machine-eye": MachineEyeScene,
  "cr3-scheduler": SchedulerScene,
  "yard-logistics": LogisticsScene,
  "cicd-actions": CicdScene,
  "developer-portfolio": PortfolioScene,
};

export const ProjectArtwork: React.FC<ProjectArtworkProps> = ({ project, className }) => {
  const Artwork = artworkMap[project.id];

  return (
    <div className={className} aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,black,transparent)] opacity-95">
        <Artwork />
      </div>
    </div>
  );
};
