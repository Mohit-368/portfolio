import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HorizontalScrollText() {
  const targetRef = useRef(null);

  // Tracks the scroll progress through the massive 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Maps the scroll progress (0 to 1) to horizontal movement (x-axis)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#EAEAEA] text-[#050505]">
      
      {/* 👑 Injecting the Royal Serif Font just for this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-royal {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* The sticky wrapper keeps the content locked to the screen while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#EAEAEA]">
        
        {/* --- TEXTURE LAYERS (Middle Canvas) --- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,transparent_100%)] opacity-70 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-multiply z-0" />

        {/* --- HEAVY BLACK TOP BAR (Letterbox Effect) --- */}
        <div className="bg-[#050505] text-white flex w-full justify-between p-6 md:p-8 font-mono text-xs md:text-sm font-bold uppercase tracking-widest relative z-20 shadow-2xl border-b border-white/10">
          <span className="text-white/60">SYS.PROCESS // 094.22</span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C6F118] animate-pulse shadow-[0_0_10px_rgba(198,241,24,0.5)]" /> 
            Status: Active
          </span>
          <span className="hidden md:block text-white/60">LAT. 43.090 // LNG. -79.084</span>
        </div>

        {/* --- Main Scrolling Royal Text Track --- */}
        <div className="relative flex flex-1 items-center z-10">
          <motion.div 
            style={{ x }} 
            className="flex whitespace-nowrap items-center gap-12 md:gap-24 px-[100vw]"
          >
            {/* Solid Royal Text */}
            <h1 className="text-[13vw] font-royal font-black uppercase tracking-normal leading-none drop-shadow-md text-[#050505]">
              LOADING
            </h1>
            
            {/* Italicized Hollow Royal Text */}
            <h1 
              className="text-[14vw] font-royal italic font-bold uppercase tracking-normal leading-none text-transparent"
              style={{ WebkitTextStroke: "2px #050505" }}
            >
              MY
            </h1>
            
            {/* Solid Royal Text */}
            <h1 className="text-[13vw] font-royal font-black uppercase tracking-normal leading-none drop-shadow-md text-[#050505]">
              TECH
            </h1>

            {/* Italicized Hollow Royal Text */}
            <h1 
              className="text-[14vw] font-royal italic font-bold uppercase tracking-normal leading-none text-transparent"
              style={{ WebkitTextStroke: "2px #050505" }}
            >
              STACK
            </h1>
          </motion.div>
        </div>

        {/* --- HEAVY BLACK BOTTOM BAR (Letterbox Effect) --- */}
        <div className="bg-[#050505] text-white flex w-full justify-between p-6 md:p-8 font-mono text-xs md:text-sm font-bold uppercase tracking-widest relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-white/10">
          <span className="text-white/60">Buffer: Optimized</span>
          <span className="text-white/60">Scroll to process</span>
        </div>

        {/* Corner Crosshairs (Anchored against the black bars) */}
        <div className="absolute top-[80px] md:top-[90px] left-8 w-6 h-6 border-t-2 border-l-2 border-black/40 pointer-events-none z-10" />
        <div className="absolute top-[80px] md:top-[90px] right-8 w-6 h-6 border-t-2 border-r-2 border-black/40 pointer-events-none z-10" />
        <div className="absolute bottom-[80px] md:bottom-[90px] left-8 w-6 h-6 border-b-2 border-l-2 border-black/40 pointer-events-none z-10" />
        <div className="absolute bottom-[80px] md:bottom-[90px] right-8 w-6 h-6 border-b-2 border-r-2 border-black/40 pointer-events-none z-10" />

      </div>
    </section>
  );
}