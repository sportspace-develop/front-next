'use client';

import {useRouter} from 'next/navigation';

import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {z as zod} from 'zod';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

import {useRequestOtpMutation} from '@/lib/store/features/authApi';
import {isErrorWithMessage, isFetchBaseQueryError} from '@/lib/store/helpers';
import {paths} from '@/paths';

const schema = zod.object({
  email: zod
    .string()
    .min(1, {message: 'Обязательно к заполнению'})
    .email({message: 'Невалидный email'}),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {email: 'help@sportspace.com'} satisfies Values;

export const SignInForm = (): React.JSX.Element => {
  const router = useRouter();

  const [requestOtp, {isLoading}] = useRequestOtpMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<Values>({defaultValues, resolver: zodResolver(schema)});

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        await requestOtp(values).unwrap();
        const params = new URLSearchParams({
          email: values.email,
        });

        router.push(`${paths.auth.verifyCode}?${params.toString()}`);
      } catch (err) {
        // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

          setError('root', {type: 'server', message: errMsg});
        } else if (isErrorWithMessage(err)) {
          setError('root', {type: 'server', message: err.message});
        }
      }
    },
    [requestOtp, setError, router],
  );

  return (
    <Box sx={{maxWidth: '450px', width: '100%'}}>
      <Card elevation={16}>
        <CardHeader sx={{pb: 0}} title="Войти" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({field, fieldState}) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput {...field} label="Email" type="email" />
                    {fieldState.error && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              {errors.root && <Alert color="error">{errors.root.message}</Alert>}
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
