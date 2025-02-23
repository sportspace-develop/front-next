'use client';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAsyncRoutePush } from '@/hooks/use-async-route';
import { useSavePlayerMutation } from '@/lib/store/features/players-api';
import {
  TeamApplicationItemDTO,
  useCreateTeamsApplicationMutation,
  useSaveTeamMutation,
  useUpdateTeamsApplicationMutation,
} from '@/lib/store/features/teams-api';
import { paths } from '@/paths';

import { preparePlayerDataForSave } from '../constants';
import { PlayerEditFormData, TeamApplicationEditFormData, TeamDTO } from '../types';

export const useSaveApplication = ({
  teamId,
  applicationId,
  selectedPlayersIds,
}: {
  teamId: number;
  applicationId?: number;
  selectedPlayersIds: number[];
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [updateApplication, { isLoading: isUpdateTeamsApplication }] =
    useUpdateTeamsApplicationMutation();
  const [createApplication, { isLoading: isCreateTeamsApplication }] =
    useCreateTeamsApplicationMutation();

  const asyncRouterPush = useAsyncRoutePush();

  const handleApplicationSave: SubmitHandler<TeamApplicationEditFormData> = async (values) => {
    try {
      setIsSubmitting(true);

      if (applicationId) {
        const result = await updateApplication({
          teamId,
          applicationId,
          playerIds: selectedPlayersIds,
          status: values.status || undefined,
        }).unwrap();

        if (result) {
          toast.success(`Заявка изменена!`);
        }
      } else {
        const result = await createApplication({
          teamId,
          tournamentId: values.tournamentId,
          playerIds: selectedPlayersIds,
        }).unwrap();

        if (result) {
          await asyncRouterPush(
            `${paths.dashboard.teams.index}/${teamId}/applications/${result.id}/edit`,
          );
          toast.success(`Заявка создана!`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleApplicationSave,
    isApplicationSaveLoading: isUpdateTeamsApplication || isCreateTeamsApplication || isSubmitting,
  };
};

export const usePlayerState = ({
  team,
  application,
}: {
  team?: TeamDTO;
  application?: TeamApplicationItemDTO;
}) => {
  const [selectedPlayersIds, setSelectedPlayersIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (team?.players && selectedPlayersIds.length === 0) {
      const initSelectedPlayers = application?.players ? application.players : team.players;

      setSelectedPlayersIds(initSelectedPlayers.map((item) => item.id));
    }
  }, [team?.players, application, selectedPlayersIds.length]);

  return {
    selectedPlayersIds,
    setSelectedPlayersIds,
  };
};

export const useSavePlayer = (team?: TeamDTO) => {
  const [saveTeam, { isLoading: isSaveTeamLoading }] = useSaveTeamMutation();
  const [savePlayer, { isLoading: isSavePlayerLoading }] = useSavePlayerMutation();

  const handleSavePlayers: SubmitHandler<PlayerEditFormData> = async (values) => {
    try {
      const resultSavePlayer = await savePlayer(preparePlayerDataForSave(values)).unwrap();

      if (resultSavePlayer && team) {
        const playerIds = team.players?.map((player) => player?.id) || [];

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
  };

  return { handleSavePlayers, isSavePlayerLoading: isSaveTeamLoading || isSavePlayerLoading };
};
