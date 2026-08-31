import React from "react";

export default function Blog() {
  return (
    <section
      id="blog"
      className="w-full py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative"
    >
      {/* ===== Section Header ===== */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          My{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Blog
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
  Welcome to my blog — a space where I share whatever inspires me, from tech and coding to personal stories, reflections, and everyday thoughts.
</p>

      </div>

      {/* ===== Blog Embed Container ===== */}
      <div className="w-full px-6">
        <div className="relative max-w-[1500px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
          {/* Animated Gradient Border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 rounded-3xl blur-[2px] opacity-60 pointer-events-none animate-pulse"></div>

          {/* Blog Iframe */}
          <iframe
            src="https://alokkumarkaran.blogspot.com"
            title="Alok Kumar Blog"
            className="relative w-full h-[85vh] rounded-3xl z-10"
            loading="lazy"
            style={{
              border: "none",
              overflow: "auto",
            }}
          ></iframe>
        </div>
      </div>

      {/* ===== Visit Blog Button ===== */}
      <div className="text-center mt-12">
        <a
          href="https://alokkumarkaran.blogspot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full text-sm md:text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Visit My Blog Page
        </a>
      </div>
    </section>
  );
}
