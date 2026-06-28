"use client";

import Image from "next/image";
import { GraduationCap, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative w-full py-36 lg:py-48 bg-[#09090c]/20 border-y border-white/5 overflow-hidden z-10">
      
      {/* Background soft lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [IDENTIFICATION_LOGS]
          </span>
          <h2 className="text-sub-heading text-white">
            ABOUT THE ENGINEER
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Tech corner brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#00FF88]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#00FF88]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#00FF88]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#00FF88]" />
              
              <div className="absolute inset-0 bg-[#00FF88]/10 rounded-lg filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Portrait Box with rounded corners (28px) */}
              <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-[28px] overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src="/images/profile.jpg"
                  alt="Siddhanth Tyagi"
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
                
                {/* HUD Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/85 backdrop-blur-sm border border-white/5 rounded-xl font-mono text-[9px] text-white/50 space-y-0.5 select-none">
                  <div className="flex justify-between">
                    <span>NAME:</span>
                    <span className="text-[#00FF88] font-bold">SIDDHANTH TYAGI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ACADEMICS:</span>
                    <span className="text-white">B.TECH AI/ML (2ND YEAR)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SYS_STATUS:</span>
                    <span className="text-cyan-400">ACTIVE_RUNNING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <h3 className="text-sub-heading text-white">
              Hi, I am <span className="text-[#00FF88]">Siddhanth Tyagi</span>.
            </h3>
            
            <p className="text-body-custom text-white/60">
              I am a B.Tech 2nd Year student specializing in Artificial Intelligence and Machine Learning. I have a deep passion for building autonomous agricultural robots that combine computer vision, ROS 2, and embedded microcontrollers.
            </p>
            
            <p className="text-body-custom text-white/60">
              My engineering stack bridges high-level deep learning models with low-level actuator control loops to solve real-world farming challenges.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-white/50 bg-white/5 border border-white/5 rounded-xl p-5 w-fit">
              <GraduationCap className="w-5 h-5 text-[#00FF88] flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Focus:</span> Engineering next-generation autonomous crop navigation and targeted weeding systems.
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
