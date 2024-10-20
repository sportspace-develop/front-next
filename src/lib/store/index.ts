import { configureStore } from '@reduxjs/toolkit';

import { listenerMiddleware, rootApi } from '@/lib/store/api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(rootApi.middleware, listenerMiddleware.middleware);
    },
  });
};
