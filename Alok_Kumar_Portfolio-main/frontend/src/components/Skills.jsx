import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCloud, FiServer, FiLayout, FiDatabase } from "react-icons/fi";

const skillCategories = [
  {
    title: "Cloud & DevOps",
    icon: <FiCloud size={32} className="text-cyan-500" />,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines", "Linux", "Serverless Architecture"],
  },
  {
    title: "Backend & APIs",
    icon: <FiServer size={32} className="text-violet-500" />,
    skills: ["Node.js", "Express.js", "Python", "FastAPI", "RESTful APIs", "Microservices", "GraphQL"],
  },
  {
    title: "Frontend Development",
    icon: <FiLayout size={32} className="text-pink-500" />,
    skills: ["React.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Next.js"],
  },
  {
    title: "Databases & Tools",
    icon: <FiDatabase size={32} className="text-amber-500" />,
    skills: ["MongoDB", "PostgreSQL / SQL", "Redis", "Git & GitHub", "Docker Compose", "Postman"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="w-full py-20 px-6 md:px-16 lg:px-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Technical{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Arsenal
          </span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          A categorized overview of the technologies, frameworks, and cloud infrastructure tools I use to architect and deploy scalable applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, index) => (
          <CategoryCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full mb-4 shadow-inner">
          {category.icon}
        </div>
        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {category.title}
        </h4>
      </div>

      <div className="flex flex-wrap justify-center gap-3 relative z-10">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + i * 0.05 }}
            className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}