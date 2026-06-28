"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, Terminal, CheckCircle2 } from "lucide-react";

interface SkillItem {
  name: string;
  pos: [number, number, number];
}

const SKILLS: SkillItem[] = [
  { name: "Python", pos: [-2.2, 1.3, 0] },
  { name: "C++", pos: [-0.75, 2.15, 0.2] },
  { name: "YOLOv8", pos: [0.75, 2.15, 0.2] },
  { name: "OpenCV", pos: [2.2, 1.3, 0] },
  
  { name: "ROS 2", pos: [-2.2, -0.4, 0] },
  { name: "ESP32", pos: [-0.75, 0.45, 0.4] },
  { name: "Raspberry Pi", pos: [0.75, 0.45, 0.4] },
  { name: "MQTT", pos: [2.2, -0.4, 0] },
  
  { name: "Linux", pos: [-2.2, -2.1, 0.1] },
  { name: "Git", pos: [-0.75, -1.25, 0.3] },
  { name: "Docker", pos: [0.75, -1.25, 0.3] },
  { name: "PyTorch", pos: [2.2, -2.1, 0.1] },
  
  { name: "TensorFlow", pos: [0, -2.95, 0.2] }
];

function HexagonCard({ name, position }: { name: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const offset = position[0] * 0.4 + position[1] * 0.2;
      
      meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.15;
      meshRef.current.position.z = position[2] + (hovered ? 0.6 : 0) + Math.cos(time * 0.8 + offset) * 0.05;
      meshRef.current.rotation.y = Math.sin(time * 0.2 + offset) * 0.05;
      
      if (hovered) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0.1, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.2, 0.1);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.72, 0.18, 6]} />
        <meshStandardMaterial
          color={hovered ? "#0c1f17" : "#0d0d11"}
          roughness={0.2}
          metalness={0.8}
          emissive="#00FF88"
          emissiveIntensity={hovered ? 0.35 : 0.05}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, Math.PI / 6]} position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.73, 0.73, 0.02, 6]} />
        <meshBasicMaterial
          color="#00FF88"
          wireframe={true}
          transparent={true}
          opacity={hovered ? 1.0 : 0.25}
        />
      </mesh>

      {hovered && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#00FF88" />
        </mesh>
      )}

      <Text
        position={[0, 0, 0.13]}
        fontSize={0.16}
        color={hovered ? "#00FF88" : "#ffffff"}
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mDoQDjQSkFtoMM3T6r8E797F1K.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor={hovered ? "rgba(0, 255, 136, 0.1)" : "rgba(0,0,0,0.5)"}
      >
        {name}
      </Text>
    </group>
  );
}

export default function HexagonSkills() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return <div className="h-[400px] w-full" />;

  // Lightweight HTML Layout for Mobile and Tablet Viewports
  if (isMobile) {
    return (
      <div className="w-full py-4 font-mono">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SKILLS.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-lg border border-white/5 bg-[#0b0b0e]/80 flex items-center justify-between hover:border-[#00FF88]/30 hover:shadow-[0_0_15px_rgba(0,255,136,0.1)] transition-all group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-6 h-6 rounded bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] flex-shrink-0 group-hover:bg-[#00FF88] group-hover:text-black transition-all">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-[#00FF88] transition-colors truncate">
                  {skill.name}
                </span>
              </div>
              <span className="text-[8px] text-white/20 select-none">NODE_0{idx+1}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 rounded bg-[#00FF88]/5 border border-[#00FF88]/10 flex items-center gap-3 text-[10px] text-white/60">
          <Terminal className="w-4 h-4 text-[#00FF88] flex-shrink-0" />
          <span>[SYSTEM_NOTE]: WebGL 3D projections are optimized out on mobile viewports to prevent memory overload.</span>
        </div>
      </div>
    );
  }

  // Heavy 3D WebGL projection for Desktop viewports
  return (
    <div className="w-full h-[500px] md:h-[650px] cursor-grab active:cursor-grabbing relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]} // Performance boost for high density screens
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <pointLight position={[0, 0, 2]} intensity={0.5} color="#00FF88" />

        <group position={[0, 0.4, 0]}>
          {SKILLS.map((skill, idx) => (
            <HexagonCard key={idx} name={skill.name} position={skill.pos} />
          ))}
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.2}
          maxAzimuthAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI / 6}
        />
      </Canvas>
      
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/20 text-[9px] font-mono tracking-widest text-center select-none pointer-events-none">
        [3D GRID ACTIVE: DRAG TO TILT SCENE]
      </div>
    </div>
  );
}
