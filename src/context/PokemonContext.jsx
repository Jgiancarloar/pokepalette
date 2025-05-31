import React, { createContext, useState, useEffect } from 'react';
import { extractColorsFromImage  } from '../utils/extractColors'

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [palette, setPalette] = useState([]);

    const updateCSSVariables = (colorsObj) => {
        const root = document.documentElement;
        Object.entries(colorsObj).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    };

    const officialArtworkURL = (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const pixelSpriteURL = (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const stored = localStorage.getItem('pokemons');
                if (stored) {
                    const pokemonsData = JSON.parse(stored);
                    setPokemons(pokemonsData);
                    const random = pokemonsData[Math.floor(Math.random() * pokemonsData.length)];
                    setSelectedPokemon(random);
                    return;
                }

                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
                const data = await res.json();

                const detailedPokemons = data.results.map((poke) => {
                    const idMatch = poke.url.match(/\/pokemon\/(\d+)\//);
                    const id = idMatch ? idMatch[1] : null;

                    return {
                        id,
                        name: poke.name,
                        pixelSprite: pixelSpriteURL(id),
                        officialArtwork: officialArtworkURL(id),
                    };
                });

                setPokemons(detailedPokemons);
                localStorage.setItem('pokemons', JSON.stringify(detailedPokemons));

                const random = detailedPokemons[Math.floor(Math.random() * detailedPokemons.length)];
                setSelectedPokemon(random);

            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
    }, []);

    useEffect(() => {
        const loadPalette = async () => {
            if (!selectedPokemon) return;
            try {
                const colors = await extractColorsFromImage (selectedPokemon.officialArtwork, 6);
                setPalette(colors);
            } catch (error) {
                console.error('Error extracting colors:', error);
                setPalette([]);
            }
        };
        loadPalette();
    }, [selectedPokemon]);

    useEffect(() => {
        if (!palette || Object.keys(palette).length === 0) return;
        updateCSSVariables(palette);
    }, [palette]);

    return (
        <PokemonContext.Provider
            value={{
                pokemons,
                selectedPokemon,
                setSelectedPokemon,
                palette,
                setPalette,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};