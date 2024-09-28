'use client';

import { usePathname } from 'next/navigation';

import * as React from 'react';

import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';

import { navItems } from './config';
import HeaderToggle from './header-toggle';
import { NavItem } from './nav-item';

interface NavBarProps {
  open: boolean;
  onClose: () => void;
}

function NavBar({ open, onClose }: NavBarProps): React.JSX.Element {
  const pathname = usePathname();
  const theme = useTheme();
  const isLargeBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <Drawer
      variant={isLargeBreakpoint ? 'persistent' : 'temporary'}
      open={isLargeBreakpoint ? true : open}
      onClose={onClose}
      PaperProps={{
        sx: {
          '--NavBar-background': 'var(--mui-palette-neutral-950)',
          '--NavBar-color': 'var(--mui-palette-common-white)',
          bgcolor: 'var(--NavBar-background)',
          color: 'var(--NavBar-color)',
          flexDirection: 'column',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          width: { md: 320, xs: '100%' },
          zIndex: 'var(--NavBar-zIndex)',
          display: 'flex',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
    >
      <HeaderToggle open={open} onToggle={onClose} isDrawer />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {navItems.map(({ key, ...item }) => (
          <NavItem key={key} pathname={pathname} {...item} />
        ))}
      </Box>
    </Drawer>
  );
}

export default NavBar;
