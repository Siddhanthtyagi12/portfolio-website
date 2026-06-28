"use client";

import { motion } from "framer-motion";
import { Cpu, ArrowRight, Download, Mail, Activity, Eye, Zap, Network } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import AgroRobot from "./Three/AgroRobot";
import { Grid } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom controller inside the Hero canvas to bind mouse movement to camera
function HeroSceneController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const targetX = mouse.current.x * 2.0;
    const targetY = 2.4 + mouse.current.y * 1.0;
    const targetZ = 6.0 + mouse.current.x * 1.0;

    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.position.z += (targetZ - camera.position.z) * 0.035;

    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

function HeroParticles({ count = 80 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesPosition = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      particlesPosition.current[i * 3] = (Math.random() - 0.5) * 16;
      particlesPosition.current[i * 3 + 1] = Math.random() * 8 - 1;
      particlesPosition.current[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const yIdx = i * 3 + 1;
        positions[yIdx] += Math.sin(time * 0.5 + i) * 0.003 + 0.002;
        if (positions[yIdx] > 7) positions[yIdx] = -1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.015;
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
        size={0.06}
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden z-10 py-36 lg:py-48 bg-[#050505] bg-[linear-gradient(rgba(0,255,136,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.008)_1px,transparent_1px)] bg-[size:36px_36px] lg:bg-none">
      
      {/* 3D Canvas Background & Robot Rendering - Hidden on mobile for performance */}
      {mounted && (
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Canvas
            camera={{ position: [0, 2.5, 6], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <pointLight position={[0, 3, 0]} intensity={2.2} distance={12} color="#00FF88" />
            <pointLight position={[3, 1, -2]} intensity={1.0} distance={10} color="#0088FF" />

            <HeroParticles count={80} />

            <group position={[0, -0.6, 0]} scale={1.2}>
              <AgroRobot />
            </group>

            <Grid
              position={[0, -1.2, 0]}
              args={[50, 50]}
              cellSize={0.8}
              cellThickness={0.8}
              cellColor="#00FF88"
              sectionSize={4}
              sectionThickness={1.2}
              sectionColor="#00FF88"
              fadeDistance={18}
              fadeStrength={1}
              infiniteGrid
            />

            <fog attach="fog" args={["#050505", 5, 15]} />
            <HeroSceneController />
          </Canvas>
        </div>
      )}

      {/* Main UI Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[calc(100vh-10rem)]">
        
        {/* Left Side Content: Headings, CTA */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left pointer-events-auto mt-8 lg:mt-0 space-y-8">
          
          {/* Futuristic Status Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/15 bg-[#00FF88]/5 text-[#00FF88] text-[9px] uppercase tracking-widest font-mono w-fit"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Telemetry Uplink Active</span>
          </motion.div>

          {/* Luxury Large Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-huge-heading text-white tracking-tight"
            >
              Siddhanth Tyagi
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-sub-heading text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-emerald-400 text-glow-strong font-bold"
            >
              AI Robotics Engineer
            </motion.div>
          </div>

          {/* Single-sentence short subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-body-custom text-white/70 max-w-2xl leading-relaxed"
          >
            Building Intelligent Autonomous Agricultural Robots using AI, Computer Vision and Embedded Systems.
          </motion.p>

          {/* Large Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap gap-5 pt-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4.5 rounded-xl bg-[#00FF88] text-[#050505] font-bold text-sm hover:bg-[#00e577] transition-all hover:scale-105 flex items-center gap-2.5 hover:shadow-[0_0_25px_#00FF88] cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4.5 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 text-white font-bold text-sm hover:bg-[#00FF88]/10 hover:border-[#00FF88]/40 transition-all hover:scale-105 flex items-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-4.5 h-4.5 text-[#00FF88]" />
              <span>Contact Me</span>
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4.5 rounded-xl border border-white/10 bg-white/5 text-white/80 font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 flex items-center gap-2.5 cursor-pointer"
            >
              <Download className="w-4.5 h-4.5 text-white/55" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side Content: Clean, minimal HUD widgets (reconfigured for zero overlaps) */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center pointer-events-auto select-text lg:h-[600px] lg:pointer-events-none lg:select-none">
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 lg:block relative h-auto">
            
            {/* Top-left HUD card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative lg:absolute lg:top-8 lg:left-0 glass-panel p-4 rounded-xl border-l-2 border-l-[#00FF88] w-full lg:w-[260px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88]">
                  <Eye className="w-4.5 h-4.5" />
                </div>
                <div className="font-mono text-[10px]">
                  <div className="text-white/40">VISION_DAEMON</div>
                  <div className="font-bold text-white">YOLOv8 MODEL</div>
                </div>
              </div>
            </motion.div>

            {/* Top-right HUD card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative lg:absolute lg:top-20 lg:right-0 glass-panel p-4 rounded-xl border-l-2 border-l-cyan-400 w-full lg:w-[260px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <Network className="w-4.5 h-4.5" />
                </div>
                <div className="font-mono text-[10px]">
                  <div className="text-white/40">SYS_DAEMON</div>
                  <div className="font-bold text-white">ROS 2 HUMBLE</div>
                </div>
              </div>
            </motion.div>

            {/* Bottom-left HUD card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative lg:absolute lg:bottom-40 lg:left-0 glass-panel p-4 rounded-xl border-l-2 border-l-red-500 w-full lg:w-[260px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div className="font-mono text-[10px]">
                  <div className="text-white/40">COMPUTE_UNIT</div>
                  <div className="font-bold text-white">RASPBERRY PI 5</div>
                </div>
              </div>
            </motion.div>

            {/* Bottom-right HUD card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative lg:absolute lg:bottom-28 lg:right-0 glass-panel p-4 rounded-xl border-l-2 border-l-amber-400 w-full lg:w-[260px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-amber-400/10 flex items-center justify-center text-amber-400">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div className="font-mono text-[10px]">
                  <div className="text-white/40">ACTUATORS</div>
                  <div className="font-bold text-white">ESP32 + MQTT</div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
