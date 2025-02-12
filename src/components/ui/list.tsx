import * as React from 'react';

import { Box, Skeleton, Stack, Typography } from '@mui/material';

const SkeletonList = React.memo(() => (
  <Stack
    display="flex"
    spacing={3}
    sx={{
      alignItems: 'center',
      justifyContent: { lg: 'space-around', xs: 'center' },
    }}
  >
    {Array(3)
      .fill(1)
      .map((_, index) => (
        <Skeleton key={index} height="40px" animation="wave" width="100%" />
      ))}
  </Stack>
));

const ListError = React.memo(() => {
  return (
    <Stack
      display="flex"
      spacing={3}
      sx={{
        flexDirection: { md: 'row' },
        alignItems: 'center',
        justifyContent: { lg: 'space-around', xs: 'center' },
      }}
    >
      <Box
        alt="Ничего не найдено"
        component="img"
        src="/assets/empty-list.svg"
        sx={{
          height: 'auto',
          maxWidth: '100%',
          width: { xs: 300, lg: 400 },
          mx: { md: 4 },
        }}
      />
      <Typography textAlign="center" variant="h3">
        Ошибка! Мы не смогли найти то, что вы ищете
      </Typography>
    </Stack>
  );
});

type ListNoDataProps = {
  hiddenCreateText?: boolean;
};

const ListNoData = React.memo(({ hiddenCreateText }: ListNoDataProps) => {
  return (
    <Stack
      display="flex"
      spacing={3}
      sx={{
        maxWidth: '900px',
        flexDirection: { md: 'row' },
        alignItems: 'center',
        mx: 'auto',
        mt: { md: 3 },
        justifyContent: { lg: 'space-around', xs: 'center' },
      }}
    >
      <Box
        alt="Не найдено"
        component="img"
        src="/assets/empty-list.svg"
        sx={{
          height: 'auto',
          maxWidth: '100%',
          width: { xs: 300, lg: 400 },
          mx: { md: 4 },
        }}
      />
      <Stack spacing={1}>
        <Typography textAlign="center" variant="h3">
          Пока список пуст
        </Typography>
        {!hiddenCreateText && (
          <Typography textAlign="center" variant="subtitle2">
            Но вы можете создать первый элемент
          </Typography>
        )}
      </Stack>
    </Stack>
  );
});

const ListHeader = React.memo(({ text }: { text: string }) => (
  <Typography variant="h2" sx={{ flex: '1 1 auto' }}>
    {text}
  </Typography>
));

export { ListError, ListHeader, ListNoData, SkeletonList };
