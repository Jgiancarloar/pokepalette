import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-scroll'
import { PokemonContext } from '../../context/PokemonContext'

const HeroSection = () => {

  const { t } = useTranslation()
  const { selectedPokemon } = useContext(PokemonContext);
  const SCROLL_OFFSET = -80

  return (
    <div id='hero' className='w-full'>
      <div className='flex flex-col md:flex-row gap-10 max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 w-full'>
        <div className='flex flex-col justify-center w-full'>
          <h1 className="font-black italic mb-5 text-4xl lg:text-6xl uppercase text-[var(--text1)]">
            {t("hero.title")}{" "}
            <span className=" text-[var(--text2)]">
              {t("hero.subtitle")}{" "}
            </span>
          </h1>
          <h2 className='font-light italic mb-5 text-2xl lg:text-3xl text-[var(--text2)]'>
            {t("hero.description")}
          </h2>
          <p className='font-medium mb-5'>
            {t("hero.paragraph")}
          </p>
          <div className='flex flex-col lg:flex-row gap-5'>
            <button className='bg-[var(--bg2)] cursor-pointer font-medium px-5 py-3 rounded-md text-white w-fit'>
              <Link to="palette-mode" smooth={true} duration={500} spy={true} offset={SCROLL_OFFSET} href="palette-mode">
                {t("hero.explore")}
              </Link>
            </button>
            <button className='border border-[var(--bg2)] cursor-pointer font-medium px-5 py-3 rounded-md text-[var(--bg2)] w-fit'>
              <Link to="how-it-works" smooth={true} duration={500} spy={true} offset={SCROLL_OFFSET} href="how-it-works">
                {t("hero.howItWorks")}
              </Link>
            </button>
          </div>
        </div>
        <div className='flex items-center justify-center w-full'>
          <div className='aspect-square relative w-full'>
            <div className='absolute aspect-square bg-[var(--bg3)]/50 top-0 left-0 rounded-md w-[90%] z-0'></div>
            <div className='absolute aspect-square bg-[var(--bg1)] bottom-0 p-14 right-0 rounded-md w-[90%] z-10'>
              <img
                src={selectedPokemon?.officialArtwork}
                alt="Imagen del pokemon"
                className='absolute h-full w-full top-0 left-0 object-cover p-5 opacity-40 brightness-20 z-0' />
              <img
                src={selectedPokemon?.pixelSprite}
                alt="Imagen del pokemon"
                className='absolute h-full image-pixelated top-0 left-0 w-full p-10 object-contain' />
              <span className='absolute font-black italic top-5 left-5 opacity-20 text-center text-4xl text-white uppercase'>{selectedPokemon?.name}</span>
              <span className='absolute font-black italic bottom-5 right-5 opacity-30 text-center text-4xl text-white uppercase'>
                {selectedPokemon?.id !== undefined
                  ? `#${selectedPokemon.id.toString().padStart(4, '0')}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection