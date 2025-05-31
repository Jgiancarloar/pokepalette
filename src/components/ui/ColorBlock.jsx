import React, { useContext, useEffect, useState } from 'react';
import { TbCopy } from "react-icons/tb";
import { PokemonContext } from '../../context/PokemonContext';

// HEX → RGB
const hexToRgb = (hex) => {
    const sanitizedHex = hex.replace('#', '');
    const bigint = parseInt(sanitizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

// HEX → HSL
const hexToHsl = (hex) => {
    const sanitizedHex = hex.replace('#', '');
    const r = parseInt(sanitizedHex.substr(0, 2), 16) / 255;
    const g = parseInt(sanitizedHex.substr(2, 2), 16) / 255;
    const b = parseInt(sanitizedHex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const ColorBlock = ({ label, variable }) => {
    const { palette } = useContext(PokemonContext);
    const [copy, setCopy] = useState(false);
    const [type, setType] = useState('HEX');

    useEffect(() => {
        setType('HEX');
    }, [palette]);

    const cssVar = variable.replace('--', '');
    const hex = palette?.[cssVar];

    if (!hex) {
        return (
            <div className="border border-gray-300 h-12 px-2 rounded-md flex items-center justify-center">
                <span className="text-gray-500 text-sm">Cargando color...</span>
            </div>
        );
    }

    const rgb = hexToRgb(hex);
    const hsl = hexToHsl(hex);

    const getFormattedColor = () => {
        if (type === 'RGB') return rgb;
        if (type === 'HSL') return hsl;
        return hex;
    };

    const handleCopy = () => {
        const color = getFormattedColor();
        navigator.clipboard.writeText(color).then(() => {
            setCopy(true);
            setTimeout(() => setCopy(false), 2000);
        });
    };

    return (
        <div className={`bg-[var(${variable})] border border-gray-300 flex h-12 items-center justify-between px-2 rounded-md`}>
            <span className="font-semibold text-white">{label}</span>
            <div className='flex gap-2 text-xs'>
                <button
                    className='bg-gray-700 px-2 py-2 rounded-md text-white'
                    onClick={handleCopy}
                >
                    {copy ? <span className='font-medium text-white'>¡Copiado!</span> : <TbCopy />}
                </button>
                {['HEX', 'RGB', 'HSL'].map((fmt) => (
                    <button
                        key={fmt}
                        className={`px-2 py-2 rounded-md ${type === fmt ? 'bg-gray-700 text-white' : 'bg-white'}`}
                        onClick={() => setType(fmt)}
                    >
                        {fmt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorBlock;