import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TbColorSwatch, TbBolt, TbBrain, TbWorld } from 'react-icons/tb'
import { PokemonContext } from '../../context/PokemonContext'

const icons = [TbColorSwatch, TbBolt, TbBrain, TbWorld]

const ReasonsSection = () => {
  const { t } = useTranslation()
  const reasons = t('reasons.items', { returnObjects: true })
  const{selectedPokemon} = useContext(PokemonContext)

  return (
    <div id='reasons' className='bg-[var(--bg1)]/10 w-full'>
      <div className='flex flex-col gap-10 max-w-7xl mx-auto px-10 py-10 md:py-20 w-full'>
        <h2 className='font-bold text-center text-3xl lg:text-5xl text-[var(--text2)]'>
          {t('reasons.title')}
        </h2>
        <div className='gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {reasons.map((reason, index) => {
            const Icon = icons[index]
            return (
              <div key={index} className='flex flex-col items-center text-center'>
                <div className='bg-[var(--bg3)]/50 h-20 mb-5 p-3 rounded-lg text-[var(--text3)] w-20'>
                  <Icon className='h-full w-full' strokeWidth={1.5} />
                </div>
                <h3 className='font-semibold mb-3 text-xl text-[var(--text3)]'>
                  {reason.title}
                </h3>
                <p className='text-sm'>
                  {reason.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ReasonsSection