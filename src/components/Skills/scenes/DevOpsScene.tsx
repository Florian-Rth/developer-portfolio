import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

type DevOpsSceneProps = {
  isHovered?: boolean;
};

export const DevOpsScene: React.FC<DevOpsSceneProps> = ({ isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.2 : 0.35;
    groupRef.current.rotation.y += delta * speed * 0.3;
    groupRef.current.rotation.x += delta * speed * 0.1;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0009) * 0.07;

    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * speed * 0.6;
      innerCubeRef.current.rotation.z += delta * speed * 0.4;
    }
    if (orbitGroupRef.current) orbitGroupRef.current.rotation.y += delta * speed * 1.2;
  });

  const peach = "#E8B4A0";
  const lavender = "#B8A9D4";
  const dustyRose = "#D4929B";

  return (
    <group ref={groupRef}>
      {/* Main container box */}
      <mesh>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial
          color={peach}
          metalness={0.3}
          roughness={0.4}
          emissive={peach}
          emissiveIntensity={isHovered ? 0.25 : 0.08}
        />
      </mesh>
      {/* Wireframe overlay — "container outline" */}
      <mesh>
        <boxGeometry args={[1.02, 1.02, 1.02]} />
        <meshStandardMaterial color={dustyRose} wireframe opacity={0.4} transparent />
      </mesh>
      {/* Inner rotating cube — represents K8s inside Docker */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial
          color={lavender}
          metalness={0.5}
          roughness={0.2}
          emissive={lavender}
          emissiveIntensity={isHovered ? 0.6 : 0.25}
        />
      </mesh>
      {/* Orbiting small pods — Kubernetes nodes */}
      <group ref={orbitGroupRef}>
        {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 1.1, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * 1.1]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial
              color={i === 0 ? lavender : peach}
              emissive={i === 0 ? lavender : peach}
              emissiveIntensity={0.5}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
      <pointLight color={peach} intensity={isHovered ? 1.8 : 0.5} distance={3.5} />
      <pointLight color={lavender} position={[0, 1, 0]} intensity={isHovered ? 0.8 : 0.2} distance={2} />
    </group>
  );
};
