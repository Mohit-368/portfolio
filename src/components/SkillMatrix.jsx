import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';

// --- LUCIDE ICONS ---
import { 
  Network, Clock, Globe, Wifi, Box, Download, Scissors, Hash, 
  Search, ListOrdered, FileText, BarChart, Activity, Wrench, 
  HardDrive, GitMerge, User, Cpu, ArrowLeftRight, Braces, 
  TerminalSquare, Cog, Gauge, Scale, Maximize, Repeat, Server, 
  Archive, Key, Radar, Lock, Coins, Code2, ArrowRight, Brain, 
  Shield, Database, LineChart, PlayCircle, Layers, Cloud, Terminal as TerminalIcon
} from 'lucide-react';

// --- REACT ICONS ---
import { 
  SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, 
  SiFastapi, SiPython, SiPytorch, SiPostgresql, 
  SiRedis, SiRabbitmq, SiNginx, SiLinux, SiDocker, 
  SiPrometheus, SiElasticsearch
} from 'react-icons/si';

// --- Exhaustive Data Structure ---
const skillsData = [
  { 
    id: "mern", category: "MERN Stack", icon: SiReact, 
    skills: [
      { name: "React", detail: "UI Components", icon: SiReact },
      { name: "TypeScript", detail: "Type Safety", icon: SiTypescript },
      { name: "Node.js", detail: "Runtime", icon: SiNodedotjs },
      { name: "Express", detail: "Web Framework", icon: SiExpress },
      { name: "MongoDB", detail: "NoSQL Data", icon: SiMongodb },
      { name: "APIs", detail: "RESTful Endpoints", icon: Network }
    ] 
  },
  { 
    id: "python", category: "Python Backend", icon: SiPython, 
    skills: [
      { name: "FastAPI", detail: "High Perf API", icon: SiFastapi },
      { name: "Async", detail: "Event Loop", icon: Clock },
      { name: "REST", detail: "Stateless", icon: Globe },
      { name: "WebSockets", detail: "Real-time", icon: Wifi },
      { name: "Auth", detail: "JWT / OAuth", icon: Shield },
      { name: "Services", detail: "Microservices", icon: Box },
      { name: "DB Layer", detail: "SQLAlchemy", icon: Database } 
    ] 
  },
  { 
    id: "rag", category: "RAG Pipeline", icon: Brain, 
    skills: [
      { name: "Ingestion", detail: "Data Loaders", icon: Download },
      { name: "Chunking", detail: "Semantic Split", icon: Scissors },
      { name: "Embeddings", detail: "Vectorization", icon: Hash },
      { name: "Vector DB", detail: "High-Dim Storage", icon: Database },
      { name: "Search", detail: "Hybrid / BM25", icon: Search },
      { name: "Reranking", detail: "Cross-Encoders", icon: ListOrdered },
      { name: "Context", detail: "Prompt Injection", icon: FileText },
      { name: "LLM", detail: "Generation", icon: Brain },
      { name: "Evaluation", detail: "RAGAS", icon: BarChart }
    ] 
  },
  { 
    id: "agents", category: "AI Agents", icon: Activity, 
    skills: [
      { name: "LangGraph", detail: "Cyclic Graphs", icon: Network },
      { name: "State", detail: "Graph State", icon: Activity },
      { name: "Nodes", detail: "Agent Steps", icon: Box },
      { name: "Tools", detail: "Function Calling", icon: Wrench },
      { name: "Memory", detail: "Checkpointer", icon: HardDrive },
      { name: "Workflows", detail: "Multi-Agent", icon: GitMerge },
      { name: "HITL", detail: "Human-in-Loop", icon: User }
    ] 
  },
  { 
    id: "data", category: "Data Layer", icon: SiPostgresql, 
    skills: [
      { name: "PostgreSQL", detail: "Relational", icon: SiPostgresql },
      { name: "Redis", detail: "In-memory cache", icon: SiRedis },
      { name: "MongoDB", detail: "Document Store", icon: SiMongodb },
      { name: "Vector DB", detail: "High-Dim Data", icon: Hash },
      { name: "Caching", detail: "Performance", icon: Cpu },
      { name: "Transactions", detail: "ACID Ops", icon: ArrowLeftRight }
    ] 
  },
  { 
    id: "models", category: "AI Models", icon: SiPytorch, 
    skills: [
      { name: "LLM APIs", detail: "OpenAI / Claude", icon: Brain },
      { name: "Structured", detail: "JSON Output", icon: Braces },
      { name: "Functions", detail: "Tool Execution", icon: TerminalSquare },
      { name: "ML Core", detail: "Scikit / Pandas", icon: LineChart },
      { name: "Deep Learning", detail: "Neural Nets", icon: Network },
      { name: "PyTorch", detail: "Tensors", icon: SiPytorch }
    ] 
  },
  { 
    id: "system", category: "System Design", icon: Server, 
    skills: [
      { name: "Caching", detail: "Data Locality", icon: SiRedis },
      { name: "Queues", detail: "Message Broker", icon: SiRabbitmq },
      { name: "Workers", detail: "Background Jobs", icon: Cog },
      { name: "Rate Limits", detail: "API Throttling", icon: Gauge },
      { name: "Load Balance", detail: "Traffic Dist.", icon: SiNginx },
      { name: "Scalability", detail: "Horiz/Vert", icon: Maximize }
    ] 
  },
  { 
    id: "devops", category: "DevOps", icon: SiDocker, 
    skills: [
      { name: "Linux", detail: "OS Internals", icon: SiLinux },
      { name: "Docker", detail: "Containerization", icon: SiDocker },
      { name: "Compose", detail: "Multi-container", icon: Layers },
      { name: "CI/CD", detail: "Pipelines", icon: Repeat },
      { name: "Actions", detail: "GitHub Auth", icon: PlayCircle } 
    ] 
  },
  { 
    id: "aws", category: "AWS Cloud", icon: Cloud, 
    skills: [
      { name: "AWS", detail: "Cloud Provider", icon: Cloud }, 
      { name: "VPC", detail: "Networking", icon: Network },
      { name: "EC2", detail: "Compute Instances", icon: Server },
      { name: "RDS", detail: "Managed DBs", icon: SiPostgresql },
      { name: "S3", detail: "Object Storage", icon: Archive },
      { name: "IAM", detail: "Access Control", icon: Key },
      { name: "ALB", detail: "Load Balancing", icon: Scale }
    ] 
  },
  { 
    id: "prod", category: "Production", icon: Radar, 
    skills: [
      { name: "Logging", detail: "ELK Stack", icon: SiElasticsearch },
      { name: "Metrics", detail: "Prometheus", icon: SiPrometheus },
      { name: "Tracing", detail: "Distributed", icon: Radar },
      { name: "Otel", detail: "OpenTelemetry", icon: Wifi },
      { name: "Security", detail: "Zero Trust", icon: Lock },
      { name: "FinOps", detail: "Cost Opt.", icon: Coins }
    ] 
  }
];

