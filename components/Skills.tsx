"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { 
  Cpu, Terminal, Compass, Eye, Database, Box, 
  Activity, ShieldCheck
} from "lucide-react";

interface Capability {
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
  techs: string[];
  color: string;
  tailwindColor: string;
  telemetry: {
    label: string;
    value: string;
    status: string;
  };
}

const CAPABILITIES: Capability[] = [
  {
    title: "Autonomous Robotics",
    desc: "Configuring ROS 2 node communications, kinematic matrices, and sensor navigation loops.",
    icon: <Compass className="w-5 h-5" />,
    tag: "SYS_ROS2",
    techs: ["ROS 2", "C++", "Python", "Nav2", "Micro-ROS"],
    color: "#00FF88",
    tailwindColor: "text-[#00FF88]",
    telemetry: { label: "SYS_DELAY", value: "2.4 ms", status: "STABLE" }
  },
  {
    title: "Real-Time AI & CV",
    desc: "Fine-tuning YOLOv8 object detection nets and OpenCV overlays for crop anomaly detection.",
    icon: <Eye className="w-5 h-5" />,
    tag: "EDGE_VISION",
    techs: ["YOLOv8", "OpenCV", "PyTorch", "CUDA", "TensorRT"],
    color: "#22d3ee",
    tailwindColor: "text-cyan-400",
    telemetry: { label: "INFERENCE", value: "6.8 ms", status: "OPTIMIZED" }
  },
  {
    title: "Embedded Firmware",
    desc: "Writing low-latency C++ task routines, PWM drivers, and RTOS threads on ESP32 boards.",
    icon: <Cpu className="w-5 h-5" />,
    tag: "CORE_MCU",
    techs: ["ESP-IDF", "FreeRTOS", "C++", "PWM", "I2C/SPI"],
    color: "#fbbf24",
    tailwindColor: "text-amber-400",
    telemetry: { label: "CPU_FREQ", value: "240 MHz", status: "ONLINE" }
  },
  {
    title: "Systems Simulation",
    desc: "Replicating hardware sensors and field navigation paths in high-fidelity Webots worlds.",
    icon: <Terminal className="w-5 h-5" />,
    tag: "SIM_HIL",
    techs: ["Webots", "Gazebo", "Blender", "URDF", "CAD Modeling"],
    color: "#c084fc",
    tailwindColor: "text-purple-400",
    telemetry: { label: "SIM_RATE", value: "60 FPS", status: "ACTIVE" }
  },
  {
    title: "AI Data Pipelines",
    desc: "Developing pipelines for cleaning, augmenting, and preprocessing large-scale datasets for deep learning training.",
    icon: <Database className="w-5 h-5" />,
    tag: "ML_DATA",
    techs: ["Python", "Pandas", "NumPy", "Albumentations", "Docker"],
    color: "#f472b6",
    tailwindColor: "text-pink-400",
    telemetry: { label: "BANDWIDTH", value: "1.2 GB/s", status: "READY" }
  },
  {
    title: "3D Web Animations",
    desc: "Creating immersive WebGL interfaces and interactive 3D structures using Three.js, React Three Fiber, and GSAP.",
    icon: <Box className="w-5 h-5" />,
    tag: "GFX_3D",
    techs: ["Three.js", "React Three Fiber", "GSAP", "GLSL Shaders", "Tailwind"],
    color: "#818cf8",
    tailwindColor: "text-indigo-400",
    telemetry: { label: "MEM_USAGE", value: "12.8 MB", status: "OPTIMAL" }
  }
];

const NODES_POSITIONS: [number, number, number][] = [
  [0, 1.8, 0],         // Top Center
  [1.6, 0.9, 0],       // Top Right
  [1.6, -0.9, 0],      // Bottom Right
  [0, -1.8, 0],        // Bottom Center
  [-1.6, -0.9, 0],     // Bottom Left
  [-1.6, 0.9, 0]       // Top Left
];

interface NodeProps {
  index: number;
  data: Capability;
  position: [number, number, number];
  isActive: boolean;
  onHover: () => void;
}

function NodeMaterial({ color, isActive, hovered }: { color: string; isActive: boolean; hovered: boolean }) {
  return (
    <meshStandardMaterial
      color={isActive || hovered ? color : "#25252d"}
      roughness={0.2}
      metalness={0.8}
      emissive={color}
      emissiveIntensity={isActive || hovered ? 0.8 : 0.05}
      toneMapped={false}
      wireframe={!(isActive || hovered)}
    />
  );
}

