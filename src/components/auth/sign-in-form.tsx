'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';

import { useRequestOtpMutation } from '@/lib/store/features/authApi';
import { paths } from '@/paths';

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Поле обязательно' })
    .email({ message: 'Невалидный email' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'help@sportspace.com' } satisfies Values;

export const SignInForm = (): React.JSX.Element => {
  const router = useRouter();

  const [requestOtp, { isLoading }] = useRequestOtpMutation();

  const { control, handleSubmit } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        await requestOtp(values).unwrap();
        const params = new URLSearchParams({
          email: values.email,
        });

        router.push(`${paths.auth.verifyCode}?${params.toString()}`);
      } catch {}
    },
    [requestOtp, router],
  );

  return (
    <Box sx={{ maxWidth: '450px', width: '100%' }}>
      <Card elevation={16}>
        <CardHeader sx={{ pb: 0 }} title="Войти" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                  />
                )}
              />
              <Button disabled={isLoading} type="submit" variant="contained">
                Войти
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
