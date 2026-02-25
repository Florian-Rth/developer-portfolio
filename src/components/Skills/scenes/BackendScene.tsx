import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export const BackendScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Slow Y-rotation + bob
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Purple Octahedron - C# diamond */}
      <mesh>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#9B4993" />
      </mesh>
    </group>
  );
};
