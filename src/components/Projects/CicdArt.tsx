import type React from "react";

/** Pipeline stages with flow arrows, deploy indicators, and glowing data streams — Enhanced CI/CD automation
   - Pipeline/Flow Vibe (green, yellow, gray)
   - Enhanced pulse animation (bigger, brighter)
   - Stronger float effects with greater range
   - Enhanced 3D depth with multiple layers
   - Interactive parallax hover effect
   - DevOps-focused visual elements */

export const CicdArt: React.FC = () => (
  <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" className="w-full h-full">
    <defs>
      {/* Enhanced radial gradients for depth layers */}
      <radialGradient id="ci-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#90C4A8" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#F0C8A0" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#6B7280" stopOpacity="0.15" />
      </radialGradient>
      
      <radialGradient id="ci-bg-deep" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#90C4A8" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#6B7280" stopOpacity="0.08" />
      </radialGradient>

      <linearGradient id="ci-pipe" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#90C4A8" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#F0C8A0" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#90C4A8" stopOpacity="0.4" />
      </linearGradient>

      <linearGradient id="ci-stage-active" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F0C8A0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#90C4A8" stopOpacity="0.35" />
      </linearGradient>

      <linearGradient id="ci-stage" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#90C4A8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6B7280" stopOpacity="0.15" />
      </linearGradient>

      <linearGradient id="ci-flame" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#D4929B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#F0C8A0" stopOpacity="0.2" />
      </linearGradient>

      <linearGradient id="ci-glow-active" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#90C4A8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#F0C8A0" stopOpacity="0.4" />
      </linearGradient>

      {/* Enhanced glow filters */}
      <filter id="ci-glow-strong">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="ci-glow-devops">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="ci-soft">
        <feGaussianBlur stdDeviation="2" />
      </filter>

      {/* 3D depth blur layers */}
      <filter id="ci-depth-1">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <filter id="ci-depth-2">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="ci-depth-3">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>

    {/* Background radial glow - deepest layer */}
    <circle 
      cx="200" 
      cy="100" 
      r="140" 
      fill="url(#ci-bg-deep)" 
      className="art-pulse-slow"
    />

    {/* Background glow - middle layer */}
    <circle 
      cx="200" 
      cy="100" 
      r="120" 
      fill="url(#ci-bg)" 
      className="art-pulse"
    />

    {/* Enhanced pipeline track with depth layers */}
    <g className="parallax-layer-2">
      {/* Back track - blurred */}
      <g filter="url(#ci-depth-3)" opacity="0.12">
        <line x1="50" y1="100" x2="350" y2="100" stroke="#6B7280" strokeWidth="3" />
      </g>
      
      {/* Middle track - slightly blurred */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <line x1="52" y1="100" x2="348" y2="100" stroke="#90C4A8" strokeWidth="2.5" />
      </g>
      
      {/* Front track - sharp */}
      <g opacity="0.3">
        <line x1="55" y1="100" x2="345" y2="100" stroke="url(#ci-pipe)" strokeWidth="2" />
      </g>
    </g>

    {/* Enhanced pipeline flow particles with parallax layers */}
    <g className="art-flow">
      {/* Back flow - blurred */}
      <g opacity="0.1" filter="url(#ci-depth-3)">
        <line x1="50" y1="100" x2="350" y2="100" stroke="#F0C8A0" strokeWidth="2" strokeDasharray="10 15" className="art-drift" />
      </g>
      
      {/* Middle flow */}
      <g opacity="0.25" filter="url(#ci-depth-2)">
        <line x1="52" y1="100" x2="348" y2="100" stroke="#90C4A8" strokeWidth="1.5" strokeDasharray="8 12" />
      </g>
      
      {/* Front flow - bright, sharp */}
      <g opacity="0.4">
        <line x1="55" y1="100" x2="345" y2="100" stroke="#F0C8A0" strokeWidth="1.2" strokeDasharray="6 10" className="art-blink" />
        <line x1="55" y1="100" x2="345" y2="100" stroke="#90C4A8" strokeWidth="0.8" strokeDasharray="6 10" className="art-blink-delayed" />
      </g>
    </g>

    {/* Enhanced git branch lines with depth */}
    <g stroke="#90C4A8" strokeWidth="1" opacity="0.2" strokeDasharray="5 4" className="art-drift">
      {/* Back branches - blurred */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <path d="M25 50 Q45 50 55 65 Q75 85 85 100" />
        <path d="M25 70 Q40 70 50 80 Q70 95 85 102" />
        <path d="M35 35 Q50 38 70 55 Q85 75 100 93" />
      </g>
      
      {/* Middle branches */}
      <g filter="url(#ci-depth-2)" opacity="0.15">
        <path d="M27 52 Q47 52 57 67 Q77 87 87 102" />
        <path d="M27 72 Q42 72 52 82 Q72 97 87 104" />
        <path d="M37 37 Q52 40 72 57 Q87 77 102 95" />
      </g>
      
      {/* Front branches - bright */}
      <g opacity="0.25">
        <path d="M30 55 Q50 55 60 70 Q80 90 100 105" stroke="#F0C8A0" className="art-blink" />
        <path d="M30 75 Q45 75 55 85 Q75 100 100 107" stroke="#90C4A8" />
        <path d="M40 40 Q55 43 75 60 Q90 80 105 98" stroke="#F0C8A0" className="art-sparkle" />
      </g>
    </g>

    {/* Enhanced git branch dots with depth and glow */}
    <g className="art-sparkle-slow">
      {/* Back dots - blurred */}
      <g fill="#6B7280" opacity="0.1" filter="url(#ci-depth-3)">
        <circle cx="25" cy="55" r="3" />
        <circle cx="25" cy="70" r="2.5" />
        <circle cx="35" cy="40" r="2.5" />
      </g>
      
      {/* Middle dots */}
      <g fill="#90C4A8" opacity="0.2" filter="url(#ci-depth-2)">
        <circle cx="27" cy="53" r="3.5" />
        <circle cx="27" cy="68" r="3" />
        <circle cx="37" cy="38" r="3" />
      </g>
      
      {/* Front dots - bright with glow */}
      <g fill="#F0C8A0" filter="url(#ci-glow-devops)">
        <circle cx="30" cy="55" r="4" />
        <circle cx="30" cy="70" r="3.5" />
        <circle cx="40" cy="40" r="3.5" />
      </g>
    </g>

    {/* Enhanced Stage 1: CODE - left */}
    <g transform="translate(85, 100)" className="parallax-layer-1">
      {/* Back stage - blurred */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <rect x="-24" y="-24" width="48" height="48" rx="12" fill="#6B7280" />
      </g>
      
      {/* Middle stage */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <rect x="-23" y="-23" width="46" height="46" rx="11" fill="#90C4A8" />
      </g>
      
      {/* Front stage */}
      <g opacity="0.4" className="art-morph">
        <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#ci-stage)" stroke="#90C4A8" strokeWidth="1" strokeOpacity="0.5" />
        {/* Code brackets icon */}
        <g stroke="#F0C8A0" strokeWidth="1.5" opacity="0.6">
          <polyline points="-6,-8 -14,0 -14,8" />
          <polyline points="6,-8 14,0 14,8" />
          <line x1="3" y1="-10" x2="-3" y2="10" />
        </g>
      </g>
    </g>

    {/* Enhanced Arrow 1→2 with glow */}
    <g className="parallax-layer-2 art-flow-pulse">
      {/* Back arrow - blurred */}
      <g opacity="0.08" filter="url(#ci-depth-3)">
        <path d="M108 100 L147 100" stroke="#6B7280" strokeWidth="2" />
        <polygon points="150,100 143,95 143,105" fill="#6B7280" />
      </g>
      
      {/* Middle arrow */}
      <g opacity="0.15" filter="url(#ci-depth-2)">
        <path d="M110 100 L145 100" stroke="#90C4A8" strokeWidth="1.5" />
        <polygon points="147,100 140,95 140,105" fill="#90C4A8" />
      </g>
      
      {/* Front arrow - bright with glow */}
      <g filter="url(#ci-glow-devops)">
        <path d="M112 100 L143 100" stroke="#F0C8A0" strokeWidth="1.2" />
        <polygon points="145,100 138,95 138,105" fill="#F0C8A0" />
      </g>
    </g>

    {/* Enhanced Stage 2: BUILD - center-left */}
    <g transform="translate(170, 100)" className="parallax-layer-2">
      {/* Back stage */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <rect x="-24" y="-24" width="48" height="48" rx="12" fill="#6B7280" />
      </g>
      
      {/* Middle stage */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <rect x="-23" y="-23" width="46" height="46" rx="11" fill="#90C4A8" />
      </g>
      
      {/* Front stage */}
      <g opacity="0.4">
        <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#ci-stage)" stroke="#90C4A8" strokeWidth="1" strokeOpacity="0.5" />
        {/* Enhanced gear icon with depth */}
        <g filter="url(#ci-soft)">
          <circle r="9" fill="none" stroke="#F0C8A0" strokeWidth="1.2" opacity="0.5" />
          <line x1="0" y1="-14" x2="0" y2="-9" stroke="#90C4A8" strokeWidth="0.8" />
          <line x1="0" y1="9" x2="0" y2="14" stroke="#90C4A8" strokeWidth="0.8" />
          <line x1="-14" y1="0" x2="-9" y2="0" stroke="#90C4A8" strokeWidth="0.8" />
          <line x1="9" y1="0" x2="14" y2="0" stroke="#90C4A8" strokeWidth="0.8" />
        </g>
      </g>
      
      {/* Rotating gear with glow */}
      <g className="art-rotate-slow" filter="url(#ci-glow-devops)">
        <circle r="8" fill="none" stroke="#F0C8A0" strokeWidth="1" />
        <line x1="0" y1="-10" x2="0" y2="-6" stroke="#90C4A8" strokeWidth="0.7" />
        <line x1="0" y1="-10" x2="0" y2="-6" stroke="#F0C8A0" strokeWidth="0.7" opacity="0.8" />
        <line x1="0" y1="6" x2="0" y2="10" stroke="#90C4A8" strokeWidth="0.7" />
        <line x1="0" y1="6" x2="0" y2="10" stroke="#F0C8A0" strokeWidth="0.7" opacity="0.8" />
        <line x1="-10" y1="0" x2="-6" y2="0" stroke="#90C4A8" strokeWidth="0.7" />
        <line x1="-10" y1="0" x2="-6" y2="0" stroke="#F0C8A0" strokeWidth="0.7" opacity="0.8" />
        <line x1="6" y1="0" x2="10" y2="0" stroke="#90C4A8" strokeWidth="0.7" />
        <line x1="6" y1="0" x2="10" y2="0" stroke="#F0C8A0" strokeWidth="0.7" opacity="0.8" />
      </g>
    </g>

    {/* Enhanced Arrow 2→3 with glow */}
    <g className="parallax-layer-2 art-flow-pulse">
      {/* Back arrow - blurred */}
      <g opacity="0.08" filter="url(#ci-depth-3)">
        <path d="M198 100 L237 100" stroke="#6B7280" strokeWidth="2" />
        <polygon points="240,100 233,95 233,105" fill="#6B7280" />
      </g>
      
      {/* Middle arrow */}
      <g opacity="0.15" filter="url(#ci-depth-2)">
        <path d="M200 100 L235 100" stroke="#90C4A8" strokeWidth="1.5" />
        <polygon points="237,100 230,95 230,105" fill="#90C4A8" />
      </g>
      
      {/* Front arrow - bright with glow */}
      <g filter="url(#ci-glow-devops)">
        <path d="M202 100 L233 100" stroke="#F0C8A0" strokeWidth="1.2" />
        <polygon points="235,100 228,95 228,105" fill="#F0C8A0" />
      </g>
    </g>

    {/* Enhanced Stage 3: TEST - center-right, active/highlighted */}
    <g transform="translate(260, 100)" className="parallax-layer-3 art-pulse">
      {/* Back glow */}
      <g filter="url(#ci-depth-3)" opacity="0.15">
        <circle cx="0" cy="0" r="24" fill="#90C4A8" />
      </g>
      
      {/* Middle glow */}
      <g filter="url(#ci-depth-2)" opacity="0.25">
        <circle cx="0" cy="0" r="22" fill="#F0C8A0" />
      </g>
      
      {/* Main stage with strong glow */}
      <g filter="url(#ci-glow-strong)">
        <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#ci-stage-active)" stroke="#F0C8A0" strokeWidth="1.2" strokeOpacity="0.7" />
        {/* Enhanced checkmark icon */}
        <g stroke="#F0C8A0" strokeWidth="1.8" opacity="0.8">
          <polyline points="-8,0 -2,8 10,-8" />
        </g>
      </g>
      
      {/* Inner highlight */}
      <circle cx="-2" cy="-3" r="2.5" fill="white" fillOpacity="0.6" className="art-sparkle" />
      <circle cx="3" cy="5" r="1.8" fill="white" fillOpacity="0.4" className="art-sparkle-delayed" />
    </g>

    {/* Enhanced Arrow 3→4 with glow */}
    <g className="parallax-layer-2 art-flow-pulse">
      {/* Back arrow - blurred */}
      <g opacity="0.08" filter="url(#ci-depth-3)">
        <path d="M288 100 L317 100" stroke="#6B7280" strokeWidth="2" />
        <polygon points="320,100 313,95 313,105" fill="#6B7280" />
      </g>
      
      {/* Middle arrow */}
      <g opacity="0.15" filter="url(#ci-depth-2)">
        <path d="M290 100 L315 100" stroke="#90C4A8" strokeWidth="1.5" />
        <polygon points="317,100 310,95 310,105" fill="#90C4A8" />
      </g>
      
      {/* Front arrow - bright with glow */}
      <g filter="url(#ci-glow-devops)">
        <path d="M292 100 L313 100" stroke="#F0C8A0" strokeWidth="1.2" />
        <polygon points="315,100 308,95 308,105" fill="#F0C8A0" />
      </g>
    </g>

    {/* Enhanced Stage 4: DEPLOY - right */}
    <g transform="translate(340, 100)" className="parallax-layer-2 art-float">
      {/* Back stage */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <rect x="-24" y="-24" width="48" height="48" rx="12" fill="#6B7280" />
      </g>
      
      {/* Middle stage */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <rect x="-23" y="-23" width="46" height="46" rx="11" fill="#90C4A8" />
      </g>
      
      {/* Front stage */}
      <g opacity="0.4">
        <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#ci-stage)" stroke="#90C4A8" strokeWidth="1" strokeOpacity="0.5" />
        {/* Enhanced rocket icon */}
        <g stroke="#F0C8A0" strokeWidth="1" opacity="0.6">
          <path d="M0 -12 C0 -12 -6 -2 -6 7 L6 7 C6 -2 0 -12 0 -12Z" />
          <circle cx="0" cy="0" r="2.5" fill="#F0C8A0" fillOpacity="0.7" />
          <path d="M-7 5 L-12 12 L-7 10" stroke="#90C4A8" strokeWidth="0.8" />
          <path d="M7 5 L12 12 L7 10" stroke="#90C4A8" strokeWidth="0.8" />
        </g>
      </g>
      
      {/* Enhanced deploy flame - animated with glow */}
      <g filter="url(#ci-glow-devops)">
        <path d="M-5 7 L-4 15 L0 11 L4 15 L5 7" fill="url(#ci-flame)" className="art-morph" />
        <circle cx="-2" cy="10" r="1.5" fill="#F0C8A0" fillOpacity="0.8" className="art-sparkle" />
        <circle cx="2" cy="12" r="1.2" fill="#90C4A8" fillOpacity="0.6" className="art-sparkle-delayed" />
      </g>
    </g>

    {/* Enhanced Docker containers with depth */}
    <g transform="translate(170, 150)" opacity="0.2" stroke="#90C4A8" strokeWidth="0.8">
      {/* Back containers - blurred */}
      <g filter="url(#ci-depth-3)">
        <rect x="-14" y="0" width="28" height="12" rx="3" fill="#6B7280" />
        <rect x="-14" y="14" width="28" height="12" rx="3" fill="#6B7280" />
        <rect x="-10" y="28" width="22" height="12" rx="3" fill="#6B7280" />
      </g>
      
      {/* Middle containers */}
      <g filter="url(#ci-depth-2)">
        <rect x="-13" y="1" width="26" height="10" rx="2.5" fill="#90C4A8" fillOpacity="0.1" stroke="#F0C8A0" strokeWidth="0.6" />
        <rect x="-13" y="15" width="26" height="10" rx="2.5" fill="#90C4A8" fillOpacity="0.1" stroke="#F0C8A0" strokeWidth="0.6" />
        <rect x="-9" y="29" width="20" height="10" rx="2.5" fill="#90C4A8" fillOpacity="0.1" stroke="#F0C8A0" strokeWidth="0.6" />
      </g>
      
      {/* Front containers - bright */}
      <g opacity="0.3">
        <rect x="-12" y="2" width="24" height="8" rx="2" fill="none" stroke="#F0C8A0" strokeWidth="0.7" />
        <rect x="-12" y="16" width="24" height="8" rx="2" fill="none" stroke="#90C4A8" strokeWidth="0.7" />
        <rect x="-8" y="30" width="18" height="8" rx="2" fill="none" stroke="#F0C8A0" strokeWidth="0.7" />
      </g>
      
      {/* Docker dots with glow */}
      <g filter="url(#ci-glow-devops)">
        <circle cx="-8" y="5" r="3.5" fill="#F0C8A0" fillOpacity="0.6" className="art-sparkle" />
        <circle cx="-1" y="5" r="3.5" fill="#90C4A8" fillOpacity="0.6" className="art-sparkle-delayed" />
        <circle cx="6" y="5" r="3.5" fill="#F0C8A0" fillOpacity="0.6" className="art-sparkle" />
      </g>
    </g>

    {/* Enhanced K8s cluster indicator with depth */}
    <g transform="translate(340, 160)" className="parallax-layer-2 art-float-delayed">
      {/* Back hexagon - blurred */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <polygon points="0,-11 9.5,-5.5 9.5,5.5 0,11 -9.5,5.5 -9.5,-5.5" fill="#6B7280" />
      </g>
      
      {/* Middle hexagon */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <polygon points="0,-10 8.7,-5 8.7,5 0,10 -8.7,5 -8.7,-5" fill="none" stroke="#90C4A8" strokeWidth="0.8" />
        <polygon points="0,-4 3.5,-2 3.5,2 0,4 -3.5,2 -3.5,-2" fill="#F0C8A0" fillOpacity="0.2" stroke="#90C4A8" strokeWidth="0.5" />
      </g>
      
      {/* Front hexagon - bright with glow */}
      <g filter="url(#ci-glow-devops)">
        <polygon points="0,-9 7.8,-4.5 7.8,4.5 0,9 -7.8,4.5 -7.8,-4.5" fill="none" stroke="#F0C8A0" strokeWidth="1" />
        <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="#90C4A8" fillOpacity="0.4" stroke="#F0C8A0" strokeWidth="0.6" />
      </g>
    </g>

    {/* Enhanced terminal prompt with depth */}
    <g transform="translate(50, 25)" className="parallax-layer-1 art-float-slow">
      {/* Back terminal - blurred */}
      <g filter="url(#ci-depth-3)" opacity="0.1">
        <rect x="0" y="0" width="105" height="32" rx="5" fill="#6B7280" />
      </g>
      
      {/* Middle terminal */}
      <g filter="url(#ci-depth-2)" opacity="0.2">
        <rect x="1" y="1" width="103" height="30" rx="4" fill="#90C4A8" />
      </g>
      
      {/* Front terminal */}
      <g opacity="0.3">
        <rect x="2" y="2" width="101" height="28" rx="4" fill="none" stroke="#F0C8A0" strokeWidth="0.8" />
        {/* Window dots with glow */}
        <g filter="url(#ci-glow-devops)">
          <circle cx="9" cy="6" r="2" fill="#D4929B" fillOpacity="0.6" />
          <circle cx="16" cy="6" r="2" fill="#F0C8A0" fillOpacity="0.6" />
          <circle cx="23" cy="6" r="2" fill="#90C4A8" fillOpacity="0.6" />
        </g>
        {/* Prompt lines */}
        <line x1="6" y1="16" x2="40" y2="16" stroke="#F0C8A0" strokeWidth="1" opacity="0.5" />
        <line x1="6" y1="24" x2="55" y2="24" stroke="#90C4A8" strokeWidth="0.8" opacity="0.3" />
      </g>
    </g>

    {/* Enhanced ambient particles with depth */}
    <g className="art-sparkle-slow">
      {/* Back particles - blurred */}
      <g opacity="0.08" filter="url(#ci-depth-3)">
        <circle cx="375" cy="35" r="2" fill="#6B7280" />
        <circle cx="20" cy="165" r="1.5" fill="#90C4A8" />
        <circle cx="290" cy="25" r="1.5" fill="#F0C8A0" />
      </g>
      
      {/* Middle particles */}
      <g opacity="0.15" filter="url(#ci-depth-2)">
        <circle cx="372" cy="33" r="2.5" fill="#90C4A8" />
        <circle cx="22" cy="163" r="2" fill="#F0C8A0" />
        <circle cx="292" cy="23" r="2" fill="#6B7280" />
      </g>
      
      {/* Front particles - bright with glow */}
      <g filter="url(#ci-glow-devops)">
        <circle cx="370" cy="30" r="3" fill="#F0C8A0" className="art-sparkle" />
        <circle cx="25" cy="160" r="2.5" fill="#90C4A8" className="art-sparkle-delayed" />
        <circle cx="295" cy="20" r="2.5" fill="#F0C8A0" className="art-sparkle-slow" />
      </g>
    </g>

    {/* DevOps flow indicators with glow */}
    <g className="art-pulse-slow">
      <circle cx="130" cy="75" r="3" fill="#90C4A8" fillOpacity="0.25" filter="url(#ci-glow-devops)" />
      <circle cx="300" cy="80" r="2.5" fill="#F0C8A0" fillOpacity="0.2" filter="url(#ci-glow-devops)" />
      <circle cx="165" cy="55" r="2" fill="#6B7280" fillOpacity="0.15" filter="url(#ci-glow-devops)" />
    </g>

    {/* Success indicators with glow */}
    <g className="art-blink">
      <circle cx="100" cy="105" r="2" fill="#90C4A8" fillOpacity="0.4" className="art-sparkle" />
      <circle cx="225" cy="105" r="2" fill="#F0C8A0" fillOpacity="0.4" className="art-sparkle-delayed" />
      <circle cx="310" cy="105" r="2" fill="#90C4A8" fillOpacity="0.4" className="art-sparkle-slow" />
    </g>
  </svg>
);
