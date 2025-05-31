import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TbRocket, TbSettings, TbBulb, TbLayoutDashboard } from 'react-icons/tb'
import { PokemonContext } from '../../context/PokemonContext'

const icons = [TbRocket, TbSettings, TbBulb, TbLayoutDashboard]

const PaletteModesSection = () => {
  const { t } = useTranslation()
  const paletteItems = t('palette.items', { returnObjects: true })
  const { selectedPokemon } = useContext(PokemonContext)

  return (
    <div id='palette-mode' className='w-full'>
      <div className='flex flex-col gap-10 max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 w-full'>
        <h2 className='font-bold text-center text-3xl lg:text-5xl text-[var(--text2)]'>
          {t('palette.title')}
        </h2>
        <div className='flex flex-col lg:flex-row gap-10 items-center w-full'>
          <div className='aspect-square relative w-full md:w-2/3 lg:w-1/3'>
            <img src={selectedPokemon?.officialArtwork} alt="" className='absolute h-full object-cover p-5 w-full z-30' />
            <div className='absolute aspect-square bg-[var(--bg1)]/50 left-0 top-0 w-5/6 z-0'></div>
            <div className='absolute aspect-square bg-[var(--bg1)] bottom-0 right-0 w-5/6 z-10'></div>
            <div className='absolute aspect-square bg-[var(--bg3)] bottom-1/12 right-1/12 w-2/6 z-20 opacity-70'></div>
            <div className='absolute aspect-square bg-[var(--bg2)] top-1/12 left-1/12 w-2/6 z-20 opacity-70'></div>
          </div>
          <div className='gap-5 grid grid-cols-1 md:grid-cols-2 w-full lg:w-2/3'>
            {paletteItems.map((text, index) => {
              const Icon = icons[index]
              return (
                <div key={index} className='bg-[var(--bg2)]/50 flex gap-5 h-32 items-center p-5 rounded-md'>
                  <div className='h-14 text-[var(--text1)] w-14'>
                    <Icon className='h-full w-full' strokeWidth={1.5} />
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium text-[var(--text2)]'>{text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaletteModesSection