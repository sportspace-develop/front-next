import * as React from 'react';

import {Box} from '@mui/material';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps): React.JSX.Element => {
  return (
    <Box sx={{display: 'flex', flex: '1 1 auto', flexDirection: 'column', pt: 30}}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flex: '1 1 auto',
          justifyContent: 'center',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
