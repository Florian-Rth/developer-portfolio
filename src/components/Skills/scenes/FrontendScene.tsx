import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export const FrontendScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Slow Y-rotation + bob
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Blue Torus - React atom hint */}
      <mesh>
        <torusGeometry args={[0.8, 0.15, 16, 48]} />
        <meshStandardMaterial color="#61DAFB" />
      </mesh>
      {/* Second torus ring rotated */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 48]} />
        <meshStandardMaterial color="#61DAFB" opacity={0.7} transparent />
      </mesh>
      {/* Third torus ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 3, 0]}>
        <torusGeometry args={[0.8, 0.08, 16, 48]} />
        <meshStandardMaterial color="#61DAFB" opacity={0.5} transparent />
      </mesh>
      {/* Center sphere (nucleus) */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#61DAFB" />
      </mesh>
    </group>
  );
};
