'use client';

import Image from 'next/image';

import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Avatar, Box, Button, Unstable_Grid2 as Grid, Stack, TextField } from '@mui/material';

import FileInput from '@/components/ui/file-input';
import { SkeletonList } from '@/components/ui/list';
import { useUploadFileMutation } from '@/lib/store/features/file-api';

import { TeamEditFormData } from '../types';
import { ACCEPTED_IMAGE_TYPES, MAX_TEAM_NAME_LENGTH, teamEditFormSchema } from './constants';

const DEFAULT_INITIAL_VALUES: TeamEditFormData = {
  title: '',
};

type TeamSettingsEditFormProps = {
  isLoading: boolean;
  team?: TeamEditFormData;
  onSave: (values: TeamEditFormData) => void;
};

const TeamSettingsEditForm = React.memo(
  ({ team = DEFAULT_INITIAL_VALUES, isLoading, onSave }: TeamSettingsEditFormProps) => {
    const [uploadFile] = useUploadFileMutation();

    const methods = useForm<TeamEditFormData>({
      mode: 'all',
      defaultValues: team,
      resolver: zodResolver(teamEditFormSchema),
    });

    React.useEffect(() => methods.reset(team), [methods, team]);

    if (isLoading) {
      return <SkeletonList />;
    }

    const handleUploadFile = async (file: File) => {
      try {
        const { url } = await uploadFile(file).unwrap();

        return url;
      } catch {}
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSave)}>
          <Stack spacing={3}>
            <Controller
              control={methods.control}
              name="title"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  helperText={fieldState.error?.message}
                  error={fieldState.invalid}
                  label="Название команды"
                  fullWidth
                  inputProps={{ maxLength: MAX_TEAM_NAME_LENGTH }}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="photoUrl"
              render={({ field, fieldState }) => (
                <>
                  <FileInput
                    {...field}
                    onUnload={handleUploadFile}
                    label="Фото Команды"
                    inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                  />
                  {!fieldState.error && field.value && (
                    <Box
                      sx={{
                        position: 'relative',
                        height: 100,
                      }}
                    >
                      <Image
                        style={{ objectFit: 'contain' }}
                        sizes="100px"
                        fill
                        alt="фото команды"
                        src={field.value}
                      />
                    </Box>
                  )}
                </>
              )}
            />
            <Controller
              name="logoUrl"
              control={methods.control}
              render={({ field, fieldState }) => (
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Grid md={10} sm={9} xs={12} display="grid">
                    <FileInput
                      {...field}
                      onUnload={handleUploadFile}
                      label="Логотип"
                      inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                    />
                  </Grid>
                  <Grid>
                    {!fieldState.error && field.value && (
                      <Avatar src={field.value} sx={{ height: 100, width: 100, boxShadow: 3 }} />
                    )}
                  </Grid>
                </Grid>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 'max-content', ml: 'auto' }}
              disabled={isLoading}
            >
              Сохранить
            </Button>
          </Stack>
        </form>
      </FormProvider>
    );
  },
);

export default TeamSettingsEditForm;
