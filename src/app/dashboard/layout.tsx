import * as React from 'react';

import { Box, Container, GlobalStyles } from '@mui/material';

import UserProfileInitializer from '@/components/core/user-provider';
import Header from '@/components/dashboard/layout/header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <UserProfileInitializer />
      <GlobalStyles
        styles={{
          body: {
            '--NavBar-zIndex': 1100,
            '--MenuBar-width': '320px',
            '--MenuHeader-height': '54px',
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <Header />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            mt: 'var(--MenuHeader-height)',
            pl: { lg: 'var(--MenuBar-width)' },
          }}
        >
          <main>
            <Container maxWidth="xl" sx={{ py: 3 }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </>
  );
}
