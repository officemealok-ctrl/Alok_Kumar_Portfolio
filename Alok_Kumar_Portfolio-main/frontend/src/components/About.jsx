import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaAws, FaReact, FaDocker, FaNodeJs, FaPython 
} from "react-icons/fa";
import { 
  SiTerraform, SiMongodb, SiKubernetes, SiTailwindcss, SiJavascript, SiGithubactions 
} from "react-icons/si";
import { FiTerminal, FiCloud, FiLayers, FiZap, FiArrowRight } from "react-icons/fi";

export default function About() {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1. LIVE TIME GREETING
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, [currentTime]);

  // Smooth Scroll Helper
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-gray-50 dark:bg-[#0B0F19] py-24 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ==== Premium Blueprint Background ==== */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:30px_30px] opacity-40 pointer-events-none"></div>
      
      {/* ==== Cinematic Ambient Lighting ==== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-[1400px] relative z-10">
        
        {/* ==== Section Header ==== */}
        <div className="w-full mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm mb-4"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300">
                System Architect & Developer
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
            >
              The Mind Behind <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                The Infrastructure
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-cyan-400 pl-4">
              <span className="text-cyan-500 font-bold">{greeting}!</span> I am Alok Kumar. I don't just write code; I design, deploy, and scale enterprise-grade digital ecosystems from the database architecture to global cloud delivery.
            </p>
          </motion.div>
        </div>

        {/* ==== BENTO BOX GRID LAYOUT ==== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Box 1: Large Cloud Architect Feature (Spans 2 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-2 group relative bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                <FiCloud className="text-2xl text-amber-500" />
              </div>
              <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                AWS Solutions Architect Pro
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Enterprise Cloud Operations</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Operating as a Cloud Consultant, I architect fault-tolerant, highly available (HA) cloud environments. My expertise lies in designing complex network topologies, enforcing strict IAM security compliance, and deploying cost-optimized auto-scaling server fleets using AWS best practices.
              </p>
            </div>

            {/* Decorative Blueprint Lines */}
            <div className="absolute -bottom-10 -right-10 opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
              <FaAws className="text-[200px] text-amber-500" />
            </div>
          </motion.div>

          {/* Box 2: DevOps & Automation */}
          <motion.div variants={itemVariants} className="md:col-span-1 group relative bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
              <FiZap className="text-2xl text-blue-400" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">DevOps & CI/CD</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                I bridge the gap between development and operations. Utilizing <strong>Terraform (IaC)</strong>, Docker, and Kubernetes, I establish zero-downtime deployment pipelines that ensure rapid, secure, and reliable software delivery.
              </p>
            </div>
          </motion.div>

          {/* Box 3: Tech Stack Dock (Spans 1 column, dynamic icons) */}
          <motion.div variants={itemVariants} className="md:col-span-1 group relative bg-gray-900 dark:bg-gray-950 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><FiTerminal className="text-cyan-400"/> Live Tech Stack</h3>
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>

            {/* UPGRADED: Cloud, DevOps, and Full-Stack Grid */}
            <div className="grid grid-cols-3 gap-6 place-items-center mt-4">
              {[
                { icon: <FaAws />, color: "text-[#FF9900]", name: "AWS" },
                { icon: <FaDocker />, color: "text-[#2496ED]", name: "Docker" },
                { icon: <SiKubernetes />, color: "text-[#326CE5]", name: "K8s" },
                { icon: <SiTerraform />, color: "text-[#7B42BC]", name: "Terraform" },
                { icon: <SiGithubactions />, color: "text-[#2088FF]", name: "CI/CD" },
                { icon: <FaReact />, color: "text-[#61DAFB]", name: "React" },
                { icon: <FaNodeJs />, color: "text-[#339933]", name: "Node.js" },
                { icon: <SiMongodb />, color: "text-[#47A248]", name: "MongoDB" },
                { icon: <FaPython />, color: "text-[#3776AB]", name: "Python" },
              ].map((tech, i) => (
                <motion.div 
                  key={i} 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                  className={`relative flex justify-center text-3xl ${tech.color} opacity-70 hover:opacity-100 hover:scale-125 transition-all cursor-pointer`}
                  title={tech.name}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Box 4: Full-Stack & AI Integration (Spans 2 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-2 group relative bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform duration-500">
                <FiLayers className="text-2xl text-violet-500" />
              </div>
              <span className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                MERN & AI Integration
              </span>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Full-Stack Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  Beyond infrastructure, I engineer high-performance web applications using the MERN stack. From architecting scalable EdTech ecosystems to developing secure, real-time chat APIs, I build solutions tailored for user impact. I also integrate AI capabilities—like <strong>Google Gemini Pro APIs</strong>—into automated workflows for intelligent data processing.
                </p>
              </div>
              
              {/* FIXED: Smooth Scroll Arrow to Projects Section */}
              <a 
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 group-hover:bg-violet-500 group-hover:border-violet-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:text-white transition-all duration-300" 
                aria-label="View Projects"
              >
                <FiArrowRight className="text-2xl transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}