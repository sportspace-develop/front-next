'use client';

import * as React from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import FileInput from '@/components/ui/file-input';
import { SkeletonList } from '@/components/ui/list';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';
import { useAsyncRoutePush } from '@/hooks/use-async-route';
import { useUploadFile } from '@/hooks/use-upload-file';
import formatDateToISO from '@/lib/format-date-to-ISO';
import parseDateFromISO from '@/lib/parse-date-from-ISO';
import {
  useGetTournamentByIdQuery,
  useSaveTournamentMutation,
} from '@/lib/store/features/tournaments-api';
import { paths } from '@/paths';

import {
  MAX_TOURNAMENT_DESCRIPTION,
  MAX_TOURNAMENT_TITLE_LENGTH,
  tournamentEditFormSchema,
} from '../constants';
import { TournamentDTO, TournamentEditFormData } from '../types';

type TournamentEditFormProps = {
  id?: string;
  title: string;
};

const getTournamentValues = (tournament?: TournamentDTO): TournamentEditFormData => {
  if (!tournament) {
    return {
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      registerStartDate: null,
      registerEndDate: null,
    };
  }

  return {
    ...tournament,
    description: tournament.description || '',
    startDate: parseDateFromISO(tournament.startDate),
    endDate: parseDateFromISO(tournament.endDate),
    registerStartDate: parseDateFromISO(tournament.registerStartDate),
    registerEndDate: parseDateFromISO(tournament.registerEndDate),
  };
};

const prepareTournamentDataForSave = (values: TournamentEditFormData): TournamentDTO => ({
  ...values,
  startDate: formatDateToISO(values.startDate),
  endDate: formatDateToISO(values.endDate),
  registerStartDate: formatDateToISO(values.registerStartDate),
  registerEndDate: formatDateToISO(values.registerEndDate),
});

const TournamentEditForm = React.memo(({ id, title }: TournamentEditFormProps) => {
  const asyncRouterPush = useAsyncRoutePush();

  const handleUploadFile = useUploadFile();

  const { data: tournament, isLoading: isGetLoading } = useGetTournamentByIdQuery(id ?? skipToken);
  const [saveTournament, { isLoading: isSaveTournamentLoading }] = useSaveTournamentMutation();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSave: SubmitHandler<TournamentEditFormData> = React.useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);

        const result = await saveTournament(prepareTournamentDataForSave(values)).unwrap();

        if (result) {
          if (!id) {
            await asyncRouterPush(`${paths.dashboard.tournaments.index}/${result.id}/edit`);
            toast.success(`Турнир ${result.title} создан!`);
          } else {
            toast.success(`Данные турнира ${result.title} сохранены!`);
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [asyncRouterPush, id, saveTournament],
  );

  const isLoading = React.useMemo(
    () => isGetLoading || isSaveTournamentLoading || isSubmitting,
    [isGetLoading, isSaveTournamentLoading, isSubmitting],
  );

  const methods = useForm<TournamentEditFormData>({
    mode: 'all',
    defaultValues: getTournamentValues(tournament),
    resolver: zodResolver(tournamentEditFormSchema),
  });

  React.useEffect(() => methods.reset(getTournamentValues(tournament)), [methods, tournament]);

  const startDate = methods.watch('startDate');
  const registerStartDate = methods.watch('registerStartDate');

  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <>
      <Stack>
        <Typography variant="h4" sx={{ flex: '1 1 auto' }}>
          {title}
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSave)}>
              <Stack spacing={3}>
                <Controller
                  control={methods.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                      label="Название турнира"
                      fullWidth
                      inputProps={{ maxLength: MAX_TOURNAMENT_TITLE_LENGTH }}
                    />
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
                          <Avatar
                            src={field.value}
                            sx={{ height: 100, width: 100, boxShadow: 3 }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  )}
                />
                <Controller
                  control={methods.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                      label="Описание турнира"
                      fullWidth
                      inputProps={{ maxLength: MAX_TOURNAMENT_DESCRIPTION }}
                    />
                  )}
                />
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Grid sm={6} xs={12} display="grid">
                    <Controller
                      control={methods.control}
                      name="registerStartDate"
                      render={({ field, fieldState }) => (
                        <DatePicker
                          {...field}
                          label="Начало регистрации на турнир"
                          maxDate={startDate}
                          minDate={new Date()}
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
                  <Grid sm={6} xs={12} display="grid">
                    <Controller
                      control={methods.control}
                      name="registerEndDate"
                      render={({ field, fieldState }) => (
                        <DatePicker
                          {...field}
                          label="Конец регистрации на турнир"
                          minDate={registerStartDate || new Date()}
                          maxDate={startDate}
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
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Grid sm={6} xs={12} display="grid">
                    <Controller
                      control={methods.control}
                      name="startDate"
                      render={({ field, fieldState }) => (
                        <DatePicker
                          {...field}
                          label="Начало турнира"
                          minDate={new Date()}
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
                  <Grid sm={6} xs={12} display="grid">
                    <Controller
                      control={methods.control}
                      name="endDate"
                      render={({ field, fieldState }) => (
                        <DatePicker
                          {...field}
                          label="Конец турнира"
                          minDate={startDate || new Date()}
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
                </Grid>
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
        </CardContent>
      </Card>
    </>
  );
});

export default TournamentEditForm;
