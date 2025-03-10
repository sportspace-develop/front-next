'use client';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FloppyDiskBack as FloppyDiskBackIcon } from '@phosphor-icons/react/dist/ssr/FloppyDiskBack';

import { Button, Unstable_Grid2 as Grid, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import FileInput from '@/components/ui/file-input';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';
import { useUploadFile } from '@/hooks/use-upload-file';

import { MAX_PLAYER_FIO_LENGTH, playerEditFormSchema } from '../constants';
import { PlayerEditFormData } from '../types';

const MIN_BIRTH_DATE = new Date('1900-12-01');
const MAX_BIRTH_DATE = new Date();

type TeamPlayersEditFormProps = {
  setDirty?: (value: boolean) => void;
  item?: PlayerEditFormData;
  onSave: (value: PlayerEditFormData) => void;
};

const TeamPlayerEditForm = React.memo(({ item, onSave, setDirty }: TeamPlayersEditFormProps) => {
  const handleUploadFile = useUploadFile();

  const methods = useForm<PlayerEditFormData>({
    mode: 'all',
    defaultValues: item,
    resolver: zodResolver(playerEditFormSchema),
  });

  React.useEffect(() => {
    setDirty?.(methods.formState.isDirty);

    return () => setDirty?.(false);
  }, [methods.formState.isDirty, setDirty]);

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
          <Grid md={6} xs={24}>
            <Controller
              control={methods.control}
              name="photoUrl"
              render={({ field }) => (
                <FileInput
                  {...field}
                  fullWidth
                  onUnload={handleUploadFile}
                  label="Фото"
                  inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                />
              )}
            />
          </Grid>
          <Grid md={1} xs={24} sx={{ p: 0 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                minWidth: 30,
                width: 30,
                height: 30,
                mt: '21px',
                p: '4px',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <FloppyDiskBackIcon size={20} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 'max-content',
                mt: 1,
                ml: 'auto',
                display: { xs: 'block', md: 'none' },
              }}
            >
              Сохранить игрока
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
});

export default TeamPlayerEditForm;
