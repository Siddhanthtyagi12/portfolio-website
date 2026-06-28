"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simulated LiDAR Point-Cloud particles
function LidarPointCloud({ count = 120 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useRef(new Float32Array(count * 3));
  const speeds = useRef(new Float32Array(count));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      // Position particles in a ring around the robot, simulating a scanning pattern
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 1.8 + Math.random() * 0.8;
      
      positions.current[i * 3] = Math.sin(angle) * radius;
      positions.current[i * 3 + 1] = -0.4 + (Math.random() - 0.5) * 0.3; // Close to ground
      positions.current[i * 3 + 2] = Math.cos(angle) * radius;
      
      speeds.current[i] = 0.5 + Math.random() * 0.5;
    }
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        // Particles move outwards slowly and reset
        const idx = i * 3;
        const x = posAttr[idx];
        const z = posAttr[idx + 2];
        const angle = Math.atan2(x, z);
        let dist = Math.sqrt(x * x + z * z);

        dist += speeds.current[i] * delta * 1.5;
        if (dist > 3.0) {
          dist = 1.5; // Reset closer to robot
        }

        // Float up and down
        posAttr[idx] = Math.sin(angle) * dist;
        posAttr[idx + 1] = -0.4 + Math.sin(time * 2 + i) * 0.08;
        posAttr[idx + 2] = Math.cos(angle) * dist;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FF88"
        size={0.04}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Simulated Sprayer particles
function SprayerParticles({ position }: { position: [number, number, number] }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 20;
  const positions = useRef(new Float32Array(particleCount * 3));
  const velocities = useRef(new Float32Array(particleCount * 3));

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = position[0] + (Math.random() - 0.5) * 0.05;
      positions.current[i * 3 + 1] = position[1];
      positions.current[i * 3 + 2] = position[2] + (Math.random() - 0.5) * 0.05;

      velocities.current[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities.current[i * 3 + 1] = -0.3 - Math.random() * 0.3;
      velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
  }, [position]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        posAttr[i * 3] += velocities.current[i * 3] * delta;
        posAttr[i * 3 + 1] += velocities.current[i * 3 + 1] * delta;
        posAttr[i * 3 + 2] += velocities.current[i * 3 + 2] * delta;

        if (posAttr[i * 3 + 1] < -0.8) {
          posAttr[i * 3] = position[0] + (Math.random() - 0.5) * 0.05;
          posAttr[i * 3 + 1] = position[1];
          posAttr[i * 3 + 2] = position[2] + (Math.random() - 0.5) * 0.05;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00D2FF"
        size={0.02}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AgroRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const lidarRef = useRef<THREE.Mesh>(null);
  const scanConeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Rotating entire hologram model
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.08;
    }

    if (lidarRef.current) {
      // Spinning LiDAR scanning dome
      lidarRef.current.rotation.y += delta * 5;
    }

    if (scanConeRef.current) {
      // Dynamic scanning sweep angle
      scanConeRef.current.rotation.z = Math.sin(time * 2.5) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 1. CHASSIS CAD WIREFRAME */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.35, 1.4]} />
        <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.35} />
      </mesh>
      {/* Solid inner structural core */}
      <mesh>
        <boxGeometry args={[2.0, 0.25, 1.2]} />
        <meshBasicMaterial color="#0c1f17" transparent={true} opacity={0.4} />
      </mesh>

      {/* 2. WHEEL NODES AND STEERING SUSPENSION */}
      {[
        [-0.8, -0.2, 0.8],  // Front Left
        [0.8, -0.2, 0.8],   // Back Left
        [-0.8, -0.2, -0.8], // Front Right
        [0.8, -0.2, -0.8]   // Back Right
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          
          {/* Wheel wireframe cylinder */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.3, 12, 2]} />
            <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.45} />
          </mesh>
          
          {/* Wheel inner core */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.28, 6]} />
            <meshBasicMaterial color="#00D2FF" transparent={true} opacity={0.15} />
          </mesh>

          {/* suspension struts */}
          <mesh position={[0, 0.3, -pos[2] * 0.15]} rotation={[0, 0, pos[0] > 0 ? -Math.PI / 8 : Math.PI / 8]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 6]} />
            <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.4} />
          </mesh>
          
        </group>
      ))}

      {/* 3. ELECTRONICS UNIT DOME */}
      <group position={[0, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.4, 0.9]} />
          <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.35, 0.35, 0.85]} />
          <meshBasicMaterial color="#000" transparent={true} opacity={0.7} />
        </mesh>
      </group>

      {/* 4. SPINNING LIDAR MASTE */}
      <group position={[0.4, 0.7, 0]}>
        {/* Support mast */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
          <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.4} />
        </mesh>
        
        {/* Rotating LiDAR base */}
        <mesh position={[0, 0.25, 0]} ref={lidarRef}>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 8]} />
          <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.6} />
        </mesh>
      </group>

      {/* 5. CAMERA POD WITH CONICAL SCAN LIGHT (Field of view) */}
      <group position={[-0.85, 0.35, 0]}>
        {/* Cam mount */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.1, 0.25]} />
          <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.4} />
        </mesh>
        {/* Cam pod */}
        <mesh position={[-0.1, 0.05, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.5]} />
          <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>

        {/* Dynamic Holographic Vision cone (PBR-like glow) */}
        <mesh
          position={[-0.9, 0.05, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          ref={scanConeRef}
        >
          <coneGeometry args={[0.6, 1.6, 16, 1, true]} />
          <meshBasicMaterial
            color="#00FF88"
            transparent={true}
            opacity={0.12}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 6. PESTICIDE FLUID TANK (Frosted wireframe core) */}
      <group position={[-0.3, 0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.5, 10]} />
          <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.3} />
        </mesh>
        {/* Liquid level */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.3, 8]} />
          <meshBasicMaterial color="#00FF88" transparent={true} opacity={0.25} />
        </mesh>
      </group>

      {/* 7. SPRAYER NOZZLES ARMS */}
      <group position={[0.1, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 0.08, 1.8]} />
          <meshBasicMaterial color="#00FF88" wireframe={true} transparent={true} opacity={0.3} />
        </mesh>
        {/* Extend pipes */}
        {[-1, 1].map((side) => (
          <group key={side} position={[0, 0, side * 0.9]}>
            <mesh position={[0, 0, side * 0.6]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
              <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.35} />
            </mesh>
            {/* Spray emitter */}
            <SprayerParticles position={[0, -0.05, side * 1.0]} />
          </group>
        ))}
      </group>

      {/* 8. GPS DISC */}
      <group position={[0.7, 0.7, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 0.6, 6]} />
          <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.35} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 10]} />
          <meshBasicMaterial color="#00D2FF" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>
      </group>

      {/* Render point cloud scans surrounding the rover */}
      <LidarPointCloud count={120} />

    </group>
  );
}
