import { z as zod } from 'zod';

import { tournamentEditFormSchema } from './constants';

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
