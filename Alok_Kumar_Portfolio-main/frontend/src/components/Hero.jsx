import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { 
  FiGithub, FiLinkedin, FiMail, FiCloud, FiServer, 
  FiArrowRight, FiShield, FiCpu, FiDatabase, FiActivity, FiTerminal, FiCheckCircle, FiGlobe
} from "react-icons/fi";
import { FaAws, FaDocker, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTerraform, SiMongodb, SiKubernetes, SiTypescript } from "react-icons/si";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Dynamic State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [gradient, setGradient] = useState("from-cyan-400 to-violet-500");
  const [statusText, setStatusText] = useState("Available for Opportunities");
  const [timeAngles, setTimeAngles] = useState({ h: 0, m: 0, s: 0 });
  
  // Clean City State
  const [visitorCity, setVisitorCity] = useState(null);

  // 1. PREMIUM 60FPS CLOCK ANIMATION (Mechanical Sweeping)
  useEffect(() => {
    let animationFrameId;
    
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const istTime = new Date(istString);
      
      setCurrentTime(istTime);

      const h = istTime.getHours() % 12;
      const m = istTime.getMinutes();
      const s = istTime.getSeconds();
      const ms = istTime.getMilliseconds();

      setTimeAngles({
        h: h * 30 + m * 0.5,
        m: m * 6 + s * 0.1,
        s: s * 6 + (ms * 0.006)
      });

      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 2. DYNAMIC GREETING & STATUS LOGIC
  useEffect(() => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning 🌅");
      setGradient("from-amber-400 to-orange-500");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon ☀️");
      setGradient("from-sky-400 to-cyan-500");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening 🌇");
      setGradient("from-purple-400 to-pink-500");
    } else {
      setGreeting("Good Night 🌙");
      setGradient("from-indigo-400 to-blue-600");
    }

    if (hour >= 21 || hour < 5) {
      setStatusText("Architecting Late ☕️");
    } else {
      setStatusText("Ready For Deployment.");
    }
  }, [currentTime]);

  // 3. AUTO-SCROLL SLIDER LOGIC
  useEffect(() => {
    if (isPaused) return; 
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); 
    }, 8000); 
    return () => clearInterval(timer);
  }, [isPaused]);

  // 4. INDUSTRY-LEVEL TELEMETRY TRACKER (Extracts City Only)
  useEffect(() => {
    const fetchLocation = async () => {
      const cachedCity = sessionStorage.getItem("visitor_city");
      if (cachedCity) {
        setVisitorCity(cachedCity);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const response = await fetch("https://ipinfo.io/json", { signal: controller.signal });
        if (!response.ok) throw new Error("API Limit");
        
        const data = await response.json();
        
        if (data.city) {
          sessionStorage.setItem("visitor_city", data.city);
          setVisitorCity(data.city);
        } else {
          setVisitorCity(null);
        }
      } catch (error) {
        setVisitorCity(null);
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchLocation();
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 60, scale: 0.97, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -60, scale: 0.97, filter: "blur(10px)", transition: { duration: 0.5, ease: "easeIn" } },
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  return (
    <section 
      className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 pt-24 md:pt-32 pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ==== Ambient Backgrounds ==== */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-[120px] top-[-10%] left-[-10%] animate-pulse pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-[150px] bottom-[-10%] right-[-10%] animate-pulse pointer-events-none"
        animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto">
        <AnimatePresence mode="wait">
          
          {/* =========================================================
              SLIDE 1: PROFESSIONAL INTRO
              ========================================================= */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col md:flex-row items-center justify-between gap-10"
            >
              <div className="flex-1 text-center md:text-left z-20">
                
                {/* ==== ULTRA-PREMIUM LUXURY WATCH PILL ==== */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="inline-flex items-center gap-4 mb-6 pr-6 pl-2 py-2 rounded-full backdrop-blur-2xl bg-white/70 dark:bg-gray-800/40 border border-white/50 dark:border-gray-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-default"
                >
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 border-[2px] border-white dark:border-gray-600 shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center shrink-0">
                    <div className="absolute top-[2%] left-[10%] w-[80%] h-[45%] bg-gradient-to-b from-white/50 to-transparent dark:from-white/10 rounded-full pointer-events-none z-20 mix-blend-overlay"></div>
                    <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[#0B0F19] shadow-[inset_0_0_12px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_15px_rgba(0,0,0,0.7)]"></div>

                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="absolute w-full h-full flex justify-center pointer-events-none" style={{ transform: `rotate(${i * 30}deg)` }}>
                        <div className={`w-[1.5px] ${i % 3 === 0 ? 'h-1.5 bg-cyan-500 shadow-[0_0_4px_rgba(6,182,212,0.8)]' : 'h-1 bg-gray-300 dark:bg-gray-600'} mt-[5px] rounded-full`} />
                      </div>
                    ))}

                    <div className="absolute w-full h-full pointer-events-none will-change-transform" style={{ transform: `rotate(${timeAngles.h}deg)` }}>
                      <div className="absolute top-[28%] bottom-[50%] left-[calc(50%-1.5px)] w-[3px] bg-gray-800 dark:bg-gray-200 rounded-full shadow-md" />
                    </div>

                    <div className="absolute w-full h-full pointer-events-none will-change-transform" style={{ transform: `rotate(${timeAngles.m}deg)` }}>
                      <div className="absolute top-[18%] bottom-[50%] left-[calc(50%-1px)] w-[2px] bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    </div>

                    <div className="absolute w-full h-full pointer-events-none will-change-transform" style={{ transform: `rotate(${timeAngles.s}deg)` }}>
                      <div className="absolute top-[12%] bottom-[35%] left-[calc(50%-0.5px)] w-[1px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                      <div className="absolute w-2 h-2 border-[1.5px] border-amber-500 rounded-full bottom-[35%] left-[calc(50%-4px)] translate-y-1/2 bg-white dark:bg-gray-900" />
                    </div>

                    <div className="absolute w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full shadow-xl z-10 flex items-center justify-center">
                       <div className="w-0.5 h-0.5 bg-amber-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-center pt-1">
                    <h3 className={`text-sm md:text-base font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent transition-colors duration-1000 tracking-tight`}>
                      {greeting} <span className="opacity-50 mx-1 text-gray-400">•</span> {formattedTime}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentTime.getHours() >= 21 || currentTime.getHours() < 5 ? "bg-amber-400" : "bg-green-400"}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTime.getHours() >= 21 || currentTime.getHours() < 5 ? "bg-amber-500" : "bg-green-500"}`}></span>
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{statusText}</span>
                    </div>
                  </div>
                </motion.div>

                {/* ==== MAIN HEADLINE ==== */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 text-gray-900 dark:text-white tracking-tight"
                >
                  Hi, I’m{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 drop-shadow-sm">
                    Alok Kumar
                  </span>
                </motion.h1>

                {/* ==== DYNAMIC INLINE LOCATION WELCOME ==== */}
                <AnimatePresence>
                  {visitorCity && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                      className="mb-6 mt-3 inline-flex items-center justify-center md:justify-start gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-md shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
                    >
                      <span className="relative flex h-3 w-3 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                      </span>
                      
                      {/* We use Typewriter with embedded HTML to make the City Name pop with color! */}
                      <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 min-h-[24px]">
                        <Typewriter
                          options={{
                            strings: [
                              `Warm welcome to our guest from <span class="text-cyan-600 dark:text-cyan-400">${visitorCity}</span> ✨`,
                              `Broadcasting live AWS assets to <span class="text-cyan-600 dark:text-cyan-400">${visitorCity}</span> 📡`,
                              `Secure DevOps session active in <span class="text-cyan-600 dark:text-cyan-400">${visitorCity}</span> 🔒`,
                              `Rendering portfolio locally for <span class="text-cyan-600 dark:text-cyan-400">${visitorCity}</span> ⚡`
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 45,
                            deleteSpeed: 20,
                          }}
                        />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub-headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6 ${!visitorCity ? 'mt-4' : ''}`}
                >
                  Cloud Computing Specialist | Software Developer | DevOps Engineer
                </motion.h2>

                <div className="text-lg md:text-xl font-medium mb-8 text-gray-500 dark:text-gray-400 h-8">
                  <Typewriter
                    options={{
                      strings: [
                        "AWS Solutions Architecture & Operations", 
                        "Infrastructure as Code (Terraform)", 
                        "DevOps, CI/CD & Container Orchestration", 
                        "Full-Stack MERN Development", 
                        "Building High-Availability Systems",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 60,
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
                  <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Let’s Connect <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="/Alok_Kumar_resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-bold hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300"
                  >
                    Download CV
                  </a>
                </div>

                <div className="flex justify-center md:justify-start gap-6 mt-10">
                  <motion.a href="https://github.com/Alokkumarkaran" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -4 }} className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition-colors"><FiGithub size={24} /></motion.a>
                  <motion.a href="https://www.linkedin.com/in/alok-kumar-karan/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -4 }} className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"><FiLinkedin size={24} /></motion.a>
                  <motion.a href="mailto:alokkumarkaranraj@gmail.com" whileHover={{ scale: 1.1, y: -4 }} className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"><FiMail size={24} /></motion.a>
                </div>
              </div>

              {/* Holographic Portrait Side */}
              <div className="flex-1 flex justify-center items-center relative mt-12 md:mt-0 pointer-events-none">
                <motion.div
                  className="absolute w-[300px] h-[300px] md:w-[520px] md:h-[520px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 rounded-full blur-3xl opacity-25 animate-pulse"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border-t-[6px] border-b-[6px] border-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 blur-sm"
                  style={{ borderImage: "linear-gradient(to right, #22d3ee, #3b82f6, #8b5cf6) 1" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-400/10 to-violet-500/20 blur-2xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src="/Alok_Kumar.png"
                  alt="Alok Kumar"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[480px] md:h-[480px] object-cover rounded-full shadow-2xl ring-4 ring-white/30 dark:ring-gray-700/50 pointer-events-auto"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                />
              </div>
            </motion.div>
          )}

          {/* =========================================================
              SLIDE 2: CLOUD SOLUTIONS ARCHITECT
              ========================================================= */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest border border-blue-500/20">
                  <FiCloud className="text-lg animate-pulse" /> Enterprise Cloud Strategy
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                  AWS Solutions <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Architect Professional</span>
                </h1>
                
                <div className="flex flex-col gap-5 mb-10 text-left max-w-xl mx-auto md:mx-0">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#FF9900]/10 rounded-xl group-hover:bg-[#FF9900]/20 transition-colors"><FaAws className="text-2xl text-[#FF9900]" /></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Well-Architected Framework</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Designing fault-tolerant, highly available (HA), and cost-optimized environments using AWS best practices.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#7B42BC]/10 rounded-xl group-hover:bg-[#7B42BC]/20 transition-colors"><SiTerraform className="text-2xl text-[#7B42BC]" /></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Infrastructure as Code (IaC)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Automating complex network topology provisioning and ensuring configuration drift compliance with Terraform.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#2496ED]/10 rounded-xl flex gap-1 group-hover:bg-[#2496ED]/20 transition-colors"><FaDocker className="text-2xl text-[#2496ED]"/><SiKubernetes className="text-2xl text-[#326CE5]"/></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">DevOps & CI/CD Pipelines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Orchestrating containerized microservices to enable resilient, zero-downtime automated deployments.</p>
                    </div>
                  </motion.div>
                </div>

                <a 
                  href="#certifications" 
                  onClick={(e) => scrollToSection(e, 'certifications')}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] hover:-translate-y-1 transition-all duration-300 relative z-20"
                >
                  Explore Accreditations <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex-1 flex justify-center items-center relative mt-16 md:mt-0 w-full min-h-[500px]">
                <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none" viewBox="0 0 500 500">
                  <circle cx="250" cy="250" r="190" fill="none" stroke="currentColor" className="text-blue-500/20" strokeWidth="2" strokeDasharray="4 8" />
                  <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" className="text-cyan-500/10" strokeWidth="1" strokeDasharray="10 15" />
                  <circle cx="250" cy="60" r="6" className="fill-cyan-400"><animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="15s" repeatCount="indefinite" /></circle>
                </svg>

                <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 md:left-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl text-[#FF9900] text-3xl border border-white/40 dark:border-gray-700 z-10"><FaAws /></motion.div>
                <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-10 md:right-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl text-[#2496ED] text-3xl border border-white/40 dark:border-gray-700 z-10"><SiTerraform /></motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-20 cursor-pointer"
                  onClick={(e) => scrollToSection(e, 'certifications')}
                >
                  <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-amber-500 via-cyan-400 to-violet-500 opacity-50 blur-lg animate-pulse"></div>
                  
                  <div className="relative bg-white/70 dark:bg-gray-900/80 backdrop-blur-3xl border border-white/50 dark:border-gray-600 rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transform-gpu">
                    <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-3 px-2">
                       <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-widest"><FiCheckCircle className="text-green-500 text-sm" /> Live Verification</span>
                       <div className="flex items-center gap-1.5">
                         <span className="text-[9px] text-green-500 font-mono">SYNCED</span>
                         <span className="h-2 w-2 bg-green-500 rounded-full animate-[ping_1.5s_infinite]"></span>
                       </div>
                    </div>
                    <div className="relative flex justify-center items-center bg-gray-50 dark:bg-gray-950 rounded-xl p-4 shadow-inner border border-gray-200 dark:border-gray-800 w-full min-h-[280px]">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10 animate-[scan_3s_ease-in-out_infinite]"></div>
                      <iframe
                        name="acclaim-badge"
                        allowtransparency="true"
                        frameBorder="0"
                        id="embedded-badge-584d2e2e-2588-48c2-988a-ae91e1a78a93"
                        src="https://www.credly.com/embedded_badge/584d2e2e-2588-48c2-988a-ae91e1a78a93"
                        width="150"
                        height="270"
                        title="View my verified achievement on Credly."
                        className="rounded-lg relative z-0"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              SLIDE 3: FULL-STACK DEVELOPMENT (Live Server Dashboard)
              ========================================================= */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-widest border border-violet-500/20">
                  <FiCpu className="text-lg animate-pulse" /> Full-Stack Engineering
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-gray-900 dark:text-white leading-tight">
                  Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Web Platforms</span>
                </h1>
                
                <div className="flex flex-col gap-6 mb-10 text-left max-w-xl mx-auto md:mx-0">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#61DAFB]/10 rounded-xl flex gap-1 group-hover:bg-[#61DAFB]/20 transition-colors"><FaReact className="text-2xl text-[#61DAFB]" /><SiTypescript className="text-2xl text-[#3178C6]"/></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Dynamic Client Architecture</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Engineering highly responsive, SEO-optimized Single Page Applications (SPAs) with complex state management.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#339933]/10 rounded-xl group-hover:bg-[#339933]/20 transition-colors"><FaNodeJs className="text-2xl text-[#339933]" /></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Robust Backend Systems</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Developing scalable RESTful APIs, implementing secure JWT authentication, and managing WebSocket data layers.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all cursor-default group">
                    <div className="p-3 bg-[#47A248]/10 rounded-xl group-hover:bg-[#47A248]/20 transition-colors"><SiMongodb className="text-2xl text-[#47A248]" /></div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Data Modeling & Storage</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">Designing complex NoSQL/SQL schemas, optimizing database indexing, and constructing aggregation pipelines.</p>
                    </div>
                  </motion.div>
                </div>

                <a 
                  href="#projects" 
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-violet-600 text-white font-bold hover:shadow-[0_10px_20px_rgba(139,_92,_246,_0.3)] hover:-translate-y-1 transition-all duration-300 relative z-20"
                >
                  Explore Deployments <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex-1 flex justify-center items-center relative mt-16 md:mt-0 w-full h-[500px]">
                <motion.div 
                  className="relative w-full max-w-lg bg-gray-900 backdrop-blur-2xl rounded-3xl border border-gray-700 shadow-2xl overflow-hidden cursor-default transform-gpu flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                   <div className="bg-gray-950 px-4 py-3 flex items-center justify-between border-b border-gray-800">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-[10px] font-mono font-bold text-gray-500 flex items-center gap-2">
                        <FiActivity className="text-green-500" /> API_GATEWAY_MONITOR
                      </div>
                   </div>
                   
                   <div className="p-5 md:p-6 space-y-4 flex-grow flex flex-col">
                      <div className="bg-gray-950/80 text-green-400 font-mono text-[11px] md:text-xs p-4 rounded-xl shadow-inner overflow-hidden flex flex-col gap-1 border border-gray-800 min-h-[90px]">
                        <span className="text-gray-400 font-bold">$ docker logs -f node_api_gateway</span>
                        <span>
                          <Typewriter 
                            options={{ 
                              strings: [
                                "[Server] Node.js listening on port 5000<br/>[DB] Connected to MongoDB Atlas<br/>[Auth] JWT Middleware initialized<br/>[Ready] Accepting connections...", 
                              ], 
                              autoStart: true, 
                              loop: true, 
                              delay: 30 
                            }} 
                          />
                        </span>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-3 flex flex-col relative overflow-hidden">
                           <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 flex justify-between">
                             Live Traffic <span className="text-green-400 animate-pulse">● REC</span>
                           </div>
                           <div className="flex flex-col gap-2 font-mono text-[10px]">
                             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{repeat:Infinity, duration:2}} className="flex justify-between text-gray-300">
                               <span className="text-cyan-400">GET /api/v1/users</span> <span className="text-green-400">200</span>
                             </motion.div>
                             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{repeat:Infinity, duration:2, delay:0.6}} className="flex justify-between text-gray-300">
                               <span className="text-amber-400">POST /api/v1/auth</span> <span className="text-green-400">201</span>
                             </motion.div>
                             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{repeat:Infinity, duration:2, delay:1.2}} className="flex justify-between text-gray-300">
                               <span className="text-cyan-400">GET /api/v1/data</span> <span className="text-green-400">200</span>
                             </motion.div>
                           </div>
                           <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-800 to-transparent"></div>
                        </div>

                        <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-3 flex flex-col justify-between">
                           <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                             <SiMongodb className="text-[#47A248]" /> DB Metrics
                           </div>
                           
                           <div className="space-y-3 mt-2">
                             <div>
                               <div className="flex justify-between text-[9px] text-gray-400 mb-1"><span>Read Ops</span><span>1.2k/s</span></div>
                               <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                 <motion.div animate={{ width: ["40%", "70%", "45%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-cyan-400"></motion.div>
                               </div>
                             </div>
                             <div>
                               <div className="flex justify-between text-[9px] text-gray-400 mb-1"><span>Write Ops</span><span>340/s</span></div>
                               <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                 <motion.div animate={{ width: ["20%", "40%", "25%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-violet-400"></motion.div>
                               </div>
                             </div>
                           </div>

                           <div className="mt-4 flex items-center gap-2">
                             <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                             <span className="text-[10px] font-bold text-gray-300">Latency: 12ms</span>
                           </div>
                        </div>
                      </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==== Manual Slide Navigation Dots ==== */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === index 
                ? "w-12 h-3 bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                : "w-3 h-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

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