import type { CssVarsTheme } from '@mui/material/styles';
// eslint-disable-next-line no-restricted-imports
import type { Theme as BaseTheme } from '@mui/material/styles/createTheme';

export type Theme = Omit<BaseTheme, 'palette'> & CssVarsTheme;

export type ColorScheme = 'dark' | 'light';
