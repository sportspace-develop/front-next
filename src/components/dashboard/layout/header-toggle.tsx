'use client';

import * as React from 'react';

import {Avatar, Stack, ToggleButton, Typography} from '@mui/material';
import {List as ListIcon} from '@phosphor-icons/react/dist/ssr/List';

type HeaderToggleProps = {
  open: boolean;
  onToggle: () => void;
  isDrawer?: boolean;
};

const HeaderToggle = ({onToggle, open, isDrawer}: HeaderToggleProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        height: 'var(--MenuHeader-height)',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <ToggleButton
        value="check"
        selected={open}
        onChange={onToggle}
        sx={{
          width: 40,
          border: 'none',
          ml: 2,
          p: 1,
          display: {lg: 'none'},
        }}
        aria-label="toggle menu"
      >
        <ListIcon color={open ? 'var(--mui-palette-common-white)' : 'currentColor'} size={30} />
      </ToggleButton>
      <Stack sx={{justifyContent: 'center', alignItems: 'center', ml: {lg: 4, xs: 1}}}>
        <Typography variant="h5" sx={{fontWeight: 600}}>
          Sport space
        </Typography>
      </Stack>
      {!isDrawer && <Avatar sx={{ml: 'auto', mr: 3, width: 30, height: 30}} />}
    </Stack>
  );
};

export default HeaderToggle;
