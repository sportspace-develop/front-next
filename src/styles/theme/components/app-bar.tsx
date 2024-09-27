import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiAppBar = {
  styleOverrides: { root: { background: 'var(--mui-palette-common-white)' } },
} satisfies Components<Theme>['MuiAppBar'];
