import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Hero3DObject } from './Hero3DObject';
import { ParticleField } from './ParticleField';
import { ThemeConfig } from '../../types';

interface SceneCanvasProps {
  theme: ThemeConfig;
  objectType: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'octahedron' | 'sphere';
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ theme, objectType }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.7} color={theme.ambientColor} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color={theme.lightColor} />
        <pointLight position={[-5, -3, -2]} intensity={1.5} color={theme.accent} />

        {/* 3D Visual Centerpiece */}
        <group position={[1.8, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
          <Hero3DObject
            objectType={objectType}
            objectColor={theme.objectColor}
            wireframeColor={theme.wireframeColor}
          />
        </group>

        {/* Atmospheric particles */}
        <ParticleField color={theme.accent} count={180} />
      </Canvas>
    </div>
  );
};
