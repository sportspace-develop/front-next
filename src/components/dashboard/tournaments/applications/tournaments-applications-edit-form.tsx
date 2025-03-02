'use client';

import * as React from 'react';
import { toast } from 'react-toastify';

import { Avatar, Button, Card, CardContent, Stack, Typography } from '@mui/material';

import DateTimePeriod from '@/components/ui/date-time-period';
import addQuotes from '@/lib/add-quotes';
import getLocalizedStatus from '@/lib/get-localized-status';
import {
  useGetTournamentByIdQuery,
  useGetTournamentsApplicationByIdQuery,
  useUpdateTournamentsApplicationMutation,
} from '@/lib/store/features/tournaments-api';
import { ApplicationStatus, TournamentApplicationUpdateStatuses } from '@/lib/store/types';

import { TournamentApplicationSubmitType } from '../constants';
import PlayersTable from './players-table';

interface TournamentsApplicationEditFormProps {
  tournamentId: number;
  applicationId: number;
  title: string;
}

const TournamentsApplicationEditForm = ({
  tournamentId,
  title,
  applicationId,
}: TournamentsApplicationEditFormProps) => {
  const submitTypeRef = React.useRef(TournamentApplicationSubmitType.ACCEPT);

  const { data: application, isLoading: isGetApplicationLoading } =
    useGetTournamentsApplicationByIdQuery({ tournamentId, applicationId });
  const { data: tournament, isLoading: isGetTournamentLoading } =
    useGetTournamentByIdQuery(tournamentId);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [updateApplication, { isLoading: isUpdateApplication }] =
    useUpdateTournamentsApplicationMutation();

  const isLoading =
    isSubmitting || isGetApplicationLoading || isUpdateApplication || isGetTournamentLoading;

  const handleSave = async () => {
    try {
      setIsSubmitting(true);

      const result = await updateApplication({
        tournamentId,
        applicationId,
        status:
          submitTypeRef.current === TournamentApplicationSubmitType.REJECT
            ? TournamentApplicationUpdateStatuses.REJECT
            : TournamentApplicationUpdateStatuses.ACCEPT,
      }).unwrap();

      if (result) {
        toast.success(`Заявка изменена!`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
            <Stack sx={{ flex: '1 1 auto' }}>
              <Typography variant="h2">{title}</Typography>
              {application && tournament && (
                <Stack direction="row">
                  <Typography variant="h3" color="text.secondary" sx={{ mt: 1 }}>
                    на турнир {addQuotes(tournament.title)} для команды{' '}
                    {addQuotes(application.teamTitle)}
                    <Avatar
                      src={tournament.logoUrl}
                      title={tournament.title}
                      sx={{
                        width: 35,
                        height: 35,
                        boxShadow: 3,
                        ml: 1,
                        display: { xs: 'none', md: 'inline-flex' },
                      }}
                    />
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack spacing={1}>
              {application?.status === ApplicationStatus.InProgress && (
                <Stack direction="row" spacing={1} justifyContent="end">
                  <Button
                    variant="outlined"
                    disabled={isLoading}
                    sx={{ height: 'max-content' }}
                    onClick={() => {
                      submitTypeRef.current = TournamentApplicationSubmitType.REJECT;
                      handleSave();
                    }}
                  >
                    Отклонить
                  </Button>
                  <Button
                    variant="contained"
                    disabled={isLoading}
                    sx={{ height: 'max-content' }}
                    onClick={() => {
                      submitTypeRef.current = TournamentApplicationSubmitType.ACCEPT;
                      handleSave();
                    }}
                  >
                    Принять
                  </Button>
                </Stack>
              )}
              {application?.status && (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Статус: {getLocalizedStatus(application.status)}
                </Typography>
              )}
            </Stack>
          </Stack>
          {tournament && (
            <Stack sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="flex-end">
                <Typography color="text.secondary" variant="subtitle1" sx={{ mr: 1 }}>
                  Регистрация на турнира:
                </Typography>
                <DateTimePeriod
                  startDate={tournament.registerStartDate}
                  endDate={tournament.registerEndDate}
                />
              </Stack>
              <Stack direction="row" alignItems="flex-end">
                <Typography color="text.secondary" variant="subtitle1" sx={{ mr: 1 }}>
                  Продолжительность турнира:
                </Typography>
                <DateTimePeriod startDate={tournament.startDate} endDate={tournament.endDate} />
              </Stack>
            </Stack>
          )}
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
