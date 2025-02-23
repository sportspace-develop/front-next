import { makeStore } from '.';

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export enum ApplicationStatus {
  Draft = 'draft',
  InProgress = 'inprogress',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Canceled = 'canceled',
}

export type Player = {
  id: number;
  lastName: string; //фамилия
  firstName: string; //имя
  secondName?: string; //отчество
  bDay?: string;
  photoUrl?: string;
};

export enum TeamApplicationUpdateStatuses {
  SUBMIT = 'submit',
  CANCEL = 'cancel',
}
