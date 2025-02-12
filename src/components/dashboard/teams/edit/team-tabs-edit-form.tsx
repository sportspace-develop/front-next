'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IdentificationCard as IdentificationCardIcon } from '@phosphor-icons/react/dist/ssr/IdentificationCard';
import { PersonSimpleRun as PersonSimpleRunIcon } from '@phosphor-icons/react/dist/ssr/PersonSimpleRun';
import { skipToken } from '@reduxjs/toolkit/query';

import { Button, Card, CardContent, Stack, Tab, Tabs, Typography } from '@mui/material';

import ConfirmNavigationDialog from '@/components/ui/confirm-navigation-dialog';
import { useAsyncRoutePush } from '@/hooks/use-async-route';
import { useSavePlayerMutation } from '@/lib/store/features/players-api';
import { useGetTeamByIdQuery, useSaveTeamMutation } from '@/lib/store/features/teams-api';
import { paths } from '@/paths';

import { getPlayersValues, preparePlayerDataForSave } from '../constants';
import { PlayerEditFormData, TeamEditFormData } from '../types';
import TeamPlayersTableEditForm from './players-table-edit-form';
import TeamSettingsEditForm from './settings-edit-form';

type TabsTeamEditFormProps = {
  id?: string;
  title: string;
};

enum TabsTeamValues {
  settings = 'settings',
  players = 'players',
}

const TabsTeamEditForm = React.memo(({ id, title }: TabsTeamEditFormProps) => {
  const { data: team, isLoading: isGetLoading } = useGetTeamByIdQuery(id ?? skipToken);
  const [saveTeam, { isLoading: isSaveTeamLoading }] = useSaveTeamMutation();
  const [savePlayer, { isLoading: isSavePlayerLoading }] = useSavePlayerMutation();
  const asyncRouterPush = useAsyncRoutePush();

  const [isSettingsDirty, setIsSettingsDirty] = React.useState(false);
  const [isPlayersDirty, setIsPlayersDirty] = React.useState(false);

  const isDirty = isSettingsDirty || isPlayersDirty;
  const [nextRoute, setNextRoute] = React.useState<string | null>(null);
  const [nextTab, setNextTab] = React.useState<TabsTeamValues | null>(null);

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const [tabValue, setTabValue] = React.useState<TabsTeamValues>(TabsTeamValues.settings);

  const handleNavigate = (route: string) => {
    if (isDirty) {
      setShowModal(true);
      setNextRoute(route);
    } else {
      router.push(route);
    }
  };

  const confirmNavigation = () => {
    setShowModal(false);

    if (nextRoute) {
      router.push(nextRoute);
    }

    if (nextTab) {
      setTabValue(nextTab);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabsTeamValues) => {
    if (id === undefined && newValue === TabsTeamValues.players) {
      event.preventDefault();

      return;
    }

    if (isDirty) {
      setShowModal(true);
      setNextTab(newValue);
    } else {
      setTabValue(newValue);
    }
  };

  const handleSaveSettings: SubmitHandler<TeamEditFormData> = React.useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);
        const playerIds = team?.players?.map((player) => player?.id) || [];

        const result = await saveTeam({ ...values, playerIds }).unwrap();

        if (result) {
          if (!id) {
            await asyncRouterPush(`${paths.dashboard.teams.index}/${result.id}/edit`);
            toast.success(`Команда ${result.title} создана!`);
          } else {
            toast.success(`Данные команды ${result.title} сохранены!`);
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [asyncRouterPush, id, saveTeam, team?.players],
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
            if (values.id) {
              toast.success(`Игрок ${values.firstName} изменен!`);
            } else {
              toast.success(`Игрок ${values.firstName} создан и добавлен в команду!`);
            }
          }

          return result;
        }
      } catch {}
    },
    [savePlayer, saveTeam, team],
  );

  const isLoading = React.useMemo(
    () => isGetLoading || isSavePlayerLoading || isSaveTeamLoading || isSubmitting,
    [isGetLoading, isSavePlayerLoading, isSaveTeamLoading, isSubmitting],
  );

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Typography variant="h4" sx={{ flex: '1 1 auto' }}>
          {title}
        </Typography>
        {id && (
          <Button
            variant="contained"
            sx={{ width: 'max-content' }}
            disabled={isLoading}
            onClick={() => handleNavigate(`${paths.dashboard.teams.index}/${id}/applications/new`)}
          >
            Создать заявку на турнир
          </Button>
        )}
        <ConfirmNavigationDialog
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmNavigation}
        />
      </Stack>
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleChangeTab} sx={{ mb: 3 }}>
            <Tab
              value={TabsTeamValues.settings}
              icon={<IdentificationCardIcon size={30} />}
              iconPosition="start"
              label={
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Настройки команды
                </Typography>
              }
            />
            <Tab
              value={TabsTeamValues.players}
              icon={<PersonSimpleRunIcon size={30} />}
              iconPosition="start"
              label={
                <Typography
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    cursor: id === undefined ? 'not-allowed' : 'default',
                  }}
                >
                  Игроки
                </Typography>
              }
            />
          </Tabs>
          {tabValue === TabsTeamValues.settings && (
            <TeamSettingsEditForm
              team={team}
              onSave={handleSaveSettings}
              isLoading={isLoading}
              setIsSettingsDirty={setIsSettingsDirty}
            />
          )}
          {tabValue === TabsTeamValues.players && (
            <TeamPlayersTableEditForm
              isLoading={isLoading}
              players={getPlayersValues(team?.players)}
              onSave={handleSavePlayers}
              setIsPlayersDirty={setIsPlayersDirty}
              selectable={false}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
});

export default TabsTeamEditForm;
