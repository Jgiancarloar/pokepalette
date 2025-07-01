import React, { useEffect, useState } from 'react'
import Navbar from './components/sections/Navbar'
import HeroSection from './components/sections/HeroSection'
import ReasonsSection from './components/sections/ReasonsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import PaletteModesSection from './components/sections/PaletteModesSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import Footer from './components/sections/Footer'
import FeedbackSection from './components/sections/FeedbackSection'
import Sidebar from './components/sections/Sidebar'
import ControlPanel from './components/sections/ControlPanel'
import { PokemonProvider } from './context/PokemonContext'
import { TbSettings,TbX } from "react-icons/tb";

const App = () => {

  const [openMenu, setOpenMenu] = useState(false)
  const [openPanel, setOpenPanel] = useState(false)

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [openMenu])

  return (
    <PokemonProvider>
      <main className='bg-slate-950 font-montserrat'>
        <button
          className={`bg-white cursor-pointer fixed border-2 border-[var(--text1)] h-10 p-1 rounded-full top-[100px] right-5 w-10 z-50 ${openMenu?'hidden':'block'}`}
          onClick={() => setOpenPanel(!openPanel)}
        >
          {openPanel ? <TbX className='h-full w-full text-[var(--text1)]' /> : <TbSettings className='h-full w-full text-[var(--text1)]' />}
        </button>
        <ControlPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <HeroSection />
        <ReasonsSection />
        <PaletteModesSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <FeedbackSection />
        <Footer />
      </main>
    </PokemonProvider>
  )
}

export default App