import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowUpRight, Menu, X, Hexagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GridDistortion from "./GridDistortion";
import { personalInfo } from "../data/portfolioData";

// =========================================
// 1. THREE.JS 3D BACKGROUND (Ambient aesthetics)
// =========================================
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xC6F118,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    camera.position.z = 4;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      particlesMesh.rotation.y += 0.02 * (targetX - particlesMesh.rotation.y);
      particlesMesh.rotation.x += 0.02 * (targetY - particlesMesh.rotation.x);
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};


// =========================================
// 2. AESTHETIC TEXT REVEAL
// =========================================
const AestheticRevealText = ({ text, delay = 0 }) => {
  return (
    <div className="overflow-hidden flex relative pb-2 -mb-2">
      <motion.span
        initial={{ y: "120%", rotateZ: 4, filter: "blur(8px)", opacity: 0 }}
        animate={{ y: 0, rotateZ: 0, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block transform-origin-bottom drop-shadow-2xl text-white"
      >
        {text}
      </motion.span>
    </div>
  );
};


// =========================================
// 3. MAGNETIC BUTTON (Elegant styling, NO color change)
// =========================================
const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      // Replaced neon fill with a subtle background and border glow on hover
      className="relative overflow-hidden border border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/30 backdrop-blur-xl text-xs tracking-[0.3em] uppercase py-4 px-10 rounded-full flex items-center gap-4 group transition-all duration-500 shadow-2xl z-20 pointer-events-auto"
    >
      <span className="relative z-10 text-white font-medium">
        {children}
      </span>
      <div className="relative overflow-hidden w-4 h-4 z-10">
        {/* First arrow (Shoots out) - Kept white */}
        <motion.div className="absolute inset-0 text-white group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500 ease-[0.76,0,0.24,1]">
          <ArrowUpRight size={16} />
        </motion.div>
        {/* Second arrow (Shoots in) - Kept white */}
        <motion.div className="absolute inset-0 text-white -translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">
          <ArrowUpRight size={16} />
        </motion.div>
      </div>
    </motion.a>
  );
};


// =========================================
// 4. MAIN LANDING PAGE
// =========================================
export default function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const silkyEase = [0.76, 0, 0.24, 1]; 

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Chakra+Petch:wght@400;600;700&family=DM+Mono:ital,wght@0,300;0,400;0,500&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
        .font-tech { font-family: 'Chakra Petch', sans-serif; }
        
        /* Peer Hover effect for sidebar (dims un-hovered links) */
        .nav-group:hover .nav-item:not(:hover) {
          opacity: 0.2;
          filter: blur(2px);
        }
      `}</style>

      <div className="bg-[#050505] text-[#EAEAEA] min-h-screen w-full font-mono-custom relative overflow-x-hidden flex flex-col selection:bg-[#C6F118] selection:text-black">

        {/* --- AMBIENT BACKGROUNDS --- */}
        <ThreeBackground />
        
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.85]">
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

        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] z-[1] pointer-events-none opacity-90" />

        {/* --- TOP NAVIGATION --- */}
        <header className="flex justify-between items-center w-full p-6 md:px-12 md:py-8 z-20 relative pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: silkyEase }}
            className="text-3xl md:text-4xl font-display font-medium tracking-tight cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-3 drop-shadow-lg"
          >
            <Hexagon size={24} className="text-[#C6F118]" />
            {personalInfo.name}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: silkyEase, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            className="w-12 h-12 flex items-center justify-center transition-all duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 relative z-50 pointer-events-auto"
          >
            <Menu size={18} />
          </motion.button>
        </header>

        {/* --- ELEGANT SIDEBAR --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Soft blur overlay */}
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: silkyEase }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/40 z-40 cursor-pointer pointer-events-auto"
              />

              {/* Sidebar Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.9, ease: silkyEase }}
                className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-[#050505] z-50 flex flex-col border-l border-white/5 overflow-hidden pointer-events-auto shadow-2xl"
              >
                <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#C6F118]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="flex justify-between items-center p-8 md:p-12 relative z-50">
                  <span className="text-[10px] font-mono-custom tracking-[0.3em] uppercase text-white/40">
                    Menu // Navigation
                  </span>
                  
                  {/* FIXED CROSS BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents click from bleeding through
                      setIsSidebarOpen(false);
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 pointer-events-auto cursor-pointer relative z-50"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Nav Links */}
                <nav className="nav-group flex-1 flex flex-col justify-center gap-2 px-8 md:px-16 relative z-10 mt-[-10vh]">
                  {["Home", "Projects", "Skills", "Experience", "Contact"].map((item, i) => (
                    <div key={item} className="nav-item overflow-hidden py-2 transition-all duration-500">
                      <motion.a
                        href={`#${item.toLowerCase()}`}
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "110%", opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 + (i * 0.08), ease: silkyEase }}
                        className="group flex items-center gap-6 cursor-pointer w-max pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSidebarOpen(false);
                        }}
                      >
                        <span className="text-xs font-mono-custom tracking-widest text-white/20 group-hover:text-[#C6F118] transition-colors duration-500">
                          0{i + 1}
                        </span>
                        
                        <span className="font-display text-5xl md:text-[6rem] font-medium tracking-tight text-white/80 group-hover:text-white group-hover:tracking-normal group-hover:translate-x-4 transition-all duration-500">
                          {item}
                        </span>
                      </motion.a>
                    </div>
                  ))}
                </nav>

                <div className="p-8 md:p-12 relative z-10 flex justify-between items-center opacity-50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white">Version 2.0</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white">{new Date().getFullYear()} ©</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- MAIN HERO --- */}
        <main id="home" className="flex-1 flex items-center justify-center w-full max-w-[1400px] mx-auto p-6 md:p-12 relative z-10 pointer-events-none">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pointer-events-none">
            
            {/* --- LEFT TEXT --- */}
            <div className="lg:col-span-7 flex flex-col items-start gap-8 pointer-events-auto relative">
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[7.5rem] font-medium tracking-tighter leading-[0.9] uppercase text-white">
                {personalInfo.designation.map((line, index) => (
                  <AestheticRevealText key={index} text={line} delay={0.2 + (index * 0.15)} />
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1, ease: silkyEase }}
                className="text-neutral-300 text-sm md:text-base max-w-md leading-relaxed font-mono-custom mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {personalInfo.tagline}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2, ease: silkyEase }} className="mt-8 pointer-events-auto">
                <MagneticButton href={personalInfo.links.resume}>
                  View Resume
                </MagneticButton>
              </motion.div>
            </div>

            {/* --- RIGHT PROFILE CARD --- */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, delay: 0.6, ease: silkyEase }} 
              className="lg:col-span-5 relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0 pointer-events-auto"
            >
              <div className="relative group perspective-1000">
                <motion.div 
                  drag dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }} dragElastic={0.05} 
                  whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }} 
                  whileTap={{ scale: 0.98, cursor: "grabbing" }} 
                  className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl max-w-[320px] md:max-w-[400px] w-full cursor-grab z-10"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#C6F118]/20 blur-[60px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <img src={personalInfo.personalImage} alt={personalInfo.name} className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1.5rem] w-full h-[400px] md:h-[520px] pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full flex items-center justify-between pointer-events-none transition-transform duration-500 group-hover:translate-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Interactive</span>
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#C6F118] group-hover:text-black transition-colors duration-500">
                      <ArrowUpRight size={12} />
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