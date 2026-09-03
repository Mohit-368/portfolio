import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING KERNEL...");
  const [uiHidden, setUiHidden] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // The terminal phrases that will flash as it loads
  const phrases = [
    "INITIALIZING KERNEL...",
    "ALLOCATING MEMORY...",
    "MOUNTING FILE SYSTEMS...",
    "STARTING DAEMONS...",
    "LOADING NEURAL WEIGHTS...",
    "BYPASSING SECURITY...",
    "SYSTEM ONLINE."
  ];

  useEffect(() => {
    const duration = 2200; // Slightly longer for a more cinematic feel
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      // Map the current progress to the array of phrases
      const phraseIndex = Math.min(
        Math.floor((currentProgress / 100) * phrases.length),
        phrases.length - 1
      );
      setLoadingText(phrases[phraseIndex]);

      if (currentStep >= steps) {
        clearInterval(timer);
        setLoadingText("SYSTEM ONLINE.");
        
        // --- THE CHOREOGRAPHED EXIT SEQUENCE ---
        
        // 1. Pause briefly at 100%
        setTimeout(() => {
          // 2. Suck all the UI inwards (blur, scale down, fade out)
          setUiHidden(true);
          
          // 3. Wait for UI to vanish, then slide the massive black curtain up
          setTimeout(() => {
            setIsExiting(true);
            
            // 4. Wait for curtain to finish sliding before unmounting
            setTimeout(() => {
              onComplete();
            }, 1000); 
          }, 600);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      // The Curtain Rise Animation
      initial={{ y: 0 }}
      animate={{ y: isExiting ? "-100vh" : 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-8 md:p-12 overflow-hidden pointer-events-none"
    >
      {/* Subtle Background Grid for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />

      <AnimatePresence>
        {!uiHidden && (
          <>
            {/* --- TOP HEADER --- */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-between w-full font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-500 relative z-10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-white">System Initialization</span>
                <span>V 2.0.4</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-white">{Math.floor(progress)} / 100</span>
                <span className="animate-pulse">REC</span>
              </div>
            </motion.div>

            {/* --- CENTER MASSIVE PERCENTAGE --- */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                {/* Background outline shadow text */}
                <h1 
                  className="absolute text-[35vw] md:text-[25vw] font-display font-black leading-none tracking-tighter text-transparent"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}
                >
                  {Math.floor(progress)}
                </h1>
                {/* Main Text */}
                <h1 className="text-[25vw] md:text-[20vw] font-display font-black text-white leading-none tracking-tighter mix-blend-difference">
                  {Math.floor(progress)}
                </h1>
              </motion.div>
            </div>

            {/* --- BOTTOM PROGRESS BAR --- */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="w-full flex flex-col gap-4 relative z-10"
            >
              <div className="flex justify-between w-full font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                <span className="text-white tracking-[0.2em]">{loadingText}</span>
                <span>Please Wait</span>
              </div>
              
              <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
                {/* The Fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white origin-left"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                {/* A glowing tip at the end of the progress bar */}
                <motion.div
                  className="absolute top-[-2px] h-[6px] w-[10px] bg-white shadow-[0_0_10px_#fff] rounded-full"
                  style={{ left: `calc(${progress}% - 5px)` }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}