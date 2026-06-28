"use client";

import { motion } from "framer-motion";
import { Cpu, Compass, Code2, Eye, Award } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const EVENTS: TimelineEvent[] = [
  {
    year: "2025",
    title: "Started Embedded Systems",
    desc: "Developed FreeRTOS tasks and low-level motor drivers on ESP32 microcontrollers.",
    icon: <Cpu className="w-4 h-4 text-amber-400" />
  },
  {
    year: "2026",
    title: "Built AI Agro Robot",
    desc: "Engineered a physical agricultural robot integrating low-level hardware control and sensors.",
    icon: <Compass className="w-4 h-4 text-[#00FF88]" />
  },
  {
    year: "2026",
    title: "ROS 2 Simulation",
    desc: "Benchmarked SLAM, Nav2 routing path plans, and LIDAR points in Webots world simulations.",
    icon: <Code2 className="w-4 h-4 text-cyan-400" />
  },
  {
    year: "2026",
    title: "Computer Vision",
    desc: "Fine-tuned YOLOv8 deep learning classifiers on crop leaf disease image datasets.",
    icon: <Eye className="w-4 h-4 text-blue-400" />
  },
  {
    year: "2026",
    title: "Machine Learning Integration",
    desc: "Developed regression algorithms to optimize chemical pesticide dosages from real-time crop telemetry.",
    icon: <Award className="w-4 h-4 text-purple-400" />
  },
  {
    year: "2026",
    title: "Portfolio Launch",
    desc: "Launched this premium 3D operating system showcase to present credentials.",
    icon: <Award className="w-4 h-4 text-pink-400" />
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative w-full py-36 lg:py-48 bg-[#09090c]/20 border-y border-white/5 overflow-hidden z-10 font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF88]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [MILESTONES_ROADMAP]
          </span>
          <h2 className="text-sub-heading text-white">
            PROJECT TIMELINE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Timeline Path */}
        <div className="relative w-full">
          
          {/* Vertical Center Track (Glow line) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF88] via-cyan-400 to-transparent -translate-x-1/2 shadow-[0_0_8px_rgba(0,255,136,0.3)]" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative w-full items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Central Node Circle */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050507] border border-white/15 flex items-center justify-center -translate-x-1/2 z-20 group hover:border-[#00FF88] transition-colors shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                    <div className="w-4 h-4 rounded-full bg-[#00FF88]/10 border border-[#00FF88] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    </div>
                  </div>

                  {/* Year Tag floating nearby */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 flex justify-start md:justify-end md:group-odd:justify-start">
                    <span className="font-orbitron font-extrabold text-2xl md:text-3xl text-glow text-[#00FF88] md:bg-transparent px-3 py-1 md:p-0 rounded-xl border border-[#00FF88]/20 md:border-transparent bg-[#00FF88]/5">
                      {event.year}
                    </span>
                  </div>

                  {/* Content Glass Card with rounded-[24px] */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 mt-4 md:mt-0">
                    <motion.div
                      whileHover={{ x: isEven ? -5 : 5 }}
                      className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden"
                    >
                      {/* Top Corner Icon */}
                      <div className="absolute top-4 right-4 w-7 h-7 rounded bg-white/5 flex items-center justify-center">
                        {event.icon}
                      </div>

                      <h3 className="text-md font-bold font-orbitron text-white text-left pr-8">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs text-white/50 leading-relaxed font-poppins mt-3 text-left">
                        {event.desc}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
