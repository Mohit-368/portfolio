import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { timelineData } from '../data/portfolioData';

export default function ExperienceDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-[#F9F9F9] text-[#050505] py-24 md:py-32 px-4 md:px-8 flex flex-col items-center relative z-40" id="experience">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-royal { font-family: 'Playfair Display', serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- SECTION HEADER --- */}
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-2 border-black/10 pb-8">
        <div>
          <h2 className="font-royal text-5xl md:text-7xl font-black uppercase tracking-tight text-[#050505] leading-none mb-4">
            Education &<br />Experience
          </h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-black/60 font-bold">
            Professional & Academic Timeline
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-5 py-3 rounded-full mt-6 md:mt-0 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#C6F118] animate-pulse" />
          Select a row to expand
        </div>
      </div>

      {/* --- THE KINETIC VERTICAL ACCORDION --- */}
      <div className="w-full max-w-[1400px] h-[75vh] min-h-[600px] md:h-[750px] flex flex-col border-2 border-black shadow-[15px_15px_0px_rgba(0,0,0,0.1)] bg-[#EAEAEA] overflow-hidden rounded-2xl relative z-10">
        
        {timelineData.map((item, index) => {
          const isActive = activeIndex === index;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              animate={{ 
                // FIXED: Dynamic math automatically calculates height based on array length!
                // Every inactive row gets 85px. The active row takes exactly whatever space is left.
                height: isActive ? `calc(100% - ${(timelineData.length - 1) * 85}px)` : "85px",
                backgroundColor: isActive ? "#FFFFFF" : "#EAEAEA"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`w-full border-b border-black/20 last:border-b-0 overflow-hidden cursor-pointer group flex flex-col shrink-0`}
            >
              
              {/* --- HEADER ROW (Always 85px tall) --- */}
              <div className="w-full h-[85px] px-6 md:px-10 flex items-center justify-between shrink-0">
                
                <div className="flex items-center gap-6 md:gap-12 w-full pr-4">
                  <span className={`font-mono text-xs md:text-sm font-bold uppercase tracking-widest shrink-0 transition-colors duration-300 ${isActive ? 'text-black' : 'text-black/50 group-hover:text-black/80'}`}>
                    {item.duration.split(" ")[0]}
                  </span>

                  <h3 
                    className={`font-display text-lg md:text-3xl font-black uppercase tracking-tight truncate transition-all duration-300 ${isActive ? 'text-[#050505]' : 'text-transparent'}`}
                    style={{ WebkitTextStroke: isActive ? "0px" : "1px rgba(0,0,0,0.6)" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? 'border-black bg-black text-white scale-100' : 'border-black/30 text-black/40 scale-75 group-hover:scale-100 group-hover:border-black/60 group-hover:text-black/60'}`}>
                  <ArrowRight size={16} className={`transition-transform duration-500 ${isActive ? 'rotate-90' : 'rotate-0'}`} />
                </div>
              </div>

              {/* --- EXPANDED CONTENT --- */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex-1 w-full px-6 md:px-12 pb-8 pt-2 flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center relative hide-scroll overflow-y-auto"
                  >
                    
                    <Icon strokeWidth={0.5} className="absolute bottom-5 right-10 w-[200px] h-[200px] md:w-[350px] md:h-[350px] text-black/[0.03] rotate-12 pointer-events-none" />

                    {/* Left Column */}
                    <div className="w-full md:w-5/12 flex flex-col gap-5 relative z-10 border-l-4 border-black pl-6 mt-2 md:mt-4 shrink-0">
                      <h4 className="font-royal text-3xl md:text-5xl font-black leading-tight text-[#050505]">
                        {item.organization}
                      </h4>
                      
                      <div className="flex flex-col gap-3 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-black/70">
                        <span className="flex items-center gap-3">
                          <Calendar size={16} className="text-black" /> {item.duration}
                        </span>
                        <span className="flex items-center gap-3">
                          <MapPin size={16} className="text-black" /> {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-7/12 flex flex-col gap-6 relative z-10 mt-0 md:mt-4">
                      <p className="font-display text-sm md:text-xl leading-relaxed text-[#050505] font-medium">
                        {item.description}
                      </p>
                      
                      <div className="pt-6 border-t-2 border-black/10">
                        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-4">
                          My Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {item.tech.map((tech, i) => (
                            <span key={i} className="px-4 py-2 border-2 border-black/10 bg-[#F5F5F5] text-[#050505] font-mono text-xs font-bold tracking-widest uppercase rounded-lg shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}