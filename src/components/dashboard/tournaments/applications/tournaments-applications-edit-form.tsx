'use client';

import * as React from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import addQuotes from '@/lib/add-quotes';
import getLocalizedStatus from '@/lib/get-localized-status';
import {
  useGetTournamentByIdQuery,
  useGetTournamentsApplicationByIdQuery,
  useUpdateTournamentsApplicationMutation,
} from '@/lib/store/features/tournaments-api';
import { ApplicationStatus } from '@/lib/store/types';

import { tournamentApplicationEditFormSchema } from '../constants';
import { TournamentApplicationEditFormData } from '../types';
import PlayersTable from './players-table';

interface TournamentsApplicationEditFormProps {
  tournamentId: number;
  applicationId: number;
  title: string;
}

const DEFAULT_INITIAL_VALUES: TournamentApplicationEditFormData = {
  status: ApplicationStatus.Draft,
};

const TournamentsApplicationEditForm = ({
  tournamentId,
  title,
  applicationId,
}: TournamentsApplicationEditFormProps) => {
  const { data: application, isLoading: isGetApplicationLoading } =
    useGetTournamentsApplicationByIdQuery({ tournamentId, applicationId });
  const { data: tournament, isLoading: isGetTournamentLoading } =
    useGetTournamentByIdQuery(tournamentId);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [updateApplication, { isLoading: isUpdateApplication }] =
    useUpdateTournamentsApplicationMutation();

  const methods = useForm<TournamentApplicationEditFormData>({
    mode: 'all',
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(tournamentApplicationEditFormSchema),
  });

  React.useEffect(() => {
    if (application) {
      methods.reset({ status: application.status });
    }
  }, [methods, application]);

  const isLoading =
    isSubmitting || isGetApplicationLoading || isUpdateApplication || isGetTournamentLoading;

  const handleSave: SubmitHandler<TournamentApplicationEditFormData> = React.useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);

        const result = await updateApplication({
          tournamentId,
          applicationId,
          application: values,
        }).unwrap();

        if (result) {
          toast.success(`Заявка изменена!`);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [applicationId, tournamentId, updateApplication],
  );

  return (
    <>
      <Card>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSave)}>
              <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                <Stack sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h2">{title}</Typography>
                  {application && tournament && (
                    <Stack direction="row">
                      <Typography variant="h3" color="text.secondary" sx={{ mt: 1 }}>
                        на турнир {addQuotes(tournament.title)} для команды{' '}
                        {addQuotes(application.teamTitle)}
                      </Typography>
                      <Avatar
                        src={tournament.logoUrl}
                        title={tournament.title}
                        sx={{
                          width: 35,
                          height: 35,
                          boxShadow: 3,
                          ml: 1,
                          display: { xs: 'none', md: 'inherit' },
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 'max-content', height: 'max-content', ml: 'auto' }}
                  disabled={isLoading}
                >
                  Сохранить
                </Button>
              </Stack>
              <Controller
                control={methods.control}
                name="status"
                render={({ field, fieldState }) => (
                  <TextField
                    select
                    label="Выберите статус"
                    value={field.value}
                    onChange={field.onChange}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                    fullWidth
                    variant="outlined"
                  >
                    {Object.values(ApplicationStatus).map((status) => (
                      <MenuItem key={status} value={status}>
                        {getLocalizedStatus(status)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </form>
          </FormProvider>
          {application && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }} color="text.secondary">
                Игроки
              </Typography>
              <PlayersTable isLoading={isLoading} players={application.players} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TournamentsApplicationEditForm;
