import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAws, FaReact, FaDocker, FaNodeJs, FaInfinity } from "react-icons/fa";
import { SiTerraform, SiMongodb, SiKubernetes } from "react-icons/si";
import logo from "/Alok_Kumar.png";

const techStack = [
  { name: "AWS_ARCH", icon: <FaAws />, color: "text-[#FF9900]", glow: "shadow-[0_0_15px_rgba(255,153,0,0.6)]" },
  { name: "TF_PIPELINE", icon: <SiTerraform />, color: "text-[#7B42BC]", glow: "shadow-[0_0_15px_rgba(123,66,188,0.6)]" },
  { name: "DOCKER_ENV", icon: <FaDocker />, color: "text-[#2496ED]", glow: "shadow-[0_0_15px_rgba(36,150,237,0.6)]" },
  { name: "K8S_CLUSTER", icon: <SiKubernetes />, color: "text-[#326CE5]", glow: "shadow-[0_0_15px_rgba(50,108,229,0.6)]" },
  { name: "NODE_CORE", icon: <FaNodeJs />, color: "text-[#339933]", glow: "shadow-[0_0_15px_rgba(51,153,51,0.6)]" },
  { name: "MONGO_DB", icon: <SiMongodb />, color: "text-[#47A248]", glow: "shadow-[0_0_15px_rgba(71,162,72,0.6)]" },
  { name: "REACT_UI", icon: <FaReact />, color: "text-[#61DAFB]", glow: "shadow-[0_0_15px_rgba(97,218,251,0.6)]" },
  { name: "DEVOPS_SYNC", icon: <FaInfinity />, color: "text-[#007ACC]", glow: "shadow-[0_0_15px_rgba(0,122,204,0.6)]" },
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hexString, setHexString] = useState("0x00000000");

  useEffect(() => {
    const duration = 1800; 
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(currentProgress);

      // Rapidly changing hex string for a "processing" effect
      setHexString(`0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`);

      const currentTech = Math.min(
        techStack.length - 1,
        Math.floor((currentProgress / 100) * techStack.length)
      );
      setActiveIndex(currentTech);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  // Calculate segmented bar (20 segments total)
  const segments = 20;
  const activeSegments = Math.floor((progress / 100) * segments);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden font-mono">
      
      {/* ==== Premium Blueprint & Grid Background ==== */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] z-0 pointer-events-none"></div>

      {/* ==== Ambient Lighting ==== */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] top-[-10%] left-[-10%]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] bottom-[-10%] right-[-10%]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-6 md:px-12">
        
        {/* ==== Central Holographic Avatar ==== */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-16 flex justify-center items-center"
        >
          {/* Orbital Rings */}
          <div className="absolute w-[140px] h-[140px] rounded-full border border-cyan-500/20 border-t-cyan-400 animate-[spin_3s_linear_infinite]" />
          <div className="absolute w-[160px] h-[160px] rounded-full border border-violet-500/20 border-b-violet-400 animate-[spin_5s_linear_infinite_reverse] border-dashed" />
          <div className="absolute w-[180px] h-[180px] rounded-full border-[0.5px] border-gray-700 animate-[spin_10s_linear_infinite]" />
          
          {/* Target Reticles */}
          <div className="absolute w-[200px] h-[200px] border border-cyan-500/10 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-500/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-500/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-cyan-500/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-cyan-500/50" />
          </div>

          <div className="relative w-28 h-28 rounded-full overflow-hidden border-[2px] border-gray-800 shadow-[0_0_40px_rgba(34,211,238,0.2)] z-10 bg-[#0B0F19]">
            {/* Moving Laser Scanner inside avatar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[scan_2s_ease-in-out_infinite] z-20"></div>
            <img 
              src={logo} 
              alt="Alok Kumar" 
              className="w-full h-full object-cover opacity-90 mix-blend-luminosity" 
            />
          </div>
        </motion.div>

        {/* ==== Terminal Readout ==== */}
        <div className="w-full flex justify-between items-end mb-4 px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400">
                System Boot Sequence
              </span>
            </div>
            <span className="text-xs md:text-sm text-gray-400">
              Initializing: <span className="text-white font-bold">{techStack[activeIndex].name}</span>
              <span className="animate-[ping_1s_infinite] inline-block ml-1">_</span>
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-600 mb-1 opacity-50 hidden md:block">MEM: {hexString}</span>
            <span className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              {Math.floor(progress)}
              <span className="text-lg md:text-xl text-cyan-500">%</span>
            </span>
          </div>
        </div>

        {/* ==== Segmented Energy Bar ==== */}
        <div className="w-full flex gap-1 h-2.5 md:h-3 mb-10 p-1 bg-gray-900/50 border border-gray-800 rounded-md backdrop-blur-sm">
          {[...Array(segments)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-[1px] transition-all duration-75 ${
                i < activeSegments 
                  ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" 
                  : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        {/* ==== Glassmorphic Tech Dock ==== */}
        <div className="w-full relative px-6 py-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Internal glowing line at top of dock */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>
          
          <div className="flex justify-between items-center w-full">
            {techStack.map((tech, index) => {
              const isActive = index <= activeIndex;
              const isCurrent = index === activeIndex;

              return (
                <div key={tech.name} className="relative flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`text-xl md:text-3xl transition-all duration-300 relative z-10 ${
                      isActive 
                        ? `${tech.color} scale-110 opacity-100 filter drop-shadow-[0_0_8px_currentColor]` 
                        : "text-gray-600 scale-90 opacity-30"
                    } ${isCurrent ? 'animate-bounce' : ''}`}
                    style={{ animationDuration: '1s' }}
                  >
                    {tech.icon}
                  </motion.div>
                  
                  {/* Glowing dot under active tech */}
                  <div className={`absolute -bottom-4 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? `bg-current ${tech.color} shadow-[0_0_10px_currentColor] opacity-100` : "opacity-0"
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110px); opacity: 0; }
        }
      `}} />
    </div>
  );
}