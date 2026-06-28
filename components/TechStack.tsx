"use client";

import { CheckCircle2 } from "lucide-react";

const STACKS = [
  "Python", "C++", "YOLOv8", "OpenCV", "ROS 2", "ESP32",
  "Raspberry Pi", "MQTT", "Linux", "Git", "Docker", "TensorFlow", "PyTorch"
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [ENVIRONMENT_STACK]
          </span>
          <h2 className="text-sub-heading text-white">
            TECHNOLOGY STACK
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 font-mono">
          {STACKS.map((tech, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:border-[#00FF88]/20 hover:shadow-[0_0_20px_rgba(0,255,136,0.06)] transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-5 h-5 rounded bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88] group-hover:bg-[#00FF88] group-hover:text-black transition-colors duration-300 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300 truncate">
                  {tech}
                </span>
              </div>
              <span className="text-[8px] text-white/20 select-none">CODE_{idx+1}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
