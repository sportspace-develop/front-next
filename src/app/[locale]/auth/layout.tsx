import * as React from 'react';

import { Box } from '@mui/material';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: 3,
      }}
    >
      {children}
    </Box>
  );
}
