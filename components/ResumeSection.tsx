"use client";

import { Download, FileText } from "lucide-react";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00FF88]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [CURRICULUM_VITAE]
          </span>
          <h2 className="text-sub-heading text-white">
            RESUME FILE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        <p className="text-body-custom text-white/50 max-w-xl mx-auto leading-relaxed">
          Access the complete technical resume detailing academic projects, research milestones, and code structures.
        </p>

        {/* Large Premium Button */}
        <div className="flex justify-center pt-4">
          <a
            href="/resume.pdf"
            download
            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00FF88]/30 hover:bg-[#00FF88]/5 text-white font-bold text-sm tracking-wider flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] cursor-pointer"
          >
            <FileText className="w-5 h-5 text-[#00FF88]" />
            <span>DOWNLOAD COMPLETE RESUME</span>
            <Download className="w-4 h-4 text-white/40 group-hover:text-[#00FF88]" />
          </a>
        </div>

      </div>

    </section>
  );
}
