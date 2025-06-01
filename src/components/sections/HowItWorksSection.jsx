import React from 'react'
import { useTranslation } from 'react-i18next'
import { TbSearch, TbPalette, TbFlask } from 'react-icons/tb'

const icons = [TbSearch, TbPalette, TbFlask]

const HowItWorksSection = () => {
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { returnObjects: true })

  return (
    <div id='how-it-works' className='w-full'>
      <div className='flex flex-col gap-10 max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 w-full'>
        <h2 className='font-bold relative text-center text-3xl lg:text-5xl text-[var(--text2)]'>
          {t('howItWorks.title')}
        </h2>
        <div className='gap-10 grid grid-cols-1 md:grid-cols-3'>
          {steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <div key={index} className='flex flex-col items-center text-center'>
                <div className='bg-[var(--bg2)]/50 h-20 mb-5 p-5 rounded-full text-[var(--text1)] w-20'>
                  <Icon className='h-full w-full' />
                </div>
                <h3 className='font-semibold mb-3 text-xl text-[var(--text3)]'>
                  {step.title}
                </h3>
                <p className='text-sm'>
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HowItWorksSection