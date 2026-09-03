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
  // Starts at 0% and pushes deep into negative percentages as you scroll down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    // The container is 300vh tall to give the user room to scroll
    // INVERTED: Background is deep black, text is white
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505] text-white">
      
      {/* The sticky wrapper keeps the content locked to the screen while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#050505]">
        
        {/* --- Top "Working Screen" Metadata --- */}
        <div className="flex w-full justify-between p-6 md:p-10 font-mono text-xs md:text-sm font-bold uppercase tracking-widest border-b border-white/10">
          <span className="text-white/60">SYS.PROCESS // 094.22</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6F118] animate-pulse" /> {/* Added your accent color here for the active status */}
            Status: Active
          </span>
          <span className="hidden md:block text-white/60">LAT. 43.090 // LNG. -79.084</span>
        </div>

        {/* --- Main Scrolling Text Track --- */}
        <div className="relative flex flex-1 items-center">
          {/* Subtle background grid to enhance the "screen" aesthetic (Inverted to faint white lines) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* The animated track */}
          <motion.div 
            style={{ x }} 
            className="flex whitespace-nowrap items-center gap-16 md:gap-32 px-[100vw]"
          >
            <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none">
              LOADING
            </h1>
            
            {/* Outline (Hollow) Text variation - Stroke changed to white */}
            <h1 
              className="text-[12vw] font-black uppercase tracking-tighter leading-none text-transparent"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
            >
              MY
            </h1>
            
            <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none">
              TECH
            </h1>

            {/* Outline (Hollow) Text variation */}
            <h1 
              className="text-[12vw] font-black uppercase tracking-tighter leading-none text-transparent"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
            >
              STACK
            </h1>
          </motion.div>
        </div>

        {/* --- Bottom "Working Screen" Metadata --- */}
        <div className="flex w-full justify-between p-6 md:p-10 font-mono text-xs md:text-sm font-bold uppercase tracking-widest border-t border-white/10">
          <span className="text-white/60">Buffer: Optimized</span>
          <span className="text-white/60">Scroll to process</span>
        </div>

        {/* Corner Crosshairs for UI aesthetic - Changed to white/30 */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/30 pointer-events-none" />

      </div>
    </section>
  );
}