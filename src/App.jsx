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

const App = () => {

  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [openMenu])

  return (
    <PokemonProvider>
      <main className='font-montserrat'>
        <ControlPanel />
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