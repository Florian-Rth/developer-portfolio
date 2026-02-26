import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import type * as THREE from "three";

const Octahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#D4929B"
        emissive="#D4929B"
        emissiveIntensity={0.15}
        flatShading
      />
    </mesh>
  );
};

export const CSharpArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#1a1816" }}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <Octahedron />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};
