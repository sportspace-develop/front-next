import type { PaletteRange } from '@mui/material/styles/createPalette';

export const california = {
  50: '#fffaea',
  100: '#fff3c6',
  200: '#ffe587',
  300: '#ffd049',
  400: '#ffbb1f',
  500: '#fb9c0c',
  600: '#de7101',
  700: '#b84d05',
  800: '#953b0b',
  900: '#7b310c',
  950: '#471701',
} satisfies PaletteRange;

export const kepple = {
  50: '#f0fdfa',
  100: '#ccfbef',
  200: '#9af5e1',
  300: '#5fe9ce',
  400: '#2ed3b8',
  500: '#15b79f',
  600: '#0e9382',
  700: '#107569',
  800: '#115e56',
  900: '#134e48',
  950: '#042f2c',
} satisfies PaletteRange;

export const neonBlue = {
  50: '#ecf0ff',
  100: '#dde3ff',
  200: '#c2cbff',
  300: '#9ca7ff',
  400: '#7578ff',
  500: '#635bff',
  600: '#4e36f5',
  700: '#432ad8',
  800: '#3725ae',
  900: '#302689',
  950: '#1e1650',
} satisfies PaletteRange;

export const nevada = {
  50: '#fbfcfe',
  100: '#f0f4f8',
  200: '#dde7ee',
  300: '#cdd7e1',
  400: '#9fa6ad',
  500: '#636b74',
  600: '#555e68',
  700: '#32383e',
  800: '#202427',
  900: '#121517',
  950: '#090a0b',
} satisfies PaletteRange;

export const redOrange = {
  50: '#fef3f2',
  100: '#fee4e2',
  200: '#ffcdc9',
  300: '#fdaaa4',
  400: '#f97970',
  500: '#f04438',
  600: '#de3024',
  700: '#bb241a',
  800: '#9a221a',
  900: '#80231c',
  950: '#460d09',
} satisfies PaletteRange;

export const shakespeare = {
  50: '#ecfdff',
  100: '#cff7fe',
  200: '#a4eefd',
  300: '#66e0fa',
  400: '#10bee8',
  500: '#04aad6',
  600: '#0787b3',
  700: '#0d6d91',
  800: '#145876',
  900: '#154964',
  950: '#082f44',
} satisfies PaletteRange;

export const stormGrey = {
  50: '#f9fafb',
  100: '#f1f1f4',
  200: '#dcdfe4',
  300: '#b3b9c6',
  400: '#8a94a6',
  500: '#667085',
  600: '#565e73',
  700: '#434a60',
  800: '#313749',
  900: '#212636',
  950: '#121621',
} satisfies PaletteRange;

import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const blue = withAlphas({
  lightest: '#F5F8FF',
  light: '#EBEFFF',
  main: '#2970FF',
  dark: '#004EEB',
  darkest: '#00359E',
  contrastText: '#FFFFFF'
});

export const green = withAlphas({
  lightest: '#F6FEF9',
  light: '#EDFCF2',
  main: '#16B364',
  dark: '#087443',
  darkest: '#084C2E',
  contrastText: '#FFFFFF'
});

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
  contrastText: '#FFFFFF'
});

export const purple = withAlphas({
  lightest: '#F9F5FF',
  light: '#F4EBFF',
  main: '#9E77ED',
  dark: '#6941C6',
  darkest: '#42307D',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF'
});
