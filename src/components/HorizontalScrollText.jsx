import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Terminal, Cpu, Network } from 'lucide-react';

export default function HorizontalScrollText() {
  const targetRef = useRef(null);

  // Tracks the scroll progress through a massive 250vh container for a longer, smoother animation
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"]
  });

  // --- 1. THE NEON LASER SWEEP ---
  // Starts clipping 100% from the bottom, goes to 0% (Reveals Top-to-Bottom)
  const neonClipBottom = useTransform(scrollYProgress, [0.1, 0.7], [100, 0]);
  const neonClipPath = useMotionTemplate`inset(0% 0% ${neonClipBottom}% 0%)`;

  // --- 2. THE SOLID BLACK FILL ---
  // Trails slightly behind the neon sweep (starts at 0.25 instead of 0.1)
  const blackClipBottom = useTransform(scrollYProgress, [0.25, 0.85], [100, 0]);
  const blackClipPath = useMotionTemplate`inset(0% 0% ${blackClipBottom}% 0%)`;

  // --- 3. PARALLAX SCALE ---
  // Slowly scales the text up as the user scrolls
  const textScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#EAEAEA] text-[#050505]">
      
      {/* 🚀 Ultra-Tech Font (Chakra Petch) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
        .font-tech {
          font-family: 'Chakra Petch', sans-serif;
        }
        .bg-grid-tech {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 3rem 3rem;
        }
      `}</style>

      {/* The sticky wrapper keeps the content locked to the screen while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#EAEAEA]">
        
        {/* --- HEAVY BLACK TOP BAR --- */}
        <div className="bg-[#050505] text-white flex w-full justify-between items-center p-5 md:p-8 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest relative z-30 shadow-2xl border-b border-white/10 shrink-0">
          <span className="flex items-center gap-2 text-white/60">
            <Terminal size={14} className="text-[#C6F118]" /> 
            SYS.PROCESS // RENDER_ENGINE
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-sm bg-[#C6F118] animate-pulse shadow-[0_0_10px_rgba(198,241,24,0.5)]" /> 
            Status: Active
          </span>
          <span className="hidden md:flex items-center gap-2 text-white/60">
            <Network size={14} /> 
            NODE.79.084
          </span>
        </div>

        {/* --- MIDDLE CANVAS (Where the 3-Layer Scanner happens) --- */}
        <div className="relative flex flex-1 items-center justify-center z-10 w-full overflow-hidden bg-grid-tech">
          
          {/* Subtle Film Grain */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-multiply z-0" />
          
          {/* Center Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* DYNAMIC CROSSHAIRS (The Targeting HUD) */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 w-8 h-8 border-t-4 border-l-4 border-black/20 pointer-events-none z-10" />
          <div className="absolute top-8 right-8 md:top-12 md:right-12 w-8 h-8 border-t-4 border-r-4 border-black/20 pointer-events-none z-10" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-8 h-8 border-b-4 border-l-4 border-black/20 pointer-events-none z-10" />
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-8 h-8 border-b-4 border-r-4 border-black/20 pointer-events-none z-10" />

          {/* --- THE 3-LAYER TEXT CONTAINER --- */}
          <motion.div 
            style={{ scale: textScale }}
            className="relative text-center z-20 px-4 w-full flex justify-center"
          >
            
            {/* HUD Blueprint Data (Small text around the main block) */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 flex items-center gap-4">
              <span>SCANNING</span>
              <span className="w-12 h-[1px] bg-black/20" />
              <span>V.09.44</span>
            </div>

            <div className="relative">
              {/* LAYER 1: Base Wireframe (Faint Outline) */}
              <h1 
                className="text-[18vw] md:text-[14vw] font-tech font-bold uppercase tracking-tighter leading-[0.85] text-transparent"
                style={{ WebkitTextStroke: "2px rgba(0,0,0,0.15)" }}
              >
                MY TECH<br />STACK
              </h1>
              
              {/* LAYER 2: The Neon Laser Sweep (Scans down first) */}
              <motion.h1 
                style={{ clipPath: neonClipPath }}
                className="absolute top-0 left-0 w-full h-full text-[18vw] md:text-[14vw] font-tech font-bold uppercase tracking-tighter leading-[0.85] text-[#C6F118]"
              >
                MY TECH<br />STACK
              </motion.h1>

              {/* LAYER 3: The Solid Black Fill (Trails the neon sweep) */}
              <motion.h1 
                style={{ clipPath: blackClipPath }}
                className="absolute top-0 left-0 w-full h-full text-[18vw] md:text-[14vw] font-tech font-bold uppercase tracking-tighter leading-[0.85] text-[#050505]"
              >
                MY TECH<br />STACK
              </motion.h1>
            </div>

          </motion.div>

        </div>

        {/* --- HEAVY BLACK BOTTOM BAR --- */}
        <div className="bg-[#050505] text-white flex w-full justify-between items-center p-5 md:p-8 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-white/10 shrink-0">
          <span className="flex items-center gap-2 text-white/60">
            <Cpu size={14} className="text-[#C6F118]" /> 
            Buffer: Optimized
          </span>
          <span className="text-white/60">Scroll to deploy &gt;&gt;&gt;</span>
        </div>

      </div>
    </section>
  );
}