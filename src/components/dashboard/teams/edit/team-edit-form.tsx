'use client';

import Image from 'next/image';

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
import { SkeletonList } from '@/components/ui/list';
import { useAsyncRoutePush } from '@/hooks/use-async-route';
import { useGetTeamByIdQuery } from '@/lib/store/features/teams-api';
import { saveTeamThunk } from '@/lib/store/features/teams-slice';
import { useAppDispatch } from '@/lib/store/hooks';
import { paths } from '@/paths';

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const dispatch = useAppDispatch();
  const asyncRoutePush = useAsyncRoutePush();

  const methods = useForm<TeamEditFormData>({
    mode: 'all',
    defaultValues: teamItem,
    resolver: zodResolver(teamEditFormSchema),
  });

  React.useEffect(() => methods.reset(teamItem), [methods, teamItem]);

  const handleSubmitForm: SubmitHandler<TeamEditFormData> = React.useCallback(
    async (values) => {
      setIsSubmitting(true);
      await dispatch(saveTeamThunk(values))
        .unwrap()
        .then(() => asyncRoutePush(paths.dashboard.teams.index))
        .finally(() => setIsSubmitting(false));
    },
    [dispatch, asyncRoutePush],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
        <input type="submit" hidden disabled={isLoading || isSubmitting} />
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
            disabled={isLoading || isSubmitting}
          >
            Сохранить
          </Button>
        </Stack>
        {isLoading && <SkeletonList />}
        {!isLoading && (
          <Box>
            <Accordion defaultExpanded expanded={isNew ? true : undefined}>
              <AccordionSummary>Настройки команды</AccordionSummary>
              <AccordionDetails>
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
        )}
      </form>
    </FormProvider>
  );
});

export default TeamEditForm;