function CapabilityNode({ index, data, position, isActive, onHover }: NodeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.35 + index * 0.5;
      meshRef.current.rotation.x = time * 0.2 + index * 0.3;
      
      const targetScale = isActive || hovered ? 1.25 : 0.85;
      meshRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onHover();
      }}
    >
      {/* 3D mesh rendering using ONLY standard guaranteed primitives */}
      {index === 0 && (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.24, 0.07, 8, 24]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}
      {index === 1 && (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}
      {index === 2 && (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}
      {index === 3 && (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[0.3, 0.5, 16]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}
      {index === 4 && (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.45, 16]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}
      {index === 5 && (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <NodeMaterial color={data.color} isActive={isActive} hovered={hovered} />
        </mesh>
      )}

      {/* Outer Wireframe Ring for active/hovered nodes */}
      {(isActive || hovered) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.01, 6, 24]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.3} />
        </mesh>
      )}

      {/* Node Text Label using safe HTML projection */}
      <Html
        position={[0, -0.62, 0]}
        center
        distanceFactor={5.5}
      >
        <div 
          className={`font-mono text-[8px] uppercase tracking-wider select-none px-2 py-0.5 rounded border whitespace-nowrap transition-all duration-300 ${
            isActive || hovered 
              ? "bg-[#050505]/95 text-[#00FF88] border-[#00FF88]/30 shadow-[0_0_12px_rgba(0,255,136,0.15)]" 
              : "bg-[#050505]/60 text-white/40 border-white/5"
          }`}
          style={isActive || hovered ? { color: data.color, borderColor: `${data.color}30` } : {}}
        >
          {data.tag}
        </div>
      </Html>
    </group>
  );
}

function ConnectorLine({ targetPos, activeColor }: { targetPos: [number, number, number]; activeColor: string }) {
  const lineRef = useRef<any>(null);

  useEffect(() => {
    if (lineRef.current) {
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2])
      ];
      lineRef.current.geometry.setFromPoints(points);
    }
  }, [targetPos]);

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color={activeColor}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

function CapabilityCore({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: (i: number) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Floating motion of the entire capabilities core
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.08;
      // Very slow rotation of the core
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 0]} rotation={[0.08, -0.1, 0]}>
      {/* Glowing Core center point */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={CAPABILITIES[activeIndex].color} toneMapped={false} />
      </mesh>
      <mesh scale={2.5}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={CAPABILITIES[activeIndex].color} transparent opacity={0.15} wireframe />
      </mesh>

      {/* Nodes connecting lines rendered using safe, declarative ConnectorLine */}
      {NODES_POSITIONS.map((pos, idx) => (
        <ConnectorLine
          key={idx}
          targetPos={pos}
          activeColor={CAPABILITIES[activeIndex].color}
        />
      ))}

      {/* Interactive Capabilities Nodes */}
      {CAPABILITIES.map((cap, idx) => (
        <CapabilityNode 
          key={idx}
          index={idx}
          data={cap}
          position={NODES_POSITIONS[idx]}
          isActive={activeIndex === idx}
          onHover={() => setActiveIndex(idx)}
        />
      ))}
    </group>
  );
}

