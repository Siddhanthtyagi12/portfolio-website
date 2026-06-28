"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Send, Terminal, Wifi, ShieldAlert, Cpu, Activity, RefreshCw } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const simulatedLogs = [
    "Establishing handshake with ssidport.server...",
    "Authorizing SSL security token...",
    "Converting payload to MQTT JSON packets...",
    "Sending topic: telemetry/inbound/contact...",
    "Data transmitted. HTTP 200 OK.",
    "Transmission secure. Connection Closed."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setLogs([]);

    // Sequentially output fake transmission logs to make it look futuristic
    simulatedLogs.forEach((log, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (idx === simulatedLogs.length - 1) {
          setTimeout(() => {
            setStatus("success");
          }, 800);
        }
      }, (idx + 1) * 400);
    });
  };

  return (
    <section id="contact" className="relative w-full py-36 lg:py-48 bg-[#050505] overflow-hidden z-10 font-sans">
      
      {/* Background neon sparks */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00FF88]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-[10px] font-mono text-[#00FF88] tracking-[0.2em] uppercase mb-2">
            [TRANSMIT_SIGNAL_UPLINK]
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron tracking-tight text-white">
            CONTACT CENTER
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mt-4" />
        </div>

        {/* Form and Hologram HUD Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Futuristic Hologram input Form */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-8 rounded-xl border border-white/5 bg-[#0b0b0e]/80">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
              <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#00FF88]" />
                <span>COMMS_SHELL_PROMPT</span>
              </span>
              <span className="flex items-center gap-1 text-[8px] font-mono text-cyan-400">
                <Wifi className="w-3 h-3 text-[#00FF88] animate-pulse" />
                <span>UPLINK: ENCRYPTED</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#00FF88] uppercase tracking-wider block">
                      Name / Sender ID
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ENTER SENDER NAME"
                      className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] font-mono uppercase transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#00FF88] uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ENTER EMAIL ADDRESS"
                      className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] font-mono uppercase transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#00FF88] uppercase tracking-wider block">
                      Payload / Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="DESCRIBE PROJECT INSTRUCTIONS..."
                      className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] font-mono uppercase transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-[#00FF88] text-[#050507] hover:bg-[#00e577] font-semibold text-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-2 hover:shadow-[0_0_15px_#00FF88] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT PAYLOAD SIGNAL</span>
                  </button>
                </motion.form>
              )}

              {status === "sending" && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-center py-10 font-mono text-xs text-white/70 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-[#00FF88] font-bold text-sm mb-4">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>UPLINK IN PROGRESS...</span>
                  </div>
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-[#00FF88]">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2 text-[#00FF88]">
                    <span>&gt;</span>
                    <span className="w-2 h-4 bg-[#00FF88] animate-pulse inline-block" />
                  </div>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88] text-[#00FF88] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                    <Send className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold font-orbitron text-white">TRANSMISSION SECURE</h4>
                  <p className="text-xs text-white/50 font-poppins max-w-sm mt-3 leading-relaxed">
                    Your message packet has successfully uploaded to Siddhanth Tyagi&apos;s receiving console. The engineer will review the signal telemetry soon.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-8 px-5 py-2.5 rounded border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] hover:bg-[#00FF88]/10 text-xs font-mono tracking-wider transition-all cursor-pointer"
                  >
                    RESET PROMPT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Hologram Signal Diagnostics HUD */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Direct Channels Panel */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col gap-5 flex-1 justify-center">
              <div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                  [DIRECT_CHANNELS]
                </span>
                <h3 className="text-xl font-bold font-orbitron text-white">SYSTEM NODE PATHS</h3>
                <p className="text-xs text-white/50 leading-relaxed font-poppins mt-2">
                  Ping directly through direct pipelines if you prefer to bypass secure prompt logs.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:ssid20747@gmail.com"
                  className="flex items-center gap-4 p-4 rounded bg-white/5 border border-white/5 hover:border-[#00FF88]/20 hover:bg-[#00FF88]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-xs">
                    <div className="text-white/40 font-sans">EMAIL ADDR</div>
                    <div className="font-bold text-white group-hover:text-[#00FF88] transition-colors">
                      ssid20747@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/siddhanth-tyagi-47b09b382"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded bg-white/5 border border-white/5 hover:border-cyan-400/20 hover:bg-cyan-400/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-xs">
                    <div className="text-white/40 font-sans">LINKEDIN PROFILE</div>
                    <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      siddhanth-tyagi-47b09b382
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Diagnostic Stats Meter box */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 font-mono text-[9px] text-white/40 space-y-3">
              <span className="text-[9px] text-amber-400 uppercase tracking-widest block border-b border-white/5 pb-2">
                [COMMS_DIAGNOSTICS]
              </span>
              <div className="flex justify-between">
                <span>PING_ROUND_TRIP:</span>
                <span className="text-white">12ms (FAST)</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY_LAYER:</span>
                <span className="text-white">TLS_1.3_AES256</span>
              </div>
              <div className="flex justify-between">
                <span>MQTT_BROKER:</span>
                <span className="text-white">EMQX_PUBLIC</span>
              </div>
              <div className="flex justify-between">
                <span>GPS_TELEMETRY:</span>
                <span className="text-[#00FF88]">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>ROS2_UPLINK:</span>
                <span className="text-[#00FF88]">ESTABLISHED</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
