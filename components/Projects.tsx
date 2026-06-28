"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eye, X, Play, Code2, Cpu, Layers } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  tags: string[];
  features: string[];
  oneSentence: string;
  desc: string;
  details: {
    hardware: string[];
    software: string[];
    metrics: string[];
    links: { github: string; demo: string };
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Powered Agro Robot",
    subtitle: "Autonomous Crop Spraying & Disease Detection",
    img: "/images/agro-robot.jpg",
    tags: ["ROS 2", "ESP32", "Raspberry Pi 5", "YOLOv8", "MQTT", "Webots"],
    oneSentence: "An autonomous agricultural robot using YOLOv8 crop vision and low-level ESP32 control systems to target plant diseases.",
    desc: "An intelligent, 4-wheeled agricultural robot that navigates fields autonomously to identify crops, spot plant diseases, map coordinates, and spray exact pesticide amounts.",
    features: [
      "Real-time Crop Disease Detection using YOLOv8",
      "Autonomous Navigation utilizing A* Path Planning",
      "Ultrasonic & LiDAR-based Obstacle Avoidance",
      "High-precision GPS Field Mapping & Telemetry",
      "Targeted Pesticide Spraying System via Relay-controlled Pump"
    ],
    details: {
      hardware: ["Raspberry Pi 5 Core", "ESP32 Dev Module", "ZED-F9P RTK GPS", "Hokuyo LiDAR"],
      software: ["ROS 2 Humble Network", "YOLOv8 Object Detection Model", "MQTT Telemetry Bridge", "Webots Simulator"],
      metrics: ["mAP@0.5: 92.4%", "Obstacle Stop Distance: 0.5m", "Telemetry Latency: 12ms", "Pesticide Savings: ~45%"],
      links: { github: "https://github.com/futuretiger/ai-agro-robot", demo: "https://youtu.be/demo-link" }
    }
  },
  {
    id: 2,
    title: "ROS 2 + Webots Simulation",
    subtitle: "Virtual Robotic Testing Environment",
    img: "/images/simulation.jpg",
    tags: ["ROS 2", "Webots", "SLAM", "Navigation", "LiDAR", "RViz2"],
    oneSentence: "A high-fidelity virtual world to benchmark SLAM, path planning, and navigation algorithms prior to hardware deployments.",
    desc: "A simulation environment used to benchmark and test navigation logic, sensor fusion algorithms, and obstacle avoidance scripts prior to physical hardware deployments.",
    features: [
      "Virtual testing environment replicating actual farm rows",
      "SLAM (Simultaneous Localization & Mapping) with RTAB-Map",
      "Obstacle avoidance & Path planning using RRT* and DWA",
      "Live sensor data visualization in RViz2 (LiDAR pointcloud, TF tree)"
    ],
    details: {
      hardware: ["Host PC (Intel i7, RTX 4060)", "LiDAR Sensor Emulation", "GPS Emulation", "Stereo Camera Emulation"],
      software: ["ROS 2 Humble Stack", "Webots R2024a Simulator", "Nav2 Navigation Stack", "RTAB-Map SLAM Toolbox"],
      metrics: ["Sim Rate: 60 FPS", "Localization Accuracy: <3cm", "Path Planning Success: 98.7%", "CPU Usage: ~45%"],
      links: { github: "https://github.com/futuretiger/ros2-webots-agro", demo: "https://youtu.be/sim-demo" }
    }
  },
  {
    id: 3,
    title: "Embedded Systems",
    subtitle: "Microcontroller Motor Control & Sensor Modules",
    img: "/images/embedded-projects.jpg",
    tags: ["ESP32", "Teensy 4.1", "UART HIL", "L298N", "I2C/SPI"],
    oneSentence: "Low-latency firmware architectures executing motor drivers, sensor adapters, and hardware-in-the-loop interfaces.",
    desc: "A collection of embedded systems designs focused on low-latency actuator drivers, telemetry collection, and hardware control loops using ESP32 and Teensy boards.",
    features: [
      "Bi-directional motor speed controller using PWM and H-Bridge",
      "High-speed PID motor position control via Teensy 4.1 encoder pins",
      "Multi-sensor reader module (Ultrasonic, DHT22, MPU6050) over I2C/SPI",
      "Dynamic hardware-in-the-loop (HIL) bridge between simulator and microcontrollers"
    ],
    details: {
      hardware: ["ESP32 DevKit V1", "Teensy 4.1 Core", "L298N Motor Driver", "MPU6050 IMU Sensor"],
      software: ["PlatformIO C++ Runtime", "ESP32 FreeRTOS Kernel Tasks", "Hardware Interrupts & DMA", "I2C / SPI Communication Stack"],
      metrics: ["PWM Frequency: 20kHz", "Interrupt Latency: <1.2μs", "HIL Update Rate: 100Hz", "MCU Core Utilization: 32%"],
      links: { github: "https://github.com/futuretiger/embedded-control", demo: "https://youtu.be/embedded-demo" }
    }
  },
  {
    id: 4,
    title: "Computer Vision",
    subtitle: "Plant Disease Classification with YOLOv8 & OpenCV",
    img: "/images/computer-vision.jpg",
    tags: ["YOLOv8", "OpenCV", "PyTorch", "Python", "Deep Learning"],
    oneSentence: "Real-time crop anomaly classification pipelines processing image datasets to display high-visibility diagnostic overlays.",
    desc: "An end-to-end computer vision program trained to detect and categorize crop diseases from camera inputs, overlaying high-visibility diagnostic bounding boxes.",
    features: [
      "Object detection model classifying 4 leaf conditions",
      "Real-time video inference at 25+ FPS on Raspberry Pi 5",
      "Dataset training pipeline using 12,500+ plant leaf samples",
      "Dynamic visual bounding boxes with color-coded classification titles"
    ],
    details: {
      hardware: ["Raspberry Pi 5 CPU/GPU", "Raspberry Pi Camera Module V2 (8MP)", "USB webcam interfaces"],
      software: ["Python 3.10 Runtime", "Ultralytics YOLOv8 library", "OpenCV 4.8 Image Processing", "PyTorch deep learning model"],
      metrics: ["Model Precision: 94.1%", "Model Recall: 92.3%", "Detection Speed: 38ms/frame", "mAP@0.5: 93.2%"],
      links: { github: "https://github.com/futuretiger/plant-disease-cv", demo: "https://youtu.be/cv-demo" }
    }
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLeafType, setActiveLeafType] = useState<"healthy" | "blight" | "rust" | "mildew">("healthy");

  const leaves = {
    healthy: {
      label: "Healthy Leaf",
      color: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
      box: { x: "25%", y: "20%", w: "50%", h: "60%" },
      conf: 98.4
    },
    blight: {
      label: "Leaf Blight",
      color: "border-red-500 text-red-400 bg-red-500/10",
      box: { x: "15%", y: "30%", w: "45%", h: "45%" },
      conf: 92.6
    },
    rust: {
      label: "Rust Disease",
      color: "border-amber-500 text-amber-400 bg-amber-500/10",
      box: { x: "35%", y: "15%", w: "50%", h: "65%" },
      conf: 89.1
    },
    mildew: {
      label: "Powdery Mildew",
      color: "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10",
      box: { x: "20%", y: "25%", w: "60%", h: "55%" },
      conf: 91.2
    }
  };

  return (
    <section id="projects" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [ENGINEERED_SOLUTIONS]
          </span>
          <h2 className="text-sub-heading text-white">
            FEATURED PROJECTS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Projects Column Layout - Enforcing whitespace and luxury breathing room */}
        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card-premium rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-10 items-stretch min-h-[380px] border border-white/5 cursor-default hover:border-[#00FF88]/20 transition-all duration-500 group"
            >
              {/* 1. Left 6 columns: 60% Image (Hero Render) */}
              <div className="lg:col-span-6 relative w-full min-h-[260px] lg:min-h-full overflow-hidden bg-charcoal-deep border-b lg:border-b-0 lg:border-r border-white/5">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-101 transition-transform duration-700"
                />
                
                {/* Tech overlays */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[8px] font-mono rounded-lg bg-black/85 border border-white/10 text-white/95">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Right 4 columns: 40% Text Details */}
              <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-between space-y-6">
                
                {/* Header Title */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-cyan-400">PROJECT_LOG_0{project.id}</span>
                    <span className="text-[9px] font-mono text-[#00FF88]">READY</span>
                  </div>
                  <h3 className="text-card-title text-white group-hover:text-[#00FF88] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Exactly One Sentence Description */}
                <p className="text-xs text-white/70 leading-relaxed font-poppins">
                  {project.oneSentence}
                </p>

                {/* Tech Badges (Exactly 4-6 badges) */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[9px] font-mono rounded bg-white/5 border border-white/5 text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Large Action Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#00FF88] hover:bg-[#00FF88]/5 hover:text-[#00FF88] font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#00FF88]" />
                  <span>VIEW SPECIFICATIONS</span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL SPEC OVERLAY - Clean HUD design with no walls of text */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#08080a] border border-white/10 rounded-[28px] overflow-y-auto z-10 shadow-2xl flex flex-col font-sans"
            >
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-[#00FF88] hover:text-[#050507] hover:border-transparent transition-all flex items-center justify-center cursor-pointer z-50 text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Banner */}
              <div className="relative w-full h-[180px] md:h-[260px] flex-shrink-0 bg-[#050505]">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-black/35" />
                
                <div className="absolute bottom-6 left-6 md:left-10 z-10 space-y-2">
                  <span className="text-[8px] font-mono text-[#00FF88] border border-[#00FF88]/30 rounded px-2 py-0.5 bg-black/60 backdrop-blur-sm">
                    SPECS_RECORD_0{selectedProject.id}
                  </span>
                  <h3 className="text-xl md:text-3xl font-extrabold font-orbitron text-white text-glow">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Specifications Contents (Whitespace focus, max 5 bullet items) */}
              <div className="p-6 md:p-10 space-y-8 flex-1">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* Left Column: Description & System features */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-[10px] font-mono text-[#00FF88] uppercase tracking-widest mb-2">[System Overview]</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-poppins">{selectedProject.desc}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono text-[#00FF88] uppercase tracking-widest mb-4">[Operational Features]</h4>
                      <ul className="space-y-3 font-poppins">
                        {selectedProject.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs text-white/60 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] flex-shrink-0 mt-0.5 text-[8px] font-bold">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive YOLOv8 Simulator Mock (Only in CV modal) */}
                    {selectedProject.id === 4 && (
                      <div className="border border-white/5 bg-black/45 rounded-2xl p-5 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h4 className="text-[9px] font-mono text-cyan-400 flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5 fill-cyan-400" />
                            <span>OBJECT DETECTOR CONSOLE</span>
                          </h4>
                          <span className="text-[8px] font-mono text-white/30">MODEL: disease.pt</span>
                        </div>
                        
                        <div className="relative w-full h-[180px] rounded-xl bg-[#09090c] overflow-hidden border border-white/5 flex items-center justify-center">
                          <div className="absolute inset-0 bg-[#07130f] flex items-center justify-center opacity-40">
                            <svg className="w-16 h-16 text-[#00FF88]/20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L8,18.69C9.37,18 12,17 15,18C18,19 22,17 22,13C22,9 18.5,8 17,8Z" />
                            </svg>
                          </div>
                          
                          <motion.div
                            key={activeLeafType}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`absolute border-2 rounded ${leaves[activeLeafType].color} flex flex-col p-1`}
                            style={{
                              left: leaves[activeLeafType].box.x,
                              top: leaves[activeLeafType].box.y,
                              width: leaves[activeLeafType].box.w,
                              height: leaves[activeLeafType].box.h
                            }}
                          >
                            <span className="text-[7px] font-mono font-bold bg-black/90 px-1 py-0.5 rounded w-fit -mt-5">
                              {leaves[activeLeafType].label}: {leaves[activeLeafType].conf}%
                            </span>
                          </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1 justify-center">
                          {(Object.keys(leaves) as Array<keyof typeof leaves>).map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setActiveLeafType(type);
                              }}
                              className={`px-3 py-1 rounded-lg text-[9px] font-mono border transition-all cursor-pointer ${
                                activeLeafType === type
                                  ? "bg-[#00FF88] text-[#050507] border-[#00FF88]"
                                  : "bg-white/5 text-white/60 border-white/5 hover:border-white/20"
                              }`}
                            >
                              {leaves[type].label.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right Column: Hardware & Software Stack Lists */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Metrics Box */}
                    <div className="glass-panel p-5 rounded-2xl border border-[#00FF88]/15 bg-[#00FF88]/3">
                      <h4 className="text-[9px] font-mono text-[#00FF88] uppercase tracking-widest mb-3">[System Metrics]</h4>
                      <div className="grid grid-cols-2 gap-3.5">
                        {selectedProject.details.metrics.map((metric, idx) => {
                          const [name, val] = metric.split(": ");
                          return (
                            <div key={idx} className="p-3 bg-black/30 border border-white/5 rounded-xl">
                              <div className="text-[8px] font-mono text-white/40">{name}</div>
                              <div className="text-[10px] font-bold text-white mt-1">{val}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tech lists */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 border border-white/5 bg-white/3 rounded-xl p-4">
                        <h4 className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>HARDWARE</span>
                        </h4>
                        <ul className="space-y-1 pt-1">
                          {selectedProject.details.hardware.slice(0, 4).map((hw, idx) => (
                            <li key={idx} className="text-[9px] font-mono text-white/65 truncate">
                              ▪ {hw}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 border border-white/5 bg-white/3 rounded-xl p-4">
                        <h4 className="text-[8px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" />
                          <span>SOFTWARE</span>
                        </h4>
                        <ul className="space-y-1 pt-1">
                          {selectedProject.details.software.slice(0, 4).map((sw, idx) => (
                            <li key={idx} className="text-[9px] font-mono text-white/65 truncate">
                              ▪ {sw}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-2">
                      <a
                        href={selectedProject.details.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-3.5 rounded-xl bg-white text-black font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:scale-105"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                      <a
                        href={selectedProject.details.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-all hover:scale-105"
                      >
                        <Play className="w-4 h-4 text-[#00FF88]" />
                        <span>Watch Demo</span>
                      </a>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
