import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Hero3DObjectProps {
  objectType: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'octahedron' | 'sphere';
  objectColor: string;
  wireframeColor: string;
}

export const Hero3DObject: React.FC<Hero3DObjectProps> = ({ objectType, objectColor, wireframeColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer;

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.4 + time * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.4 + time * 0.15, 0.05);
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.05;
    }

    if (wireMeshRef.current) {
      wireMeshRef.current.rotation.z = -time * 0.08;
    }
  });

  const renderGeometry = () => {
    switch (objectType) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.8, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.7, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.9, 0]} />;
      case 'sphere':
        return <sphereGeometry args={[1.5, 32, 32]} />;
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Main Solid Mesh */}
      <mesh ref={meshRef}>
        {renderGeometry()}
        <meshPhysicalMaterial
          color={objectColor}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Overlay for Technical Edge */}
      <mesh ref={wireMeshRef}>
        {renderGeometry()}
        <meshBasicMaterial
          color={wireframeColor}
          wireframe={true}
          transparent={true}
          opacity={0.25}
        />
      </mesh>
    </group>
  );
};
