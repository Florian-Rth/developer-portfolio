import { cn } from "@lib/utils";
import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type React from "react";
import { Model } from "./Model";

type FInitialProps = {
  className?: string;
};

export const FInitial: React.FC<FInitialProps> = ({ className }) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Center>
          <Model rotation={[Math.PI / 2, 0, 0]} />
        </Center>
        <OrbitControls />
      </Canvas>
    </div>
  );
};
