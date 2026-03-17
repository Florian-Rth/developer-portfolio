import type React from "react";

/** Cybernetic eye with circuit traces, data streams, and holographic layers — Enhanced Industrial IoT monitoring
   - More prominent pulse animation (bigger, brighter)
   - Stronger float effects with greater range
   - Enhanced 3D depth with multiple layers
   - Interactive parallax hover effect
   - Cyberpunk/Neon vibe (magenta, cyan, purple) */

export const MachineEyeArt: React.FC = () => (
  <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" className="w-full h-full">
    <defs>
      {/* Enhanced radial gradients for depth layers */}
      <radialGradient id="me-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#E8B4A0" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#8C9FE0" stopOpacity="0.15" />
      </radialGradient>
      
      <radialGradient id="me-bg-deep" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#8C9FE0" stopOpacity="0.05" />
      </radialGradient>

      <linearGradient id="me-iris" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8C9FE0" />
        <stop offset="50%" stopColor="#E8B4A0" />
        <stop offset="100%" stopColor="#B8A9D4" />
      </linearGradient>

      <radialGradient id="me-pupil" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B8A9D4" />
        <stop offset="40%" stopColor="#8C9FE0" />
        <stop offset="100%" stopColor="#E8B4A0" />
      </radialGradient>

      <linearGradient id="me-scan" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8C9FE0" stopOpacity="0" />
        <stop offset="30%" stopColor="#8C9FE0" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#E8B4A0" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#8C9FE0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#8C9FE0" stopOpacity="0" />
      </linearGradient>

      {/* Enhanced glow filters */}
      <filter id="sc-glow-strong">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="sc-glow-tech">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="sc-soft">
        <feGaussianBlur stdDeviation="2" />
      </filter>

      {/* 3D depth blur layers */}
      <filter id="sc-depth-1">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <filter id="sc-depth-2">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="sc-depth-3">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>

    {/* Background radial glow - deepest layer */}
    <circle 
      cx="200" 
      cy="100" 
      r="140" 
      fill="url(#sc-bg-deep)" 
      className="art-pulse-slow"
    />

    {/* Background glow - middle layer */}
    <circle 
      cx="200" 
      cy="100" 
      r="120" 
      fill="url(#sc-bg)" 
      className="art-pulse"
    />

    {/* Enhanced timeline grid with depth layers */}
    <g stroke="#6B7280" strokeWidth="0.5" className="art-float-slow">
      {/* Back layer - most blurred */}
      <g opacity="0.06" filter="url(#sc-depth-3)">
        <line x1="20" y1="50" x2="380" y2="50" />
        <line x1="20" y1="100" x2="380" y2="100" />
        <line x1="20" y1="150" x2="380" y2="150" />
        {/* Vertical time markers */}
        <line x1="80" y1="30" x2="80" y2="170" />
        <line x1="160" y1="30" x2="160" y2="170" />
        <line x1="240" y1="30" x2="240" y2="170" />
        <line x1="320" y1="30" x2="320" y2="170" />
      </g>
      
      {/* Middle layer - slightly blurred */}
      <g opacity="0.1" filter="url(#sc-depth-2)">
        <line x1="25" y1="50" x2="375" y2="50" />
        <line x1="25" y1="100" x2="375" y2="100" />
        <line x1="25" y1="150" x2="375" y2="150" />
        <line x1="78" y1="30" x2="78" y2="170" />
        <line x1="158" y1="30" x2="158" y2="170" />
        <line x1="238" y1="30" x2="238" y2="170" />
        <line x1="318" y1="30" x2="318" y2="170" />
      </g>
      
      {/* Front layer - sharp */}
      <g opacity="0.15">
        <line x1="30" y1="50" x2="370" y2="50" />
        <line x1="30" y1="100" x2="370" y2="100" />
        <line x1="30" y1="150" x2="370" y2="150" />
        <line x1="80" y1="30" x2="80" y2="170" />
        <line x1="160" y1="30" x2="160" y2="170" />
        <line x1="240" y1="30" x2="240" y2="170" />
        <line x1="320" y1="30" x2="320" y2="170" />
      </g>
    </g>

    {/* Enhanced time marker ticks with depth and glow */}
    <g className="art-sparkle-slow">
      {/* Back ticks - blurred */}
      <g fill="#2E8B57" opacity="0.1" filter="url(#sc-depth-3)">
        <rect x="76" y="26" width="6" height="3" rx="1.5" />
        <rect x="156" y="26" width="6" height="3" rx="1.5" />
        <rect x="236" y="26" width="6" height="3" rx="1.5" />
        <rect x="316" y="26" width="6" height="3" rx="1.5" />
      </g>
      
      {/* Middle ticks */}
      <g fill="#4A90A4" opacity="0.2" filter="url(#sc-depth-2)">
        <rect x="74" y="24" width="10" height="4" rx="2" />
        <rect x="154" y="24" width="10" height="4" rx="2" />
        <rect x="234" y="24" width="10" height="4" rx="2" />
        <rect x="314" y="24" width="10" height="4" rx="2" />
      </g>
      
      {/* Front ticks - bright with glow */}
      <g fill="#6B7280" filter="url(#sc-glow-tech)">
        <rect x="72" y="22" width="14" height="6" rx="3" />
        <rect x="152" y="22" width="14" height="6" rx="3" />
        <rect x="232" y="22" width="14" height="6" rx="3" />
        <rect x="312" y="22" width="14" height="6" rx="3" />
      </g>
    </g>

    {/* Enhanced edge connections with parallax layers */}
    <g className="art-flow">
      {/* Back stream - blurred */}
      <g opacity="0.08" filter="url(#sc-depth-3)">
        <path d="M85 68 Q135 45 180 58" className="art-drift" />
        <path d="M175 58 Q205 95 265 78" className="art-drift-delayed" />
        <path d="M180 58 Q220 115 270 78" className="art-float-slow" />
        <path d="M145 120 Q200 105 265 78" className="art-float-reverse" />
        <path d="M130 162 Q180 135 305 145" className="art-drift" />
        <path d="M270 78 Q300 110 305 145" className="art-drift-delayed" />
      </g>
      
      {/* Middle stream */}
      <g opacity="0.25" filter="url(#sc-depth-2)">
        <path d="M90 68 Q140 50 185 58" />
        <path d="M180 58 Q210 90 260 78" />
        <path d="M185 58 Q215 110 265 78" />
        <path d="M140 120 Q195 100 260 78" />
        <path d="M125 162 Q175 130 300 145" />
        <path d="M265 78 Q295 105 300 145" />
      </g>
      
      {/* Front stream - bright, sharp */}
      <g opacity="0.4">
        <path 
          d="M95 68 Q145 55 190 58" 
          stroke="#4A90A4" 
          className="art-blink"
        />
        <path 
          d="M185 58 Q220 85 270 78" 
          stroke="#2E8B57" 
          className="art-blink-delayed"
        />
        <path 
          d="M190 58 Q230 115 280 78" 
          stroke="#4A90A4" 
        />
        <path 
          d="M150 120 Q205 105 280 78" 
          stroke="#2E8B57" 
          className="art-sparkle"
        />
        <path 
          d="M135 162 Q185 125 310 145" 
          stroke="#4A90A4" 
          className="art-sparkle-delayed"
        />
      </g>
    </g>

    {/* Enhanced direction indicators with depth */}
    <g className="art-sparkle">
      {/* Back indicators - blurred */}
      <g opacity="0.1" filter="url(#sc-depth-3)">
        <polygon points="180,55 175,50 175,60" fill="#6B7280" />
        <polygon points="265,75 260,70 260,80" fill="#4A90A4" />
        <polygon points="128,158 123,153 123,163" fill="#2E8B57" />
      </g>
      
      {/* Middle indicators */}
      <g opacity="0.3" filter="url(#sc-depth-2)">
        <polygon points="178,53 173,48 173,58" fill="#6B7280" />
        <polygon points="263,73 258,68 258,78" fill="#4A90A4" />
        <polygon points="126,156 121,151 121,161" fill="#2E8B57" />
      </g>
      
      {/* Front indicators - bright with glow */}
      <g fill="#2E8B57" filter="url(#sc-glow-tech)">
        <polygon points="182,57 177,52 177,62" />
        <polygon points="267,77 262,72 262,82" />
        <polygon points="130,160 125,155 125,165" />
      </g>
    </g>

    {/* Secondary connection with pulse */}
    <path
      d="M185 58 Q200 90 155 120"
      stroke="#4A90A4"
      strokeWidth="1"
      strokeDasharray="4 6"
      opacity="0.3"
      className="art-pulse-slow"
      filter="url(#sc-soft)"
    />

    {/* Enhanced nodes with depth */}
    {/* Node: A (start) */}
    <g className="parallax-layer-1">
      <g filter="url(#sc-depth-3)" opacity="0.1">
        <circle cx="95" cy="68" r="16" fill="#6B7280" />
      </g>
      <g filter="url(#sc-depth-2)" opacity="0.2">
        <circle cx="95" cy="68" r="15" fill="#4A90A4" fillOpacity="0.6" />
      </g>
      <g opacity="0.4" className="art-morph">
        <circle cx="95" cy="68" r="14" fill="url(#sc-node-sec)" />
        <circle cx="95" cy="68" r="5" fill="#2E8B57" fillOpacity="0.6" />
      </g>
    </g>

    {/* Node: B (top) */}
    <g className="parallax-layer-2">
      <g filter="url(#sc-depth-2)" opacity="0.15">
        <circle cx="185" cy="58" r="14" fill="#6B7280" />
      </g>
      <g opacity="0.5">
        <circle cx="185" cy="58" r="13" fill="url(#sc-node-sec)" />
        <circle cx="185" cy="58" r="4.5" fill="#4A90A4" fillOpacity="0.7" />
      </g>
    </g>

    {/* Node: C (center) - highlighted active node */}
    <g className="parallax-layer-3">
      {/* Back glow */}
      <g filter="url(#sc-depth-3)" opacity="0.15">
        <circle cx="270" cy="78" r="18" fill="#2E8B57" />
      </g>
      {/* Main node with strong tech glow */}
      <g filter="url(#sc-glow-tech)">
        <circle cx="270" cy="78" r="17" fill="url(#sc-node-main)" />
        <circle cx="270" cy="78" r="6" fill="#4A90A4" fillOpacity="0.9" />
      </g>
      {/* Inner highlight */}
      <circle cx="268" cy="76" r="2.5" fill="white" fillOpacity="0.6" className="art-sparkle" />
      <circle cx="273" cy="81" r="1.5" fill="white" fillOpacity="0.4" className="art-sparkle-delayed" />
    </g>

    {/* Node: D (middle-left) */}
    <g className="parallax-layer-2">
      <g filter="url(#sc-depth-2)" opacity="0.15">
        <circle cx="155" cy="120" r="14" fill="#6B7280" />
      </g>
      <g opacity="0.4">
        <circle cx="155" cy="120" r="12" fill="url(#sc-node-sec)" />
        <circle cx="155" cy="120" r="4" fill="#2E8B57" fillOpacity="0.6" />
      </g>
    </g>

    {/* Node: E (bottom-left) */}
    <g className="parallax-layer-1">
      <g filter="url(#sc-depth-3)" opacity="0.1">
        <circle cx="130" cy="162" r="13" fill="#6B7280" />
      </g>
      <g filter="url(#sc-depth-2)" opacity="0.2">
        <circle cx="130" cy="162" r="11" fill="#4A90A4" fillOpacity="0.6" />
      </g>
      <g opacity="0.4" className="art-float">
        <circle cx="130" cy="162" r="10" fill="url(#sc-node-sec)" />
        <circle cx="130" cy="162" r="3.5" fill="#2E8B57" fillOpacity="0.5" />
      </g>
    </g>

    {/* Node: F (bottom-right) */}
    <g className="parallax-layer-2">
      <g filter="url(#sc-depth-2)" opacity="0.15">
        <circle cx="305" cy="145" r="14" fill="#6B7280" />
      </g>
      <g opacity="0.5" className="art-float-delayed">
        <circle cx="305" cy="145" r="13" fill="url(#sc-node-sec)" />
        <circle cx="305" cy="145" r="4.5" fill="#4A90A4" fillOpacity="0.7" />
      </g>
    </g>

    {/* Enhanced clock element with depth */}
    <g transform="translate(355, 35)" className="parallax-layer-3">
      {/* Back clock shadow */}
      <g opacity="0.15" filter="url(#sc-depth-3)">
        <circle cx="0" cy="0" r="13" fill="#6B7280" />
      </g>
      {/* Main clock */}
      <g opacity="0.3" filter="url(#sc-depth-2)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#6B7280" strokeWidth="0.6" />
        <line x1="0" y1="0" x2="7" y2="3" stroke="#6B7280" strokeWidth="0.6" />
        {/* Hour ticks */}
        <line x1="0" y1="-11" x2="0" y2="-13" stroke="#4A90A4" strokeWidth="0.5" />
        <line x1="0" y1="11" x2="0" y2="13" stroke="#4A90A4" strokeWidth="0.5" />
        <line x1="-11" y1="0" x2="-13" y2="0" stroke="#4A90A4" strokeWidth="0.5" />
        <line x1="11" y1="0" x2="13" y2="0" stroke="#4A90A4" strokeWidth="0.5" />
      </g>
    </g>

    {/* Enhanced calendar icon with depth */}
    <g transform="translate(35, 160)" className="parallax-layer-1">
      {/* Back calendar shadow */}
      <g opacity="0.1" filter="url(#sc-depth-3)">
        <rect x="-10" y="-8" width="20" height="16" rx="2" fill="#6B7280" />
      </g>
      {/* Main calendar */}
      <g opacity="0.25" filter="url(#sc-depth-2)">
        <rect x="-10" y="-8" width="20" height="16" rx="2" fill="none" stroke="#4A90A4" strokeWidth="0.6" />
        <line x1="-10" y1="-3" x2="10" y2="-3" stroke="#6B7280" strokeWidth="0.5" />
        <line x1="-4" y1="-12" x2="-4" y2="-6" stroke="#6B7280" strokeWidth="0.5" />
        <line x1="4" y1="-12" x2="4" y2="-6" stroke="#6B7280" strokeWidth="0.5" />
        {/* Day dots */}
        <circle cx="-4" cy="1" r="1.2" fill="#2E8B57" />
        <circle cx="4" cy="1" r="1.2" fill="#2E8B57" />
        <circle cx="-4" cy="6" r="1.2" fill="#2E8B57" />
        <circle cx="4" cy="6" r="1.2" fill="#2E8B57" />
      </g>
    </g>

    {/* Ambient particles with depth */}
    <g className="art-sparkle-slow">
      <circle cx="45" cy="35" r="2" fill="#2E8B57" fillOpacity="0.3" filter="url(#sc-depth-2)" />
      <circle cx="360" cy="165" r="1.5" fill="#6B7280" fillOpacity="0.25" filter="url(#sc-depth-3)" />
      <circle cx="70" cy="145" r="2" fill="#4A90A4" fillOpacity="0.2" filter="url(#sc-depth-2)" />
      <circle cx="330" cy="50" r="1.5" fill="#2E8B57" fillOpacity="0.2" filter="url(#sc-depth-2)" />
      <circle cx="80" cy="25" r="1" fill="#4A90A4" fillOpacity="0.15" filter="url(#sc-depth-3)" />
    </g>

    {/* Tech data fragments */}
    <g className="art-drift" opacity="0.2" filter="url(#sc-soft)">
      <rect x="140" y="30" width="12" height="8" rx="2" fill="#2E8B57" />
      <rect x="252" y="158" width="10" height="10" rx="2" fill="#4A90A4" />
      <circle cx="160" cy="20" r="2.5" fill="#6B7280" />
      <circle cx="250" cy="175" r="2" fill="#4A90A4" />
      <rect x="100" y="145" width="8" height="5" rx="1.5" fill="#2E8B57" />
    </g>

    {/* Flowing data streams with enhanced animation */}
    <g className="art-flow-pulse">
      <circle cx="50" cy="35" r="1.5" fill="#2E8B57" fillOpacity="0.4" />
      <circle cx="90" cy="145" r="1" fill="#4A90A4" fillOpacity="0.3" />
      <circle cx="210" cy="20" r="1.2" fill="#6B7280" fillOpacity="0.25" />
      <circle cx="310" cy="170" r="1" fill="#2E8B57" fillOpacity="0.2" />
    </g>
  </svg>
);
