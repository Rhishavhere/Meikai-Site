import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  // Subtle floating animation using requestAnimationFrame
  useAnimationFrame((t) => {
    if (orb1.current && orb2.current) {
      const x1 = Math.sin(t / 3000) * 50;
      const y1 = Math.cos(t / 2500) * 30;
      orb1.current.style.transform = `translate(${x1}px, ${y1}px)`;

      const x2 = Math.cos(t / 3500) * 60;
      const y2 = Math.sin(t / 2800) * 40;
      orb2.current.style.transform = `translate(${x2}px, ${y2}px)`;
    }
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* ✨ Layer 1: Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={orb1}
          className="absolute top-1/3 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-600/30 to-indigo-500/20 rounded-full blur-[180px] -translate-x-1/2"
        ></div>
        <div
          ref={orb2}
          className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-gradient-to-t from-sky-500/20 to-blue-700/10 rounded-full blur-[180px]"
        ></div>
      </div>

      {/* ✨ Layer 2: Subtle particles */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          ></motion.span>
        ))}
      </motion.div>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-light tracking-tight"
        >
          Meikai
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-gray-400 max-w-xl"
        >
          A browser built for clarity, calm, and focus.  
          Experience the web — without the noise.
        </motion.p>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mt-10 inline-block bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-gray-200 transition-all"
        >
          Join Waitlist
        </motion.a>
      </section>

      {/* WHY MEIKAI */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center" id="about">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-light"
        >
          Why Meikai?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Today’s browsers feel like operating systems — heavy, cluttered, and noisy.  
          Meikai strips all that away. It’s a minimal browser built for flow,  
          so you can focus on what matters: the content, the creation, the calm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-10"
        >
          {[
            {
              title: "Minimal Design",
              desc: "Every pixel has purpose. No clutter, no distractions — just the web.",
            },
            {
              title: "Light & Fast",
              desc: "Built with Tauri and React, Meikai runs like air — fast, native, efficient.",
            },
            {
              title: "Focus Mode",
              desc: "Hide all UI. Press one shortcut — just you and the website.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* WAITLIST */}
      <section
        id="waitlist"
        className="py-32 text-center bg-gradient-to-b from-black/0 via-blue-950/20 to-black"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-light mb-6"
        >
          Be part of the next web.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 mb-10"
        >
          Join the waitlist and get early access to Meikai’s first release.
        </motion.p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="px-6 py-3 rounded-full w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all"
          >
            Join Waitlist
          </button>
        </form>
      </section>
    </div>
  );
}
