'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormControl, Button, FormHelperText, Stack, Box, Avatar, InputLabel, OutlinedInput, CardMedia, Unstable_Grid2 as Grid} from '@mui/material';
import {z as zod} from 'zod';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import {teamCreateFormSchema, ACCEPTED_IMAGE_TYPES} from './team-create-form-schema';
import useObjectURL from '@/hooks/use-object-url';
import {paths} from '@/paths';
import FileInput from '@/components/ui/fileInput';

const defaultValues = {name: '', logoFile: null, pictureFile: null} satisfies Values;

type Values = zod.input<typeof teamCreateFormSchema>;

export const TeamCreateForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Values>({defaultValues, resolver: zodResolver(teamCreateFormSchema)});


  const logoUrl = useObjectURL(watch("logoFile"))
  const pictureUrl = useObjectURL(watch("pictureFile"))


  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      // setIsPending(true);
      // HARDCODE
      router.replace(paths.dashboard.teams);
      // setIsPending(false);
    },
    [router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{maxWidth: 1200}}>
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
                    onBlur={(event) => setValue("name", event.target.value.trim())}
                    label="Название команды"
                  />
                  {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="pictureFile"
              render={({field, fieldState}) =>
                <FileInput
                  {...field}
                  label="Фото Команды"
                  inputProps={{accept: ACCEPTED_IMAGE_TYPES}}
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                />
              }
            />
            {pictureUrl && !errors.pictureFile && (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CardMedia sx={{height: 150, width: '100%', maxWidth: 500}} image={pictureUrl} />
              </Box>
            )}
            <Grid container spacing={2} sx={{justifyContent: "space-between"}}>
              <Grid md={10} xs={12} display="grid">
                <Controller
                  control={control}
                  name="logoFile"
                  render={({field, fieldState}) =>
                    <FileInput
                      {...field}
                      label="Логотип"
                      inputProps={{accept: ACCEPTED_IMAGE_TYPES}}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                    />
                  }
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
        <CardActions sx={{justifyContent: "flex-end"}}>
          <Button disabled={isPending} type="submit" variant="contained">
            Создать команду
          </Button>
        </CardActions>
      </Card>
    </form >
  );
};