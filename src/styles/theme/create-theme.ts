import { experimental_extendTheme as extendTheme } from '@mui/material';
import { ruRU as coreRuRU } from '@mui/material/locale';
import { ruRU } from '@mui/x-date-pickers/locales';

import { colorSchemes } from './color-schemes';
import { components } from './components/components';
import { shadows } from './shadows';
import type { Theme } from './types';
import { typography } from './typography';

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

  interface TypeBackground {
    level1?: string;
    level2?: string;
    level3?: string;
  }

  interface PaletteOptions {
    neutral?: PaletteRange;
    background?: Partial<TypeBackground>;
  }
}

export function createTheme(): Theme {
  return extendTheme(
    {
      breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
      components,
      colorSchemes,
      shadows,
      shape: { borderRadius: 8 },
      typography,
    },
    ruRU,
    coreRuRU,
  );
}
