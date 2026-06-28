"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 300 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles
  const particlesPosition = useRef(new Float32Array(count * 3));
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      particlesPosition.current[i * 3] = (Math.random() - 0.5) * 40; // X
      particlesPosition.current[i * 3 + 1] = Math.random() * 20; // Y (keep them above the floor)
      particlesPosition.current[i * 3 + 2] = (Math.random() - 0.5) * 40; // Z
    }
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle floating animation
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const yIndex = i * 3 + 1;
        // Slowly float up, reset at top
        positions[yIndex] += Math.sin(time + i) * 0.005 + 0.005;
        if (positions[yIndex] > 20) {
          positions[yIndex] = 0;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FF88"
        size={0.08}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Smoothly interpolate camera position based on mouse coordinate
    const targetX = mouse.current.x * 2.5;
    const targetY = 4 + mouse.current.y * 1.5;
    const targetZ = 12 + mouse.current.x * 1.5;

    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.03;

    // Keep camera looking at the center target
    camera.lookAt(0, 1.5, 0);
  });

  return null;
}

export default function LabBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[#050507] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 4, 12], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050507"]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} />
        
        {/* Soft neon background lighting pointing at center */}
        <pointLight position={[0, 4, 0]} intensity={1.5} distance={15} color="#00FF88" />
        <pointLight position={[-5, 2, -5]} intensity={0.8} distance={10} color="#0088FF" />

        {/* 3D Floating Sparks */}
        <Particles count={250} />

        {/* Neon green grid floor */}
        <Grid
          position={[0, -0.01, 0]}
          args={[100, 100]}
          cellSize={1.5}
          cellThickness={1}
          cellColor="#00FF88"
          sectionSize={4.5}
          sectionThickness={1.5}
          sectionColor="#00FF88"
          fadeDistance={30}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Fog to soften background */}
        <fog attach="fog" args={["#050507", 10, 25]} />
        
        {/* Mouse camera control controller */}
        <SceneController />
      </Canvas>
    </div>
  );
}
