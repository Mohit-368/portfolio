import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import ScrollStack from './components/ScrollStack';
import Preloader from './components/Preloader';
import InteractiveArchitectureFlow from './components/InteractiveArchitectureFlow';
import HorizontalScrollText from './components/HorizontalScrollText';
import SkillMatrix from './components/SkillMatrix';
import ContactBoard from './components/ContactBoard';
import ExperienceDeck from './components/ExperienceDeck';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main 
        // Updated selection colors to match the monochrome aesthetic
        className={`relative bg-[#050505] w-full selection:bg-white selection:text-black ${
          loading ? "h-screen overflow-hidden" : ""
        }`}
      >
        <LandingPage />

        {/* PROJECTS SECTION */}
        <div className="relative z-20 w-full bg-[#050505] border-t border-neutral-900 shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
          <ScrollStack />
        </div>
        <HorizontalScrollText/>
        {/* ARCHITECTURE SECTION - Added Layering & Border */}
        <div className="relative z-30 w-full bg-[#050505] border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.95)]">
          <InteractiveArchitectureFlow />
        </div>
        <SkillMatrix/>
        <ExperienceDeck/>
        <ContactBoard/>
      </main>
    </>
  );
}

export default App;