'use client';

import * as React from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';

import { Avatar, Button, Card, CardContent, Stack, Typography } from '@mui/material';

import LazySelect from '@/components/ui/lazy-select';
import { useAsyncRoutePush } from '@/hooks/use-async-route';
import useDataSelector from '@/hooks/use-data-selector';
import addQuotes from '@/lib/add-quotes';
import { useSavePlayerMutation } from '@/lib/store/features/players-api';
import {
  useGetTeamByIdQuery,
  useGetTeamsApplicationByIdQuery,
  useSaveTeamMutation,
  useSaveTeamsApplicationMutation,
} from '@/lib/store/features/teams-api';
import { useGetTournamentsQuery } from '@/lib/store/features/tournaments-api';
import { paths } from '@/paths';

import {
  getPlayersValues,
  preparePlayerDataForSave,
  teamApplicationEditFormSchema,
} from '../constants';
import TeamPlayersTableEditForm from '../edit/players-table-edit-form';
import { PlayerEditFormData, TeamApplicationEditFormData } from '../types';

const DEFAULT_INITIAL_VALUES: TeamApplicationEditFormData = {
  tournamentId: null,
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
    { teamId: teamId, applicationId: applicationId },
    { skip: applicationId === undefined },
  );

  const { data: team, isLoading: isGetTeamLoading } = useGetTeamByIdQuery(teamId ?? skipToken);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedPlayersIds, setSelectedPlayersIds] = React.useState<number[]>([]);

  const [saveTeam, { isLoading: isSaveTeamLoading }] = useSaveTeamMutation();
  const [savePlayer, { isLoading: isSavePlayerLoading }] = useSavePlayerMutation();
  const [saveApplication, { isLoading: isSaveApplication }] = useSaveTeamsApplicationMutation();

  const {
    items: tournaments,
    isLoading: isTournamentsLoading,
    loadNextPage: loadTournamentsNextPage,
  } = useDataSelector(
    useGetTournamentsQuery,
    application ? { id: application.tournamentId, title: application.tournamentTitle } : undefined,
  );

  const asyncRouterPush = useAsyncRoutePush();

  React.useEffect(() => {
    if (team?.players && selectedPlayersIds.length === 0 && application?.players) {
      setSelectedPlayersIds(application.players.map((item) => item.id));
    }
  }, [team?.players, application, selectedPlayersIds.length]);

  React.useEffect(() => {
    if (team?.players && selectedPlayersIds.length === 0 && applicationId === undefined) {
      setSelectedPlayersIds(team.players.map((item) => item.id));
    }
  }, [team?.players, application, selectedPlayersIds.length, applicationId]);

  const methods = useForm<TeamApplicationEditFormData>({
    mode: 'all',
    defaultValues: DEFAULT_INITIAL_VALUES,
    resolver: zodResolver(teamApplicationEditFormSchema),
  });

  React.useEffect(() => {
    if (application) {
      methods.reset({ tournamentId: application.tournamentId, id: application.id });
    }
  }, [methods, application]);

  const isLoading =
    isSubmitting ||
    isGetTeamLoading ||
    isGetApplicationLoading ||
    isSaveTeamLoading ||
    isSavePlayerLoading ||
    isSaveApplication;

  const handleSave: SubmitHandler<TeamApplicationEditFormData> = React.useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);

        const result = await saveApplication({
          teamId,
          tournamentId: Number(values.tournamentId),
          playerIds: selectedPlayersIds,
          applicationId,
        }).unwrap();

        if (result) {
          if (!applicationId) {
            await asyncRouterPush(
              `${paths.dashboard.teams.index}/${teamId}/applications/${result.id}/edit`,
            );
            toast.success(`Заявка создана!`);
          } else {
            toast.success(`Заявка изменена!`);
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [applicationId, asyncRouterPush, saveApplication, selectedPlayersIds, teamId],
  );

  const handleSavePlayers: SubmitHandler<PlayerEditFormData> = React.useCallback(
    async (values) => {
      try {
        const resultSavePlayer = await savePlayer(preparePlayerDataForSave(values)).unwrap();

        if (resultSavePlayer && team) {
          const playerIds = team?.players?.map((player) => player?.id) || [];

          if (!values.id) {
            playerIds.push(resultSavePlayer.id);
          }

          const result = await saveTeam({ ...team, playerIds }).unwrap();

          if (result) {
            toast.success(`Игрок ${values.firstName} создан и добавлен в команду!`);
          }

          return result;
        }
      } catch {}
    },
    [savePlayer, saveTeam, team],
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
                  {team && (
                    <Stack direction="row">
                      <Typography variant="h3" color="text.secondary">
                        для команды {addQuotes(team.title)}
                      </Typography>
                      <Avatar
                        src={team.logoUrl}
                        title={team.title}
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
                name="tournamentId"
                render={({ field, fieldState }) => (
                  <LazySelect
                    label="Выберите турнир"
                    value={field.value ? Number(field.value) : null}
                    onChange={field.onChange}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                    loadNextPage={loadTournamentsNextPage}
                    data={tournaments}
                    isLoading={isTournamentsLoading}
                    disabled={isLoading}
                  />
                )}
              />
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
            onSelectedIds={setSelectedPlayersIds}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TeamsApplicationEditForm;
