import {configureStore} from '@reduxjs/toolkit';

import {listenerMiddleware, rootApi} from '@/lib/store/api';

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

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
