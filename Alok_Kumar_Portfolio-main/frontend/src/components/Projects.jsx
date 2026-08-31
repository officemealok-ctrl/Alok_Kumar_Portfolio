import React, { useState } from "react";
import { 
  FiGithub, 
  FiExternalLink, 
  FiMaximize2, 
  FiX, 
  FiCloud, 
  FiDatabase, 
  FiLayers, 
  FiMonitor,
  FiShield
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Alok Pathshala",
    category: "Full Stack EdTech Platform",
    icon: <FiMonitor />,
    desc: "A comprehensive examination platform featuring a dedicated student portal for taking online tests and an advanced admin dashboard. Engineered to allow administrators to seamlessly manage exam questions, analyze student performance metrics, and oversee complete testing operations.",
    tech: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    image: "/Alok_Pathshala.png",
    github: "https://github.com/Alokkumarkaran/Alok_Pathshala",
    live: "https://alokpathshala.vercel.app",
  },
  {
    title: "Hire-A-Helper",
    category: "Full Stack & Cloud",
    icon: <FiCloud />,
    desc: "A scalable platform connecting service providers and customers. Engineered with secure JWT authentication, RESTful APIs, and deployed via automated CI/CD pipelines.",
    tech: ["React.js", "Node.js", "MongoDB", "Express", "REST APIs"],
    image: "/Hire_helper.png",
    github: "https://github.com/Alokkumarkaran/Hire_a_Helper_infosys",
    live: "https://hire-a-helper-infosys.vercel.app",
  },
  {
    title: "Skill Swap Platform",
    category: "Secure Web Application",
    icon: <FiShield />,
    desc: "An e-learning hub enabling secure connections between learners and educators. Features Role-Based Access Control (RBAC), OTP verification, and secure payment gateway integration.",
    tech: ["React.js", "Node.js", "MongoDB", "Authentication"],
    image: "/Skill_Swap.png",
    github: "https://github.com/Alokkumarkaran/skill-swap",
    live: "https://skill-swap.vercel.app",
  },
  {
    title: "Student Job Tracker",
    category: "MERN Stack Application",
    icon: <FiLayers />,
    desc: "A dynamic tracking system for job applications. Features advanced data filtering, cloud database integration, and resilient hosting across Vercel and Render cloud platforms.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: "/image.png",
    github: "https://github.com/Alokkumarkaran/Student_Job_Tracker",
    live: "https://student-job-tracker-alok-kumars-projects-66159410.vercel.app",
  },
  {
    title: "Real-Time Chat Architecture",
    category: "Distributed Systems",
    icon: <FiCloud />,
    desc: "A high-performance, real-time communication app supporting private/group messaging and media sharing. Built using WebSocket protocols (Socket.IO) for low-latency data transfer.",
    tech: ["React.js", "Node.js", "Socket.IO", "WebSockets"],
    image: "/Chat Appication.png",
    github: "https://github.com/Alokkumarkaran/real-time-chat",
    live: "https://realtimechat.vercel.app",
  },
  {
    title: "Cloud-Optimized Portfolio",
    category: "Frontend Architecture",
    icon: <FiMonitor />,
    desc: "A highly optimized, SEO-friendly personal portfolio. Architected with modern React principles, advanced Framer Motion animations, and deployed via Vercel's edge network.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "CI/CD"],
    image: "/Portfoliopic.png",
    github: "https://github.com/Alokkumarkaran/Alok_Kumar_Portfolio",
    live: "https://alokkumarkaran.vercel.app",
  },
  {
    title: "Airline Reservation DB",
    category: "Relational DB Architecture",
    icon: <FiDatabase />,
    desc: "A robust backend architecture designed to handle high-volume flight bookings and transactions. Engineered with complex SQL queries, optimized indexing, and stored procedures.",
    tech: ["MySQL", "Database Design", "SQL Optimization"],
    image: "/images/airline-db.png",
    github: "https://github.com/Alokkumarkaran/airline-reservation",
    live: "#",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="w-full min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Glows (Matching Education Section) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800/50 rounded-full mb-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <FiLayers className="text-2xl text-cyan-500 mx-2" />
          <span className="text-sm font-bold tracking-widest text-gray-700 dark:text-gray-300 uppercase pr-4">Portfolio</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          Featured{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Deployments
          </span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Architecting scalable web applications and robust backend systems using modern cloud and software engineering practices.
        </p>
      </div>

      {/* Interactive Dashboard Container */}
      <div className="w-full px-6 md:px-10 lg:px-16 2xl:px-24 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 2xl:gap-16 items-stretch max-w-[1800px] mx-auto">
        
        {/* LEFT: Clickable Project Selector Menu */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-1 bg-gray-200 dark:bg-gray-800 rounded-full hidden md:block" />
          
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 gap-2 lg:gap-0 custom-scrollbar">
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 lg:flex-shrink w-[280px] lg:w-auto md:pl-16 p-4 md:py-6 cursor-pointer group transition-all duration-300 rounded-2xl lg:rounded-none ${isActive ? "bg-white/60 dark:bg-gray-800/60 lg:bg-transparent lg:dark:bg-transparent shadow-sm lg:shadow-none border border-cyan-200 dark:border-cyan-800 lg:border-none opacity-100" : "opacity-60 hover:opacity-100"}`}
                >
                  {/* Glowing Node (Hidden on mobile row view, shown on desktop vertical view) */}
                  <div className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-4 items-center justify-center transition-all duration-500 z-10 
                    ${isActive ? "bg-gradient-to-br from-cyan-400 to-violet-500 border-white dark:border-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110" 
                    : "bg-gray-200 dark:bg-gray-800 border-gray-50 dark:border-gray-950 group-hover:border-cyan-400/50"}`}
                  >
                    <span className={`text-xl ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {project.icon}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold tracking-wider mb-1 uppercase transition-colors ${isActive ? "text-cyan-500" : "text-gray-500"}`}>
                      {project.category}
                    </span>
                    <h3 className={`text-lg md:text-xl font-bold transition-colors ${isActive ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-400"}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
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
              className="w-full bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-[2rem] shadow-2xl flex flex-col h-full relative overflow-hidden"
            >
              {/* Subtle inner top glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-violet-500 opacity-50" />

              {/* Browser Mockup Image Container */}
              <div className="relative w-full border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900">
                {/* Browser Bar */}
                <div className="w-full h-10 bg-gray-200/50 dark:bg-gray-950/50 flex items-center px-4 gap-2 backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                  <div className="ml-2 flex-grow max-w-sm h-5 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center px-3 text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                    {activeProject.live !== "#" ? activeProject.live : `localhost:3000/${activeProject.title.replace(/\s+/g, '-').toLowerCase()}`}
                  </div>
                </div>

                {/* Main Image */}
                <div 
                  className="relative overflow-hidden cursor-pointer aspect-video md:aspect-[21/9] lg:aspect-video xl:aspect-[21/9] group"
                  onClick={() => setSelectedImage(activeProject.image)}
                >
                  <img
                    src={activeProject.image}
                    alt={`Screenshot of ${activeProject.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Expand Overlay */}
                  <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-cyan-500 text-white p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FiMaximize2 className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold mb-4 border border-cyan-200 dark:border-cyan-800">
                      {activeProject.icon} {activeProject.category}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                      {activeProject.title}
                    </h2>
                  </div>

                  {/* Desktop Action Buttons (Top Right) */}
                  <div className="hidden xl:flex items-center gap-3">
                    {activeProject.live !== "#" ? (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-white bg-gray-900 hover:bg-cyan-500 dark:bg-gray-100 dark:hover:bg-cyan-400 dark:text-gray-900 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md"
                      >
                        <FiExternalLink /> Live Demo
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                        <FiDatabase /> Backend System
                      </span>
                    )}
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-200"
                    >
                      <FiGithub className="text-lg" /> Source
                    </a>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                  {activeProject.desc}
                </p>

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-sm font-semibold px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Action Buttons (Bottom) */}
                <div className="flex xl:hidden flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {activeProject.live !== "#" ? (
                    <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 px-5 py-3 rounded-xl">
                      <FiExternalLink /> Live Demo
                    </a>
                  ) : (
                    <span className="flex-1 flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400">
                      <FiDatabase /> Backend
                    </span>
                  )}
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 px-5 py-3 rounded-xl">
                    <FiGithub /> Source
                  </a>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Full-Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 sm:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-[95vw] lg:max-w-[80vw] w-auto max-h-[90vh] rounded-[1.5rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-gray-950 border border-gray-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-black/60 hover:bg-cyan-500 backdrop-blur-lg border border-white/20 text-white rounded-full p-3 hover:scale-110 transition-all duration-300 shadow-xl"
                  aria-label="Close Modal"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
              <div className="w-full h-full max-h-[90vh] overflow-y-auto custom-scrollbar bg-gray-900 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Expanded Project View"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}