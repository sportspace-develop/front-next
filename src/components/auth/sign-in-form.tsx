'use client';

import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';

import { useAsyncRoutePush } from '@/hooks/use-async-route';
import { useRequestOtpMutation } from '@/lib/store/features/auth-api';
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
  const [requestOtp] = useRequestOtpMutation();
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  const asyncRouterPush = useAsyncRoutePush();

  const { control, handleSubmit } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<Values> = React.useCallback(
    async (values) => {
      setIsSubmitDisabled(true);

      try {
        await requestOtp(values).unwrap();
        const params = new URLSearchParams({ email: values.email });

        await asyncRouterPush(`${paths.auth.verifyCode}?${params.toString()}`);
      } finally {
        setIsSubmitDisabled(false);
      }
    },
    [asyncRouterPush, requestOtp],
  );

  return (
    <Box sx={{ maxWidth: '450px', width: '100%' }}>
      <Card elevation={16}>
        <CardHeader sx={{ pb: 0 }} title="Войти" />
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                  />
                )}
              />
              <Button disabled={isSubmitDisabled} type="submit" variant="contained">
                Войти
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
