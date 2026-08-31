import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUpRight 
} from "react-icons/fi";
import { FaAws, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFramer } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [localTime, setLocalTime] = useState("");
  const [timeAngles, setTimeAngles] = useState({ h: 0, m: 0, s: 0 });

  // === Advanced Animated Physical Clock Logic ===
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // Convert to IST (Asia/Kolkata)
      const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const istTime = new Date(istString);
      
      const h = istTime.getHours() % 12;
      const m = istTime.getMinutes();
      const s = istTime.getSeconds();

      // Calculate smooth degrees for physical hands
      setTimeAngles({
        h: h * 30 + m * 0.5, // 30 degrees per hour + slight movement per minute
        m: m * 6 + s * 0.1,  // 6 degrees per minute + slight movement per second
        s: s * 6             // 6 degrees per second
      });

      // Update digital readout
      setLocalTime(istTime.toLocaleTimeString("en-US", {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }));
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white dark:bg-[#080B12] pt-24 pb-8 overflow-hidden z-10">
      
      {/* ==== Premium Top Border Gradient ==== */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      {/* ==== Ambient Background Glows ==== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Full Width Container */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        
        {/* ===== Upper Footer Grid ===== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8 mb-20"
        >
          
          {/* 1. Brand & About Section */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <a href="#top" onClick={scrollToTop} className="inline-block mb-6">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                Alok <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Kumar.</span>
              </h3>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
              Designing fault-tolerant cloud architectures and engineering scalable full-stack ecosystems. Turning complex infrastructure challenges into elegant, automated solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://github.com/Alokkumarkaran" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/alok-kumar-karan" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-violet-500 hover:border-violet-500 hover:text-white dark:hover:bg-violet-500 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:alokkumarkaranraj@gmail.com" className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white dark:hover:bg-amber-500 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <FiMail size={20} />
              </a>
            </div>
          </motion.div>

          {/* 2. Quick Navigation */}
          <motion.div variants={itemVariants} className="flex flex-col xl:pl-10">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
              Platform Index
            </h3>
            <ul className="space-y-4">
              {['About', 'Projects', 'Skills', 'Certifications', 'Experience', 'Blog'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 flex items-center transition-all duration-300 hover:translate-x-2 w-fit"
                  >
                    <span className="text-cyan-500/0 hover:text-cyan-500 mr-2 transition-colors">/</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Global Operations (Contact & PHYSICAL CLOCK) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
              Global Reach
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <FiMail size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Direct Email</span>
                  <a href="mailto:alokkumarkaranraj@gmail.com" className="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-cyan-500 transition-colors break-all">
                    alokkumarkaranraj@gmail.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
                  <FiPhone size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Direct Line</span>
                  <a href="tel:+919113793533" className="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-violet-500 transition-colors">
                    +91 91137 93533
                  </a>
                </div>
              </li>

              {/* ==== PHYSICAL ANIMATED CLOCK ==== */}
              <li className="flex items-center gap-5 pt-2">
                <div className="relative w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-inner flex items-center justify-center shrink-0">
                  
                  {/* Outer Ring */}
                  <div className="absolute inset-[3px] rounded-full border border-gray-100 dark:border-gray-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]"></div>

                  {/* 12 Tick Marks */}
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-full h-full flex justify-center" style={{ transform: `rotate(${i * 30}deg)` }}>
                      <div className={`w-[1px] ${i % 3 === 0 ? 'h-2 bg-cyan-500' : 'h-1 bg-gray-300 dark:bg-gray-600'} mt-[4px] rounded-full`} />
                    </div>
                  ))}

                  {/* Hour Hand */}
                  <div className="absolute w-full h-full flex justify-center transition-transform duration-300 ease-out" style={{ transform: `rotate(${timeAngles.h}deg)` }}>
                    <div className="w-1 h-[22%] bg-gray-800 dark:bg-gray-200 rounded-full mt-[28%] shadow-sm" />
                  </div>

                  {/* Minute Hand */}
                  <div className="absolute w-full h-full flex justify-center transition-transform duration-300 ease-out" style={{ transform: `rotate(${timeAngles.m}deg)` }}>
                    <div className="w-[2px] h-[35%] bg-cyan-500 rounded-full mt-[15%] shadow-sm" />
                  </div>

                  {/* Second Hand (with counterweight) */}
                  <div className="absolute w-full h-full flex justify-center transition-transform duration-[50ms] ease-linear" style={{ transform: `rotate(${timeAngles.s}deg)` }}>
                    <div className="w-[1px] h-[40%] bg-amber-500 rounded-full mt-[10%] shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                    <div className="absolute w-[2px] h-[10%] bg-amber-500 rounded-full bottom-[35%]" />
                  </div>

                  {/* Center Pivot Pin */}
                  <div className="absolute w-1.5 h-1.5 bg-white dark:bg-gray-900 border border-amber-500 rounded-full z-10" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Local Time (IST)</span>
                  <span className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">
                    {localTime || "Syncing..."}
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* 4. Live Status & CTA */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
              Network Status
            </h3>
            
            {/* SaaS Style Status Box */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Available for Roles
                </span>
              </div>
              <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">
                Online
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Looking for an architect to scale your infrastructure or a developer to build your next full-stack MVP?
            </p>

            <a
              href="mailto:alokkumarkaranraj@gmail.com"
              className="group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors">Initialize Contact</span> 
              <FiArrowUpRight className="relative z-10 text-lg group-hover:text-white group-hover:rotate-45 transition-all" />
            </a>
          </motion.div>

        </motion.div>

        {/* ===== Bottom Footer Bar ===== */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full border-t border-gray-200 dark:border-gray-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span>© {currentYear} Alok Kumar. Data protected and secured.</span>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700/50">
            <span className="mr-1">Architected with</span>
            <FaReact className="text-[#61DAFB] text-sm hover:scale-125 transition-transform cursor-pointer" title="React" /> 
            <SiTailwindcss className="text-[#06B6D4] text-sm hover:scale-125 transition-transform cursor-pointer" title="Tailwind CSS" />
            <SiFramer className="text-gray-900 dark:text-white text-sm hover:scale-125 transition-transform cursor-pointer" title="Framer Motion" />
            <FaAws className="text-[#FF9900] text-sm hover:scale-125 transition-transform cursor-pointer" title="AWS" />
          </div>
        </motion.div>

      </div>
    </footer>
  );
}