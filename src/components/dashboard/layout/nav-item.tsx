'use client';

import RouterLink from 'next/link';

import * as React from 'react';

import { Box, Typography } from '@mui/material';

import { isNavItemActive } from '@/lib/is-nav-item-active';
import type { NavItemConfig } from '@/types/nav';

import { navIcons } from './nav-icons';

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

const getWrapperProps = ({ href, external }: { href?: string; external?: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapperProps: Record<string, any> = {};

  if (href) {
    wrapperProps.href = href;

    if (external) {
      wrapperProps = {
        ...wrapperProps,
        component: 'a',
        target: '_blank',
        rel: 'noreferrer',
      };
    } else {
      wrapperProps = {
        ...wrapperProps,
        component: RouterLink,
      };
    }
  } else {
    wrapperProps = {
      ...wrapperProps,
      role: 'button',
    };
  }

  return wrapperProps;
};

export function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <Box
      {...getWrapperProps({ external, href })}
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        color: 'var(--mui-palette-neutral-300)',
        cursor: 'pointer',
        display: 'flex',
        flex: '0 0 auto',
        gap: 1,
        p: '10px 16px',
        mb: 2,
        position: 'relative',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...(disabled && {
          bgcolor: 'var(--mui-palette-neutral-400)',
          color: 'var(--mui-palette-neutral-500)',
          cursor: 'not-allowed',
        }),
        ...(active && {
          bgcolor: 'var(--mui-palette-primary-dark)',
          color: 'var(--mui-palette-primary-contrastText)',
        }),
        border: 'none',
      }}
    >
      <Box
        sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}
      >
        {Icon && (
          <Icon
            fill={
              active ? 'var(--mui-palette-primary-contrastText)' : 'var(--mui-palette-neutral-400)'
            }
            fontSize="var(--icon-fontSize-md)"
            weight={active ? 'fill' : undefined}
          />
        )}
      </Box>
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
    </Box>
  );
}
