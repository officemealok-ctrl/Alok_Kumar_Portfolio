import React, { useState } from "react";

export default function Experience() {
  const [selectedImage, setSelectedImage] = useState(null);

  const experiences = [
    {
      role: "SQL Developer Intern",
      company: "Elevate Labs (Remote)",
      duration: "Jun 2025 - Jul 2025",
      type: "Internship",
      tech: ["SQL", "MySQL", "Excel"],
      image: "/Alok_Kumar_SQL_Internship_certificate_page-0001.jpg",
      details:
        "Designed and implemented an Airline Reservation System database with optimized schema and relational integrity. Created SQL queries, triggers, and stored procedures reducing query execution time by 20%. Built Excel dashboards to visualize occupancy and booking analytics.",
    },
    {
      role: "Full Stack Developer Intern",
      company: "Infosys Springboard 6.0",
      duration: "Feb 2025 - Apr 2025",
      type: "Internship",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      image: "/Infosys_Internship_Certificate_page-0001.jpg",
      details:
        "Developed a full-stack project titled 'Hire-A-Helper' — a service marketplace platform connecting customers and service providers. Implemented authentication, job listings, and responsive UI using React.js and Node.js.",
    },
    {
      role: "Full Stack Developer (Academic Project)",
      company: "Chandigarh University",
      duration: "Aug 2024 - Dec 2024",
      type: "Project",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      image: "/Skill-Swap.jpg",
      details:
        "Built 'Skill-Swap E-Learning Platform', a MERN-based e-learning and peer-to-peer skill exchange system featuring OTP verification, role-based access, and secure payment integration.",
    },
  ];

  return (
    <section
      id="experience"
      className="w-full py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative"
    >
      {/* Section Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Experience
          </span>{" "}
          & Internships
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          My professional journey including full-time roles, internships, and academic projects.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="w-full px-6">
        <div className="grid gap-10 max-w-[1500px] mx-auto md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image Section */}
              <div
                className="relative h-56 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(exp.image)}
              >
                <img
                  src={exp.image}
                  alt={`${exp.company} certificate`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {exp.company}
                </div>
                <button
                  onClick={() => setSelectedImage(exp.image)}
                  className="absolute bottom-4 right-4 bg-white/20 px-4 py-1 rounded-full text-xs hover:bg-white/40 transition"
                >
                  View Certificate
                </button>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <div className="text-cyan-500 font-bold text-sm md:text-base mb-2">
                  {exp.duration}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.role}{" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({exp.type})
                  </span>
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">
                  {exp.details}
                </p>

                {/* Tech Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-200 to-violet-200 text-cyan-800 dark:from-cyan-700 dark:to-violet-700 dark:text-white text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] mx-4 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Certificate View"
              className="w-full h-full object-contain bg-gray-900"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/30 hover:bg-white/60 text-white rounded-full px-3 py-1 text-lg font-bold transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
