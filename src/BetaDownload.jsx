import { motion } from "framer-motion";

export default function BetaDownload() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Meikai_0.1.0_x64-setup.exe";
    link.download = "Meikai_0.1.0_x64-setup.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-600/30 to-indigo-500/20 rounded-full blur-[180px] -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-gradient-to-t from-sky-500/20 to-blue-700/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Content */}
      <div className="text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-light tracking-tight mb-8"
        >
          Beta Access
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12"
        >
          Download the early beta version of Meikai Browser
        </motion.p>

        <motion.button
          onClick={handleDownload}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-black px-12 py-5 rounded-full font-medium text-lg hover:bg-gray-200 transition-all inline-flex items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Meikai Beta
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-gray-500 text-sm"
        >
          Version 0.1.0 - Windows x64
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 inline-block text-gray-400 hover:text-white transition-colors underline"
        >
          Back to Home
        </motion.a>
      </div>
    </div>
  );
}
