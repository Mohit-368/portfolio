import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { projects } from '../data/portfolioData';
import GradientWaves from './GradientWaves'; 

const StackCard = ({ index, project, progress, totalCards }) => {
  const range = [index * (1 / totalCards), 1];
  
  const targetScale = 1 - ((totalCards - index) * 0.04);
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotate = useTransform(progress, range, [0, index % 2 === 0 ? -1 : 1]);

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center p-4">
      <motion.div
        style={{
          scale, 
          rotate, 
          opacity: 1, 
          backgroundColor: project.bgColor, 
          top: `calc(5vh + ${index * 30}px)` 
        }}
        className="relative w-[94vw] max-w-[1600px] p-8 md:p-12 border border-white/5 border-t-white/15 rounded-[2.5rem] shadow-[0_0_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl origin-top flex flex-col justify-between overflow-hidden group/card pointer-events-auto"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-8 xl:gap-12 h-full min-h-[400px]">
          
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/10 bg-black/20 text-xs font-mono-custom text-neutral-400 tracking-widest uppercase">
                {project.date}
              </div>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#EAEAEA]">
                {project.title}
              </h3>
              <p className="text-[#C6F118] font-mono-custom text-sm md:text-base mt-3 uppercase tracking-widest">
                {project.category}
              </p>
              
              <p className="text-neutral-400 font-mono-custom text-sm md:text-base leading-relaxed max-w-2xl mt-8">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-8">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/5 bg-black/40 text-xs font-mono-custom text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.image && (
            <div className="w-full xl:w-[40%] h-[300px] xl:h-auto min-h-[350px] relative rounded-[2rem] overflow-hidden border border-white/10 bg-black/20 shrink-0 z-10 shadow-inner">
              <div className="absolute inset-0 border border-white/5 rounded-[2rem] z-20 pointer-events-none" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 z-10" 
              />
            </div>
          )}

          <div className="flex gap-4 xl:flex-col shrink-0 items-start xl:items-end justify-start relative z-20">
            <a 
              href={project.liveLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-white hover:bg-[#C6F118] hover:text-black hover:border-[#C6F118] transition-all duration-300 group shadow-lg"
              title="View Live Site"
            >
              <ArrowUpRight size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href={project.githubLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group shadow-lg"
              title="View Source Code"
            >
              <Terminal size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default function ScrollStack() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="w-full relative z-20 bg-transparent" id="projects">

      {/* --- BACKGROUND LAYER --- */}
      {/* FIX: Removed 'overflow-hidden' from this parent div so 'sticky' works */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        
        {/* FIX: Moved 'overflow-hidden' here to contain the canvas perfectly */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <GradientWaves
            horizonColor="#050505" 
            waveColor="#404040"    
            crestColor="#ffffff"   
            speed={0.25}           
            amplitude={2.5}        
            waveScale={0.8}
            height={4.0}
            fogDepth={35}          
            brightness={1.3}       
            mouseInteraction={true}
          />
          {/* Custom linear gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#050505_0%,transparent_10%,transparent_90%,#050505_100%)] pointer-events-none" />
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-[94vw] mx-auto px-4 md:px-8 pt-32 pb-12 relative z-10 pointer-events-none">
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#EAEAEA] drop-shadow-2xl">
          Featured <span className="text-neutral-700">&</span><br/>
          <span className="text-white">Selected Projects</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full z-10 pointer-events-none" style={{ height: `${projects.length * 100}vh` }}>
        <div className="pointer-events-none">
          {projects.map((project, i) => (
            <StackCard key={i} index={i} project={project} progress={scrollYProgress} totalCards={projects.length} />
          ))}
        </div>
      </div>
      
    </div>
  );
}