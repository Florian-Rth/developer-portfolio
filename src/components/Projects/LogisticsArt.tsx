import type React from "react";

/** Industrial yard with warehouse, trucks, signal lights, and glowing data streams — Enhanced logistics management
   - Industrial/Raw Vibe (orange, brown, black)
   - Enhanced pulse animation (bigger, brighter)
   - Stronger float effects with greater range
   - Enhanced 3D depth with multiple layers
   - Interactive parallax hover effect
   - Industrial hardware-first aesthetic */

export const LogisticsArt: React.FC = () => (
  <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" className="w-full h-full">
    <defs>
      {/* Enhanced radial gradients for depth layers */}
      <radialGradient id="lo-bg" cx="40%" cy="60%" r="60%">
        <stop offset="0%" stopColor="#E8A0B0" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#D4929B" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#A0522D" stopOpacity="0.15" />
      </radialGradient>
      
      <radialGradient id="lo-bg-deep" cx="40%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#E8A0B0" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#A0522D" stopOpacity="0.08" />
      </radialGradient>

      <linearGradient id="lo-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8A0B0" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.3" />
      </linearGradient>

      <linearGradient id="lo-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A0522D" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#D4929B" stopOpacity="0.1" />
      </linearGradient>

      <linearGradient id="lo-road" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A0522D" stopOpacity="0" />
        <stop offset="50%" stopColor="#A0522D" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#A0522D" stopOpacity="0" />
      </linearGradient>

      {/* Enhanced glow filters */}
      <filter id="lo-glow-strong">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="lo-glow-industrial">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="lo-soft">
        <feGaussianBlur stdDeviation="2" />
      </filter>

      {/* 3D depth blur layers */}
      <filter id="lo-depth-1">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
      <filter id="lo-depth-2">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="lo-depth-3">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>

    {/* Background radial glow - deepest layer */}
    <ellipse 
      cx="180" 
      cy="120" 
      rx="170" 
      ry="110" 
      fill="url(#lo-bg-deep)" 
      className="art-pulse-slow"
    />

    {/* Background glow - middle layer */}
    <ellipse 
      cx="180" 
      cy="120" 
      rx="150" 
      ry="95" 
      fill="url(#lo-bg)" 
      className="art-pulse"
    />

    {/* Enhanced ground plane with depth layers */}
    <g className="parallax-layer-2">
      {/* Back ground layer - blurred */}
      <g filter="url(#lo-depth-3)" opacity="0.08">
        <rect x="15" y="150" width="370" height="40" fill="#A0522D" rx="2" />
        <line x1="25" y1="165" x2="375" y2="165" stroke="#D4929B" strokeWidth="1" strokeDasharray="15 10" opacity="0.1" />
      </g>
      
      {/* Middle ground layer - slightly blurred */}
      <g filter="url(#lo-depth-2)" opacity="0.15">
        <rect x="18" y="152" width="364" height="38" fill="#A0522D" rx="2" />
        <line x1="28" y1="167" x2="372" y2="167" stroke="#E8A0B0" strokeWidth="1.2" strokeDasharray="14 9" opacity="0.15" />
      </g>
      
      {/* Front ground layer - sharp */}
      <g opacity="0.2">
        <rect x="20" y="155" width="360" height="35" fill="url(#lo-road)" rx="2" />
        {/* Road markings - dashed center line */}
        <line
          x1="30"
          y1="170"
          x2="370"
          y2="170"
          stroke="#D4929B"
          strokeWidth="1.5"
          strokeDasharray="12 8"
          opacity="0.2"
        />
      </g>
    </g>

    {/* Enhanced warehouse A — left side with depth */}
    <g className="parallax-layer-1">
      {/* Back warehouse shadow */}
      <g filter="url(#lo-depth-3)" opacity="0.1">
        <path d="M35 80 L105 45 L165 80" fill="#A0522D" />
        <rect x="40" y="80" width="125" height="55" fill="#A0522D" rx="2" />
      </g>
      
      {/* Middle warehouse shadow */}
      <g filter="url(#lo-depth-2)" opacity="0.2">
        <path d="M38 82 L103 48 L163 82" fill="#D4929B" />
        <rect x="43" y="82" width="120" height="52" fill="#D4929B" rx="2" />
      </g>
      
      {/* Main warehouse */}
      <g opacity="0.4">
        {/* Roof */}
        <path
          d="M40 85 L100 55 L160 85"
          fill="url(#lo-roof)"
          stroke="#E8A0B0"
          strokeWidth="1"
          strokeOpacity="0.5"
          className="art-float-slow"
        />
        {/* Walls */}
        <rect
          x="45"
          y="85"
          width="110"
          height="50"
          fill="url(#lo-wall)"
          stroke="#A0522D"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          rx="2"
        />
        {/* Loading dock doors */}
        <rect
          x="55"
          y="100"
          width="20"
          height="35"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.1"
          stroke="#E8A0B0"
          strokeWidth="0.6"
          strokeOpacity="0.3"
        />
        <rect
          x="80"
          y="100"
          width="20"
          height="35"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.1"
          stroke="#E8A0B0"
          strokeWidth="0.6"
          strokeOpacity="0.3"
        />
        <rect
          x="105"
          y="100"
          width="20"
          height="35"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.15"
          stroke="#D4929B"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        {/* Dock indicators with glow */}
        <g>
          <circle cx="65" cy="95" r="3" fill="#E8A0B0" fillOpacity="0.7" className="art-signal" filter="url(#lo-glow-industrial)" />
          <circle cx="90" cy="95" r="3" fill="#D4929B" fillOpacity="0.6" className="art-signal-delayed" filter="url(#lo-glow-industrial)" />
          <circle cx="115" cy="95" r="3" fill="#E8A0B0" fillOpacity="0.6" className="art-signal" filter="url(#lo-glow-industrial)" />
        </g>
      </g>
    </g>

    {/* Enhanced warehouse B — right side with depth */}
    <g className="parallax-layer-2">
      {/* Back warehouse shadow */}
      <g filter="url(#lo-depth-3)" opacity="0.1">
        <path d="M255 95 L298 68 L345 95" fill="#A0522D" />
        <rect x="260" y="95" width="80" height="40" fill="#A0522D" rx="2" />
      </g>
      
      {/* Middle warehouse shadow */}
      <g filter="url(#lo-depth-2)" opacity="0.2">
        <path d="M258 97 L298 70 L342 97" fill="#D4929B" />
        <rect x="263" y="97" width="75" height="37" fill="#D4929B" rx="2" />
      </g>
      
      {/* Main warehouse */}
      <g opacity="0.4" className="art-float">
        <path
          d="M260 100 L300 75 L340 100"
          fill="url(#lo-roof)"
          stroke="#E8A0B0"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
        <rect
          x="263"
          y="100"
          width="72"
          height="35"
          fill="url(#lo-wall)"
          stroke="#A0522D"
          strokeWidth="0.6"
          strokeOpacity="0.3"
          rx="2"
        />
        <rect
          x="272"
          y="110"
          width="14"
          height="25"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.08"
          stroke="#D4929B"
          strokeWidth="0.4"
          strokeOpacity="0.2"
        />
        <rect
          x="293"
          y="110"
          width="14"
          height="25"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.08"
          stroke="#D4929B"
          strokeWidth="0.4"
          strokeOpacity="0.2"
        />
        <rect
          x="314"
          y="110"
          width="14"
          height="25"
          rx="2"
          fill="#E8A0B0"
          fillOpacity="0.12"
          stroke="#A0522D"
          strokeWidth="0.4"
          strokeOpacity="0.3"
        />
      </g>
    </g>

    {/* Enhanced truck with depth and stronger animation */}
    <g className="parallax-layer-3 art-truck">
      {/* Truck shadow */}
      <g filter="url(#lo-depth-3)" opacity="0.1">
        <rect x="172" y="149" width="47" height="20" rx="2.5" fill="#A0522D" />
        <path d="M217 153 L232 153 L232 170 L217 170" fill="#A0522D" />
        <circle cx="185" cy="172" r="4" fill="#A0522D" />
        <circle cx="228" cy="172" r="4" fill="#A0522D" />
      </g>
      
      {/* Truck body main */}
      <g>
        <rect
          x="175"
          y="150"
          width="45"
          height="18"
          rx="2"
          fill="#A0522D"
          fillOpacity="0.15"
          stroke="#E8A0B0"
          strokeWidth="0.9"
          strokeOpacity="0.5"
        />
        {/* Truck cab */}
        <path
          d="M220 154 L235 154 L235 170 L220 170"
          fill="#D4929B"
          fillOpacity="0.2"
          stroke="#E8A0B0"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
        <line
          x1="224"
          y1="154"
          x2="228"
          y2="148"
          stroke="#A0522D"
          strokeWidth="0.6"
          strokeOpacity="0.4"
        />
        <line
          x1="228"
          y1="148"
          x2="232"
          y2="148"
          stroke="#A0522D"
          strokeWidth="0.6"
          strokeOpacity="0.4"
        />
        <line
          x1="232"
          y1="148"
          x2="232"
          y2="154"
          stroke="#A0522D"
          strokeWidth="0.6"
          strokeOpacity="0.4"
        />
        {/* Wheels with depth */}
        <circle
          cx="188"
          cy="172"
          r="3.5"
          fill="#A0522D"
          fillOpacity="0.2"
          stroke="#E8A0B0"
          strokeWidth="0.7"
          strokeOpacity="0.5"
        />
        <circle
          cx="231"
          cy="172"
          r="3.5"
          fill="#A0522D"
          fillOpacity="0.2"
          stroke="#E8A0B0"
          strokeWidth="0.7"
          strokeOpacity="0.5"
        />
      </g>
    </g>

    {/* Enhanced movement path arrows with depth */}
    <g stroke="#E8A0B0" strokeWidth="0.8" opacity="0.25" strokeDasharray="5 4" className="art-flow">
      {/* Back arrows - blurred */}
      <g filter="url(#lo-depth-3)">
        <path d="M95 130 L95 155 Q95 170 100 170 L165 170" />
        <path d="M235 170 Q245 170 255 160 L255 140 L300 140" />
      </g>
      
      {/* Middle arrows */}
      <g filter="url(#lo-depth-2)">
        <path d="M98 132 L98 153 Q98 165 102 165 L162 165" />
        <path d="M237 168 Q247 168 252 158 L252 142 L297 142" />
      </g>
      
      {/* Front arrows - bright */}
      <g>
        <path d="M100 135 L100 150 Q100 160 105 160 L160 160" stroke="#D4929B" />
        <path d="M240 165 Q250 165 250 155 L250 140 L295 140" stroke="#D4929B" />
      </g>
    </g>

    {/* Enhanced direction indicators with glow */}
    <g className="art-sparkle">
      {/* Back indicators - blurred */}
      <g fill="#D4929B" opacity="0.08" filter="url(#lo-depth-3)">
        <polygon points="163,157 158,155 158,162" />
        <polygon points="293,137 288,135 288,140" />
      </g>
      
      {/* Middle indicators */}
      <g fill="#E8A0B0" opacity="0.15" filter="url(#lo-depth-2)">
        <polygon points="161,155 156,153 156,160" />
        <polygon points="291,135 286,133 286,138" />
      </g>
      
      {/* Front indicators - bright with glow */}
      <g fill="#E8A0B0" filter="url(#lo-glow-industrial)">
        <polygon points="165,159 160,157 160,164" />
        <polygon points="295,139 290,137 290,142" />
      </g>
    </g>

    {/* Enhanced parking bay markings */}
    <g stroke="#E8A0B0" strokeWidth="0.5" opacity="0.18" className="art-float-slow">
      <rect x="168" y="133" width="18" height="20" rx="1.5" fill="none" />
      <rect x="188" y="133" width="18" height="20" rx="1.5" fill="none" />
      <rect x="208" y="133" width="18" height="20" rx="1.5" fill="none" />
    </g>

    {/* Enhanced gate / barrier — left entrance with glow */}
    <g transform="translate(25, 150)" className="parallax-layer-1 art-float-delayed">
      {/* Back barrier shadow */}
      <g filter="url(#lo-depth-3)" opacity="0.08">
        <line x1="0" y1="0" x2="0" y2="-25" stroke="#A0522D" strokeWidth="1.5" />
      </g>
      
      {/* Main barrier */}
      <g opacity="0.3">
        <line x1="0" y1="0" x2="0" y2="-25" stroke="#D4929B" strokeWidth="1.2" />
        <line
          x1="0"
          y1="-25"
          x2="18"
          y2="-25"
          stroke="#E8A0B0"
          strokeWidth="1.8"
          className="art-blink"
          filter="url(#lo-glow-industrial)"
        />
        <circle cx="0" cy="-27" r="3" fill="#D4929B" fillOpacity="0.7" className="art-signal" filter="url(#lo-glow-industrial)" />
      </g>
    </g>

    {/* Enhanced signal tower — right side with glow */}
    <g transform="translate(370, 85)" className="parallax-layer-2 art-float">
      {/* Back tower shadow */}
      <g filter="url(#lo-depth-3)" opacity="0.08">
        <line x1="0" y1="0" x2="0" y2="65" stroke="#A0522D" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="4" fill="#D4929B" />
        <circle cx="0" cy="15" r="4" fill="#E8A0B0" />
        <circle cx="0" cy="30" r="4" fill="#A0522D" />
      </g>
      
      {/* Main tower */}
      <g opacity="0.4">
        <line x1="0" y1="0" x2="0" y2="65" stroke="#E8A0B0" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3.5" fill="#D4929B" fillOpacity="0.8" className="art-signal" filter="url(#lo-glow-strong)" />
        <circle cx="0" cy="15" r="3.5" fill="#E8A0B0" fillOpacity="0.8" className="art-signal-delayed" filter="url(#lo-glow-industrial)" />
        <circle cx="0" cy="30" r="3.5" fill="#D4929B" fillOpacity="0.4" />
      </g>
    </g>

    {/* Enhanced ambient particles with depth */}
    <g className="art-sparkle-slow">
      {/* Back particles - blurred */}
      <g opacity="0.08" filter="url(#lo-depth-3)">
        <circle cx="195" cy="42" r="2" fill="#D4929B" />
        <circle cx="345" cy="52" r="1.5" fill="#A0522D" />
        <circle cx="50" cy="42" r="1.5" fill="#D4929B" />
      </g>
      
      {/* Middle particles */}
      <g opacity="0.15" filter="url(#lo-depth-2)">
        <circle cx="200" cy="40" r="2" fill="#E8A0B0" />
        <circle cx="350" cy="50" r="1.8" fill="#D4929B" />
      </g>
      
      {/* Front particles - bright */}
      <g opacity="0.25">
        <circle cx="205" cy="38" r="2.2" fill="#E8A0B0" className="art-sparkle" />
        <circle cx="355" cy="48" r="2" fill="#E8A0B0" className="art-sparkle-delayed" />
        <circle cx="52" cy="45" r="1.8" fill="#D4929B" className="art-sparkle" />
      </g>
    </g>

    {/* Faint container stacks near warehouse B with depth */}
    <g className="art-drift" opacity="0.15">
      {/* Back stacks - blurred */}
      <g filter="url(#lo-depth-3)">
        <rect x="355" y="115" width="20" height="12" rx="2" fill="#A0522D" />
        <rect x="355" y="102" width="20" height="12" rx="2" fill="#D4929B" />
        <rect x="360" y="90" width="14" height="10" rx="1.5" fill="#A0522D" />
      </g>
      
      {/* Middle stacks */}
      <g filter="url(#lo-depth-2)">
        <rect x="353" y="112" width="22" height="14" rx="2" fill="none" stroke="#D4929B" strokeWidth="0.8" />
        <rect x="353" y="99" width="22" height="12" rx="2" fill="none" stroke="#E8A0B0" strokeWidth="0.8" />
      </g>
      
      {/* Front stacks */}
      <g opacity="0.2">
        <rect x="350" y="110" width="24" height="16" rx="2" fill="none" stroke="#E8A0B0" strokeWidth="0.6" />
        <rect x="350" y="97" width="24" height="12" rx="2" fill="none" stroke="#D4929B" strokeWidth="0.6" />
        <rect x="358" y="85" width="18" height="10" rx="2" fill="none" stroke="#A0522D" strokeWidth="0.5" />
      </g>
    </g>

    {/* Industrial glow effects */}
    <g className="art-pulse-slow">
      <circle cx="120" cy="65" r="2.5" fill="#E8A0B0" fillOpacity="0.2" filter="url(#lo-glow-industrial)" />
      <circle cx="290" cy="70" r="2" fill="#D4929B" fillOpacity="0.15" filter="url(#lo-glow-industrial)" />
      <circle cx="160" cy="50" r="1.5" fill="#A0522D" fillOpacity="0.15" filter="url(#lo-glow-industrial)" />
    </g>
  </svg>
);
