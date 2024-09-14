'use client';

import {useRouter} from 'next/navigation';

import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {z as zod} from 'zod';

import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

import {useOtpMutation} from '@/lib/store/features/authApi';

const schema = zod.object({
  email: zod.string().min(1, {message: 'Обязательно к заполнению'}).email(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {email: 'help@sportspace.com'} satisfies Values;

export const SignInForm = (): React.JSX.Element => {
  const router = useRouter();

  const [sendOtp, {isError, isLoading, isSuccess}] = useOtpMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<Values>({defaultValues, resolver: zodResolver(schema)});

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      await sendOtp(values);
    },
    [sendOtp],
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Войти</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({field, fieldState}) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
                {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
              </FormControl>
            )}
          />
          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
          <Button disabled={isLoading} type="submit" variant="contained">
            Войти
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
