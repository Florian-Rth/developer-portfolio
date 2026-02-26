import { cn } from "@lib/utils";
import { Canvas } from "@react-three/fiber";
import type React from "react";

type SceneComponent = React.FC<{ isHovered?: boolean }>;

type CardSceneProps = {
  component: SceneComponent;
  isHovered?: boolean;
  className?: string;
};

export const CardScene: React.FC<CardSceneProps> = ({ component: SceneComponent, isHovered, className }) => {
  return (
    <div className={cn("relative w-full h-full bg-muted/30", className)}>
      <Canvas camera={{ fov: 40, position: [0, 0, 4] }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 2]} intensity={0.9} />
        <directionalLight position={[-2, -1, -2]} intensity={0.3} color="#f0e8ff" />
        <SceneComponent isHovered={isHovered} />
      </Canvas>
      {/* Gradient fade at bottom */}
      <div
        data-testid="scene-fade"
        className="absolute bottom-0 left-0 right-0 h-[70px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--surface, #FFFDF9))",
        }}
      />
    </div>
  );
};
