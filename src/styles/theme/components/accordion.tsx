import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiAccordion = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        border: `1px solid ${theme.palette.grey[400]}`,
        '&:not(:first-child)': {
          borderTop: 0,
        },
      };
    },
  },
} satisfies Components<Theme>['MuiAccordion'];
