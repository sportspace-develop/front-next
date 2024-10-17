'use client';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FloppyDiskBack as FloppyDiskBackIcon } from '@phosphor-icons/react/dist/ssr/FloppyDiskBack';

import { Box, Button, Unstable_Grid2 as Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import FileInput from '@/components/ui/file-input';

import { PlayerEditFormData } from '../types';
import { ACCEPTED_IMAGE_TYPES, MAX_PLAYER_FIO_LENGTH, playerEditFormSchema } from './constants';

const MIN_BIRTH_DATE = new Date('1900-12-01');
const MAX_BIRTH_DATE = new Date();

type TeamPlayersEditFormProps = {
  isLoading?: boolean;
  item?: PlayerEditFormData;
  onSave: (value: PlayerEditFormData) => void;
};

const TeamPlayerEditForm = React.memo(({ item, onSave, isLoading }: TeamPlayersEditFormProps) => {
  const methods = useForm<PlayerEditFormData>({
    mode: 'all',
    defaultValues: item,
    resolver: zodResolver(playerEditFormSchema),
  });

  React.useEffect(() => methods.reset(item), [methods, item]);

  return (
    <form onSubmit={methods.handleSubmit(onSave)}>
      <Stack spacing={2}>
        <Grid container spacing={2} flex={1} columns={24}>
          <Grid md={4} xs={24}>
            <Controller
              control={methods.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Фамилия"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                  inputProps={{ maxLength: MAX_PLAYER_FIO_LENGTH }}
                />
              )}
            />
          </Grid>
          <Grid md={4} xs={24}>
            <Controller
              control={methods.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Имя"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                  inputProps={{ maxLength: MAX_PLAYER_FIO_LENGTH }}
                />
              )}
            />
          </Grid>
          <Grid md={4} xs={24}>
            <Controller
              control={methods.control}
              name="secondName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Отчество"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                  inputProps={{ maxLength: MAX_PLAYER_FIO_LENGTH }}
                />
              )}
            />
          </Grid>
          <Grid md={5} xs={24}>
            <Controller
              control={methods.control}
              name="bDay"
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Дата"
                  maxDate={MAX_BIRTH_DATE}
                  minDate={MIN_BIRTH_DATE}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid md={5} xs={24}>
            <Controller
              control={methods.control}
              name="photo"
              render={({ field, fieldState }) => (
                <FileInput
                  {...field}
                  fullWidth
                  label="Фото"
                  inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                  fieldState={fieldState}
                />
              )}
            />
          </Grid>
          <Grid md={2} xs={24}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 'max-content' }}
              disabled={isLoading}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <FloppyDiskBackIcon size={30} />
              </Box>
              <Typography sx={{ display: { xs: 'span', md: 'none' } }}>Сохранить</Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
});

export default TeamPlayerEditForm;
