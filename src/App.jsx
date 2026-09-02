import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import ScrollStack from './components/ScrollStack';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* THE PRELOADER OVERLAY */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 
        MAIN CONTENT 
        It is rendered immediately but sits behind the Preloader's z-[100] layer.
        This allows the WebGL background to initialize safely out of sight.
        'h-screen overflow-hidden' ensures no scrolling happens until loading finishes.
      */}
      <main 
        className={`relative bg-[#050505] w-full selection:bg-[#C6F118] selection:text-black ${
          loading ? "h-screen overflow-hidden" : ""
        }`}
      >
        <LandingPage />

        <div className="relative z-20 w-full bg-[#050505] border-t border-neutral-900 shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
          <ScrollStack />
        </div>
      </main>
    </>
  );
}

export default App;