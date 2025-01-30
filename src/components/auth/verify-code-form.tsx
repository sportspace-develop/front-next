'use client';

import { useSearchParams } from 'next/navigation';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';

import BackToLink from '@/components/ui/back-to-link';
import { useAsyncRouteReplace } from '@/hooks/use-async-route';
import { useLoginMutation } from '@/lib/store/features/auth-api';
import { paths } from '@/paths';

const schema = zod.object({
  otp: zod.string().min(1, { message: 'Поле обязательно' }).max(8),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { otp: '' } satisfies Values;

const VerifyCodeForm = (): React.JSX.Element => {
  const asyncRouteReplace = useAsyncRouteReplace();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  const [login] = useLoginMutation();

  const { control, handleSubmit, setValue } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: Values) => {
      setIsSubmitDisabled(true);

      try {
        await login({ ...values, email: email ?? '' }).unwrap();
        await asyncRouteReplace(paths.dashboard.teams.index);
      } finally {
        setIsSubmitDisabled(false);
      }
    },
    [login, email, asyncRouteReplace],
  );

  const handleChangeOtp: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const trimmedValue = event.target.value.trim();

    setValue('otp', trimmedValue, { shouldValidate: true });
  };

  return (
    <Box sx={{ maxWidth: '400px', width: '100%' }}>
      <BackToLink href={paths.auth.signIn} />
      <Card elevation={16} sx={{ mt: 1 }}>
        <CardHeader sx={{ pb: 0 }} title="Введите код" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="otp"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                    fullWidth
                    onChange={handleChangeOtp}
                    inputProps={{ maxLength: 6 }}
                  />
                )}
              />
              <Button disabled={isSubmitDisabled} type="submit" variant="contained">
                Отправить
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyCodeForm;
