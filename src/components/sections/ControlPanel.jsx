import React, { useContext, useEffect, useRef, useState } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import ColorBlock from '../ui/ColorBlock';
import { useTranslation } from 'react-i18next';
import {
    TbArrowsShuffle2,
    TbEye,
    TbEyeOff,
} from "react-icons/tb";

const ControlPanel = ({ openPanel, setOpenPanel }) => {
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

    return (
        <div
            className={`backdrop-blur-md bg-gray-200/50 fixed h-full max-w-md pt-40 left-0 w-full z-40
            ${openPanel ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300`}>
            <div className='p-5'>
                <div
                    className='bg-white flex flex-col gap-2 p-5 rounded-md'
                >
                    <div
                        className={`flex flex-col gap-2`}
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
                            <ul className='absolute bg-white border border-gray-300 bottom-14 capitalize gap-2 grid grid-cols-1 font-medium max-h-60 overflow-y-scroll rounded-md p-2 w-full z-10'>
                                {filteredPokemons.map((pokemon) => (
                                    <li
                                        key={pokemon.id}
                                        className='bg-gray-300 p-2 rounded-md w-full cursor-pointer whitespace-nowrap truncate'
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
        </div>
    );
};

export default ControlPanel;