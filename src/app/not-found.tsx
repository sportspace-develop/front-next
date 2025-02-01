import type { Metadata } from 'next';

import { Box, Container, Stack, Typography } from '@mui/material';

import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `404 | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <main>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            alt="Ничего не найдено"
            component="img"
            src="/assets/404.svg"
            sx={{
              height: 'auto',
              maxWidth: '100%',
              width: 400,
            }}
          />
        </Box>
        <Stack
          spacing={2}
          textAlign="center"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant="h1">Страница не найдена</Typography>
          <Typography variant="subtitle1">Но есть другие полезные страницы</Typography>
          <BackToLink text="На главную" href={paths.dashboard.tournaments.index} />
        </Stack>
      </Container>
    </main>
  );
}
