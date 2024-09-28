import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiAccordionSummary = {
  defaultProps: {
    expandIcon: <CaretDownIcon />,
  },
} satisfies Components<Theme>['MuiAccordionSummary'];
