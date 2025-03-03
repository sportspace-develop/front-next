'use client';

import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';
import { differenceInDays } from 'date-fns';

import { Avatar, Button, Card, CardContent, Stack, Typography } from '@mui/material';

import DateTimePeriod from '@/components/ui/date-time-period';
import LazySelect from '@/components/ui/lazy-select';
import useDataSelector from '@/hooks/use-data-selector';
import addQuotes from '@/lib/add-quotes';
import getLocalizedStatus from '@/lib/get-localized-status';
import {
  useGetTeamByIdQuery,
  useGetTeamsApplicationByIdQuery,
} from '@/lib/store/features/teams-api';
import {
  TournamentDTO,
  useGetAllTournamentsQuery,
  useGetTournamentByIdQuery,
} from '@/lib/store/features/tournaments-api';
import { ApplicationStatus } from '@/lib/store/types';

import {
  TeamApplicationSubmitType,
  getPlayersValues,
  teamApplicationEditFormSchema,
} from '../constants';
import TeamPlayersTableEditForm from '../edit/team-players-table-edit-form';
import { TeamApplicationEditFormData, TeamDTO } from '../types';
import { usePlayerState, useSaveApplication, useSavePlayer } from './hooks';

interface TeamsApplicationHeaderProps {
  title: string;
  team?: TeamDTO;
  applicationStatus?: ApplicationStatus;
  isLoading: boolean;
  onChangeSubmitType: (type: TeamApplicationSubmitType) => void;
  isValidRegisterDate: boolean;
}

const TeamsApplicationHeader = ({
  title,
  team,
  applicationStatus,
  isLoading,
  onChangeSubmitType,
  isValidRegisterDate,
}: TeamsApplicationHeaderProps) => {
  const renderButtons = () => {
    if (!isValidRegisterDate) {
      return null;
    }

    if (!applicationStatus) {
      return (
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ height: 'max-content' }}
        >
          Создать
        </Button>
      );
    }

    if ([ApplicationStatus.Draft, ApplicationStatus.Canceled].includes(applicationStatus)) {
      return (
        <>
          <Button
            type="submit"
            variant="outlined"
            disabled={isLoading}
            sx={{ height: 'max-content' }}
            onClick={() => onChangeSubmitType(TeamApplicationSubmitType.SAVE)}
          >
            Сохранить
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ height: 'max-content' }}
            onClick={() => onChangeSubmitType(TeamApplicationSubmitType.SEND)}
          >
            Отправить
          </Button>
        </>
      );
    }

    return (
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ height: 'max-content' }}
        onClick={() => onChangeSubmitType(TeamApplicationSubmitType.RECALL)}
      >
        Отозвать
      </Button>
    );
  };

  return (
    <Stack spacing={3} sx={{ mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
      <Stack sx={{ flex: '1 1 auto' }}>
        <Typography variant="h2">{title}</Typography>
        {team && (
          <Stack direction="row">
            <Typography variant="h3" color="text.secondary">
              для команды {addQuotes(team.title)}
            </Typography>
            <Avatar
              src={team.logoUrl}
              title={team.title}
              sx={{ width: 35, height: 35, ml: 1, display: { xs: 'none', md: 'inherit' } }}
            />
          </Stack>
        )}
      </Stack>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="end">
          {renderButtons()}
        </Stack>
        {applicationStatus && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 'auto' }}>
            Статус: {getLocalizedStatus(applicationStatus)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

const getIsValidRegisterDate = (tournament?: TournamentDTO) => {
  if (!tournament?.registerEndDate) {
    return true;
  }

  const now = new Date();

  return (
    differenceInDays(now, new Date(tournament?.registerStartDate)) >= 0 &&
    differenceInDays(new Date(tournament?.registerEndDate), now) >= 0
  );
};

const getIsValidEditStatus = (applicationStatus?: ApplicationStatus) => {
  if (!applicationStatus) {
    return true;
  }

  return [ApplicationStatus.Draft, ApplicationStatus.Canceled].includes(applicationStatus);
};

interface TeamsApplicationEditFormProps {
  teamId: number;
  applicationId?: number;
  title: string;
}

const TeamsApplicationEditForm = ({
  teamId,
  title,
  applicationId,
}: TeamsApplicationEditFormProps) => {
  const { data: application, isLoading: isGetApplicationLoading } = useGetTeamsApplicationByIdQuery(
    { teamId, applicationId },
    { skip: applicationId === undefined },
  );

  const { data: team, isLoading: isGetTeamLoading } = useGetTeamByIdQuery(teamId ?? skipToken);

  const { selectedPlayersIds, setSelectedPlayersIds } = usePlayerState({
    team,
    application,
  });
  const {
    items: tournaments,
    isLoading: isTournamentsLoading,
    loadNextPage: loadTournamentsNextPage,
  } = useDataSelector(
    useGetAllTournamentsQuery,
    application ? { id: application.tournamentId, title: application.tournamentTitle } : undefined,
  );

  const { data: tournament, isLoading: isGetTournamentLoading } = useGetTournamentByIdQuery(
    application?.tournamentId,
    { skip: application?.tournamentId === undefined },
  );

  const { handleApplicationSave, isApplicationSaveLoading, onChangeSubmitType } =
    useSaveApplication({
      teamId,
      applicationId,
      selectedPlayersIds,
    });

  const { handleSavePlayers, isSavePlayerLoading } = useSavePlayer(team);

  const methods = useForm<TeamApplicationEditFormData>({
    mode: 'all',
    resolver: zodResolver(teamApplicationEditFormSchema),
  });

  React.useEffect(() => {
    if (application) {
      methods.reset({
        tournamentId: application.tournamentId,
      });
    }
  }, [methods, application]);

  const isLoading =
    isApplicationSaveLoading ||
    isGetTeamLoading ||
    isGetApplicationLoading ||
    isSavePlayerLoading ||
    isGetTournamentLoading;

  const isValidRegisterDate = getIsValidRegisterDate(tournament);

  const disabled = !getIsValidEditStatus(application?.status) || !isValidRegisterDate;

  return (
    <Card>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleApplicationSave)}>
            <TeamsApplicationHeader
              title={title}
              team={team}
              applicationStatus={application?.status}
              isLoading={isLoading}
              onChangeSubmitType={onChangeSubmitType}
              isValidRegisterDate={isValidRegisterDate}
            />
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
            <Stack spacing={3}>
              <Controller
                control={methods.control}
                name="tournamentId"
                render={({ field, fieldState }) => (
                  <LazySelect
                    label="Выберите турнир"
                    value={field.value}
                    onChange={field.onChange}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                    loadNextPage={loadTournamentsNextPage}
                    data={tournaments}
                    isLoading={isTournamentsLoading}
                    disabled={isLoading || !!applicationId || disabled}
                  />
                )}
              />
            </Stack>
          </form>
        </FormProvider>
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }} color="text.secondary">
          Выберите игроков для турнира
        </Typography>
        <TeamPlayersTableEditForm
          disabled={disabled}
          isLoading={isLoading}
          players={getPlayersValues(team?.players)}
          onSave={handleSavePlayers}
          selectable
          selectedIds={selectedPlayersIds}
          onSelectedIdsChange={setSelectedPlayersIds}
        />
      </CardContent>
    </Card>
  );
};

export default TeamsApplicationEditForm;
