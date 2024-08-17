
// TODO - разобраться что за experimental_extendTheme as extendTheme - и можно ли им заменить createTheme
import {createTheme as createMuiTheme, responsiveFontSizes} from '@mui/material/styles';
import { createOptions as createDarkOptions } from './dark/create-options';
import { createOptions as createLightOptions } from './light/create-options';

declare module '@mui/material/styles/createPalette' {
  interface PaletteRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  interface Palette {
    neutral: PaletteRange;
  }

  interface PaletteOptions {
    neutral?: PaletteRange;
  }

  interface TypeBackground {
    level1: string;
    level2: string;
    level3: string;
  }
}

// TODO: config не передается - по факту всегда light мод срабатывает
export const createTheme = (config?: any) => {
  let theme = createMuiTheme(
    // Options based on selected palette mode, color preset and contrast
    // @ts-ignore
    config.paletteMode === 'dark'
      ? createDarkOptions({
        colorPreset: 'indigo',
        contrast: 'normal'
      })
      : createLightOptions({
        colorPreset: 'indigo',
        contrast: 'normal'
      }));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
