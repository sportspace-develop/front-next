import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiAccordionDetails = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        paddingTop: '20px',
      };
    },
  },
} satisfies Components<Theme>['MuiAccordionDetails'];
