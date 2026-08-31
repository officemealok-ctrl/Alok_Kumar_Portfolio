import React, { useState } from "react";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState(null); // for modal image

  const certifications = [
    {
      title: "Front End Web Developer Certification",
      organization: "Infosys Springboard",
      date: "March 2025",
      desc: "Comprehensive training in HTML5, CSS3, JavaScript, and responsive web design, with hands-on projects and UI optimization.",
      image: "/Frontend Web Devloper Certification_page-0001.jpg",
      verify: "https://verify.onwingspan.com/",
    },
    {
      title: "Python 3 Programming",
      organization: "Coursera",
      date: "2023",
      desc: "Learned advanced Python programming concepts including OOP, data handling, and automation with real-world exercises.",
      image: "/Python Certification_page-0001.jpg",
      verify: "https://coursera.org/verify/specialization/YHC6WU9VN9U4",
    },
    {
      title: "ReactJS, Angular, JavaScript, TypeScript, HTML5, CSS3",
      organization: "Infosys Springboard",
      date: "2024",
      desc: "Covered full front-end development ecosystem with modern frameworks, focusing on reusability, scalability, and UI efficiency.",
      image: "/Angular certificate_page-0001.jpg",
      verify: "https://verify.onwingspan.com/",
    },
    {
      title: "Google Prompting Essentials",
      organization: "Google",
      date: "December 2024",
      desc: "Gained hands-on experience with effective AI prompt engineering techniques using Google’s AI tools, focusing on clarity, context, and optimization for accurate responses.",
      image: "/Coursera Alok google prompt certification_page-0001.jpg",
      verify: "https://coursera.org/verify/5ZOBVSBEXXTV",
    },
    {
      title: "Business Intelligence and Data Analytics: Generate Insights",
      organization: "Macquarie University",
      date: "August 2024",
      desc: "Learned how to collect, analyze, and visualize data to derive actionable business insights using modern BI tools and analytical techniques.",
      image: "/Coursera busisness intelligence 3_page-0001.jpg",
      verify: "https://coursera.org/verify/YA5AMH628ZTZ",
    },
    {
      title: "Data Visualization and Dashboards with Excel and Cognos",
      organization: "IBM",
      date: "September 2024",
      desc: "Developed skills in creating interactive dashboards and visualizations using Microsoft Excel and IBM Cognos Analytics to present data-driven insights effectively.",
      image: "/Coursera visualization  and des with ex 2_page-0001.jpg",
      verify: "https://coursera.org/verify/QTZD5OXD56DR",
    },
  ];

  return (
    <section
      id="certifications"
      className="w-full py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative"
    >
      {/* Section Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          Verified certifications showcasing my continuous learning and professional skill development.
        </p>
      </div>
      

      {/* Certification Cards */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1500px] mx-auto">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Section */}
              <div
                className="relative w-full h-60 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-between px-4 pb-2 text-white text-sm">
                  <span className="font-medium">{cert.organization}</span>
                  <button
                    onClick={() => setSelectedImage(cert.image)}
                    className="bg-white/20 px-3 py-1 rounded-full text-xs hover:bg-white/40 transition"
                  >
                    View Certificate
                  </button>
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {cert.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {cert.organization}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {cert.date}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  {cert.desc}
                </p>

                {/* Verify Button */}
                <a
                  href={cert.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center px-5 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  🔗 Verify Certificate
                </a>
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
              alt="Full Certificate View"
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
