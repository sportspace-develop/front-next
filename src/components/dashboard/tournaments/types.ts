import { z as zod } from 'zod';

import { ApplicationStatus } from '@/lib/store/types';

import { tournamentApplicationEditFormSchema, tournamentEditFormSchema } from './constants';

export type Tournament = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  logoUrl?: string;
  registerStartDate?: string;
  registerEndDate?: string;
};

export type TournamentDTO = Omit<Tournament, 'id'> & { id?: Tournament['id'] };

export type TournamentEditFormData = zod.input<typeof tournamentEditFormSchema>;

export type TournamentApplicationEditFormData = zod.input<
  typeof tournamentApplicationEditFormSchema
>;

export type TournamentApplication = {
  id?: number;
  status: ApplicationStatus;
  teamId: number;
  teamTitle: string;
};
