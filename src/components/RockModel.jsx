import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import rockModel from '../assets/rock/xjijbgx_tier_3.gltf?url';
import sketchTexture from '../assets/rock/Textures/T_xjijbgx_1K_A.png';

// 3D Rock 모델 내부 컴포넌트
function RockMesh({ activeIndex, prevIndex }) {
  const { scene } = useGLTF(rockModel);
  const meshRef = useRef();
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  // 인덱스 변경 시 회전 방향 결정
  useEffect(() => {
    if (prevIndex !== activeIndex) {
      const direction = activeIndex > prevIndex ? -1 : 1;
      targetRotation.current += Math.PI * 2 * direction;
    }
  }, [activeIndex, prevIndex]);

  // 스케치 텍스처 적용
  const sketchScene = useMemo(() => {
    const clonedScene = scene.clone();
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(sketchTexture);
    map.colorSpace = THREE.SRGBColorSpace;
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        const material = new THREE.MeshBasicMaterial({
          map: map,
        });
        child.material = material;
      }
    });
    
    return clonedScene;
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;
      meshRef.current.rotation.y = currentRotation.current;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={sketchScene} 
      scale={1.2}
      position={[0, -1, 0]}
    />
  );
}

// 외부에서 사용하는 Rock Canvas 컴포넌트
const RockCanvas = ({ activeIndex, prevIndex, className, style }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: 'transparent', ...style }}
      className={className}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 3, -3]} intensity={0.6} />
      <Suspense fallback={null}>
        <RockMesh activeIndex={activeIndex} prevIndex={prevIndex} />
      </Suspense>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default RockCanvas;