// --- ULTRA-FAST ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.03, delayChildren: 0.05 } 
  },
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.01, staggerDirection: -1 } 
  }
};

const nodeVariants = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)", scale: 0.95 },
  show: { 
    opacity: 1, x: 0, filter: "blur(0px)", scale: 1, 
    transition: { type: "spring", stiffness: 400, damping: 25 } 
  },
  exit: { opacity: 0, scale: 0.95, filter: "blur(2px)", transition: { duration: 0.15 } }
};

const arrowVariants = {
  hidden: { opacity: 0, x: -5 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
  exit: { opacity: 0 }
};

export default function SkillMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = skillsData[activeIndex];

  // Mouse position state for the interactive hover spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="w-full min-h-screen bg-[#050505] relative py-32 px-4 md:px-8 flex flex-col items-center overflow-hidden">
      
      {/* Background Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16 md:mb-24 relative z-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <Code2 size={16} className="text-white" />
          <span className="font-mono text-xs uppercase tracking-widest text-white">Technical Arsenal</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          Skill <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>Matrix</span>
        </h2>
      </motion.div>

      {/* Main Content Grid */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* LEFT COLUMN: Category Selector */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar z-20">
          {skillsData.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`relative flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal group ${
                  isActive ? "text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center justify-center w-8 h-8">
                  <Icon size={20} className={isActive ? "text-black" : "text-neutral-500 group-hover:text-white transition-colors"} />
                </span>
                
                <span className="relative z-10 font-mono text-sm md:text-base font-bold uppercase tracking-widest">
                  {item.category}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: HIGH-TECH TERMINAL VISUALIZATION */}
        <div 
          onMouseMove={handleMouseMove}
          className="lg:col-span-9 relative min-h-[500px] lg:min-h-[600px] bg-[#0a0a0a] rounded-[2rem] p-1 shadow-2xl flex flex-col overflow-hidden group/terminal"
        >
          {/* THE INTERACTIVE HOVER SPOTLIGHT */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/terminal:opacity-100 transition-opacity duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.06),
                  transparent 80%
                )
              `,
            }}
          />

          {/* INNER TERMINAL CONTAINER */}
          <div className="relative z-10 flex-1 flex flex-col bg-black/60 backdrop-blur-3xl rounded-[calc(2rem-4px)] border border-white/10 p-8 md:p-12 overflow-hidden">
            
            {/* INNER GRID NOISE */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />

            {/* HUD CORNER BRACKETS */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none" />

            {/* COMMAND LINE HEADER */}
            <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8 relative z-10">
              <div className="flex items-center gap-3 font-mono text-xs md:text-sm">
                <TerminalIcon size={16} className="text-white/50" />
                <span className="text-white/40">root@system:~#</span>
                
                {/* Typing effect for the active category */}
                <span className="text-white flex items-center gap-1 font-bold">
                  ./execute_pipeline.sh --target="{activeData.category}"
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-white inline-block"
                  />
                </span>
              </div>
              <span className="hidden md:block font-mono text-xs text-white/40 uppercase tracking-widest">
                Status: Verified
              </span>
            </div>

            {/* PIPELINE ANIMATION */}
            <div className="flex-1 flex items-start pt-4 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="flex flex-wrap items-center gap-y-8 gap-x-3 w-full"
                >
                  {activeData.skills.map((skill, index) => {
                    const SkillIcon = skill.icon;
                    
                    return (
                      <div key={`${activeData.id}-${skill.name}`} className="flex items-center">
                        
                        {/* Interactive Skill Card */}
                        <motion.div 
                          variants={nodeVariants}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white hover:border-white transition-colors duration-200 group cursor-default shadow-lg"
                        >
                          <div className="flex items-center justify-center p-2 rounded-lg bg-black/60 group-hover:bg-black/10 border border-white/10 group-hover:border-black/20 transition-colors">
                            <SkillIcon size={18} className="text-white group-hover:text-black transition-colors" />
                          </div>
                          
                          <div className="flex flex-col pr-2">
                            <span className="font-display font-bold text-sm md:text-base tracking-wide text-white group-hover:text-black transition-colors">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 group-hover:text-black/60 transition-colors">
                              {skill.detail}
                            </span>
                          </div>
                        </motion.div>

                        {/* The Connector Arrow */}
                        {index < activeData.skills.length - 1 && (
                          <motion.div variants={arrowVariants} className="mx-1 md:mx-2 text-white/30">
                            <ArrowRight size={18} />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}