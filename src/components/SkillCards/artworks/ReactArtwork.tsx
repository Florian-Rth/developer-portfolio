import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import type * as THREE from "three";

const Atom = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.3} />
      </mesh>
      {/* Ring 1 */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 40]} />
        <meshStandardMaterial color="#61DAFB" opacity={0.7} transparent />
      </mesh>
      {/* Ring 2 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 40]} />
        <meshStandardMaterial color="#61DAFB" opacity={0.7} transparent />
      </mesh>
      {/* Ring 3 */}
      <mesh rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 40]} />
        <meshStandardMaterial color="#61DAFB" opacity={0.7} transparent />
      </mesh>
    </group>
  );
};

export const ReactArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#1a1816" }}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <Atom />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};
