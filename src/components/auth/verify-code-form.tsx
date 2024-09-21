'use client';

import NextLink from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';

import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowLeft as ArrowLeftIcon} from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import {MuiOtpInput} from 'mui-one-time-password-input';
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
  Link,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

import {useLoginMutation} from '@/lib/store/features/authApi';
import {isErrorWithMessage, isFetchBaseQueryError} from '@/lib/store/helpers';
import {paths} from '@/paths';

const schema = zod.object({
  otp: zod.string().min(1, {message: 'Обязательно к заполнению'}).max(8),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {otp: ''} satisfies Values;

export const VerifyCodeForm = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [login, {isLoading}] = useLoginMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<Values>({defaultValues, resolver: zodResolver(schema)});

  const onSubmit = React.useCallback(
    async (values: Values) => {
      try {
        await login({...values, email: email ?? ''}).unwrap();
        router.replace(paths.dashboard.teams);
      } catch (err) {
        // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.status);

          setError('root', {type: 'server', message: errMsg});
        } else if (isErrorWithMessage(err)) {
          setError('root', {type: 'server', message: err.message});
        }
      }
    },
    [login, email, setError, router],
  );

  return (
    <Box sx={{maxWidth: '600px', width: '100%'}}>
      <Box sx={{mb: 4}}>
        <Link
          color="text.primary"
          component={NextLink}
          href={paths.auth.signIn}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline="hover"
        >
          <SvgIcon sx={{mr: 1}}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Typography variant="subtitle2">Назад</Typography>
        </Link>
      </Box>
      <Card elevation={16}>
        <CardHeader sx={{pb: 0}} title="Введите код" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="otp"
                render={({field, fieldState}) => (
                  <FormControl error={Boolean(errors.otp)}>
                    <MuiOtpInput {...field} length={8} />
                    {fieldState.error && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              {errors.root && <Alert color="error">{errors.root.message}</Alert>}
              <Button disabled={isLoading} type="submit" variant="contained">
                Отправить
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
