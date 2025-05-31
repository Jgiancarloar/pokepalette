import React from 'react'
import { useTranslation } from 'react-i18next'

const avatars = [
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png"
]

const TestimonialsSection = () => {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true })

  return (
    <div id='testimonials' className='bg-[var(--bg2)]/10 w-full'>
      <div className='flex flex-col gap-10 max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 w-full'>
        <h2 className='font-bold text-center text-3xl lg:text-5xl text-[var(--text2)]'>
          {t('testimonials.title')}
        </h2>
        <div className='gap-10 lg:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {testimonials.map((item, index) => (
            <div key={index} className='bg-[var(--bg3)]/50 flex flex-col gap-5 h-64 p-5 rounded-md w-full'>
              <div className='flex gap-5 items-center w-full'>
                <div className='bg-white border border-[var(--text1)] h-14 p-1 rounded-full w-14'>
                  <img src={avatars[index]} alt={`Avatar ${item.name}`} />
                </div>
                <div className='flex flex-col flex-1'>
                  <h3 className='font-semibold mb-1 text-[var(--text1)] text-lg'>{item.name}</h3>
                  <p className='font-semibold text-sm text-[var(--text2)]'>{item.role}</p>
                </div>
              </div>
              <div className='flex-1'>
                <p className='font-medium text-sm text-[var(--text3)]'>“{item.text}”</p>
              </div>
              <div className='flex font-semibold justify-end text-[var(--text1)]'>
                <p>{item.region}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection