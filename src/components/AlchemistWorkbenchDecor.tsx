import React from 'react';
import { motion } from 'motion/react';

export function AlchemistWorkbenchDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Tabletop vignette & edge shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />

      {/* Atmospheric Alchemical Light Sources */}
      {/* 1. Warm Candlelight / Oil Lamp (Top Left) */}
      <motion.div
        animate={{
          opacity: [0.18, 0.26, 0.20, 0.28, 0.19],
          scale: [1, 1.05, 0.98, 1.04, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-amber-500/25 via-yellow-600/10 to-transparent blur-[90px]"
      />

      {/* 2. Emerald Philosopher's Elixir (Top Right) */}
      <motion.div
        animate={{
          opacity: [0.12, 0.18, 0.13, 0.20, 0.12],
          scale: [0.98, 1.03, 1, 1.05, 0.98],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-emerald-500/20 via-teal-700/10 to-transparent blur-[85px]"
      />

      {/* 3. Violet Arcane Aether Flask (Bottom Left) */}
      <motion.div
        animate={{
          opacity: [0.10, 0.16, 0.11, 0.17, 0.10],
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-28 -left-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-purple-600/15 via-indigo-700/10 to-transparent blur-[90px]"
      />

      {/* 4. Warm Crucible Glow (Bottom Right) */}
      <motion.div
        animate={{
          opacity: [0.15, 0.24, 0.17, 0.25, 0.15],
          scale: [1, 1.06, 0.99, 1.05, 1],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-amber-600/20 via-orange-600/10 to-transparent blur-[95px]"
      />

      {/* Etched Alchemical Transmutation Circle on the Table Surface */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[900px] h-[720px] sm:h-[900px] opacity-[0.07] pointer-events-none">
        <svg 
          viewBox="0 0 600 600" 
          className="w-full h-full text-amber-300 stroke-current animate-[spin_160s_linear_infinite]"
          fill="none"
          strokeWidth="1.2"
        >
          {/* Outer Ring with Celestial Tick Marks */}
          <circle cx="300" cy="300" r="280" strokeDasharray="3 7" strokeWidth="2" />
          <circle cx="300" cy="300" r="270" strokeWidth="1" />
          <circle cx="300" cy="300" r="260" strokeDasharray="8 4" strokeWidth="1.5" />

          {/* Interlocking Triangles (Fire & Water / Star of Hermes) */}
          <polygon points="300,50 516,425 84,425" strokeWidth="1.5" />
          <polygon points="300,550 516,175 84,175" strokeWidth="1.5" />

          {/* Intermediate Circle with Inscribed Square (Earth / Stability) */}
          <circle cx="300" cy="300" r="190" strokeWidth="1" />
          <rect x="165" y="165" width="270" height="270" strokeWidth="1.2" transform="rotate(45 300 300)" />
          <rect x="165" y="165" width="270" height="270" strokeWidth="1.2" />

          {/* Inner Circle & Sun / Moon Core */}
          <circle cx="300" cy="300" r="110" strokeDasharray="4 6" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="80" strokeWidth="1" />
          <circle cx="300" cy="300" r="40" strokeWidth="1.5" />
          
          {/* Radial Axis Rays */}
          <line x1="300" y1="20" x2="300" y2="580" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="20" y1="300" x2="580" y2="300" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="102" y1="102" x2="498" y2="498" strokeWidth="0.8" strokeDasharray="4 8" />
          <line x1="102" y1="498" x2="498" y2="102" strokeWidth="0.8" strokeDasharray="4 8" />

          {/* Alchemical Glyph Markers */}
          <circle cx="300" cy="50" r="10" fill="currentColor" fillOpacity="0.3" />
          <circle cx="516" cy="425" r="10" fill="currentColor" fillOpacity="0.3" />
          <circle cx="84" cy="425" r="10" fill="currentColor" fillOpacity="0.3" />
          <circle cx="300" cy="550" r="10" fill="currentColor" fillOpacity="0.3" />
          <circle cx="516" cy="175" r="10" fill="currentColor" fillOpacity="0.3" />
          <circle cx="84" cy="175" r="10" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Subtle floating gold ember motes */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '15%', left: '22%', delay: 0, dur: 4.2 },
          { top: '28%', left: '78%', delay: 1.2, dur: 5.1 },
          { top: '65%', left: '18%', delay: 2.1, dur: 4.8 },
          { top: '75%', left: '82%', delay: 0.7, dur: 5.5 },
          { top: '45%', left: '88%', delay: 1.8, dur: 4.5 },
          { top: '82%', left: '35%', delay: 2.5, dur: 5.2 },
        ].map((ember, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -45, -80],
              x: [0, (i % 2 === 0 ? 12 : -12), (i % 2 === 0 ? -8 : 8)],
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.2, 0.4],
            }}
            transition={{
              duration: ember.dur,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{ top: ember.top, left: ember.left }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b]"
          />
        ))}
      </div>
    </div>
  );
}
