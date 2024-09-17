'use client';

import * as React from 'react';

import {Box, Button, Container, Stack, Typography} from '@mui/material';

// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  React.useEffect(() => {
    console.log('digest:', error.digest, 'message:', error.message);
  }, [error]);

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
            alt="Ошибка"
            component="img"
            src="/assets/500.svg"
            sx={{
              height: 'auto',
              maxWidth: '100%',
              width: 400,
            }}
          />
        </Box>
        <Stack spacing={2} textAlign="center">
          <Typography variant="h3">Ошибка сервера</Typography>
          <Typography variant="subtitle1">Запрос временно не может быть обработан</Typography>
          <Button
            onClick={() => reset()}
            variant="contained"
            sx={{maxWidth: 'max-content', margin: 'auto'}}
          >
            Попробовать еще раз
          </Button>
        </Stack>
      </Container>
    </main>
  );
}
