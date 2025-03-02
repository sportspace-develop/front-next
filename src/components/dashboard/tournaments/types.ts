import { z as zod } from 'zod';

import { ApplicationStatus } from '@/lib/store/types';

import { tournamentEditFormSchema } from './constants';

export type Tournament = {
  id: number;
  title: string;
  description?: string;
  logoUrl?: string;
  registerStartDate: string;
  registerEndDate: string;
  startDate: string;
  endDate: string;
};

export type TournamentDTO = Omit<Tournament, 'id'> & { id?: Tournament['id'] };

type TournamentEditFormDataBase = zod.input<typeof tournamentEditFormSchema>;

type TournamentEditFormDataDate = {
  registerStartDate: Date | null;
  registerEndDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
};

export type TournamentEditFormData = Omit<
  TournamentEditFormDataBase,
  'startDate' | 'endDate' | 'registerStartDate' | 'registerEndDate'
> &
  TournamentEditFormDataDate;

export type TournamentApplication = {
  id?: number;
  status: ApplicationStatus;
  teamId: number;
  teamTitle: string;
  teamLogoUrl: string;
};
