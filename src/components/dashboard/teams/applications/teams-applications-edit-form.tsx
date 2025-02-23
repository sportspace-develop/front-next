'use client';

import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';

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

import LazySelect from '@/components/ui/lazy-select';
import useDataSelector from '@/hooks/use-data-selector';
import addQuotes from '@/lib/add-quotes';
import getLocalizedStatus from '@/lib/get-localized-status';
import {
  useGetTeamByIdQuery,
  useGetTeamsApplicationByIdQuery,
} from '@/lib/store/features/teams-api';
import { useGetTournamentsQuery } from '@/lib/store/features/tournaments-api';
import { ApplicationStatus, TeamApplicationUpdateStatuses } from '@/lib/store/types';

import { getPlayersValues, teamApplicationEditFormSchema } from '../constants';
import TeamPlayersTableEditForm from '../edit/team-players-table-edit-form';
import { TeamApplicationEditFormData, TeamDTO } from '../types';
import { usePlayerState, useSaveApplication, useSavePlayer } from './hooks';

interface TeamsApplicationHeaderProps {
  title: string;
  team?: TeamDTO;
  applicationStatus?: ApplicationStatus;
  isLoading: boolean;
}

const TeamsApplicationHeader = ({
  title,
  team,
  applicationStatus,
  isLoading,
}: TeamsApplicationHeaderProps) => (
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
      <Button type="submit" variant="contained" disabled={isLoading} sx={{ height: 'max-content' }}>
        Сохранить
      </Button>
      {applicationStatus && (
        <Typography variant="subtitle2" color="text.secondary">
          Статус: {getLocalizedStatus(applicationStatus)}
        </Typography>
      )}
    </Stack>
  </Stack>
);

const getInitialStatus = (applicationStatus: ApplicationStatus) => {
  if (applicationStatus === ApplicationStatus.Canceled) {
    return TeamApplicationUpdateStatuses.CANCEL;
  }

  if (applicationStatus === ApplicationStatus.InProgress) {
    return TeamApplicationUpdateStatuses.SUBMIT;
  }

  return '';
};

const getLocalizedTeamApplicationUpdateStatuses = (status: TeamApplicationUpdateStatuses) => {
  if (status === TeamApplicationUpdateStatuses.SUBMIT) {
    return 'Подтвердить';
  }

  if (status === TeamApplicationUpdateStatuses.CANCEL) {
    return 'Отклонить';
  }

  return '';
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
    useGetTournamentsQuery,
    application ? { id: application.tournamentId, title: application.tournamentTitle } : undefined,
  );

  const { handleApplicationSave, isApplicationSaveLoading } = useSaveApplication({
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
        status: getInitialStatus(application.status),
      });
    }
  }, [methods, application]);

  const isLoading =
    isApplicationSaveLoading || isGetTeamLoading || isGetApplicationLoading || isSavePlayerLoading;

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
            />
            <Stack spacing={3}>
              {applicationId && (
                <Controller
                  control={methods.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <TextField
                      select
                      label="Действия с заявкой"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                      fullWidth
                      variant="outlined"
                    >
                      {Object.values(TeamApplicationUpdateStatuses).map((status) => (
                        <MenuItem key={status} value={status}>
                          {getLocalizedTeamApplicationUpdateStatuses(status)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              )}
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
                    disabled={isLoading || !!applicationId}
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
