'use client';

import * as React from 'react';

import {AppBar} from '@mui/material';

import HeaderToggle from './header-toggle';
import NavBar from './nav-bar';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          flexDirection: 'row',
          height: 'var(--MenuHeader-height)',
        }}
      >
        <HeaderToggle open={open} onToggle={toggle} />
      </AppBar>
      <NavBar open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
