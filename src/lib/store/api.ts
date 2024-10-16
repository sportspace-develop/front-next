import { toast } from 'react-toastify';

import { createListenerMiddleware, isAllOf, isRejected } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { isErrorWithMessage, isFetchBaseQueryError } from '@/lib/store/helpers';

const listenerMiddleware = createListenerMiddleware();

const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: () => ({}),
});

listenerMiddleware.startListening({
  matcher: isAllOf(isRejected),
  effect: (action) => {
    if (isFetchBaseQueryError(action.payload)) {
      toast.error(JSON.stringify(action.payload.data ?? action.payload.status));
    } else if (isErrorWithMessage(action.payload)) {
      toast.error(JSON.stringify(action.payload.message));
    }
  },
});

listenerMiddleware.startListening({
  predicate: (action) => action.type.endsWith('/rejected'),
  // actionCreator: setUnauthorized,
  effect: (action, listenerApi) => {
    const error = action.payload as { status: number };

    if (error?.status === 401) {
      listenerApi.dispatch({ type: 'auth/logout' });
    }
  },
});

export { listenerMiddleware, rootApi };
