'use client';

import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { Avatar, Box, Stack, ToggleButton, Typography } from '@mui/material';

type HeaderToggleProps = {
  open: boolean;
  onToggle: () => void;
  isDrawer?: boolean;
};

const HeaderToggle = ({ onToggle, open, isDrawer }: HeaderToggleProps) => {
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
          display: { lg: 'none' },
        }}
        aria-label="toggle menu"
      >
        <ListIcon color={open ? 'var(--mui-palette-common-white)' : 'currentColor'} size={30} />
      </ToggleButton>
      <Stack
        sx={{
          display: isDrawer ? 'flex' : 'none',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          ml: { lg: 2, xs: 1 },
        }}
      >
        <Box alt="logo" component="img" src="/assets/logo.svg" width={45} height={45} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            ml: 1,
            color: open ? 'var(--mui-palette-primary-contrastText)' : 'currentColor',
          }}
        >
          Sportspace
        </Typography>
      </Stack>
      {!isDrawer && <Avatar sx={{ ml: 'auto', mr: 3, width: 30, height: 30 }} />}
    </Stack>
  );
};

export default HeaderToggle;
