import React from 'react'
import { Link } from 'react-scroll'
import { TbPokeball } from "react-icons/tb"
import { useTranslation } from 'react-i18next'

const Sidebar = ({ openMenu, setOpenMenu }) => {
    const { t } = useTranslation()
    const SCROLL_OFFSET = -80

    const menuItems = [
        {
            id: 'palette-mode',
            label: t('sidebar.palettes'),
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png'
        },
        {
            id: 'testimonials',
            label: t('sidebar.testimonials'),
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png'
        },
        {
            id: 'how-it-works',
            label: t('sidebar.howItWorks'),
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'
        },
        {
            id: 'feedback',
            label: t('sidebar.feedback'),
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
    ]

    return (
        <div className={`bg-white fixed lg:hidden inset-0 h-screen top-0 w-full z-40 pt-20 
        ${openMenu ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500`}>
            <ul className='flex flex-col font-semibold gap-5'>
                {menuItems.map(({ id, label, img }, idx) => (
                    <li key={idx} className='border-b border-gray-300 flex items-center gap-5 overflow-hidden p-7 md:px-20 text-[var(--text1)] relative'>
                        <img
                            alt="Imagen de pokemon"
                            className='absolute top-0 md:-top-5 -right-10 w-1/3 brightness-0'
                            src={img}
                        />
                        <div className='relative flex items-center gap-5'>
                            <div className='h-10 w-10'>
                                <TbPokeball className='h-full w-full' />
                            </div>
                            <Link
                                to={id}
                                smooth={true}
                                duration={500}
                                spy={true}
                                offset={SCROLL_OFFSET}
                                className='flex-1 cursor-pointer text-xl capitalize'
                                activeClass='text-[var(--text2)]'
                                onClick={() => setOpenMenu(false)}
                                href={id}
                            >
                                {label}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar