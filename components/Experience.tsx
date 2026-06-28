"use client";

import React, { useRef, useState } from "react";
import { Cpu, Brain, Route, Eye, LineChart } from "lucide-react";

interface ExpItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  points: string[];
}

const EXPERIENCES: ExpItem[] = [
  {
    title: "Embedded Systems",
    subtitle: "Low-level Actuators & Telemetry",
    icon: <Cpu className="w-6 h-6 text-amber-400" />,
    color: "rgba(251, 191, 36, 0.3)",
    points: [
      "Designed FreeRTOS motor control firmware on ESP32.",
      "Integrated I2C/SPI buses for LiDAR and ultrasonic sensors.",
      "Configured high-frequency encoders for hardware odometry."
    ]
  },
  {
    title: "AI Development",
    subtitle: "Deep Learning & Model Training",
    icon: <Brain className="w-6 h-6 text-[#00FF88]" />,
    color: "rgba(0, 255, 136, 0.3)",
    points: [
      "Annotated crop datasets consisting of 12,500+ samples.",
      "Trained YOLOv8 object detection models for plant disease.",
      "Optimized model inference on Raspberry Pi 5 edge compute."
    ]
  },
  {
    title: "Robotics Architecture",
    subtitle: "Navigation Stack & Kinematics",
    icon: <Route className="w-6 h-6 text-cyan-400" />,
    color: "rgba(34, 211, 238, 0.3)",
    points: [
      "Built ROS 2 node networks routing sensor feedback loops.",
      "Configured autonomous Nav2 packages with A* routing.",
      "Implemented RTAB-Map SLAM grids inside Webots worlds."
    ]
  },
  {
    title: "Computer Vision",
    subtitle: "Real-time Video Processing",
    icon: <Eye className="w-6 h-6 text-blue-400" />,
    color: "rgba(96, 165, 250, 0.3)",
    points: [
      "Wrote OpenCV visual filters (Otsu thresholding, Canny edges).",
      "Mapped plant anomaly pixels to target coordinates.",
      "Benchmarked vision pipelines securing 25+ FPS on Edge boards."
    ]
  },
  {
    title: "Machine Learning",
    subtitle: "Telemetry Analytics & Dose Tuning",
    icon: <LineChart className="w-6 h-6 text-purple-400" />,
    color: "rgba(192, 132, 252, 0.3)",
    points: [
      "Logged telemetry inputs (velocity, chemical level) via MQTT.",
      "Trained regression algorithms for spray duty-cycles.",
      "Generated spatial health distribution heatmaps using QGIS."
    ]
  }
];

function TiltCard({ item }: { item: ExpItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const xc = box.width / 2;
    const yc = box.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    setRotateX(-dy / yc * 8);
    setRotateY(dx / xc * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out, border-color 0.3s ease",
      }}
      className="glass-card-premium p-8 relative overflow-hidden flex flex-col gap-6 group border border-white/5 bg-[#0b0b0e]/75 cursor-default rounded-[28px]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.color} 0%, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
            {item.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold font-orbitron text-white">{item.title}</h3>
            <p className="text-[10px] font-mono text-white/40 mt-0.5">{item.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Minimal points */}
      <ul className="space-y-3 font-poppins flex-1">
        {item.points.map((pt, idx) => (
          <li key={idx} className="text-xs text-white/60 leading-relaxed flex gap-2">
            <span className="text-[#00FF88] font-bold mt-0.5 select-none">▪</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [AREAS_OF_EXPERTISE]
          </span>
          <h2 className="text-sub-heading text-white">
            TECHNICAL CAPABILITIES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <TiltCard key={idx} item={exp} />
          ))}
        </div>

      </div>

    </section>
  );
}
