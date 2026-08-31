import React from "react";
import { motion } from "framer-motion";
import { 
  FiAward, FiCheckCircle, FiShield, 
  FiLock, FiCpu, FiTrendingUp, FiCheck 
} from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiTerraform, SiKubernetes } from "react-icons/si";

// =====================================================================
// 🏆 FULLY POPULATED CERTIFICATION DATA
// All 4 secondary slots now contain your live Credly badge IDs!
// =====================================================================
const secondaryCerts = [
  {
    id: 1,
    title: "AWS Certification",
    badgeId: "f6be23a6-c299-4c7a-a508-da89155a3e0b",
    glowColor: "rgba(255,153,0,0.25)",
    borderColor: "hover:border-amber-500/60"
  },
  {
    id: 2,
    title: "AWS Certification",
    badgeId: "70840338-29fa-4180-8037-25a5d3530cc9",
    glowColor: "rgba(255,153,0,0.25)",
    borderColor: "hover:border-amber-500/60"
  },
  {
    id: 3,
    title: "Verified Credential",
    badgeId: "27ab7d02-df0d-447c-9037-ee12a2e85b92",
    glowColor: "rgba(123,66,188,0.25)",
    borderColor: "hover:border-purple-500/60"
  },
  {
    id: 4,
    title: "Verified Credential",
    badgeId: "913bcdaa-47e3-49ff-bfa2-8f6964312899",
    glowColor: "rgba(50,108,229,0.25)",
    borderColor: "hover:border-blue-500/60"
  }
];

export default function AWSbadges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section 
      id="awsbadges" 
      className="relative w-full py-24 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* ==== Ambient Background Glows ==== */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        
        {/* ==== Section Header ==== */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800/50 rounded-full mb-6 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <FiAward className="text-2xl text-amber-500 mx-2" />
            <span className="text-sm font-bold tracking-widest text-gray-700 dark:text-gray-300 uppercase pr-4">Accreditations</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Recognized</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Validating technical expertise in designing highly available, cost-efficient, and scalable distributed systems on the Cloud.
          </motion.p>
        </div>

        {/* ==== Main Content Grid ==== */}
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* ======================================================== */}
          {/* LEFT: THE CROWN JEWEL (Main Badge Feature)               */}
          {/* ======================================================== */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full xl:w-5/12 flex"
          >
            <div className="relative w-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-3xl rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-2xl p-8 md:p-12 flex flex-col justify-center items-center overflow-hidden group">
              
              {/* Holographic scanner effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20 animate-[scan_4s_linear_infinite]"></div>
              
              <div className="w-full flex items-center justify-between mb-10 relative z-10">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                  <FiCheck className="text-sm" /> Live Verified
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-green-500 font-bold">STABLE</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* FLAWLESS CREDLY iFRAME SHOWCASE */}
              <div className="relative z-10 w-full flex justify-center mb-10">
                <div className="absolute inset-0 bg-[#FF9900] blur-[60px] opacity-25 rounded-full pointer-events-none animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl transform group-hover:scale-[1.03] transition-transform duration-500">
                  <iframe
                    name="acclaim-badge"
                    allowtransparency="true"
                    frameBorder="0"
                    id="embedded-badge-584d2e2e-2588-48c2-988a-ae91e1a78a93"
                    src="https://www.credly.com/embedded_badge/584d2e2e-2588-48c2-988a-ae91e1a78a93"
                    width="150"
                    height="270"
                    title="AWS Solutions Architect Professional"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>

              <div className="text-center relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                  AWS Solutions Architect
                  <span className="block text-amber-500 mt-1 uppercase text-lg tracking-widest">Professional</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                  The highest level of AWS certification. Validates advanced technical skills in designing complex solutions across the entire AWS ecosystem with a focus on security, scalability, and cost-optimization.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"><FiShield className="text-blue-500"/> Enterprise Security</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"><FiTrendingUp className="text-green-500"/> System Scaling</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* RIGHT: LIVE CREDENTIAL GALLERY (Grid)                    */}
          {/* ======================================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full xl:w-7/12 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex items-center gap-3">
                <FiCpu className="text-gray-400 text-xl" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Full Cloud Stack Verification</h3>
              </div>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                <FiCheckCircle /> Live API
              </span>
            </div>

            {/* Grid layout for 4 secondary badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {secondaryCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  style={{ '--hover-glow': cert.glowColor }}
                  className={`group relative flex flex-col justify-center items-center bg-white/80 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-[2rem] border border-gray-200 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_var(--hover-glow)] ${cert.borderColor}`}
                >
                  
                  {cert.badgeId ? (
                    /* IF CREDLY ID EXISTS: Render the live iFrame */
                    <div className="relative w-full flex flex-col items-center justify-center">
                      <div className="bg-white dark:bg-gray-950 p-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-inner w-full flex justify-center mb-2 transform group-hover:scale-105 transition-transform duration-300">
                        <iframe
                          name="acclaim-badge"
                          allowtransparency="true"
                          frameBorder="0"
                          id={`embedded-badge-${cert.badgeId}`}
                          src={`https://www.credly.com/embedded_badge/${cert.badgeId}`}
                          width="150"
                          height="270"
                          title={cert.title}
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </div>
                  ) : (
                    /* IF NO ID EXISTS: Render a sleek placeholder */
                    <div className="flex flex-col items-center justify-center text-center py-10 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-inner border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-500">
                        <FiShield className="text-gray-400" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Credential Pending
                      </h4>
                    </div>
                  )}

                </motion.div>
              ))}
            </div>
            
          </motion.div>

        </div>
      </div>

      {/* Global CSS for the scanning animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}} />
    </section>
  );
}