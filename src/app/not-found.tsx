import type { Metadata } from 'next';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

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
        <Stack spacing={2} textAlign="center">
          <Typography variant="h3">Страница не найдена</Typography>
          <Typography variant="subtitle1">Но есть другие полезные страницы</Typography>
          <Button
            href={paths.dashboard.teams}
            variant="contained"
            sx={{ maxWidth: 'max-content', margin: 'auto' }}
          >
            Вернуться на главную
          </Button>
        </Stack>
      </Container>
    </main>
  );
}
