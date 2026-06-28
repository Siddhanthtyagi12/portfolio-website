"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import TechStack from "@/components/TechStack";
import Certificates from "@/components/Certificates";
import ResumeSection from "@/components/ResumeSection";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import { Cpu, Menu, X, ShieldCheck } from "lucide-react";

// Disable Server-Side Rendering (SSR) for Three.js components to prevent build crashes
const HexagonSkills = dynamic(() => import("@/components/Three/HexagonSkills"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll to update active section in header HUD
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "skills",
        "skills-matrix",
        "projects",
        "timeline",
        "tech-stack",
        "certificates",
        "resume",
        "contact"
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen flex flex-col bg-[#050505]"
        >
          {/* FLOATING HEADER NAVBAR */}
          <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/75 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center select-none font-mono">
            {/* Logo */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 cursor-pointer text-[#00FF88] font-orbitron font-extrabold text-sm md:text-md tracking-widest text-glow"
            >
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>SIDDHANTH_</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 text-[9px] uppercase tracking-wider text-white/50">
              {[
                { name: "About", id: "about" },
                { name: "Skills", id: "skills" },
                { name: "3D Matrix", id: "skills-matrix" },
                { name: "Projects", id: "projects" },
                { name: "Timeline", id: "timeline" },
                { name: "Tech Stack", id: "tech-stack" },
                { name: "Certificates", id: "certificates" },
                { name: "Resume", id: "resume" },
                { name: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`hover:text-white cursor-pointer transition-colors relative py-1 ${
                    activeSection === link.id ? "text-[#00FF88]" : ""
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#00FF88]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Status */}
            <div className="hidden lg:flex items-center gap-3 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                <span className="text-white/80">SYS_RUNNING</span>
              </span>
              <span>|</span>
              <span>MODE: DEPLOYED</span>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden text-white hover:text-[#00FF88] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full left-0 w-full bg-[#050505]/95 border-b border-white/5 py-6 px-8 flex flex-col gap-4 text-xs font-semibold uppercase tracking-wider text-white/60"
                >
                  {[
                    { name: "About", id: "about" },
                    { name: "Skills", id: "skills" },
                    { name: "3D Matrix", id: "skills-matrix" },
                    { name: "Projects", id: "projects" },
                    { name: "Timeline", id: "timeline" },
                    { name: "Tech Stack", id: "tech-stack" },
                    { name: "Certificates", id: "certificates" },
                    { name: "Resume", id: "resume" },
                    { name: "Contact", id: "contact" }
                  ].map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-left py-2 hover:text-[#00FF88] transition-colors cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* MAIN PAGE SECTIONS */}
          <main className="flex-1">
            {/* 1. HERO LANDING SECTION */}
            <Hero />

            {/* 2. ABOUT ME SECTION */}
            <About />

            {/* 3. CORE SKILLS GRID */}
            <Skills />

            {/* 4. 3D SKILL MATRIX */}
            <section id="skills-matrix" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Title */}
                <div className="flex flex-col items-center mb-16 text-center">
                  <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
                    [COGNITIVE_GRID_3D]
                  </span>
                  <h2 className="text-sub-heading text-white">
                    3D SKILL MATRIX
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Info */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                      <h3 className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">
                        Interactive Matrix
                      </h3>
                      <p className="text-xs text-white/50 leading-relaxed font-poppins">
                        This 3D matrix maps core toolchains. Drag with mouse to rotate coordinates. Hover or tap cards to highlight node telemetry and unlock detailed definitions.
                      </p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3 font-mono text-[9px] text-white/40">
                      <span className="text-amber-400 uppercase tracking-widest block border-b border-white/5 pb-2">
                        [GRID_TELEMETRY]
                      </span>
                      <div className="flex justify-between">
                        <span>NODES_LOADED:</span>
                        <span className="text-white">13 / 13</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GRID_ANGLE:</span>
                        <span className="text-white">DYNAMIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PROJECTION:</span>
                        <span className="text-white">ORTHOGRAPHIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>INTERACTIVE:</span>
                        <span className="text-[#00FF88]">TRUE</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Three.js Canvas */}
                  <div className="lg:col-span-8">
                    <HexagonSkills />
                  </div>
                </div>
              </div>
            </section>

            {/* 5. FEATURED PROJECTS */}
            <Projects />

            {/* 6. PROJECT TIMELINE */}
            <Timeline />

            {/* 7. TECH STACK */}
            <TechStack />

            {/* 8. CERTIFICATES */}
            <Certificates />

            {/* 9. RESUME DOWNLOAD */}
            <ResumeSection />

            {/* 10. CONTACT ME */}
            <Contact />
          </main>

          {/* SYSTEM FOOTER */}
          <footer className="w-full bg-[#050505] border-t border-white/5 py-12 px-6 md:px-12 font-mono text-[10px] text-white/40 select-none">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
                <span>ALL SYSTEMS STABLE | SECURED ACCESS 2026</span>
              </div>

              <div className="text-center font-sans text-xs text-white/60">
                Made with passion by{" "}
                <span className="text-[#00FF88] font-orbitron font-bold text-glow">Future Tiger</span>
              </div>

              <div className="flex gap-4">
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="hover:text-white transition-colors">
                  [ROOT]
                </a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} className="hover:text-white transition-colors">
                  [REPOS]
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-white transition-colors">
                  [LINK]
                </a>
              </div>

            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
