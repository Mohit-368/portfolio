import './App.css'
import LandingPage from './components/LandingPage'
import ScrollStack from './components/ScrollStack'

function App() {
  return (
    <main className="relative bg-[#050505] w-full selection:bg-[#C6F118] selection:text-black">
      
      {/* THE HERO */}
      <LandingPage />

      {/* 
        THE OVERLAP (SCROLLING FOREGROUND)
        Removed `will-change-transform` so the SplashCursor inside ScrollStack
        can correctly use `fixed` positioning relative to the browser window.
      */}
      <div className="relative z-20 w-full bg-[#050505] border-t border-neutral-900 shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
        <ScrollStack />
      </div>
      
    </main>
  )
}

export default App