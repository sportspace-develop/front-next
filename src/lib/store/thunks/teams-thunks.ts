import { createAsyncThunk } from '@reduxjs/toolkit';

import { TeamEditFormData } from '@/components/dashboard/teams/types';
import { playersApi } from '@/lib/store/features/players-api';
import { teamsApi } from '@/lib/store/features/teams-api';

export const saveTeamThunk = createAsyncThunk(
  'data/saveTeamThunk',
  async (values: TeamEditFormData, { dispatch }) => {
    const result = await dispatch(teamsApi.endpoints.saveTeam.initiate(values)).unwrap();

    console.log(JSON.stringify(result));

    if (result) {
      const formData = new FormData();

      if (values.logo.url !== result.logo_url) {
        formData.append('logo_file', values.logo.file || '');
      }

      if (values.photo.url !== result.photo_url) {
        formData.append('photo_file', values.photo.file || '');
      }

      const res = await dispatch(
        teamsApi.endpoints.uploadTeamImage.initiate({ formData, id: result.id }),
      );

      if (res && values.players?.[0]) {
        const res1 = await dispatch(
          playersApi.endpoints.savePlayer.initiate({ ...values.players[0], id: '' }),
        );

        console.log(res1);
      }

      console.log(res);
    }
  },
);
