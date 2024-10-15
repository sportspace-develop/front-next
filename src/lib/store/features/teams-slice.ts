import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Team, TeamEditFormData } from '@/components/dashboard/teams/types';
import { RequestBatchPlayer, playersApi } from '@/lib/store/features/players-api';
import { RequestSaveTeam, teamsApi } from '@/lib/store/features/teams-api';

export const saveTeamThunk = createAsyncThunk(
  'data/saveTeamThunk',
  async (values: TeamEditFormData, { dispatch }) => {
    const preparedPlayersData: RequestBatchPlayer[] = values.players.map((player) => ({
      ...player,
      photo_url: player.photo.url,
    }));

    let playerResult: RequestSaveTeam['player_ids'];

    const hasPlayers = values.players.length > 0;

    if (hasPlayers) {
      playerResult = await dispatch(
        playersApi.endpoints.saveBatchPlayer.initiate(preparedPlayersData),
      )
        .unwrap()
        .then(({ data }) => data?.map(({ id }) => id));
    }

    if (playerResult || !hasPlayers) {
      const preparedTeamData: RequestSaveTeam = {
        ...values,
        logo_url: values.logo.url,
        photo_url: values.photo.url,
        player_ids: playerResult,
      };

      await dispatch(teamsApi.endpoints.saveTeam.initiate(preparedTeamData));
    }
  },
);

export type PaginationTypes = {
  current_page: number;
  next_page: number;
  prev_page: number;
  total_pages: number;
  total_records: number;
};

export type TeamsState = {
  items: Team[];
  pagination: PaginationTypes;
  filters: {
    page?: number;
    limit: number;
  };
};

const initialState: TeamsState = {
  items: [],
  pagination: {
    current_page: 1,
    next_page: 1,
    total_pages: 0,
    prev_page: 0,
    total_records: 0,
  },
  filters: {
    page: 1,
    limit: 6,
  },
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const { setFilters, setPagination } = teamsSlice.actions;
export default teamsSlice;
