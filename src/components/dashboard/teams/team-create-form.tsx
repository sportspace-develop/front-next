'use client';

import {useRouter} from 'next/navigation';

import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import {z as zod} from 'zod';

import FileInput from '@/components/ui/fileInput';
import useObjectURL from '@/hooks/use-object-url';
import {paths} from '@/paths';

import {ACCEPTED_IMAGE_TYPES, teamCreateFormSchema} from './team-create-form-schema';

const defaultValues = {name: '', logoFile: null, pictureFile: null} satisfies Values;

type Values = zod.input<typeof teamCreateFormSchema>;

export const TeamCreateForm = () => {
  const router = useRouter();

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Values>({defaultValues, resolver: zodResolver(teamCreateFormSchema)});

  const logoUrl = useObjectURL(watch('logoFile'));
  const pictureUrl = useObjectURL(watch('pictureFile'));

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      // setIsPending(true);
      // HARDCODE
      router.replace(paths.dashboard.teams);
      // setIsPending(false);
    },
    [router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="name"
              render={({field, fieldState}) => (
                <FormControl error={Boolean(errors.name)}>
                  <InputLabel>Название команды</InputLabel>
                  <OutlinedInput
                    {...field}
                    onBlur={(event) => setValue('name', event.target.value.trim())}
                    label="Название команды"
                  />
                  {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="pictureFile"
              render={({field, fieldState}) => (
                <FileInput
                  {...field}
                  label="Фото Команды"
                  inputProps={{accept: ACCEPTED_IMAGE_TYPES}}
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                />
              )}
            />
            {pictureUrl && !errors.pictureFile && (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CardMedia
                  sx={{height: 150, width: '100%', maxWidth: 500, backgroundSize: 'contain'}}
                  image={pictureUrl}
                />
              </Box>
            )}
            <Grid container spacing={2} sx={{justifyContent: 'space-between'}}>
              <Grid md={10} xs={12} display="grid">
                <Controller
                  control={control}
                  name="logoFile"
                  render={({field, fieldState}) => (
                    <FileInput
                      {...field}
                      label="Логотип"
                      inputProps={{accept: ACCEPTED_IMAGE_TYPES}}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                    />
                  )}
                />
              </Grid>
              <Grid>
                {logoUrl && !errors.logoFile && (
                  <Avatar src={logoUrl} sx={{height: 100, width: 100, boxShadow: 3}} />
                )}
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions sx={{justifyContent: 'flex-end'}}>
          <Button type="submit" variant="contained">
            Создать команду
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
