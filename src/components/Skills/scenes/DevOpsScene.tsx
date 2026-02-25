import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export const DevOpsScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Slow Y-rotation + bob
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Peach-colored Box - container */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#E8B4A0" />
      </mesh>
    </group>
  );
};
