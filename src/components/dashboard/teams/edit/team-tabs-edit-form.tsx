'use client';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';

import { IdentificationCard as IdentificationCardIcon } from '@phosphor-icons/react/dist/ssr/IdentificationCard';
import { PersonSimpleRun as PersonSimpleRunIcon } from '@phosphor-icons/react/dist/ssr/PersonSimpleRun';
import { skipToken } from '@reduxjs/toolkit/query';

import { Card, CardContent, Stack, Tab, Tabs, Typography } from '@mui/material';

import { useSavePlayerMutation } from '@/lib/store/features/players-api';
import { useGetTeamByIdQuery, useSaveTeamMutation } from '@/lib/store/features/teams-api';

import { PlayerDTO, PlayerEditFormData, TeamDTO, TeamEditFormData } from '../types';
import TeamPlayersTableEditForm from './players-table-edit-form';
import TeamSettingsEditForm, { DEFAULT_INITIAL_VALUES } from './settings-edit-form';

type TabsTeamEditFormProps = {
  id?: string;
  title: string;
};

enum TabsTeamValues {
  settings = 'settings',
  players = 'players',
}

const getSettingsValues = (values: TeamDTO = DEFAULT_INITIAL_VALUES): TeamEditFormData => ({
  ...values,
  photo: {
    url: values.photoUrl,
    file: null,
  },
  logo: {
    url: values.logoUrl,
    file: null,
  },
});

const getPlayersValues = (players?: PlayerDTO[]): PlayerEditFormData[] => {
  if (players && players.length > 0) {
    return players.map((player) => ({
      ...player,
      bDay: player.bDay ? new Date(player.bDay) : null,
      photo: {
        url: player.photoUrl,
        file: null,
      },
    }));
  }

  return [];
};

const prepareTeamDataForSave = (values: TeamEditFormData) => ({
  id: values.id,
  title: values.title,
  photoUrl: values.photo.url,
  logoUrl: values.logo.url,
});

const preparePlayerDataForSave = (values: PlayerEditFormData): PlayerDTO => ({
  ...values,
  bDay: values.bDay ? values.bDay.toISOString() : '',
  photoUrl: values.photo.url,
});

const TabsTeamEditForm = React.memo(({ id, title }: TabsTeamEditFormProps) => {
  const { data, isLoading: isGetLoading } = useGetTeamByIdQuery(id ?? skipToken);
  const [saveTeam, { isLoading: isSaveTeamLoading }] = useSaveTeamMutation();
  const [savePlayer, { isLoading: isSavePlayerLoading }] = useSavePlayerMutation();

  const [team, setTeam] = React.useState<TeamDTO | undefined>(data);

  const [tabValue, setTabValue] = React.useState<TabsTeamValues>(TabsTeamValues.settings);

  React.useEffect(() => setTeam(data), [data]);

  const handleChange = (_, newValue: TabsTeamValues) => setTabValue(newValue);

  const handleSaveSettings: SubmitHandler<TeamEditFormData> = React.useCallback(
    async (values) => {
      const playerIds = team?.players?.map((player) => player?.id) || [];

      const result = await saveTeam({ ...prepareTeamDataForSave(values), playerIds }).unwrap();

      if (result) {
        setTeam(result);
        setTabValue(TabsTeamValues.players);
      }
    },
    [saveTeam, team?.players],
  );

  const handleSavePlayers: SubmitHandler<PlayerEditFormData> = React.useCallback(
    async (values) => {
      const resultSavePlayer = await savePlayer(preparePlayerDataForSave(values)).unwrap();

      if (resultSavePlayer && team) {
        const playerIds = team?.players?.map((player) => player?.id) || [];

        if (!values.id) {
          playerIds.push(resultSavePlayer.id);
        }

        const result = await saveTeam({ ...team, playerIds }).unwrap();

        if (result) {
          setTeam(result);
        }

        return result;
      }
    },
    [savePlayer, saveTeam, team],
  );

  const isLoading = React.useMemo(
    () => isGetLoading || isSavePlayerLoading || isSaveTeamLoading,
    [isGetLoading, isSavePlayerLoading, isSaveTeamLoading],
  );

  return (
    <>
      <Stack>
        <Typography variant="h4" sx={{ flex: '1 1 auto' }}>
          {title}
        </Typography>
      </Stack>
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Tabs variant="fullWidth" value={tabValue} onChange={handleChange} sx={{ mb: 3 }}>
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
            {team?.id !== undefined && (
              <Tab
                value={TabsTeamValues.players}
                icon={<PersonSimpleRunIcon size={30} />}
                iconPosition="start"
                label={
                  <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Игроки</Typography>
                }
              />
            )}
          </Tabs>
          {tabValue === TabsTeamValues.settings && (
            <TeamSettingsEditForm
              team={getSettingsValues(data)}
              onSave={handleSaveSettings}
              isLoading={isLoading}
            />
          )}
          {tabValue === TabsTeamValues.players && (
            <TeamPlayersTableEditForm
              isLoading={isLoading}
              players={getPlayersValues(team?.players)}
              onSave={handleSavePlayers}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
});

export default TabsTeamEditForm;
