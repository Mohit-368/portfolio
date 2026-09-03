import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Zap, Database, Server, Workflow, Activity, Bot, 
  LayoutTemplate, Rocket, Cloud, ChevronDown
} from 'lucide-react';
import ScrollReveal from './ScrollReveal'; 

// --- Monochrome 3D Background Component ---
const ParticleNebula = () => {
  const pointsRef = useRef();
  
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      {/* Pure White Particles */}
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.25} sizeAttenuation={true} />
    </points>
  );
};

// --- Animated Flow Lines ---
const VerticalBeam = () => (
  <motion.div 
    initial={{ scaleY: 0, opacity: 0 }}
    whileInView={{ scaleY: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Hard out-expo ease
    className="w-[2px] h-8 md:h-12 bg-white/20 relative overflow-hidden mx-auto z-0 origin-top"
  >
    <motion.div
      className="absolute top-0 w-full h-[150%] bg-gradient-to-b from-transparent via-white to-transparent"
      initial={{ y: "-100%" }}
      animate={{ y: "150%" }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  </motion.div>
);

const HorizontalPulse = () => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-full bg-white/20 relative overflow-hidden origin-center"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
      initial={{ opacity: 0.1, scaleX: 0.8 }}
      animate={{ opacity: 1, scaleX: 1.1 }}
      transition={{ repeat: Infinity, duration: 2, direction: "alternate", ease: "easeInOut" }}
    />
  </motion.div>
);

// --- Detail Node ---
const DetailNode = ({ title, items }) => (
  <div className="flex flex-col items-center w-full mt-4">
    <div className="w-full border border-white/20 bg-black/60 rounded-xl p-4 relative">
      <h5 className="font-display font-bold text-white text-xs uppercase tracking-widest text-center mb-3">
        {title}
      </h5>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-xs font-mono text-neutral-300 hover:text-white transition-colors">
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- Main Layout Component ---
export default function InteractiveArchitectureFlow() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const architectureData = [
    { id: "data-layer", name: "Data Layer & Models", icon: Database, details: [{ group: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] }, { group: "AI Models", items: ["LLMs", "ML/DL", "PyTorch"] }] },
    { id: "system-design", name: "System Design", icon: Workflow, details: [{ group: "Performance", items: ["Caching", "Scalability"] }, { group: "Processing", items: ["Queues", "Background Jobs"] }, { group: "Traffic", items: ["Rate Limiting", "Load Balancing"] }] },
    { id: "devops", name: "DevOps", icon: Server, details: [{ group: "Infrastructure", items: ["Linux", "Docker", "Containerization"] }, { group: "Pipelines", items: ["CI/CD workflows"] }] },
    { id: "cloud", name: "Cloud (AWS)", icon: Cloud, details: [{ group: "Core Services", items: ["EC2", "S3", "RDS"] }, { group: "Networking & Admin", items: ["VPC", "IAM", "CloudWatch", "Load Balancer"] }] },
    { id: "production", name: "Production Operations", icon: Activity, details: [{ group: "Observability", items: ["Logging", "OpenTelemetry", "Metrics", "Distributed Tracing"] }, { group: "Security", items: ["Auth", "Secrets", "HTTPS"] }, { group: "Optimization", items: ["Cost Optimization"] }] }
  ];

  return (
    <section className="w-full min-h-screen bg-[#050505] relative overflow-hidden py-32 flex flex-col items-center">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleNebula />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="w-full flex flex-col items-center relative z-10 px-4">
        
        {/* === GSAP SCROLL REVEAL HEADER === */}
        <div className="text-center mb-24 flex flex-col items-center w-full">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={12}
            containerClassName="w-full flex justify-center !my-0"
            textClassName="font-display !text-4xl md:!text-6xl font-black uppercase tracking-tighter text-white !leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={5}
            containerClassName="w-full flex justify-center !my-4"
            textClassName="font-mono text-neutral-400 tracking-[0.2em] uppercase !text-xs md:!text-sm !font-normal"
          >
            Interactive Pipeline • Click nodes to expand
          </ScrollReveal>
        </div>

        {/* === FLOWCHART === */}
        <div className="flex flex-col items-center w-full max-w-[1000px] perspective-[1500px]">
          
          {/* ROOT CARD: Hard Drop & Tilt */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", y: 120, scale: 0.8, rotateX: -30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
            className="relative z-10 px-8 py-4 md:px-12 md:py-6 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] flex items-center gap-4 cursor-default"
          >
            <h3 className="font-display text-xl md:text-3xl font-black tracking-widest uppercase text-white">
              My Technical Architecture
            </h3>
          </motion.div>

          <VerticalBeam />

          {/* THE SPLIT (App & AI Engineering) */}
          <div className="relative w-full max-w-[900px]">
            <div className="absolute top-0 left-[25%] right-[25%] h-[2px]">
              <HorizontalPulse />
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-0">
              
              {/* Left Branch: Hard Smash from the Left */}
              <div className="w-full md:w-1/2 flex flex-col items-center perspective-[1000px]">
                <div className="hidden md:block"><VerticalBeam /></div>
                
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(20px)", x: -150, y: 80, rotateY: 30 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
                  onClick={() => toggleExpand('application')}
                  className="w-[90%] md:w-full max-w-[350px] p-6 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl hover:border-white/40 transition-colors z-10 cursor-pointer overflow-hidden shadow-2xl"
                >
                  <motion.div layout className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <LayoutTemplate className="text-white" size={24} />
                      <h4 className="font-display font-bold text-sm md:text-base tracking-widest uppercase text-white">Application</h4>
                    </div>
                    <motion.div animate={{ rotate: expandedId === 'application' ? 180 : 0 }} className="text-white/50">
                      <ChevronDown size={20} />
                    </motion.div>
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {expandedId !== 'application' ? (
                      <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                        {["MERN Stack", "Python Backend"].map((item, idx) => (
                          <div key={idx} className="px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-xs md:text-sm font-mono text-neutral-300 text-center">{item}</div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div key="expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <DetailNode title="MERN Stack" items={["React", "Node.js", "Express", "TypeScript"]} />
                        <DetailNode title="Python Backend" items={["FastAPI", "REST", "Async", "WebSockets"]} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <VerticalBeam />
              </div>

              {/* Right Branch: Hard Smash from the Right */}
              <div className="w-full md:w-1/2 flex flex-col items-center perspective-[1000px]">
                <div className="hidden md:block"><VerticalBeam /></div>
                
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(20px)", x: 150, y: 80, rotateY: -30 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
                  onClick={() => toggleExpand('ai-core')}
                  className="w-[90%] md:w-full max-w-[350px] p-6 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl hover:border-white/40 transition-colors z-10 cursor-pointer overflow-hidden shadow-2xl"
                >
                  <motion.div layout className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Bot className="text-white" size={24} />
                      <h4 className="font-display font-bold text-sm md:text-base tracking-widest uppercase text-white">AI Core</h4>
                    </div>
                    <motion.div animate={{ rotate: expandedId === 'ai-core' ? 180 : 0 }} className="text-white/50">
                      <ChevronDown size={20} />
                    </motion.div>
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {expandedId !== 'ai-core' ? (
                      <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                        {["LLMs", "RAG Pipeline", "AI Agents"].map((item, idx) => (
                          <div key={idx} className="px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-xs md:text-sm font-mono text-neutral-300 text-center">{item}</div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div key="expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <DetailNode title="LLMs" items={["Prompting", "Structured Output", "Function Calling"]} />
                        <DetailNode title="RAG" items={["Embeddings", "Vector Search", "Hybrid Search", "Chunking"]} />
                        <DetailNode title="Agents" items={["LangGraph", "Tool Use", "Memory", "Workflows"]} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <VerticalBeam />
              </div>
            </div>

            <div className="absolute bottom-0 left-[25%] right-[25%] h-[2px] hidden md:block">
              <HorizontalPulse />
            </div>
          </div>

          <VerticalBeam />

          {/* THE TRUNK (Core Backend) */}
          <motion.div layout className="flex flex-col items-center w-full gap-0 perspective-[1000px]">
            {architectureData.map((tech) => (
              <div key={tech.id} className="flex flex-col items-center w-full">
                
                {/* TRUNK CARDS: 3D Drawbridge Drop */}
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(15px)", y: 100, rotateX: -45, scale: 0.9, transformOrigin: "top" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
                  onClick={() => toggleExpand(tech.id)}
                  className="w-full max-w-[450px] p-4 rounded-xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl flex flex-col group hover:border-white/40 transition-all z-10 cursor-pointer overflow-hidden relative shadow-2xl"
                >
                  <motion.div layout className="flex items-center justify-between w-full">
                    <span className="font-mono font-bold tracking-wider text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors uppercase">
                      {tech.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <motion.div animate={{ rotate: expandedId === tech.id ? 180 : 0 }} className="text-white/40 group-hover:text-white transition-colors">
                        <ChevronDown size={18} />
                      </motion.div>
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${expandedId === tech.id ? 'border-white bg-white text-black' : 'border-white/10 bg-black/40 text-neutral-400 group-hover:text-white group-hover:border-white/40'}`}>
                        <tech.icon size={18} />
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {expandedId === tech.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10"
                      >
                        {tech.details.map((section, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <span className="text-white text-xs font-mono uppercase tracking-widest">{section.group}</span>
                            <div className="flex flex-wrap gap-2">
                              {section.items.map((item, j) => (
                                <span key={j} className="px-2 py-1 rounded border border-white/20 bg-black/60 text-xs text-neutral-200">{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <VerticalBeam />
              </div>
            ))}
          </motion.div>

          {/* FINAL NODE (Production) - Explosive Blast Up */}
          <motion.div
            layout
            initial={{ opacity: 0, filter: "blur(30px)", scale: 0.5, y: 150 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
            whileHover={{ scale: 1.05 }}
            className="relative z-10 px-10 md:px-20 py-8 md:py-10 mt-4 rounded-[2.5rem] bg-white flex flex-col items-center gap-4 shadow-[0_0_80px_-15px_rgba(255,255,255,0.4)] cursor-pointer group"
          >
            <Rocket size={48} className="text-black group-hover:-translate-y-4 group-hover:translate-x-4 transition-transform duration-700 ease-out" />
            <div className="flex flex-col items-center text-center">
              <h3 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-black leading-none">
                Production Ready!
              </h3>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}