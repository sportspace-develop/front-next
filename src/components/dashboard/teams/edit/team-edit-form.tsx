'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as React from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import FileInput from '@/components/ui/file-input';
import {
  useCreateTeamMutation,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useUploadImageMutation,
} from '@/lib/store/features/teams-api';

import { TeamEditFormData } from '../types';
import { ACCEPTED_IMAGE_TYPES, MAX_TEAM_NAME_LENGTH, teamEditFormSchema } from './constants';
import PlayerFormContent from './player-form-content';

const DEFAULT_INITIAL_VALUES: TeamEditFormData = {
  title: '',
  logo: {
    url: '',
    file: null,
  },
  photo: {
    url: '',
    file: null,
  },
  players: [],
};

type TeamEditFormProps = {
  id?: string;
  title: string;
};

const TeamEditForm = React.memo(({ id, title }: TeamEditFormProps) => {
  const isNew = React.useMemo(() => id === undefined, [id]);
  const { data: teamItem = DEFAULT_INITIAL_VALUES, isLoading } = useGetTeamByIdQuery(
    id ?? skipToken,
  );

  console.log(teamItem);

  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [uploadImage] = useUploadImageMutation();

  const router = useRouter();

  const methods = useForm<TeamEditFormData>({
    mode: 'all',
    defaultValues: teamItem,
    resolver: zodResolver(teamEditFormSchema),
  });

  React.useEffect(() => methods.reset(teamItem), [teamItem]);

  const handleSubmitForm: SubmitHandler<TeamEditFormData> = React.useCallback(
    async (values) => {
      console.log(values);
      const result = isNew
        ? await createTeam(values).unwrap()
        : await updateTeam({ ...values, id: id! }).unwrap();

      console.log(JSON.stringify(result));

      if (result) {
        const formData = new FormData();

        if (values.logo.url !== result.logo_url) {
          formData.append('logo_file', values.logo.file || '');
        }

        if (values.photo.url !== result.photo_url) {
          formData.append('photo_file', values.photo.file || '');
        }

        const res = await uploadImage({ formData, id: result.id });

        console.log(res);
      }
      // setIsPending(true);
      // HARDCODE

      console.log(result);

      // router.replace(paths.dashboard.teams.index);
    },
    [createTeam, router, updateTeam],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
        <input type="submit" hidden disabled={isLoading} />
        <Stack
          spacing={3}
          display="flex"
          sx={{ mb: 2, flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 'max-content' }}
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </Stack>
        <Box>
          <Accordion defaultExpanded expanded={isNew ? true : undefined}>
            <AccordionSummary>Настройки команды</AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Controller
                  control={methods.control}
                  name="title"
                  render={({ field, fieldState }) => {
                    console.log('ERRR', methods.formState.errors, methods.getValues());

                    return (
                      <TextField
                        {...field}
                        helperText={fieldState.error?.message}
                        error={fieldState.invalid}
                        label="Название команды"
                        fullWidth
                        inputProps={{ maxLength: MAX_TEAM_NAME_LENGTH }}
                      />
                    );
                  }}
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
                        helperText={fieldState.error?.message}
                        error={fieldState.invalid}
                      />
                      {field.value?.url && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Image
                            style={{
                              maxWidth: 500,
                              maxHeight: 100,
                            }}
                            height={100}
                            width={100}
                            objectFit="contain"
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
                      <Grid md={10} xs={12} display="grid">
                        <FileInput
                          {...field}
                          label="Логотип"
                          inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                          helperText={fieldState.error?.message}
                          error={fieldState.invalid}
                        />
                      </Grid>
                      <Grid>
                        {field.value?.url && (
                          <Avatar
                            src={field.value.url}
                            sx={{ height: 100, width: 100, boxShadow: 3 }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  )}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          {!isNew && (
            <Accordion defaultExpanded>
              <AccordionSummary>Игроки</AccordionSummary>
              <AccordionDetails>
                <PlayerFormContent />
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </form>
    </FormProvider>
  );
});

export default TeamEditForm;
