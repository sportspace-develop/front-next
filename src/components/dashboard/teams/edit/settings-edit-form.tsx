'use client';

import Image from 'next/image';

import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Avatar, Box, Button, Unstable_Grid2 as Grid, Stack, TextField } from '@mui/material';

import FileInput from '@/components/ui/file-input';
import { SkeletonList } from '@/components/ui/list';

import { TeamDTO, TeamEditFormData } from '../types';
import { ACCEPTED_IMAGE_TYPES, MAX_TEAM_NAME_LENGTH, teamEditFormSchema } from './constants';

export const DEFAULT_INITIAL_VALUES: TeamDTO = {
  title: '',
};

type TeamSettingsEditFormProps = {
  isLoading: boolean;
  team: TeamEditFormData;
  onSave: (values: TeamEditFormData) => void;
};

const TeamSettingsEditForm = React.memo(
  ({ team, isLoading, onSave }: TeamSettingsEditFormProps) => {
    const methods = useForm<TeamEditFormData>({
      mode: 'all',
      defaultValues: team,
      resolver: zodResolver(teamEditFormSchema),
    });

    React.useEffect(() => methods.reset(team), [methods, team]);

    if (isLoading) {
      return <SkeletonList />;
    }

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
              name="photo"
              render={({ field, fieldState }) => (
                <>
                  <FileInput
                    {...field}
                    label="Фото Команды"
                    inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                    fieldState={fieldState}
                  />
                  {!fieldState.error && field.value?.url && (
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
                        src={field.value.url}
                      />
                    </Box>
                  )}
                </>
              )}
            />
            <Controller
              name="logo"
              control={methods.control}
              render={({ field, fieldState }) => (
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Grid md={10} sm={9} xs={12} display="grid">
                    <FileInput
                      {...field}
                      label="Логотип"
                      inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                      fieldState={fieldState}
                    />
                  </Grid>
                  <Grid>
                    {!fieldState.error && field.value?.url && (
                      <Avatar
                        src={field.value.url}
                        sx={{ height: 100, width: 100, boxShadow: 3 }}
                      />
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
