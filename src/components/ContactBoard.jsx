import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Using ONLY core, legacy-safe Lucide icons to guarantee zero export errors
import { ArrowUpRight, Phone, Mail, Briefcase, GitBranch, Code } from 'lucide-react';

const contacts = [
  { 
    id: "gmail", 
    title: "Email", 
    handle: "hello@yourdomain.com", 
    link: "mailto:hello@yourdomain.com", 
    icon: Mail,
    tagline: "Direct Inbox"
  },
  { 
    id: "linkedin", 
    title: "LinkedIn", 
    handle: "in/yourprofile", 
    link: "https://linkedin.com/", 
    icon: Briefcase,
    tagline: "Professional Network"
  },
  { 
    id: "github", 
    title: "GitHub", 
    handle: "@yourusername", 
    link: "https://github.com/", 
    icon: GitBranch,
    tagline: "Open Source Activity"
  },
  { 
    id: "leetcode", 
    title: "LeetCode", 
    handle: "yourusername", 
    link: "https://leetcode.com/", 
    icon: Code,
    tagline: "Algorithm Metrics"
  },
  { 
    id: "phone", 
    title: "Phone", 
    handle: "+91 000 000 0000", 
    link: "tel:+910000000000", 
    icon: Phone,
    tagline: "Direct Line"
  }
];

export default function ContactBoard() {
  const [active, setActive] = useState(0); 

  return (
    // Changed bg-white to premium matte grey bg-[#EAEAEA]
    <section className="w-full bg-[#EAEAEA] text-[#050505] py-24 md:py-32 relative overflow-hidden flex flex-col items-center z-40" id="contact">
      
      {/* Subtle Film Grain / Noise for a premium matte finish */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-multiply z-0" />

      {/* 1. INFINITE SCROLLING MARQUEE HEADER */}
      <div className="w-full overflow-hidden flex whitespace-nowrap mb-16 border-y-2 border-black/5 py-4 bg-black/[0.02] relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex items-center gap-8 font-display text-4xl md:text-7xl font-black uppercase tracking-tighter"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>Initiate Connection</span>
              <span className="text-[#C6F118]">✦</span>
              <span className="text-transparent" style={{ WebkitTextStroke: "2px black" }}>Let's Connect !</span>
              <span className="text-[#C6F118]">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. MAIN ACCORDION GALLERY */}
      <div className="w-full max-w-[1600px] px-4 md:px-8 flex flex-col items-center relative z-10">
        
        {/* Section Metadata */}
        <div className="w-full flex justify-between items-end mb-8 font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span>Terminal // Contact</span>
            <span className="text-black/50">Select a node to engage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6F118] animate-pulse shadow-[0_0_8px_rgba(198,241,24,0.6)]" />
            <span>Listening</span>
          </div>
        </div>

        {/* The Interactive Flex-Accordion */}
        <div className="w-full flex flex-col md:flex-row h-[75vh] md:h-[650px] gap-2 md:gap-4">
          {contacts.map((contact, i) => {
            const isActive = active === i;
            const Icon = contact.icon;

            return (
              <motion.a
                key={contact.id}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{
                  flex: isActive ? 6 : 1,
                  // Active is black, inactive is pure white (to pop off the grey background)
                  backgroundColor: isActive ? "#050505" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#050505",
                  boxShadow: isActive ? "0 25px 50px -12px rgba(0,0,0,0.25)" : "0 4px 6px -1px rgba(0,0,0,0.05)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative rounded-[2rem] overflow-hidden flex flex-col border border-black/10 cursor-pointer group"
              >
                
                {/* --- CONTENT WHEN COLLAPSED --- */}
                <div className={`absolute inset-0 flex flex-row md:flex-col items-center justify-start md:justify-center p-6 gap-4 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'}`}>
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-black/60 group-hover:text-black transition-colors" />
                  </div>
                  <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-widest md:-rotate-90 md:origin-center md:whitespace-nowrap mt-0 md:mt-24 text-black/40 group-hover:text-black transition-colors">
                    {contact.title}
                  </span>
                </div>

                {/* --- CONTENT WHEN EXPANDED --- */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col justify-between"
                    >
                      {/* Giant Background Watermark Logo */}
                      <Icon strokeWidth={1} className="absolute -bottom-10 -right-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-white/[0.03] rotate-12 pointer-events-none" />

                      {/* Top Header */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="flex justify-between items-start relative z-10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                            <Icon size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-bold uppercase tracking-widest">{contact.title}</h3>
                            <p className="font-mono text-xs text-white/50 uppercase tracking-widest">{contact.tagline}</p>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                          <ArrowUpRight size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                      </motion.div>

                      {/* Bottom Handle & CTA */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="relative z-10 flex flex-col gap-6"
                      >
                        <div>
                          <p className="font-mono text-xs text-[#C6F118] uppercase tracking-widest mb-2">Target Handle</p>
                          <h4 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter break-all">
                            {contact.handle}
                          </h4>
                        </div>
                        
                        <div className="md:hidden flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest text-[#C6F118]">
                          Connect Now <ArrowUpRight size={16} />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}