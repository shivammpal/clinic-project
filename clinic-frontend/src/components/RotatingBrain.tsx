import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function BrainModel(props: React.JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8e44ad" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

const RotatingBrain: React.FC = () => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <BrainModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default RotatingBrain;
