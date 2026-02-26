import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

type FrontendSceneProps = {
  isHovered?: boolean;
};

export const FrontendScene: React.FC<FrontendSceneProps> = ({ isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.2 : 0.4;
    groupRef.current.rotation.y += delta * speed * 0.5;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;

    // Individual ring rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * speed * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * speed * 0.5;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * speed * 0.7;
  });

  const mat = { color: "#61DAFB", metalness: 0.2, roughness: 0.3, emissive: "#61DAFB", emissiveIntensity: isHovered ? 0.25 : 0.08 };

  return (
    <group ref={groupRef}>
      {/* Outer ring — 0° */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.9, 0.07, 16, 64]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Second ring — 60° */}
      <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.9, 0.06, 16, 64]} />
        <meshStandardMaterial {...mat} opacity={0.85} transparent />
      </mesh>
      {/* Third ring — -60° */}
      <mesh ref={ring3Ref} rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[0.9, 0.05, 16, 64]} />
        <meshStandardMaterial {...mat} opacity={0.7} transparent />
      </mesh>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#61DAFB" metalness={0.4} roughness={0.2} emissive="#61DAFB" emissiveIntensity={isHovered ? 0.5 : 0.2} />
      </mesh>
      {/* Electron dots on rings */}
      {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#61DAFB" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Ambient glow light */}
      <pointLight color="#61DAFB" intensity={isHovered ? 1.5 : 0.4} distance={3} />
    </group>
  );
};
