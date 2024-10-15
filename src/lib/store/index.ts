import { configureStore } from '@reduxjs/toolkit';

import { listenerMiddleware, rootApi } from '@/lib/store/api';

import teamsSlice from './features/teams-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      teams: teamsSlice.reducer,
      [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(rootApi.middleware, listenerMiddleware.middleware);
    },
  });
};
