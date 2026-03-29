import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import { Box3, type Group, Mesh, type Object3D, ShaderMaterial } from "three";
import { GradientMaterial } from "./GradientMaterial";

const MODEL_PATH = "/models/f-initial.glb";

const getGeometry = (node: Object3D) => {
  if (node instanceof Mesh) return node.geometry;
  throw new Error(`Expected Mesh, got ${node.type}`);
};

export const Model = (props: ThreeElements["group"]) => {
  const { nodes } = useGLTF(MODEL_PATH);
  const groupRef = useRef<Group>(null);
  const boundsComputed = useRef(false);

  useFrame(() => {
    if (!boundsComputed.current && groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      if (box.max.y - box.min.y > 0.001) {
        groupRef.current.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof ShaderMaterial) {
            child.material.uniforms.uYMin.value = box.min.y;
            child.material.uniforms.uYMax.value = box.max.y;
          }
        });
        boundsComputed.current = true;
      }
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh geometry={getGeometry(nodes["F-initial-outline-bottom"])} scale={10}>
        <GradientMaterial />
      </mesh>
      <mesh geometry={getGeometry(nodes["F-initial-outline-top"])} scale={10}>
        <GradientMaterial />
      </mesh>
      <mesh
        geometry={getGeometry(nodes["F-initial-outline-top-front"])}
        position={[0, 0.05, 0]}
        scale={10}
      >
        <GradientMaterial isHighlight />
      </mesh>
      <mesh
        geometry={getGeometry(nodes["F-initial-outline-bottom-front"])}
        position={[0, 0.05, 0]}
        scale={10}
      >
        <GradientMaterial isHighlight />
      </mesh>
    </group>
  );
};

useGLTF.preload(MODEL_PATH);
