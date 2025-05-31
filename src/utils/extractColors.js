import ColorThief from 'colorthief';
import chroma from 'chroma-js';

export const extractColorsFromImage = async (imageUrl, count = 6) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, count);
        const hexPalette = palette.map(rgb => chroma(rgb).hex());

        // Asegura que los fondos sean colores intermedios (no oscuros ni claros extremos)
        const fixBgColor = (color) => {
          let fixed = chroma(color);
          if (fixed.luminance() < 0.3) fixed = fixed.brighten(1.5);
          if (fixed.luminance() > 0.75) fixed = fixed.darken(0.8);
          return fixed.hex();
        };

        // Asegura que los textos sean oscuros pero legibles
        const fixTextColor = (color) => {
          let fixed = chroma(color);
          if (fixed.luminance() > 0.7) fixed = fixed.darken(2); // si es muy claro, oscurece
          if (fixed.luminance() < 0.2) fixed = fixed.brighten(1); // si es muy oscuro, aclara un poco
          return fixed.hex();
        };

        // Asignamos directamente
        const bg1 = fixBgColor(hexPalette[0]);
        const bg2 = fixBgColor(hexPalette[1]);
        const bg3 = fixBgColor(hexPalette[2]);

        const text1 = fixTextColor(hexPalette[3]);
        const text2 = fixTextColor(hexPalette[4]);
        const text3 = fixTextColor(hexPalette[5]);

        resolve({
          bg1, bg2, bg3,
          text1, text2, text3,
        });
      } catch (e) {
        console.error('Error extracting colors:', e);
        reject(e);
      }
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};
