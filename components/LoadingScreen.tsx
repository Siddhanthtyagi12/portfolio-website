"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, CheckCircle } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Initializing Siddhanth Tyagi Portfolio System...",
  "Loading kernel v2.0.26-Robotics...",
  "Searching for connected devices...",
  "Found Raspberry Pi 5 (8GB) at /dev/ttyAMA0",
  "Found ESP32 DevKitV1 connected via UART HIL",
  "Connecting to ROS 2 Humble master...",
  "Spawning ROS2 Nodes: /disease_detector, /path_planner, /motor_controller",
  "Initializing Webots Sim World: agribot_field.wbt",
  "Loading YOLOv8 weights (disease_detection_n.pt)...",
  "YOLOv8 model loaded. Precision: 94.1%, Recall: 92.3%, mAP@0.5: 93.2%",
  "Starting MQTT telemetry bridge (broker.emqx.io)...",
  "Syncing GPS coordinate mapper (ZED-F9P RTK GPS)...",
  "Initializing LiDAR scans (Hokuyo LaserScanner 270°)...",
  "System diagnostics check: 100% OK",
  "PORTFOLIO SYSTEM INITIALIZATION COMPLETE. READY TO LAUNCH."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [stage, setStage] = useState("booting");

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 4) + 1;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length && progress < 100) {
      // Show logs progressively synced with progress
      const targetProgress = (logIndex / BOOT_LOGS.length) * 100;
      if (progress >= targetProgress) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        setLogIndex(logIndex + 1);
      }
    } else if (progress === 100 && logIndex < BOOT_LOGS.length) {
      // Add the final success logs quickly
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        setLogIndex(logIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [progress, logIndex]);

  useEffect(() => {
    if (progress === 100 && logIndex === BOOT_LOGS.length) {
      setStage("ready");
      const timeout = setTimeout(() => {
        onComplete();
      }, 1500); // Wait to show "system ready"
      return () => clearTimeout(timeout);
    }
  }, [progress, logIndex, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050507] z-[9999] flex flex-col justify-between p-6 md:p-12 overflow-hidden font-mono text-xs text-white">
      {/* Background neon grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 z-10">
        <div className="flex items-center gap-2 text-[#00FF88] text-sm font-semibold tracking-wider font-orbitron">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span>SIDDHANTH_ROBOTICS_OS v2.0.26</span>
        </div>
        <div className="text-white/40 text-[10px]">
          SYS_STATUS:{" "}
          <span className={stage === "ready" ? "text-[#00FF88]" : "text-amber-400 animate-pulse"}>
            {stage === "ready" ? "SYSTEM_ACTIVE" : "CALIBRATING_SENSORS"}
          </span>
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full z-10 py-8 overflow-hidden">
        
        {/* Holographic Ring Loader */}
        <div className="relative flex flex-col items-center justify-center flex-shrink-0 w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Outer track */}
            <circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-white/5 fill-none"
              strokeWidth="1.5"
            />
            {/* Inner track */}
            <circle
              cx="60"
              cy="60"
              r="48"
              className="stroke-white/5 fill-none"
              strokeWidth="0.5"
            />
            {/* Loading progress arc */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-[#00FF88] fill-none"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
              strokeLinecap="round"
              animate={{
                filter: `drop-shadow(0 0 8px rgba(0, 255, 136, 0.6))`
              }}
            />
            {/* Radar Sweep Ring */}
            {stage !== "ready" && (
              <circle
                cx="60"
                cy="60"
                r="44"
                className="stroke-[#00FF88]/20 fill-none radar-pulse-ring"
                strokeWidth="1"
              />
            )}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {stage === "ready" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center text-[#00FF88]"
              >
                <CheckCircle className="w-12 h-12 mb-2 filter drop-shadow-[0_0_8px_#00FF88]" />
                <span className="font-orbitron font-bold text-sm tracking-widest text-glow">BOOT_OK</span>
              </motion.div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold font-orbitron text-[#00FF88] mb-1 tracking-tighter text-glow-strong">
                  {progress}%
                </div>
                <div className="text-[10px] text-white/40 font-mono tracking-widest">
                  SYS_LOAD
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Console logs */}
        <div className="flex-1 w-full max-h-[300px] lg:max-h-[400px] bg-black/40 border border-white/5 rounded-lg p-5 font-mono text-[10px] md:text-xs overflow-y-auto leading-relaxed scrollbar-thin text-white/70">
          <div className="flex items-center gap-2 text-white/40 border-b border-white/5 pb-2 mb-3">
            <Terminal className="w-4 h-4 text-[#00FF88]" />
            <span>DIAGNOSTICS_CONSOLE</span>
          </div>
          
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#00FF88]">[$]</span>
                <span className={idx === logs.length - 1 ? "text-white font-semibold" : "text-white/60"}>
                  {log}
                </span>
              </div>
            ))}
            
            {stage !== "ready" && (
              <div className="flex items-center gap-1 mt-1 text-[#00FF88]">
                <span>[$]</span>
                <span className="w-2 h-4 bg-[#00FF88] animate-pulse inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-4 text-[10px] text-white/30 gap-2 z-10">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>SECURITY PROTOCOL: SHIELD-ACTIVE</span>
        </div>
        <div>
          <span>LOC: d:\agribot_project &gt; boot --verbose</span>
        </div>
        <div>
          <span>ENGINEER: SIDDHANTH TYAGI</span>
        </div>
      </div>
    </div>
  );
}
