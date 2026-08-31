import React, { useState } from "react";
import axios from "axios";
import { 
  FiUploadCloud, 
  FiCheckCircle, 
  FiLoader, 
  FiAlertTriangle, 
  FiStar, 
  FiTrendingUp, 
  FiBarChart2 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AIResume() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    setLoading(true);
    setResult(null);

    try {
      const resp = await axios.post(`${API_BASE}/api/analyze-resume`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      setError(`Analysis failed. Ensure backend is running at ${API_BASE}`);
    } finally {
      setLoading(false);
    }
  }

  // Handle both Gemini's rich format and the fallback format
  const score = result?.score || 0;
  const summary = result?.overall_summary || "Resume analyzed successfully. Review the automated metrics below.";
  const strengths = result?.key_strengths || (result?.highlights ? result.highlights.split(',') : []);
  const weaknesses = result?.improvement_areas || (result?.suggestions ? result.suggestions.split(/(?<=\.)\s+/) : []);
  const sectionScores = result?.section_scores || result?.breakdown || {};

  return (
    <section
      id="ai"
      className="w-full min-h-screen py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden"
    >
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-6 relative z-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          AI <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">ATS Scanner</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Upload your resume for an instant, AI-driven technical evaluation against modern ATS algorithms.
        </motion.p>
      </div>

      {/* Main Content: Full Width Grid */}
      <div className="w-full px-6 md:px-10 lg:px-16 2xl:px-24 relative z-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Upload & Score */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            
            {/* Upload Form */}
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={submit}
              className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50"
            >
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${file ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20" : "border-gray-300 dark:border-gray-600 hover:border-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                <FiUploadCloud className={`text-5xl mb-4 ${file ? "text-cyan-500" : "text-gray-400 dark:text-gray-500"}`} />
                <span className="text-gray-900 dark:text-white font-bold text-lg mb-1">
                  {file ? file.name : "Upload Document"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: PDF, DOCX, TXT
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <FiAlertTriangle /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !file}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-violet-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <FiLoader className="animate-spin text-xl" /> : <FiBarChart2 className="text-xl" />}
                {loading ? "Running AI Models..." : "Initiate Analysis"}
              </button>
            </motion.form>

            {/* Overall Score Display (Only shows when result exists) */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50 flex flex-col items-center justify-center text-center"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">ATS Match Score</h3>
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-gray-100 dark:text-gray-700"
                        strokeWidth="12"
                        stroke="currentColor"
                        fill="transparent"
                        r="80"
                        cx="96"
                        cy="96"
                      />
                      <motion.circle
                        className="text-cyan-500"
                        strokeWidth="12"
                        strokeLinecap="round"
                        stroke="url(#score-gradient)"
                        fill="transparent"
                        r="80"
                        cx="96"
                        cy="96"
                        initial={{ strokeDasharray: 502, strokeDashoffset: 502 }}
                        animate={{ strokeDashoffset: 502 - (502 * score) / 100 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-gray-900 dark:text-white">{score}</span>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ 100</span>
                    </div>
                  </div>
                  {result.experience_level && (
                    <span className="mt-6 px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-bold rounded-full text-sm uppercase tracking-wide">
                      {result.experience_level} Level
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: AI Insights Dashboard */}
          <div className="xl:col-span-8 relative">
            {!result && !loading && (
              <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700/50 rounded-3xl p-10 text-gray-400 dark:text-gray-500 min-h-[400px]">
                <FiBarChart2 className="text-6xl mb-4 opacity-50" />
                <p className="text-lg font-medium">Upload a resume to generate your AI dashboard.</p>
              </div>
            )}

            {loading && (
              <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-900/10 rounded-3xl p-10 min-h-[400px]">
                <FiLoader className="text-5xl text-cyan-500 animate-spin mb-4" />
                <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400 animate-pulse">Parsing syntax and analyzing tech stack...</p>
              </div>
            )}

            {result && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Executive Summary */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">Executive Summary</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{summary}</p>
                </motion.div>

                {/* Key Strengths */}
                <motion.div variants={itemVariants} className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                      <FiStar className="text-xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Key Strengths</h4>
                  </div>
                  <ul className="space-y-4">
                    {strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="leading-snug">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Improvement Areas */}
                <motion.div variants={itemVariants} className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                      <FiTrendingUp className="text-xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Actionable Advice</h4>
                  </div>
                  <ul className="space-y-4">
                    {weaknesses.map((item, idx) => {
                      if(!item.trim()) return null;
                      return (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <FiAlertTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                          <span className="leading-snug">{item.trim().replace(/^\d+\.\s*/, '')}</span>
                        </li>
                      )
                    })}
                  </ul>
                </motion.div>

                {/* Section Breakdowns (If provided by backend) */}
                {Object.keys(sectionScores).length > 0 && (
                  <motion.div variants={itemVariants} className="md:col-span-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                    <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">Metric Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(sectionScores).map(([key, val], idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{key}</span>
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">{val}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${val}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}