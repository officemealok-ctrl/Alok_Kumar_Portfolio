import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGraduationCap, FaUniversity, FaAws, FaDocker, FaReact, 
  FaNetworkWired, FaDatabase, FaServer, FaCodeBranch
} from "react-icons/fa";
import { FiCalendar, FiCloud, FiSettings, FiLayout } from "react-icons/fi";
import { SiTerraform, SiMongodb } from "react-icons/si";

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(0);

  const educationData = [
    {
      id: "mca",
      degree: "Master of Computer Applications (M.C.A)",
      institution: "Chandigarh University, Mohali",
      duration: "2023 - 2025",
      summary: "Specialized in Cloud Computing and Advanced Software Development. Mastered architecting scalable infrastructure and designing CI/CD pipelines, alongside building high-performance full-stack web applications.",
      skills: [
        { name: "AWS Architecture", icon: <FaAws />, desc: "Designing scalable, fault-tolerant cloud infrastructure." },
        { name: "Terraform (IaC)", icon: <SiTerraform />, desc: "Automating and provisioning cloud environments." },
        { name: "Docker & CI/CD", icon: <FaDocker />, desc: "Containerization and continuous deployment pipelines." },
        { name: "MERN Stack", icon: <FaReact />, desc: "Building high-performance, dynamic web applications." }
      ]
    },
    {
      id: "bca",
      degree: "Bachelor of Computer Applications (B.C.A)",
      institution: "Patliputra University, Patna",
      duration: "2019 - 2022",
      summary: "Developed a strong foundation in cloud deployment, networking, and software engineering. Built dynamic applications while gaining essential exposure to virtualization and database management.",
      skills: [
        { name: "Cloud Fundamentals", icon: <FiCloud />, desc: "Early exposure to cloud environments and virtualization." },
        { name: "Networking & OS", icon: <FaNetworkWired />, desc: "Core principles of distributed systems and networks." },
        { name: "Database Design", icon: <FaDatabase />, desc: "Structuring scalable SQL and NoSQL databases." },
        { name: "Software Engineering", icon: <FaCodeBranch />, desc: "Clean coding practices and foundational web tech." }
      ]
    }
  ];

  return (
    <section
      id="education"
      className="w-full min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header (Full Width) */}
      <div className="text-center mb-16 px-6 relative z-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          Educational{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Journey
          </span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The academic foundation driving my expertise in Cloud Computing and Software Engineering.
        </p>
      </div>

      {/* Interactive Dashboard Container (Full Width with Responsive Padding) */}
      <div className="w-full px-6 md:px-10 lg:px-16 2xl:px-24 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 2xl:gap-16 items-stretch">
        
        {/* LEFT: Clickable Timeline Selector */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-1 bg-gray-200 dark:bg-gray-800 rounded-full" />
          
          {educationData.map((edu, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={edu.id}
                onClick={() => setActiveIndex(index)}
                className={`relative pl-16 py-6 cursor-pointer group transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {/* Glowing Node */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 
                  ${isActive ? "bg-gradient-to-br from-cyan-400 to-violet-500 border-white dark:border-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110" 
                  : "bg-gray-200 dark:bg-gray-800 border-gray-50 dark:border-gray-950 group-hover:border-cyan-400/50"}`}
                >
                  <FaGraduationCap className={`text-xl ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
                </div>

                {/* Date & Title */}
                <div className="flex flex-col">
                  <span className={`text-sm font-bold tracking-wider mb-1 transition-colors ${isActive ? "text-cyan-500" : "text-gray-500"}`}>
                    {edu.duration}
                  </span>
                  <h3 className={`text-xl font-bold transition-colors ${isActive ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-400"}`}>
                    {edu.degree.split(' (')[0]} 
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Expandable Dashboard Detail Panel */}
        <div className="w-full lg:w-2/3 xl:w-3/4 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col h-full relative overflow-hidden"
            >
              {/* Subtle inner top glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-violet-500 opacity-50" />

              {/* Header Info */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold mb-4 border border-cyan-200 dark:border-cyan-800">
                  <FiCalendar /> {educationData[activeIndex].duration}
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                  {educationData[activeIndex].degree}
                </h2>
                <div className="flex items-center gap-2 text-lg text-violet-600 dark:text-violet-400 font-medium">
                  <FaUniversity />
                  {educationData[activeIndex].institution}
                </div>
              </div>

              {/* Main Summary */}
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-5xl">
                {educationData[activeIndex].summary}
              </p>

              {/* Interactive Skills Grid (Expands to 4 columns on Ultra-Wide screens) */}
              <div className="mt-auto">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Core Academic Focus
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 2xl:gap-6">
                  {educationData[activeIndex].skills.map((skill, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-cyan-400/50 hover:shadow-lg transition-all group h-full"
                    >
                      <div className="mt-1 text-3xl text-cyan-500 group-hover:scale-110 group-hover:text-violet-500 transition-all duration-300">
                        {skill.icon}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                          {skill.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                          {skill.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}