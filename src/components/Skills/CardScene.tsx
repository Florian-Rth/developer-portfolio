import { cn } from "@lib/utils";
import { Canvas } from "@react-three/fiber";
import type React from "react";

type CardSceneProps = {
  component: React.FC;
  className?: string;
};

export const CardScene: React.FC<CardSceneProps> = ({ component: SceneComponent, className }) => {
  return (
    <div className={cn("relative w-full h-full bg-surface/60", className)}>
      <Canvas camera={{ fov: 40, position: [0, 0, 4] }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={0.8} />
        <SceneComponent />
      </Canvas>
      {/* Gradient fade at bottom */}
      <div
        data-testid="scene-fade"
        className="absolute bottom-0 left-0 right-0 h-[50px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--surface, #FFFDF9))",
        }}
      />
    </div>
  );
};
