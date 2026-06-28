"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  img: string;
  tech: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "AI-Powered Agro Robot Specs",
    category: "CAD & Architecture",
    img: "/images/agro-robot.jpg",
    tech: "YOLOv8 + ESP32 + ROS 2"
  },
  {
    id: 2,
    title: "ROS 2 & Webots Virtual World",
    category: "Simulation Environment",
    img: "/images/simulation.jpg",
    tech: "Nav2 + SLAM + Rviz 2"
  },
  {
    id: 3,
    title: "ESP32 & Teensy Controller Schematics",
    category: "Embedded Hardware",
    img: "/images/embedded-projects.jpg",
    tech: "FreeRTOS + HIL Bridge"
  },
  {
    id: 4,
    title: "YOLOv8 Plant Disease Inference",
    category: "Computer Vision",
    img: "/images/computer-vision.jpg",
    tech: "OpenCV + PyTorch Model"
  },
  {
    id: 5,
    title: "Siddhanth Tyagi - Lead Roboticist",
    category: "Systems Integration",
    img: "/images/profile.jpg",
    tech: "AI/ML Engineer Profile"
  }
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ cardWidth: 480, cardHeight: 320, translateRadius: 420 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setDimensions({ cardWidth: 200, cardHeight: 150, translateRadius: 150 });
      } else if (width < 1024) {
        // Tablet
        setDimensions({ cardWidth: 340, cardHeight: 240, translateRadius: 260 });
      } else {
        // Desktop
        setDimensions({ cardWidth: 480, cardHeight: 320, translateRadius: 420 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  };

  const angleStep = 360 / ITEMS.length;

  return (
    <section id="gallery" className="relative w-full py-28 bg-[#09090c]/40 border-y border-white/5 overflow-hidden z-10 font-sans">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [VISUAL_TELEMETRY_SHEET]
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron tracking-tight text-white">
            3D ARCHIVE GALLERY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center [perspective:1200px] overflow-hidden">
          
          {/* Carousel Cylinder Wrapper */}
          {mounted && (
            <div
              className="relative transition-transform duration-700 ease-out"
              style={{
                width: `${dimensions.cardWidth}px`,
                height: `${dimensions.cardHeight}px`,
                transformStyle: "preserve-3d",
                transform: `rotateY(${-activeIndex * angleStep}deg)`,
              }}
            >
              {ITEMS.map((item, idx) => {
                const rotateYAngle = idx * angleStep;
                const isSelected = activeIndex === idx;

                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? "border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.25)] opacity-100 scale-100"
                        : "border-white/10 opacity-20 scale-90 hover:opacity-50"
                    } bg-[#050507]`}
                    style={{
                      transform: `rotateY(${rotateYAngle}deg) translateZ(${dimensions.translateRadius}px)`,
                      backfaceVisibility: "visible",
                    }}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 200px, 480px"
                      />
                      
                      {/* Dark gradient base inside panel */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />

                      {/* Image details tag */}
                      <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/85 border border-white/5 rounded font-mono text-[8px] sm:text-[9px] text-white/60 space-y-0.5">
                        <div className="flex justify-between font-bold text-white text-[9px] sm:text-[10px]">
                          <span className="truncate">{item.title}</span>
                        </div>
                        <div className="flex justify-between text-white/40 text-[7px] sm:text-[8px]">
                          <span>SYS_CAT: {item.category}</span>
                          <span className="text-[#00FF88]">{item.tech}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Carousel Navigation Controller */}
        <div className="flex flex-col items-center gap-6 mt-10">
          
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#00FF88] hover:text-[#050507] hover:border-transparent transition-all flex items-center justify-center cursor-pointer text-white"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <div className="font-mono text-xs text-white/40 select-none">
              <span className="text-[#00FF88] font-bold">0{activeIndex + 1}</span> / 0{ITEMS.length}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#00FF88] hover:text-[#050507] hover:border-transparent transition-all flex items-center justify-center cursor-pointer text-white"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Staggered progress indicator dots */}
          <div className="flex gap-2">
            {ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? "w-8 bg-[#00FF88]" : "w-2 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
