import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiHome, FiUser, FiCode, FiLayers, FiCpu, FiMessageSquare } from "react-icons/fi";
import { profile } from "../data/profile";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [activeSection, setActiveSection] = useState("hero");

  // === Apply Theme on Load ===
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // === Advanced Scroll Tracker with Debounce (for smooth active state) ===
  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const sections = ["hero", "about", "skills", "projects", "ai", "blog", "contact"];
        let current = "hero";
        
        for (const id of sections) {
          const element = document.getElementById(id);
          if (element && window.scrollY >= element.offsetTop - 350) {
            current = id;
          }
        }
        setActiveSection(current);
      }, 50); // Small debounce for performance
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // === Desktop Nav Config ===
  const desktopLinks = [
    { id: "about", label: "About Me", title: "About Alok Kumar - Cloud Architect & Software Developer" },
    { id: "skills", label: "Skills", title: "Technical Skills: AWS, Docker, Terraform, CI/CD, React" },
    { id: "projects", label: "Projects", title: "Explore Cloud Computing & Full-Stack Web Projects" },
    { id: "ai", label: "AI Resume", title: "Interactive AI Resume & Tech Stack Explorer" },
    { id: "blog", label: "Blog", title: "Read Articles on AWS, Infrastructure as Code, and Software Engineering" },
    { id: "contact", label: "Contact", title: "Hire or Contact Alok Kumar for Cloud & Web Development" },
  ];

  // === Mobile Bottom Nav Config ===
  const mobileNavItems = [
    { id: "hero", icon: <FiHome />, label: "Home" },
    { id: "about", icon: <FiUser />, label: "About" },
    { id: "projects", icon: <FiLayers />, label: "Projects" },
    { id: "ai", icon: <FiCpu />, label: "AI" },
    { id: "contact", icon: <FiMessageSquare />, label: "Contact" },
  ];

  return (
    <>
      {/* =========================================
          TOP NAVBAR (Refined Desktop & Mobile Header)
          ========================================= */}
      <nav aria-label="Main Navigation" className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-[#080B12]/70 backdrop-blur-3xl border-b border-gray-200/50 dark:border-gray-800/30 shadow-sm transition-colors duration-500">
        <div className="w-full max-w-[1900px] mx-auto px-6 md:px-12 flex justify-between items-center py-1">
          
          {/* Brand / Logo - Your exact original name gradient */}
          <a
            href="#hero"
            aria-label={`${profile.name} - Cloud Computing Specialist & Full Stack Developer`}
            title={`${profile.name} - AWS, DevOps & MERN Stack Expert`}
            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-800 animate-gradient-x tracking-tighter"
          >
            {profile.name}
          </a>

          {/* Desktop Menu - Your exact structure, slightly refined aesthetics */}
          <ul className="hidden md:flex items-center space-x-10 text-gray-700 dark:text-gray-200 font-medium">
            {desktopLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  title={link.title}
                  className="relative group text-sm tracking-wide"
                >
                  <span className={`transition-colors duration-300 group-hover:text-cyan-500 ${activeSection === link.id ? "text-cyan-500 font-semibold" : ""}`}>
                    {link.label}
                  </span>
                  {/* Premium animated underline */}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-cyan-500 rounded-full transition-all duration-300 ease-out 
                    ${activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"}`} 
                  />
                </a>
              </li>
            ))}
            
            {/* Desktop Theme Toggle - Molding effect */}
            <li>
              <button 
                onClick={toggleTheme} 
                aria-label="Toggle Theme" 
                className="relative p-3 rounded-full flex items-center justify-center transition-all duration-300
                           bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                           shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(0,0,0,0.05)]
                           dark:shadow-[inset_0_1px_0px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.3)]
                           hover:border-cyan-500 dark:hover:border-cyan-500 group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? 
                      <FiMoon className="text-xl text-gray-700 group-hover:text-cyan-500 transition-colors" /> : 
                      <FiSun className="text-xl text-yellow-400" />
                    }
                  </motion.div>
                </AnimatePresence>
              </button>
            </li>
          </ul>

          {/* Mobile Theme Toggle - Same molding effect fixed top right */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme on Mobile"
            className="md:hidden relative p-3 rounded-xl flex items-center justify-center transition-all duration-300
                       bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                       shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_4px_rgba(0,0,0,0.05)]
                       dark:shadow-[inset_0_1px_0px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.3)]
                       group active:scale-95"
          >
             <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {theme === "light" ? 
                        <FiMoon className="text-2xl text-gray-700" /> : 
                        <FiSun className="text-2xl text-yellow-400" />
                    }
                </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* =========================================
          MOBILE APP BOTTOM NAV (Ultra-Premium Glass)
          ========================================= */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[100] pb-safe">
        <nav 
          className="flex items-center justify-between px-3 py-2 rounded-3xl relative
                     bg-white/50 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/5
                     shadow-[0_15px_35px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] 
                     dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.03)]"
        >
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full outline-none tap-highlight-transparent group"
                aria-label={`Maps to ${item.label}`}
              >
                {/* PREMIUM ACTIVE PILL: 
                  Instead of a solid color box, this is a deep molded glass button recessed into the bar.
                */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-premium-pill"
                    className="absolute inset-[2px] rounded-2xl z-0
                               bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800
                               shadow-[inset_0_2px_6px_rgba(0,0,0,0.05),0_1px_0px_rgba(255,255,255,0.8)]
                               dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_1px_0px_rgba(255,255,255,0.03)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                {/* Icon with subtle active cyan glow */}
                <span className={`relative z-10 text-2xl transition-all duration-300 
                  ${isActive ? "text-cyan-500 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
                  {item.icon}
                </span>

                {/* Tiny Label under Icon - cyan when active */}
                <span className={`relative z-10 text-[9px] font-black uppercase tracking-widest mt-1 transition-colors duration-300 hidden
                  ${isActive ? "text-cyan-500 block" : "text-gray-500 dark:text-gray-400 hidden"}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}