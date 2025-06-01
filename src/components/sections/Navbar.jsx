import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ScrollLink } from 'react-scroll'
import { TbPokeball } from "react-icons/tb";
import UsaIcon from '../../assets/UsaIcon';
import SpainIcon from '../../assets/SpainIcon';

const Navbar = ({ openMenu, setOpenMenu }) => {

    const { t, i18n } = useTranslation()

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es'
        i18n.changeLanguage(newLang)
        localStorage.setItem('language', newLang)
    }

    const SCROLL_OFFSET = -80;

    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <nav className='flex h-20 items-center justify-between max-w-7xl mx-auto px-5 md:px-10'>
                <h2 className='cursor-pointer font-black italic text-[var(--text1)] text-xl md:text-2xl uppercase'>
                    <ScrollLink
                        to="hero"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        href="#hero"
                    >
                        {t('navbar.brand')}
                    </ScrollLink>
                </h2>
                <div className='flex items-center gap-5'>
                    <ul className='lg:flex font-semibold hidden gap-5'>
                        <li>
                            <ScrollLink
                                to="palette-mode"
                                smooth={true}
                                duration={500}
                                offset={SCROLL_OFFSET}
                                spy={true}
                                className='capitalize cursor-pointer'
                                activeClass='text-[var(--text1)]'
                                href="#palette-mode"
                            >
                                {t('navbar.links.palettes')}
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="testimonials"
                                smooth={true}
                                duration={500}
                                offset={SCROLL_OFFSET}
                                spy={true}
                                className='capitalize cursor-pointer'
                                activeClass='text-[var(--text1)]'
                                href="#testimonials"
                            >
                                {t('navbar.links.testimonials')}
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="how-it-works"
                                smooth={true}
                                duration={500}
                                offset={SCROLL_OFFSET}
                                spy={true}
                                className='capitalize cursor-pointer'
                                activeClass='text-[var(--text1)]'
                                href="#how-it-works"
                            >
                                {t('navbar.links.howItWorks')}
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="feedback"
                                smooth={true}
                                duration={500}
                                offset={SCROLL_OFFSET}
                                spy={true}
                                className='capitalize cursor-pointer'
                                activeClass='text-[var(--text1)]'
                                href="#feedback"
                            >
                                {t('navbar.links.feedback')}
                            </ScrollLink>
                        </li>
                    </ul>
                    <div className='flex items-center gap-5'>
                        {i18n.language === 'es' ? (
                            <UsaIcon className='cursor-pointer' onClick={toggleLanguage} />
                        ) : (
                            <SpainIcon className='cursor-pointer' onClick={toggleLanguage} />
                        )}
                        <div>
                            <a
                                href="https://www.buymeacoffee.com/jalvarezr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* Solo taza - visible en móviles */}
                                <img
                                    src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                                    alt="Buy Me a Coffee"
                                    className="h-10 w-10 block md:hidden"
                                />

                                {/* Botón completo - visible en pantallas grandes */}
                                <img
                                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                                    alt="Buy Me a Coffee"
                                    className="h-10 w-auto hidden md:block"
                                />
                            </a>
                        </div>
                        <button
                            className='lg:hidden h-10 text-[var(--text1)] w-10'
                            onClick={() => setOpenMenu(!openMenu)}
                            aria-label="Toggle menu"
                        >
                            <TbPokeball className={`h-full w-full ${openMenu ? 'rotate-90' : ''} transition-all duration-500`} />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
