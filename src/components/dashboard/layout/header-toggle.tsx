'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';

import { Box, Button, Stack, ToggleButton, Typography } from '@mui/material';

import { useLogoutMutation } from '@/lib/store/features/auth-api';
import { paths } from '@/paths';

type HeaderToggleProps = {
  open: boolean;
  onToggle: () => void;
  isDrawer?: boolean;
};

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout().unwrap();
      router.push(paths.auth.signIn);
      toast.success('Вы успешно вышли');
    } catch (error) {
      toast.error('Произошла ошибка при выходе');
    }
  };

  return (
    <Button
      sx={{ ml: 'auto', boxShadow: 4, width: 'max-content', mr: 2 }}
      variant="outlined"
      onClick={handleSignOut}
      startIcon={<SignOutIcon />}
    >
      Выход
    </Button>
  );
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
          variant="h3"
          sx={{
            fontWeight: 600,
            ml: 1,
            color: open ? 'var(--mui-palette-primary-contrastText)' : 'currentColor',
          }}
        >
          Sportspace
        </Typography>
      </Stack>
      {!isDrawer && <LogoutButton />}
    </Stack>
  );
};

export default HeaderToggle;
