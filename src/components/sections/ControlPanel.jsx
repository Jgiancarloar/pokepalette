import React, { useContext, useEffect, useRef, useState } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import ColorBlock from '../ui/ColorBlock';
import { useTranslation } from 'react-i18next';
import {
    TbArrowsShuffle2,
    TbEye,
    TbEyeOff,
} from "react-icons/tb";

const ControlPanel = () => {
    const { t } = useTranslation()
    const panelRef = useRef(null);
    const [showColors, setShowColors] = useState(false);
    const { selectedPokemon, pokemons, setSelectedPokemon } = useContext(PokemonContext);
    const [inputSearch, setInputSearch] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredPokemons = pokemons
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));


    useEffect(() => {
        if (selectedPokemon) {
            setInputSearch(selectedPokemon.name);
            setShowSuggestions(false);
        }
    }, [selectedPokemon]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setShowColors(false);
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bottom-10 md:bottom-50 fixed max-w-md px-5 right-0 w-full z-50">
            <div
                className='backdrop-blur-md bg-gray-200/50 flex flex-col gap-2 p-5 rounded-md'
                ref={panelRef}
            >
                <div
                    className={`duration-300 flex flex-col gap-2 overflow-hidden transition-all
                    ${showColors ? 'max-h-96' : 'max-h-0'}`}
                >
                    <ColorBlock label={t('controlPanel.background') + " " + 1} variable="--bg1" />
                    <ColorBlock label={t('controlPanel.background') + " " + 2} variable="--bg2" />
                    <ColorBlock label={t('controlPanel.background') + " " + 3} variable="--bg3" />
                    <ColorBlock label={t('controlPanel.text') + " " + 1} variable="--text1" />
                    <ColorBlock label={t('controlPanel.text') + " " + 2} variable="--text2" />
                    <ColorBlock label={t('controlPanel.text') + " " + 3} variable="--text3" />
                </div>

                <div className='flex gap-2'>
                    <button
                        className='bg-white border border-gray-300 cursor-pointer flex gap-2 h-12 items-center justify-center rounded-md w-full'
                        onClick={() => setShowColors(!showColors)}
                    >
                        <span className='font-semibold'>
                            {t('controlPanel.color')}
                        </span>
                        <div>{showColors ? <TbEyeOff /> : <TbEye />}</div>
                    </button>
                    <button
                        className='bg-white border border-gray-300 cursor-pointer flex gap-2 h-12 items-center justify-center rounded-md w-full'
                        onClick={() => {
                            if (pokemons.length > 0) {
                                const random = pokemons[Math.floor(Math.random() * pokemons.length)];
                                setSelectedPokemon(random);
                                setShowSuggestions(false);
                            }
                        }}
                    >
                        <span className='font-semibold'>
                            {t('controlPanel.random')}
                        </span>
                        <div><TbArrowsShuffle2 /></div>
                    </button>
                </div>

                <div className='relative'>
                    {showSuggestions && filteredPokemons.length > 0 && (
                        <ul className='absolute bg-white border border-gray-300 bottom-14 capitalize flex flex-col gap-2 font-medium max-h-40 overflow-auto rounded-md p-2 w-full z-10'>
                            {filteredPokemons.map((pokemon) => (
                                <li
                                    key={pokemon.id}
                                    className='bg-gray-100 p-2 rounded-md w-full cursor-pointer'
                                    onClick={() => {
                                        setSelectedPokemon(pokemon);
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {pokemon.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        className='bg-white border border-gray-300 capitalize font-medium h-12 outline-none px-2 rounded-md w-full'
                        placeholder='Pikachu'
                        type="text"
                        value={inputSearch}
                        onChange={(e) => {
                            setInputSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;