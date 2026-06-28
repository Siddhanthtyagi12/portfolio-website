"use client";

import { Award, ShieldCheck, Trophy, Sparkles, Binary } from "lucide-react";

interface CertificateItem {
  title: string;
  category: string;
  desc: string;
  icon: React.ReactNode;
}

const ITEMS: CertificateItem[] = [
  {
    title: "Deep Learning & Computer Vision Certification",
    category: "AI Projects",
    desc: "Trained convolutional networks and object classifiers (YOLOv8, CNNs) for edge computer vision pipelines.",
    icon: <Award className="w-5 h-5 text-[#00FF88]" />
  },
  {
    title: "National Robotics Hackathon Winner",
    category: "Hackathons",
    desc: "First place for developing an ESP32 UART HIL bridge interface connecting real-world sensors to Webots worlds.",
    icon: <Trophy className="w-5 h-5 text-amber-400" />
  },
  {
    title: "ROS 2 Autonomous Systems Framework",
    category: "Robotics",
    desc: "Configured kinematics matrices, odometry bridges, Nav2 stacks, and SLAM maps inside Humble nodes.",
    icon: <Binary className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "AI-based Agri-Tech Research Paper",
    category: "Research",
    desc: "Published research detailing crop anomaly detection pipelines and targeted chemical spray regressions.",
    icon: <Sparkles className="w-5 h-5 text-purple-400" />
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-36 lg:py-48 bg-[#09090c]/20 border-t border-white/5 overflow-hidden z-10 font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-500/3 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [CREDENTIALS_LIST]
          </span>
          <h2 className="text-sub-heading text-white">
            ACHIEVEMENTS & CERTIFICATES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Spacious Showcase List */}
        <div className="space-y-6">
          {ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card-premium p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#00FF88] border border-[#00FF88]/20 rounded px-2 py-0.5 bg-[#00FF88]/5">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-orbitron text-white mt-2 group-hover:text-[#00FF88] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 font-poppins mt-1 max-w-2xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              
              <span className="text-[9px] font-mono text-white/30 self-end md:self-auto select-none">
                VERIFIED_RECORD: 0{idx+1}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
