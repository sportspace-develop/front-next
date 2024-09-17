export enum ListState {
  UNINITIALIZED = 'UNINITIALIZED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ListStateTypes = keyof typeof ListState;
