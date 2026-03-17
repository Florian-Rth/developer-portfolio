import type React from "react";

/** Code brackets with creative elements, TCG card motif, and artistic elements — Enhanced developer portfolio
   - Personal/Creative Vibe (gradient, creative)
   - Enhanced pulse animation (bigger, brighter)
   - Stronger float effects with greater range
   - Enhanced 3D depth with multiple layers
   - Interactive parallax hover effect
   - Creative, artistic, portfolio-first aesthetic */

export const PortfolioArt: React.FC = () => (
  <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" className="w-full h-full">
    <defs>
      {/* Enhanced radial gradients for depth layers */}
      <linearGradient id="po-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.3" />
        <stop offset="30%" stopColor="#E8B4A0" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#D4929B" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#B8A9D4" stopOpacity="0.25" />
      </linearGradient>
      
      <radialGradient id="po-bg-deep" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.08" />
      </radialGradient>

      <linearGradient id="po-ribbon1" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#E8B4A0" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.45" />
      </linearGradient>

      <linearGradient id="po-ribbon2" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#D4929B" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#B8A9D4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0.35" />
      </linearGradient>

      <linearGradient id="po-card" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.2" />
      </linearGradient>

      <linearGradient id="po-bracket" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B8A9D4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.6" />
      </linearGradient>

      <linearGradient id="po-card-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#B8A9D4" stopOpacity="0.3" />
      </linearGradient>

      {/* Enhanced glow filters */}
      <filter id="po-glow-strong">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="po-glow-creative">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="po-soft">
        <feGaussianBlur stdDeviation="2" />
      </filter>

      {/* 3D depth blur layers */}
      <filter id="po-depth-1">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <filter id="po-depth-2">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="po-depth-3">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>

    {/* Background gradient wash with depth */}
    <g className="parallax-layer-3">
      {/* Back gradient - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1">
        <rect x="0" y="0" width="400" height="200" fill="#D4929B" />
      </g>
      
      {/* Middle gradient */}
      <g filter="url(#po-depth-2)" opacity="0.15">
        <rect x="0" y="0" width="400" height="200" fill="#E8B4A0" />
      </g>
      
      {/* Front gradient */}
      <rect x="0" y="0" width="400" height="200" fill="url(#po-bg)" />
    </g>

    {/* Enhanced diagonal gradient ribbons with parallax layers */}
    <g className="parallax-layer-2 art-ribbon">
      {/* Back ribbon - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1">
        <path d="M-25 55 L125 15 L425 75 L425 95 L125 35 L-25 75Z" fill="#D4929B" />
      </g>
      
      {/* Middle ribbon */}
      <g filter="url(#po-depth-2)" opacity="0.2">
        <path d="M-22 62 L122 22 L422 82 L422 102 L122 42 L-22 82Z" fill="#B8A9D4" />
      </g>
      
      {/* Front ribbon - bright */}
      <g opacity="0.4">
        <path d="M-20 60 L120 20 L420 80 L420 100 L120 40 L-20 80Z" fill="url(#po-ribbon1)" />
      </g>
    </g>

    <g className="parallax-layer-1 art-ribbon art-ribbon-delayed">
      {/* Back ribbon - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1">
        <path d="M-25 115 L165 85 L425 125 L425 145 L165 105 L-25 135Z" fill="#B8A9D4" />
      </g>
      
      {/* Middle ribbon */}
      <g filter="url(#po-depth-2)" opacity="0.2">
        <path d="M-22 118 L162 88 L422 128 L422 148 L162 108 L-22 138Z" fill="#E8B4A0" />
      </g>
      
      {/* Front ribbon - bright */}
      <g opacity="0.4">
        <path d="M-20 120 L160 90 L420 130 L420 150 L160 110 L-20 140Z" fill="url(#po-ribbon2)" />
      </g>
    </g>

    {/* Enhanced TCG Card outline with depth */}
    <g transform="translate(200, 100)" className="parallax-layer-2 art-float">
      {/* Back card shadow - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1">
        <rect x="-44" y="-62" width="88" height="124" rx="8" fill="#D4929B" />
      </g>
      
      {/* Middle card shadow */}
      <g filter="url(#po-depth-2)" opacity="0.2">
        <rect x="-43" y="-61" width="86" height="122" rx="7" fill="#B8A9D4" />
      </g>
      
      {/* Main card */}
      <g opacity="0.5">
        <rect
          x="-42"
          y="-60"
          width="84"
          height="120"
          rx="6"
          fill="url(#po-card)"
          stroke="#B8A9D4"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        
        {/* Card inner frame with glow */}
        <g filter="url(#po-glow-creative)">
          <rect
            x="-34"
            y="-48"
            width="68"
            height="47"
            rx="3"
            fill="none"
            stroke="#E8B4A0"
            strokeWidth="0.6"
            strokeOpacity="0.3"
          />
        </g>
        
        {/* Card content lines */}
        <line x1="-30" y1="3" x2="30" y2="3" stroke="#B8A9D4" strokeWidth="0.8" opacity="0.25" />
        <line x1="-30" y1="12" x2="22" y2="12" stroke="#E8B4A0" strokeWidth="0.7" opacity="0.2" />
        <line x1="-30" y1="21" x2="16" y2="21" stroke="#D4929B" strokeWidth="0.5" opacity="0.15" />
      </g>
      
      {/* Rarity star with glow */}
      <g transform="translate(0, 50)" className="art-sparkle">
        <g filter="url(#po-glow-strong)">
          <polygon
            points="0,-6 1.8,-1.8 6,-1.8 1.8,1.8 0,6 -1.8,1.8 -6,1.8 -1.8,-1.8"
            fill="#E8B4A0"
            fillOpacity="0.7"
          />
        </g>
        <g opacity="0.5">
          <polygon
            points="0,-4 1.2,-1.2 4,-1.2 1.2,1.2 0,4 -1.2,1.2 -4,1.2 -1.2,-1.2"
            fill="#B8A9D4"
            fillOpacity="0.4"
          />
        </g>
      </g>
    </g>

    {/* Enhanced large code brackets with depth and glow */}
    <g className="parallax-layer-1">
      {/* Back brackets - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1" stroke="#D4929B" strokeWidth="3" strokeLinecap="round">
        <polyline points="108,53 83,98 108,143" />
        <polyline points="292,53 317,98 292,143" />
      </g>
      
      {/* Middle brackets */}
      <g filter="url(#po-depth-2)" opacity="0.2" stroke="#B8A9D4" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="109,54 84,99 109,144" />
        <polyline points="291,54 316,99 291,144" />
      </g>
      
      {/* Front brackets - bright with glow */}
      <g stroke="url(#po-bracket)" strokeWidth="2" strokeLinecap="round" opacity="0.45">
        <polyline points="110,55 85,100 110,145" className="art-float" />
        <polyline points="290,55 315,100 290,145" className="art-float-reverse" />
      </g>
      
      {/* Bracket glow */}
      <g filter="url(#po-glow-creative)">
        <polyline points="110,55 85,100 110,145" stroke="#E8B4A0" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <polyline points="290,55 315,100 290,145" stroke="#E8B4A0" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </g>
    </g>

    {/* Enhanced slash between brackets with depth */}
    <g className="parallax-layer-2">
      {/* Back slash - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.08">
        <line x1="213" y1="33" x2="183" y2="167" stroke="#D4929B" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Middle slash */}
      <g filter="url(#po-depth-2)" opacity="0.15">
        <line x1="215" y1="35" x2="185" y2="165" stroke="#B8A9D4" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Front slash - bright */}
      <g opacity="0.2">
        <line x1="217" y1="38" x2="187" y2="162" stroke="#E8B4A0" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>

    {/* Enhanced code snippet shapes with depth */}
    <g className="parallax-layer-3 art-drift">
      {/* Back code - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.1">
        <rect x="28" y="53" width="37" height="4" rx="2" fill="#D4929B" />
        <rect x="33" y="62" width="27" height="4" rx="2" fill="#B8A9D4" />
        <rect x="33" y="71" width="32" height="4" rx="2" fill="#E8B4A0" />
        <rect x="28" y="80" width="22" height="4" rx="2" fill="#D4929B" />
        <rect x="338" y="103" width="32" height="4" rx="2" fill="#B8A9D4" />
        <rect x="343" y="112" width="24" height="4" rx="2" fill="#E8B4A0" />
        <rect x="343" y="121" width="30" height="4" rx="2" fill="#D4929B" />
        <rect x="338" y="130" width="20" height="4" rx="2" fill="#B8A9D4" />
      </g>
      
      {/* Middle code */}
      <g filter="url(#po-depth-2)" opacity="0.18">
        <rect x="29" y="54" width="35" height="3" rx="2" fill="none" stroke="#B8A9D4" strokeWidth="0.8" />
        <rect x="34" y="63" width="25" height="3" rx="2" fill="none" stroke="#E8B4A0" strokeWidth="0.8" />
        <rect x="34" y="72" width="30" height="3" rx="2" fill="none" stroke="#D4929B" strokeWidth="0.8" />
        <rect x="29" y="81" width="20" height="3" rx="2" fill="none" stroke="#B8A9D4" strokeWidth="0.8" />
        <rect x="339" y="104" width="30" height="3" rx="2" fill="none" stroke="#E8B4A0" strokeWidth="0.8" />
        <rect x="344" y="113" width="22" height="3" rx="2" fill="none" stroke="#D4929B" strokeWidth="0.8" />
        <rect x="344" y="122" width="28" height="3" rx="2" fill="none" stroke="#B8A9D4" strokeWidth="0.8" />
        <rect x="339" y="131" width="18" height="3" rx="2" fill="none" stroke="#E8B4A0" strokeWidth="0.8" />
      </g>
      
      {/* Front code - bright */}
      <g opacity="0.25">
        <rect x="30" y="55" width="33" height="2" rx="1.5" fill="none" stroke="#E8B4A0" strokeWidth="0.7" />
        <rect x="35" y="64" width="23" height="2" rx="1.5" fill="none" stroke="#B8A9D4" strokeWidth="0.7" />
        <rect x="35" y="73" width="28" height="2" rx="1.5" fill="none" stroke="#D4929B" strokeWidth="0.6" />
        <rect x="30" y="82" width="18" height="2" rx="1.5" fill="none" stroke="#E8B4A0" strokeWidth="0.6" />
        <rect x="340" y="105" width="28" height="2" rx="1.5" fill="none" stroke="#B8A9D4" strokeWidth="0.7" />
        <rect x="345" y="114" width="20" height="2" rx="1.5" fill="none" stroke="#D4929B" strokeWidth="0.7" />
        <rect x="345" y="123" width="26" height="2" rx="1.5" fill="none" stroke="#E8B4A0" strokeWidth="0.7" />
        <rect x="340" y="132" width="16" height="2" rx="1.5" fill="none" stroke="#D4929B" strokeWidth="0.6" />
      </g>
    </g>

    {/* Enhanced sparkle elements with depth */}
    <g className="art-sparkle">
      {/* Back sparkles - blurred */}
      <g opacity="0.1" filter="url(#po-depth-3)">
        <g transform="translate(68, 33)">
          <polygon points="0,-5 1.5,-1.5 5,-1.5 1.5,1.5 0,5 -1.5,1.5 -5,1.5 -1.5,-1.5" fill="#D4929B" />
        </g>
        <g transform="translate(338, 40)">
          <polygon points="0,-4 1.2,-1.2 4,-1.2 1.2,1.2 0,4 -1.2,1.2 -4,1.2 -1.2,-1.2" fill="#B8A9D4" />
        </g>
        <g transform="translate(53, 158)">
          <polygon points="0,-3 0.9,-0.9 3,-0.9 0.9,0.9 0,3 -0.9,0.9 -3,0.9 -0.9,-0.9" fill="#E8B4A0" />
        </g>
        <g transform="translate(353, 153)">
          <polygon points="0,-3 0.9,-0.9 3,-0.9 0.9,0.9 0,3 -0.9,0.9 -3,0.9 -0.9,-0.9" fill="#B8A9D4" />
        </g>
      </g>
      
      {/* Middle sparkles */}
      <g opacity="0.2" filter="url(#po-depth-2)">
        <g transform="translate(70, 35)">
          <polygon points="0,-6 2,-2 6,-2 2,2 0,6 -2,2 -6,2 -2,-2" fill="#B8A9D4" />
        </g>
        <g transform="translate(340, 42)">
          <polygon points="0,-5 1.7,-1.7 5,-1.7 1.7,1.7 0,5 -1.7,1.7 -5,1.7 -1.7,-1.7" fill="#E8B4A0" />
        </g>
        <g transform="translate(55, 160)">
          <polygon points="0,-4 1.3,-1.3 4,-1.3 1.3,1.3 0,4 -1.3,1.3 -4,1.3 -1.3,-1.3" fill="#D4929B" />
        </g>
        <g transform="translate(355, 155)">
          <polygon points="0,-4 1.3,-1.3 4,-1.3 1.3,1.3 0,4 -1.3,1.3 -4,1.3 -1.3,-1.3" fill="#B8A9D4" />
        </g>
      </g>
      
      {/* Front sparkles - bright with glow */}
      <g filter="url(#po-glow-creative)">
        <g transform="translate(72, 37)">
          <polygon points="0,-7 2.5,-2.5 7,-2.5 2.5,2.5 0,7 -2.5,2.5 -7,2.5 -2.5,-2.5" fill="#E8B4A0" fillOpacity="0.6" />
        </g>
        <g transform="translate(342, 44)">
          <polygon points="0,-6 2,-2 6,-2 2,2 0,6 -2,2 -6,2 -2,-2" fill="#B8A9D4" fillOpacity="0.55" />
        </g>
        <g transform="translate(57, 162)">
          <polygon points="0,-5 1.7,-1.7 5,-1.7 1.7,1.7 0,5 -1.7,1.7 -5,1.7 -1.7,-1.7" fill="#D4929B" fillOpacity="0.5" />
        </g>
        <g transform="translate(357, 157)">
          <polygon points="0,-5 1.7,-1.7 5,-1.7 1.7,1.7 0,5 -1.7,1.7 -5,1.7 -1.7,-1.7" fill="#B8A9D4" fillOpacity="0.5" />
        </g>
      </g>
    </g>

    {/* Enhanced floating gradient orbs with depth */}
    <g className="art-float-slow">
      {/* Back orbs - blurred */}
      <g opacity="0.08" filter="url(#po-depth-3)">
        <circle cx="43" cy="108" r="10" fill="#D4929B" />
        <circle cx="363" cy="83" r="8" fill="#B8A9D4" />
      </g>
      
      {/* Middle orbs */}
      <g opacity="0.15" filter="url(#po-depth-2)">
        <circle cx="45" cy="106" r="8" fill="none" stroke="#E8B4A0" strokeWidth="1.5" />
        <circle cx="365" cy="81" r="6" fill="none" stroke="#B8A9D4" strokeWidth="1.2" />
      </g>
      
      {/* Front orbs - bright */}
      <g opacity="0.25">
        <circle cx="47" cy="104" r="6" fill="none" stroke="#E8B4A0" strokeWidth="1" />
        <circle cx="367" cy="79" r="4" fill="none" stroke="#D4929B" strokeWidth="0.8" />
      </g>
    </g>

    <g className="art-float-delayed">
      {/* Back orbs - blurred */}
      <g opacity="0.08" filter="url(#po-depth-3)">
        <circle cx="128" cy="28" r="6" fill="#B8A9D4" />
        <circle cx="278" cy="173" r="8" fill="#D4929B" />
      </g>
      
      {/* Middle orbs */}
      <g opacity="0.15" filter="url(#po-depth-2)">
        <circle cx="130" cy="26" r="5" fill="none" stroke="#E8B4A0" strokeWidth="1.2" />
        <circle cx="280" cy="171" r="6" fill="none" stroke="#B8A9D4" strokeWidth="1.2" />
      </g>
      
      {/* Front orbs - bright */}
      <g opacity="0.25">
        <circle cx="132" cy="24" r="4" fill="none" stroke="#D4929B" strokeWidth="0.8" />
        <circle cx="282" cy="169" r="5" fill="none" stroke="#E8B4A0" strokeWidth="0.8" />
      </g>
    </g>

    {/* Enhanced decorative dots with depth */}
    <g fill="#D4929B" opacity="0.12">
      {/* Back dots - blurred */}
      <g filter="url(#po-depth-3)" opacity="0.08">
        <circle cx="18" cy="18" r="2" />
        <circle cx="35" cy="18" r="2" />
        <circle cx="52" cy="18" r="2" />
        <circle cx="378" cy="168" r="2" />
        <circle cx="378" cy="183" r="2" />
        <circle cx="363" cy="183" r="2" />
      </g>
      
      {/* Middle dots */}
      <g filter="url(#po-depth-2)" opacity="0.15">
        <circle cx="20" cy="20" r="2.2" fill="#E8B4A0" />
        <circle cx="37" cy="20" r="2.2" fill="#B8A9D4" />
        <circle cx="54" cy="20" r="2.2" fill="#D4929B" />
        <circle cx="376" cy="170" r="2.2" fill="#E8B4A0" />
        <circle cx="376" cy="185" r="2.2" fill="#B8A9D4" />
        <circle cx="361" cy="185" r="2.2" fill="#D4929B" />
      </g>
      
      {/* Front dots - bright */}
      <g opacity="0.2">
        <circle cx="22" cy="22" r="2.5" fill="#B8A9D4" />
        <circle cx="39" cy="22" r="2.5" fill="#E8B4A0" />
        <circle cx="56" cy="22" r="2.5" fill="#D4929B" />
        <circle cx="378" cy="172" r="2.5" fill="#E8B4A0" />
        <circle cx="378" cy="187" r="2.5" fill="#B8A9D4" />
        <circle cx="363" cy="187" r="2.5" fill="#D4929B" />
      </g>
    </g>

    {/* Creative artistic elements - floating geometric shapes */}
    <g className="art-drift art-pulse-slow">
      {/* Geometric shapes with depth */}
      <g className="parallax-layer-1">
        {/* Back shapes - blurred */}
        <g filter="url(#po-depth-3)" opacity="0.08">
          <rect x="100" cy="30" width="12" height="12" rx="2" transform="rotate(15)" fill="#B8A9D4" />
          <circle cx="310" cy="170" r="8" fill="#D4929B" />
          <polygon points="160,40 166,52 174,40" fill="#E8B4A0" />
        </g>
        
        {/* Middle shapes */}
        <g filter="url(#po-depth-2)" opacity="0.15">
          <rect x="102" cy="28" width="10" height="10" rx="2" transform="rotate(20)" fill="none" stroke="#E8B4A0" strokeWidth="1" />
          <circle cx="312" cy="168" r="6" fill="none" stroke="#B8A9D4" strokeWidth="1" />
          <polygon points="162,38 168,50 176,38" fill="none" stroke="#D4929B" strokeWidth="1" />
        </g>
        
        {/* Front shapes - bright */}
        <g filter="url(#po-glow-creative)">
          <rect x="104" cy="26" width="8" height="8" rx="2" transform="rotate(25)" fill="none" stroke="#B8A9D4" strokeWidth="0.8" />
          <circle cx="314" cy="166" r="4" fill="none" stroke="#E8B4A0" strokeWidth="0.8" />
          <polygon points="164,36 170,48 178,36" fill="none" stroke="#D4929B" strokeWidth="0.8" />
        </g>
      </g>
    </g>

    {/* Card glow effect */}
    <g transform="translate(200, 100)" className="art-pulse-slow">
      <rect x="-42" y="-60" width="84" height="120" rx="6" fill="none" stroke="#E8B4A0" strokeWidth="2" opacity="0.2" filter="url(#po-glow-creative)" />
      <rect x="-34" y="-48" width="68" height="47" rx="3" fill="none" stroke="#B8A9D4" strokeWidth="1" opacity="0.15" filter="url(#po-glow-creative)" />
    </g>

    {/* Additional creative elements - floating icons */}
    <g className="art-float-delayed art-sparkle">
      <g transform="translate(90, 60)" opacity="0.2" filter="url(#po-soft)">
        {/* Heart icon */}
        <path d="M0,2 C0,2 -2,-4 -6,-4 C-8,-4 -10,-1 -10,2 C-10,5 -8,8 -4,8 L0,11 L4,8 C8,8 10,5 10,2 C10,-1 8,-4 6,-4 C2,-4 0,2 0,2 Z" fill="#D4929B" />
      </g>
      <g transform="translate(310, 140)" opacity="0.2" filter="url(#po-soft)">
        {/* Star icon */}
        <polygon points="0,-6 2,-2 6,-2 2,2 0,6 -2,2 -6,2 -2,-2" fill="#B8A9D4" />
      </g>
    </g>
  </svg>
);