function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inViewport;
}

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(containerRef);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <section id="skills" className="relative w-full py-36 bg-[#050505] border-t border-white/5">
        <div className="h-[400px]" />
      </section>
    );
  }

  return (
    <section id="skills" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 border-t border-white/5 font-sans">
      
      {/* Background Soft Glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[130px] pointer-events-none transition-colors duration-1000" 
        style={{ backgroundColor: `${CAPABILITIES[activeIndex].color}08` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [SYS_INTEGRATION]
          </span>
          <h2 className="text-sub-heading text-white">
            CORE CAPABILITIES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Capability Detail HUD Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Interactive Details Glass Panel */}
            <div className="glass-card-premium p-8 relative overflow-hidden min-h-[360px] flex flex-col justify-between">
              
              {/* Telemetry Scanning Line Effect */}
              <div 
                className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" 
                style={{ backgroundImage: `linear-gradient(90deg, transparent, ${CAPABILITIES[activeIndex].color}, transparent)` }}
              />

              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex justify-between items-center">
                  <div 
                    className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-500"
                    style={{ 
                      backgroundColor: `${CAPABILITIES[activeIndex].color}12`,
                      borderColor: `${CAPABILITIES[activeIndex].color}25`,
                      color: CAPABILITIES[activeIndex].color
                    }}
                  >
                    {CAPABILITIES[activeIndex].icon}
                  </div>
                  <span className="text-[9px] font-mono text-white/40 tracking-wider">
                    {CAPABILITIES[activeIndex].tag}
                  </span>
                </div>

                {/* Title and description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-orbitron text-white">
                    {CAPABILITIES[activeIndex].title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-poppins min-h-[50px]">
                    {CAPABILITIES[activeIndex].desc}
                  </p>
                </div>

                {/* Key Technologies */}
                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">[TECH_STACK]</span>
                  <div className="flex flex-wrap gap-2">
                    {CAPABILITIES[activeIndex].techs.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="text-[9px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Telemetry Box */}
              <div className="mt-8 border-t border-white/5 pt-4">
                <div className="grid grid-cols-3 gap-4 font-mono text-[9px] text-white/40">
                  <div>
                    <span className="block text-white/20 uppercase">METRIC_ID</span>
                    <span className="text-white font-bold">{CAPABILITIES[activeIndex].telemetry.label}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 uppercase">VALUE</span>
                    <span className="text-white font-bold">{CAPABILITIES[activeIndex].telemetry.value}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 uppercase">STATUS</span>
                    <span 
                      className="font-bold uppercase tracking-wider"
                      style={{ color: CAPABILITIES[activeIndex].color }}
                    >
                      {CAPABILITIES[activeIndex].telemetry.status}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick selectors mapping buttons to capabilities */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2">
              {CAPABILITIES.map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 font-mono text-[9px] uppercase tracking-wider cursor-pointer ${
                    activeIndex === idx 
                      ? "bg-white/5 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.03)]" 
                      : "bg-[#0b0b0e]/40 border-white/5 text-white/40 hover:text-white/70 hover:border-white/10"
                  }`}
                  style={{
                    borderLeft: activeIndex === idx ? `3px solid ${cap.color}` : ""
                  }}
                >
                  {cap.tag.replace("SYS_", "").replace("CORE_", "").replace("SIM_", "").replace("EDGE_", "").replace("ML_", "").replace("GFX_", "")}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: WebGL 3D Canvas / Mobile fallback */}
          <div className="lg:col-span-7 flex justify-center items-center">
            {isMobile ? (
              // Mobile / Tablet Tab Layout (Clean & Responsive)
              <div className="w-full bg-[#08080a] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-[10px] text-white/50 font-mono">
                  <Activity className="w-4 h-4 text-[#00FF88] animate-pulse" />
                  <span>[SYSTEM_NOTE]: WebGL disabled on mobile viewports for battery optimization.</span>
                </div>
                <div className="h-[180px] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden bg-black/40">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.02)_0%,transparent_75%)]" />
                  <div className="text-center space-y-2 z-10">
                    <span 
                      className="text-3xl font-orbitron font-extrabold uppercase animate-pulse block"
                      style={{ color: CAPABILITIES[activeIndex].color }}
                    >
                      {CAPABILITIES[activeIndex].tag}
                    </span>
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">[SYSTEMS_ONLINE]</span>
                  </div>
                </div>
              </div>
            ) : (
              // Heavy Interactive 3D WebGL Canvas for Desktops
              <div ref={containerRef} className="w-full h-[550px] cursor-grab active:cursor-grabbing relative select-none bg-black/10 border border-white/5 rounded-2xl overflow-hidden">
                
                {/* 3D Core telemetry guidelines overlay */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20 space-y-1 pointer-events-none z-20">
                  <div>GRID_SYSTEM: NEURAL_WEB_3D</div>
                  <div>RENDER_PROJECTION: WEBGL_CORE</div>
                  <div>LIGHT_MODELS: PBR_NEON</div>
                </div>
                
                <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#00FF88]/40 flex items-center gap-1.5 pointer-events-none z-20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CORE_MATRIX_ACTIVE</span>
                </div>

                <Canvas
                  camera={{ position: [0, 0, 4.8], fov: 55 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 1.5]}
                >
                  <ambientLight intensity={0.65} />
                  <directionalLight position={[2, 4, 3]} intensity={0.7} />
                  
                  {/* Neon node lighting mapping dynamic color */}
                  <pointLight position={[0, 0, 0.5]} intensity={1.5} color={CAPABILITIES[activeIndex].color} distance={6} />
                  <pointLight position={[-3, 2, -2]} intensity={0.5} color="#0088ff" distance={8} />

                  <CapabilityCore activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.2}
                    maxAzimuthAngle={Math.PI / 5}
                    minAzimuthAngle={-Math.PI / 5}
                  />
                </Canvas>
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/10 text-[8px] font-mono tracking-widest text-center pointer-events-none z-20">
                  [DRAG SCENE TO TILT • HOVER NODES TO SPEC]
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
