import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUploadCloud,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiMapPin
} from "react-icons/fi";
import { motion } from "framer-motion";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  // Use Vite environment variable for backend base URL in production (set VITE_API_URL in Vercel)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) data.append("file", file);

    try {
      setLoading(true);
      setSent(false);
      const res = await axios.post(`${API_BASE}/api/contact/send`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Message sent successfully ✅", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFile(null);
      setSent(true);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to send message ❌ — Server Error`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden flex items-center"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full px-6 md:px-10 lg:px-16 2xl:px-24 relative z-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col justify-center h-full"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-3 block">
                Initiate Connection
              </span>
              <h2 className="text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Let's Build Something <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  Scalable.
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
                Whether you are looking for a Cloud Architecture consultation, a Full-Stack development partner, or simply want to connect—drop a message below.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-cyan-400/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 text-2xl flex-shrink-0">
                  <FiMail />
                </div>
                <div>
  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
    Email
  </h4>
  <a 
    href="mailto:alokkumarkaranraj@gmail.com" 
    className="text-base md:text-lg font-semibold text-gray-900 dark:text-white hover:text-cyan-500 transition-colors break-all"
  >
    alokkumarkaranraj@gmail.com
  </a>
</div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-violet-400/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 text-2xl flex-shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                  <a href="tel:+919113793533" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-violet-500 transition-colors">
                    +91 91137 93533
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-cyan-400/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 text-2xl flex-shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    India
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white/80 dark:bg-gray-800/60 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-700/80 flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-500 transition-colors text-lg" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
                
                {/* Email Input */}
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-500 transition-colors text-lg" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    required
                    type="email"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Input */}
                <div className="relative group">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors text-lg" />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    type="tel"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  />
                </div>
                
                {/* Subject Input */}
                <div className="relative group">
                  <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors text-lg" />
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="relative group h-full flex-grow">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="How can I help you? *"
                  required
                  className="w-full p-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* === File Upload === */}
              <motion.label
                whileHover={{ scale: 1.01 }}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed ${
                  file
                    ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                } rounded-xl p-8 text-center cursor-pointer transition-all duration-300`}
              >
                <FiUploadCloud className={`text-4xl mb-3 transition-colors ${file ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400"}`} />
                <span className={`font-medium ${file ? "text-cyan-700 dark:text-cyan-300" : "text-gray-600 dark:text-gray-400"}`}>
                  {file ? (
                    <span className="flex items-center gap-2">
                      <FiCheckCircle /> {file.name}
                    </span>
                  ) : (
                    "Drag & drop a file, or click to browse (optional)"
                  )}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-2">Max file size: 5MB (PDF, DOC, JPG, PNG)</span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="hidden"
                />
              </motion.label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 mt-2 font-bold text-lg tracking-wide flex items-center justify-center gap-3 text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin text-2xl" /> Sending Transmission...
                  </>
                ) : sent ? (
                  <>
                    <FiCheckCircle className="text-2xl" /> Message Delivered!
                  </>
                ) : (
                  <>
                    <FiSend className="text-2xl" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}