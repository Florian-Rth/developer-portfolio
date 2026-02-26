import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

type BackendSceneProps = {
  isHovered?: boolean;
};

export const BackendScene: React.FC<BackendSceneProps> = ({ isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.3 : 0.35;
    groupRef.current.rotation.y += delta * speed * 0.4;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.07;

    if (innerRef.current) innerRef.current.rotation.y += delta * speed * 0.8;
    if (innerRef.current) innerRef.current.rotation.x += delta * speed * 0.3;
    if (outerRef.current) outerRef.current.rotation.x -= delta * speed * 0.25;
    if (orbitRef.current) orbitRef.current.rotation.y += delta * speed * 1.5;
  });

  const dustyRose = "#D4929B";
  const lavender = "#B8A9D4";

  return (
    <group ref={groupRef}>
      {/* Main crystal — large octahedron */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color={dustyRose}
          metalness={0.5}
          roughness={0.15}
          emissive={dustyRose}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner crystal — smaller, lavender tint */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color={lavender}
          metalness={0.6}
          roughness={0.1}
          emissive={lavender}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      {/* Orbiting .NET dot */}
      <group ref={orbitRef}>
        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive={lavender} emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={dustyRose} emissive={dustyRose} emissiveIntensity={0.6} transparent opacity={0.7} />
        </mesh>
      </group>
      {/* Wireframe overlay */}
      <mesh>
        <octahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial color={lavender} wireframe opacity={0.2} transparent />
      </mesh>
      <pointLight color={dustyRose} intensity={isHovered ? 2 : 0.6} distance={3} />
    </group>
  );
};
