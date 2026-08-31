import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Terminal,
  Globe,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GridDistortion from "./GridDistortion";
import { personalInfo } from "../data/portfolioData";

export default function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textRevealVariants = {
    hidden: {
      y: "120%",
      opacity: 0,
      rotate: 2,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
  };

  const socialLinks = [
    {
      icon: Terminal,
      link: personalInfo.links.github,
      label: "GitHub",
    },
    {
      icon: Globe,
      link: personalInfo.links.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Code,
      link: personalInfo.links.leetcode,
      label: "LeetCode",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Mono:ital,wght@0,300;0,400;0,500&display=swap');

        .font-display {
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .font-mono-custom {
          font-family: 'DM Mono', monospace;
        }
      `}</style>

      <div className="bg-[#050505] text-[#EAEAEA] min-h-screen w-full font-mono-custom relative overflow-hidden flex flex-col selection:bg-[#C6F118] selection:text-black">

        {/* =========================================
            DISTORTED BACKGROUND
        ========================================== */}

        <div className="distorted-background-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <GridDistortion
            backgroundImageSrc={personalInfo.backgroundImage}
            personalImageSrc={personalInfo.personalImage}
            grid={55}
            mouse={0.12}
            strength={0.15}
            relaxation={0.96}
            className="w-full h-full"
          />
        </div>

        {/* =========================================
            BACKGROUND GLOW
        ========================================== */}

        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(198,241,24,0.03)_0%,transparent_70%)] blur-3xl z-0 pointer-events-none" />

        {/* =========================================
            MASSIVE BACKGROUND TYPOGRAPHY
        ========================================== */}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none opacity-[0.02]">
          <h1 className="font-display text-[15vw] font-black leading-none whitespace-nowrap tracking-tighter">
            {personalInfo.name.toUpperCase()}
          </h1>
        </div>

        {/* =========================================
            TOP NAVIGATION
        ========================================== */}

        <header className="flex justify-between items-center w-full p-6 md:px-12 md:py-8 z-10 relative pointer-events-auto">

          {/* Logo / Name */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold tracking-tight cursor-pointer hover:text-[#C6F118] transition-colors"
          >
            {personalInfo.name}

            <span className="text-[#C6F118]">
              ®
            </span>
          </motion.div>

          {/* Right Navigation */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 md:gap-8"
          >

            {/* Availability */}

            <div className="hidden md:flex items-center gap-3 bg-neutral-900/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-neutral-800">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F118] opacity-75" />

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C6F118]" />
              </span>

              <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                {personalInfo.availability}
              </span>

            </div>

            {/* Menu Button */}

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#EAEAEA",
                color: "#050505",
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center transition-colors bg-neutral-900/50 backdrop-blur-md"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </motion.button>

          </motion.div>
        </header>

        {/* =========================================
            SIDEBAR
        ========================================== */}

        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/80 z-40 backdrop-blur-md cursor-pointer"
              />

              {/* Sidebar */}

              <motion.div
                initial={{
                  x: "100%",
                  skewX: -5,
                }}
                animate={{
                  x: 0,
                  skewX: 0,
                }}
                exit={{
                  x: "100%",
                  skewX: -5,
                }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 200,
                }}
                className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-[#0a0a0a] border-l border-neutral-800 z-50 p-8 flex flex-col shadow-2xl overflow-hidden"
              >

                {/* Sidebar Header */}

                <div className="flex justify-between items-center mb-16 relative z-10">

                  <span className="text-xs font-mono-custom tracking-[0.2em] uppercase text-[#C6F118]">
                    Navigation
                  </span>

                  <motion.button
                    whileHover={{
                      rotate: 90,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-12 h-12 flex items-center justify-center border border-neutral-800 hover:border-neutral-500 rounded-full transition-colors bg-neutral-900/50"
                    aria-label="Close navigation"
                  >
                    <X size={18} />
                  </motion.button>

                </div>

                {/* Navigation Links */}

                <nav className="flex flex-col gap-6 font-display text-5xl md:text-6xl font-black uppercase relative z-10 tracking-tighter">

                  {[
                    "Home",
                    "Projects",
                    "Experience",
                    "Contact",
                  ].map((item, i) => (

                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{
                        x: 50,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        delay: i * 0.1 + 0.2,
                      }}
                      whileHover={{
                        x: 20,
                        color: "#C6F118",
                      }}
                      className="text-neutral-600 hover:text-[#C6F118] transition-colors w-max"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item}
                    </motion.a>

                  ))}

                </nav>

                {/* Sidebar Bottom */}

                <div className="mt-auto relative z-10">

                  <div className="h-px bg-neutral-800 mb-6" />

                  <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                    {personalInfo.name} / Portfolio
                  </p>

                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* =========================================
            MAIN HERO
        ========================================== */}

        <main
          id="home"
          className="flex-1 flex items-center justify-center w-full max-w-[1400px] mx-auto p-6 md:p-12 relative z-10 pointer-events-none"
        >

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pointer-events-none">

            {/* =====================================
                LEFT TEXT
            ====================================== */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start gap-8 pointer-events-auto"
            >

              {/* Designation */}

              <h1 className="font-display text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] uppercase drop-shadow-lg pointer-events-none">

                {personalInfo.designation.map((line, index) => (

                  <div
                    key={index}
                    className="overflow-hidden py-2"
                  >
                    <motion.div variants={textRevealVariants}>
                      {line}
                    </motion.div>
                  </div>

                ))}

              </h1>

              {/* Tagline */}

              <motion.p
                variants={textRevealVariants}
                className="text-neutral-400 text-sm md:text-base max-w-md leading-relaxed border-l-2 border-[#C6F118] pl-6 drop-shadow-md bg-black/20 p-2 rounded-r-lg pointer-events-none"
              >
                {personalInfo.tagline}
              </motion.p>

              {/* CTA + Socials */}

              <motion.div
                variants={textRevealVariants}
                className="flex flex-wrap items-center gap-6 mt-4"
              >

                {/* Resume */}

                <motion.a
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#C6F118",
                    color: "#000",
                    borderColor: "#C6F118",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="border border-neutral-700 bg-neutral-900/60 backdrop-blur-sm text-xs tracking-[0.2em] uppercase py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300"
                >
                  View Resume

                  <ArrowUpRight size={16} />
                </motion.a>

                {/* Social Links */}

                <div className="flex items-center gap-3">

                  {socialLinks.map((social, idx) => {

                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        whileHover={{
                          y: -5,
                          backgroundColor:
                            "rgba(198,241,24,0.1)",
                          color: "#C6F118",
                          borderColor: "#C6F118",
                        }}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-neutral-400 transition-all duration-300"
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                        />
                      </motion.a>
                    );
                  })}

                </div>

              </motion.div>

            </motion.div>

            {/* =====================================
                RIGHT PROFILE CARD
            ====================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0 pointer-events-auto"
            >

              <div className="relative group perspective-1000">

                {/* Draggable Card */}

                <motion.div
                  drag
                  dragConstraints={{
                    left: -50,
                    right: 50,
                    top: -50,
                    bottom: 50,
                  }}
                  dragElastic={0.1}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                    cursor: "grabbing",
                  }}
                  className="relative bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-2 rounded-[2rem] shadow-2xl max-w-[320px] md:max-w-[400px] w-full cursor-grab z-10 origin-center"
                >

                  {/* Glowing Offset */}

                  <div className="absolute top-4 left-4 w-full h-full bg-[#C6F118]/10 border border-[#C6F118]/30 rounded-[2rem] -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />

                  {/* Profile Image */}

                  <img
                    src={personalInfo.personalImage}
                    alt={personalInfo.name}
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-3xl w-full h-[400px] md:h-[520px] pointer-events-none"
                  />

                  {/* Drag Indicator */}

                  <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md border border-neutral-700/50 py-3 px-6 rounded-full flex items-center justify-between pointer-events-none">

                    <span className="text-[10px] uppercase tracking-widest text-neutral-300">
                      Drag to interact
                    </span>

                    <div className="w-6 h-6 bg-[#C6F118] rounded-full flex items-center justify-center">
                      <ArrowUpRight
                        size={12}
                        className="text-black"
                      />
                    </div>

                  </div>

                </motion.div>

              </div>

            </motion.div>

          </div>
        </main>
      </div>
    </>
  );
}