import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, MotionConfig } from 'framer-motion';
import { FiArrowUp, FiCompass } from 'react-icons/fi';

import Loader from "./components/Loader";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AWSbadges from './components/AWSbadges';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import GithubStats from './components/GithubStats';
import LinkedInBadge from './components/LinkedInBadge';
import AIResume from './components/AIResume';
import Blog from "./components/Blog";
import Contact from './components/Contact';
import Footer from './components/Footer';

// === Googlebot / Crawler Detection ===
const isBot = /bot|googlebot|crawler|spider|robot|crawling|google|bing/i.test(navigator.userAgent);

// === Sections to Track ===
const navSections = [
  { id: "hero", label: "Top" },
  { id: "awsbadges", label: "Live Badges" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Deployments" },
  { id: "skills", label: "Tech Stack" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Credentials" },
  { id: "github", label: "GitHub" },  
  { id: "linkedin", label: "LinkedIn" },
  { id: "ai", label: "AI Resume" },
  { id: "blog", label: "Insights" },
  { id: "contact", label: "Contact" }
];

export default function App() {
  // If a bot is detected, start with isLoading as FALSE to skip the loader entirely.
  const [isLoading, setIsLoading] = useState(!isBot);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // === Framer Motion Scroll Progress ===
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // === Theme & Loader Logic ===
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    
    // Only run the 2-second timer if it's a real human user
    if (!isBot) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, []);

  // === Back to Top & Active Section Tracker Logic ===
  useEffect(() => {
    if (isLoading) return; // Don't track while loading screen is active

    // 1. Back to Top Button Logic
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Intersection Observer for Right-Side Tracker
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Triggers when the section is exactly in the middle of the screen
      { rootMargin: "-40% 0px -40% 0px" } 
    );

    // Attach observer to all sections
    navSections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isLoading]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion={isBot ? "always" : "user"}>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-100">
        
        {/* === 1. Top Scroll Progress Bar === */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transform-origin-left z-[100]"
          style={{ scaleX }}
        />

        {/* === 2. Loader Animation === */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-[150] flex items-center justify-center bg-white dark:bg-[#0B0F19]"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* === 3. Main Portfolio Content === */}
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col w-full"
          >
            <Navbar />
            
            <div id="hero"><Hero /></div>
            <AWSbadges />
            <About />
            <Projects />
            <Skills />
            <Education />
            <Experience />
            <Certifications />
            <GithubStats />
            <LinkedInBadge />
            <AIResume />
            <Blog />
            <Contact />
            <Footer />
            
          </motion.main>
        )}

        {/* === 4. DYNAMIC RIGHT-SIDE SCROLL TRACKER (Desktop Only) === */}
        {!isLoading && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-4 items-end pointer-events-none">
            {navSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="group relative flex items-center justify-end w-full pointer-events-auto outline-none"
                  aria-label={`Scroll to ${section.label}`}
                >
                  {/* Expandable Glassmorphic Label */}
                  <span className={`mr-4 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md border shadow-lg flex items-center gap-2 ${
                    isActive 
                      ? "opacity-100 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/30 translate-x-0" 
                      : "opacity-0 translate-x-4 bg-white/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700/50 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}>
                    {isActive && <FiCompass className="animate-spin-slow" />} {section.label}
                  </span>
                  
                  {/* Glowing Dot */}
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-cyan-400 scale-150 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                      : "bg-gray-300 dark:bg-gray-700 group-hover:bg-cyan-300 dark:group-hover:bg-cyan-500 group-hover:scale-110"
                  }`} />
                </button>
              );
            })}
          </div>
        )}

        {/* === 5. Floating Back to Top Button === */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] p-3 md:p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-400/50 transition-colors outline-none"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="text-xl md:text-2xl" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </MotionConfig>
  );
}