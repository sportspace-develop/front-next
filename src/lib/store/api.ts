import { toast } from 'react-toastify';

import { createListenerMiddleware, isAllOf, isRejected } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { isErrorWithMessage, isFetchBaseQueryError } from '@/lib/store/helpers';

const listenerMiddleware = createListenerMiddleware();

enum CacheTag {
  TEAMS = 'TEAMS',
  TEAM = 'TEAM',
  TEAM_APPLICATIONS = 'TEAM_APPLICATIONS',
  TEAM_APPLICATION = 'TEAM_APPLICATION',
  TOURNAMENT = 'TOURNAMENT',
  TOURNAMENTS = 'TOURNAMENTS',
  TOURNAMENT_APPLICATIONS = 'TOURNAMENT_APPLICATIONS',
  TOURNAMENT_APPLICATION = 'TOURNAMENT_APPLICATION',
}

const rootApi = createApi({
  reducerPath: 'rootApi',
  tagTypes: Object.values(CacheTag),
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: () => ({}),
});

listenerMiddleware.startListening({
  matcher: isAllOf(isRejected),
  effect: (action) => {
    if (isFetchBaseQueryError(action.payload)) {
      if (action.payload?.status === 'CUSTOM_ERROR') {
        toast.error(action.payload.error);
      } else {
        toast.error(JSON.stringify(action.payload.data ?? action.payload.status));
      }
    } else if (isErrorWithMessage(action.payload)) {
      toast.error(JSON.stringify(action.payload.message));
    }
  },
});

export { CacheTag, listenerMiddleware, rootApi };
