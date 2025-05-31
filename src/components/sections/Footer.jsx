import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const year = new Date().getFullYear()

    const { t } = useTranslation()

    return (
        <footer className='bg-[var(--bg3)]/30'>
            <div className='flex flex-col gap-5 py-5 w-full'>
                <div className='flex flex-col md:flex-row gap-5 items-center max-w-7xl mx-auto justify-between px-5 md:px-10 w-full'>
                    <h2 className='font-black italic text-[var(--text1)] text-xl uppercase'>
                        Pokepalette
                    </h2>
                    <p className='font-medium'>{t('footer.madeWith')}</p>
                </div>
                <div className='bg-[var(--bg1)]/40 h-[1px] w-full'></div>
                <div className='max-w-7xl mx-auto '>
                    <p className='text-center'>{t('footer.copyright') + ' ' + year}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer