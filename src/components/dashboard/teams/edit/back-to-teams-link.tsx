import NextLink from 'next/link';

import * as React from 'react';

import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';

import { Link, Typography } from '@mui/material';

import { paths } from '@/paths';

const BackToTeamsLink = React.memo(() => {
  return (
    <Link
      component={NextLink}
      href={paths.dashboard.teams.index}
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <CaretLeftIcon size={20} />
      <Typography sx={{ ml: 0.5 }} variant="subtitle2">
        Вернуться к списку команд
      </Typography>
    </Link>
  );
});

export default BackToTeamsLink;
