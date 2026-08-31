import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiLinkedin, FiCloud, FiCode, FiUsers, FiTrendingUp, 
  FiArrowUpRight, FiActivity, FiCheckCircle 
} from "react-icons/fi";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LinkedInBadge() {
  
  // Robust LinkedIn Script Loader for React
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.IN && window.IN.parse) {
        window.IN.parse();
      } else if (!document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]')) {
        const script = document.createElement("script");
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const connectReasons = [
    { icon: <FiCloud />, title: "Cloud Architecture", text: "Discussing AWS, Terraform & scalable infrastructure." },
    { icon: <FiCode />, title: "Full-Stack Engineering", text: "Sharing insights on the MERN stack & system design." },
    { icon: <FiUsers />, title: "Tech Community", text: "Collaborating with developers and industry leaders." },
    { icon: <FiTrendingUp />, title: "Career & Insights", text: "Posting updates, achievements, and industry trends." },
  ];

  return (
    <section
      id="linkedin"
      className="relative w-full py-24 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ==== Premium Blueprint Background ==== */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:30px_30px] opacity-30 pointer-events-none"></div>

      {/* ==== Ambient Lighting Glows ==== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-[1400px] relative z-10">
        
        {/* ==== SECTION HEADER ==== */}
        <div className="w-full mb-12 lg:mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300">
              Professional Network
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Connect on <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              LinkedIn
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            I am always open to discussing cloud architecture, scalable web development, and exploring new opportunities. Let's expand our professional horizons together.
          </motion.p>
        </div>

        {/* ==== MAIN LAYOUT GRID ==== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Why Connect (Bento Style) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-gray-700/50 shadow-lg relative overflow-hidden group h-full">
              
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Synergy & Collaboration
                </h3>
                <FiActivity className="text-blue-500 text-xl animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 mb-10">
                {connectReasons.map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-3 group/item">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 dark:bg-gray-900 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-gray-700 group-hover/item:bg-blue-500 group-hover/item:border-blue-500 group-hover/item:text-white transition-all duration-300 shadow-sm">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Direct CTA Button */}
              <motion.a
                variants={itemVariants}
                href="https://www.linkedin.com/in/alok-kumar-karan"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 group inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 mt-auto"
              >
                View LinkedIn Profile 
                <FiArrowUpRight className="text-lg group-hover:rotate-45 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Holographic Badge Display */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full perspective-1000"
          >
            <div className="relative w-full max-w-[360px] group cursor-default">
              
              {/* Animated Glowing Aura Behind Badge */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500 animate-pulse"></div>

              {/* Glassmorphic Display Case */}
              <div className="relative bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-gray-700 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform-gpu transition-all duration-500 group-hover:scale-[1.02] w-full">
                
                {/* Header of the Display Case */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077b5]/10 border border-[#0077b5]/20 shrink-0">
                      <FiLinkedin className="text-xl text-[#0077b5]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-wide">
                        Live Profile Data
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-green-500 tracking-widest uppercase">Syncing</span>
                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-[ping_1.5s_infinite]"></span>
                      </div>
                    </div>
                  </div>
                  <FiCheckCircle className="text-green-500 text-lg opacity-80 shrink-0" />
                </div>

                {/* The Actual LinkedIn Script Badge Container - REMOVED internal padding to prevent scroll overflow */}
                <div className="badge-container relative min-h-[300px] w-full flex items-start justify-center rounded-xl overflow-hidden bg-white dark:bg-[#1d2226] border border-gray-200 dark:border-gray-800 shadow-inner">
                  
                  {/* Holographic Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_8px_rgba(96,165,250,0.8)] z-10 animate-[scan_4s_ease-in-out_infinite] pointer-events-none"></div>

                  <div
                    className="badge-base LI-profile-badge w-full flex justify-center"
                    data-locale="en_US"
                    data-size="large"
                    data-theme="dark"
                    data-type="VERTICAL"
                    data-vanity="alok-kumar-karan"
                    data-version="v1"
                  >
                    <a
                      className="badge-base__link LI-simple-link absolute top-10 opacity-0 pointer-events-none"
                      href="https://in.linkedin.com/in/alok-kumar-karan?trk=profile-badge"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Alok Kumar
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Global Style: Scrollbar Killer and Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }

        /* 🚀 THE SCROLLBAR KILLER 🚀 */
        /* Forces the container and the injected LinkedIn iframe to hide all scrollbars */
        .badge-container, 
        .badge-container iframe, 
        .LI-profile-badge {
          overflow: hidden !important;
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
        }
        
        .badge-container::-webkit-scrollbar, 
        .badge-container iframe::-webkit-scrollbar, 
        .LI-profile-badge::-webkit-scrollbar {
          display: none !important; /* Chrome/Safari/Webkit */
          width: 0 !important;
          height: 0 !important;
        }
        
        /* Ensures scaling happens cleanly on mobile */
        @media (max-width: 400px) {
          .badge-container .LI-profile-badge {
            transform: scale(0.9);
            transform-origin: top center;
          }
        }
        @media (max-width: 350px) {
          .badge-container .LI-profile-badge {
            transform: scale(0.8);
            transform-origin: top center;
          }
        }
      `}} />
    </section>
  );
}