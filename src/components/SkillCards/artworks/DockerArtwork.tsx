import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import type * as THREE from "three";

const Container = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.8, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#E8B4A0"
        emissive="#E8B4A0"
        emissiveIntensity={0.15}
        flatShading
      />
    </mesh>
  );
};

export const DockerArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#1a1816" }}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <Container />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};
