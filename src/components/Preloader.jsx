import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ==========================================
// 3D CORE: THE "DATA KNOT" (AI + BACKEND)
// ==========================================
const AbstractCore = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5; // Pulled back slightly for a better view

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    
    renderer.setSize(250, 250);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. The Shape: Torus Knot (Symbolizes Neural Networks & Infinite Data Loops)
    const geometry = new THREE.TorusKnotGeometry(0.7, 0.2, 100, 16);
    
    // Solid dark core so you can't see "through" it (fixes the 2 globes issue)
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x050505, 
    });
    const core = new THREE.Mesh(geometry, material);

    // Glowing Lime Green Edges (Clean, singular outline)
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ 
        color: 0xC6F118, 
        transparent: true, 
        opacity: 0.8 
      })
    );

    // Add them to a group so they rotate perfectly together
    const group = new THREE.Group();
    group.add(core);
    group.add(line);
    scene.add(group);

    // 3. Animation Loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth, complex multi-axis rotation
      group.rotation.y += 0.005;
      group.rotation.x += 0.003;
      group.rotation.z += 0.002;

      // Gentle floating effect
      group.position.y = Math.sin(elapsedTime * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 4. Crash-Proof Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      
      try {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.warn("Cleanup skipped for unmounted canvas.");
      }

      geometry.dispose();
      material.dispose();
      edges.dispose();
      line.material.dispose();
      renderer.dispose();
      
      // Force context loss to free up GPU memory for the Landing Page
      renderer.forceContextLoss(); 
    };
  }, []);

  return <div ref={mountRef} className="w-[250px] h-[250px]" />;
};

// ==========================================
// MAIN PRELOADER COMPONENT
// ==========================================
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      const increment = Math.random() > 0.5 ? 2 : 5;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onComplete, 1400); 
        }, 600);
      }
      setProgress(currentProgress);
    }, 40);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-mono-custom"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
        >
          {/* ================= BACKGROUND GLOW ================= */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(198,241,24,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* ================= 3D CORE ELEMENT ================= */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 20, opacity: 0 }} 
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 flex items-center justify-center mb-12"
          >
            <AbstractCore />
            
            {/* Overlay Percentage */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[#C6F118] font-display font-black text-2xl tracking-tighter shadow-black drop-shadow-md">
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* ================= TAGLINE & TYPOGRAPHY ================= */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.div 
              className="overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-[#EAEAEA] font-display text-2xl md:text-4xl font-black uppercase tracking-widest text-center">
                Architecting <span className="text-[#C6F118]">Scale.</span>
              </h2>
            </motion.div>

            <motion.div 
              className="overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-neutral-500 font-display text-2xl md:text-4xl font-black uppercase tracking-widest text-center">
                Engineering <span className="text-[#EAEAEA]">Intelligence.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 flex items-center gap-4 border border-neutral-800 bg-neutral-900/50 rounded-full px-6 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F118] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6F118]" />
              </span>
              {/* <span className="text-[#C6F118] text-xs font-mono-custom tracking-[0.2em] uppercase">
                AI + Backend Developer
              </span> */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}