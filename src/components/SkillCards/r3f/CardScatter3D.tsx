import { type Skill, categoryColors, rarityColors, skills } from "@/data/skills";
import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import type React from "react";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { DetailDrawer } from "../DetailDrawer";

// ── Card Mesh ──────────────────────────────────────────────────────────────────

type CardMeshProps = {
  skill: Skill;
  position: [number, number, number];
  onSelect: (skill: Skill) => void;
};

const CARD_W = 1.2;
const CARD_H = 1.68;
const CARD_D = 0.03;

const CardMesh: React.FC<CardMeshProps> = ({ skill, position, onSelect }) => {
  const rigidRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { gl } = useThree();

  const borderColor = useMemo(
    () => new THREE.Color(rarityColors[skill.rarity].border),
    [skill.rarity],
  );
  const catColor = useMemo(() => new THREE.Color(categoryColors[skill.category]), [skill.category]);
  const faceColor = useMemo(() => new THREE.Color("#f5f0e8"), []);

  useFrame(() => {
    if (isDragging && rigidRef.current) {
      rigidRef.current.setGravityScale(0, true);
    }
  });

  const handlePointerDown = useCallback(
    (e: THREE.Event) => {
      (e as { stopPropagation?: () => void }).stopPropagation?.();
      setIsDragging(true);
      gl.domElement.style.cursor = "grabbing";
      if (rigidRef.current) {
        rigidRef.current.setGravityScale(0, true);
        rigidRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rigidRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    },
    [gl],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    gl.domElement.style.cursor = "auto";
    if (rigidRef.current) {
      rigidRef.current.setGravityScale(1, true);
    }
  }, [gl]);

  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      if (!isDragging || !rigidRef.current) return;
      (e as { stopPropagation?: () => void }).stopPropagation?.();
      const pointer = (e as unknown as { point: THREE.Vector3 }).point.clone();
      const target = new THREE.Vector3(pointer.x, pointer.y, 0.5);
      rigidRef.current.setTranslation({ x: target.x, y: target.y, z: target.z }, true);
    },
    [isDragging],
  );

  const handleClick = useCallback(() => {
    if (!isDragging) {
      onSelect(skill);
    }
  }, [isDragging, onSelect, skill]);

  return (
    <RigidBody
      ref={rigidRef}
      position={position}
      colliders={false}
      restitution={0.3}
      friction={0.8}
      linearDamping={2}
      angularDamping={2}
    >
      <CuboidCollider args={[CARD_W / 2, CARD_H / 2, CARD_D / 2]} />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh is not a DOM element */}
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        onPointerEnter={() => {
          setIsHovered(true);
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setIsHovered(false);
          if (!isDragging) gl.domElement.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[CARD_W, CARD_H, CARD_D]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>

      {/* Border frame — 4 edge strips */}
      {/* Top */}
      <mesh position={[0, CARD_H / 2 - 0.02, CARD_D / 2 + 0.001]}>
        <planeGeometry args={[CARD_W, 0.04]} />
        <meshStandardMaterial
          color={borderColor}
          emissive={borderColor}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -CARD_H / 2 + 0.02, CARD_D / 2 + 0.001]}>
        <planeGeometry args={[CARD_W, 0.04]} />
        <meshStandardMaterial
          color={borderColor}
          emissive={borderColor}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>
      {/* Left */}
      <mesh position={[-CARD_W / 2 + 0.02, 0, CARD_D / 2 + 0.001]}>
        <planeGeometry args={[0.04, CARD_H]} />
        <meshStandardMaterial
          color={borderColor}
          emissive={borderColor}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>
      {/* Right */}
      <mesh position={[CARD_W / 2 - 0.02, 0, CARD_D / 2 + 0.001]}>
        <planeGeometry args={[0.04, CARD_H]} />
        <meshStandardMaterial
          color={borderColor}
          emissive={borderColor}
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Category color bar */}
      <mesh position={[0, CARD_H / 2 - 0.25, CARD_D / 2 + 0.002]}>
        <planeGeometry args={[CARD_W - 0.12, 0.35]} />
        <meshStandardMaterial color={catColor} opacity={0.25} transparent />
      </mesh>

      {/* Skill name text */}
      <Text
        position={[0, -0.1, CARD_D / 2 + 0.002]}
        fontSize={0.12}
        color="#2d2a26"
        anchorX="center"
        anchorY="middle"
        font="/fonts/DMSans-Bold.ttf"
        maxWidth={CARD_W - 0.2}
      >
        {skill.name}
      </Text>

      {/* Rarity text */}
      <Text
        position={[0, CARD_H / 2 - 0.12, CARD_D / 2 + 0.003]}
        fontSize={0.06}
        color={rarityColors[skill.rarity].badge}
        anchorX="center"
        anchorY="middle"
      >
        {skill.rarity.toUpperCase()}
      </Text>

      {/* Hover glow */}
      {isHovered && (
        <pointLight position={[0, 0, 0.5]} color={borderColor} intensity={2} distance={3} />
      )}
    </RigidBody>
  );
};

// ── Floor ──────────────────────────────────────────────────────────────────────

const Floor: React.FC = () => {
  return (
    <RigidBody type="fixed" position={[0, -5, 0]}>
      <CuboidCollider args={[20, 0.5, 5]} />
    </RigidBody>
  );
};

// ── Walls ──────────────────────────────────────────────────────────────────────

const Walls: React.FC = () => {
  return (
    <>
      {/* Left wall */}
      <RigidBody type="fixed" position={[-8, 0, 0]}>
        <CuboidCollider args={[0.5, 10, 5]} />
      </RigidBody>
      {/* Right wall */}
      <RigidBody type="fixed" position={[8, 0, 0]}>
        <CuboidCollider args={[0.5, 10, 5]} />
      </RigidBody>
    </>
  );
};

// ── Scene ──────────────────────────────────────────────────────────────────────

type SceneProps = {
  scattered: boolean;
  onSelectSkill: (skill: Skill) => void;
};

const Scene: React.FC<SceneProps> = ({ scattered, onSelectSkill }) => {
  const initialPositions = useMemo(() => {
    if (!scattered) {
      return skills.map((_, i) => {
        const offset = (i - skills.length / 2) * 0.05;
        return [offset, i * 0.04 + 1, -i * 0.04] as [number, number, number];
      });
    }

    const cols = Math.ceil(Math.sqrt(skills.length));
    return skills.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * 2;
      const y = (row - 1) * 2.5 + 3;
      return [x + (Math.random() - 0.5) * 0.5, y, 0] as [number, number, number];
    });
  }, [scattered]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 5, 3]} intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <Walls />
        {skills.map((skill, i) => (
          <CardMesh
            key={skill.id}
            skill={skill}
            position={initialPositions[i]}
            onSelect={onSelectSkill}
          />
        ))}
      </Physics>
    </>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────

type CardScatter3DProps = {
  className?: string;
};

export const CardScatter3D: React.FC<CardScatter3DProps> = ({ className }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [scattered, setScattered] = useState(false);

  const handleSelectSkill = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (!scattered) setScattered(true);
  }, [scattered]);

  return (
    <>
      <div
        className={className}
        style={{ width: "100%", height: "800px", position: "relative" }}
        onClick={handleCanvasClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCanvasClick();
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Scene scattered={scattered} onSelectSkill={handleSelectSkill} />
          </Suspense>
        </Canvas>

        {!scattered && (
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-script text-sm text-foreground/40 pointer-events-none select-none">
            Click to scatter cards →
          </p>
        )}
      </div>

      <DetailDrawer skill={selectedSkill} onClose={handleCloseDrawer} />
    </>
  );
};
