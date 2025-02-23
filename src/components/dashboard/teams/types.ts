import { z as zod } from 'zod';

import { ApplicationStatus } from '@/lib/store/types';

import {
  playerEditFormSchema,
  teamApplicationEditFormSchema,
  teamEditFormSchema,
} from './constants';

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;

export type PlayerEditFormData = zod.input<typeof playerEditFormSchema>;

export type TeamApplicationEditFormData = zod.input<typeof teamApplicationEditFormSchema>;

export type Team = {
  id: number;
  title: string;
  createdAt?: string;
  logoUrl?: string;
  photoUrl?: string;
};

export type PlayerDTO = Omit<Player, 'id'> & { id?: Player['id'] };

export type TeamDTO = Omit<Team, 'id'> & { id?: Team['id']; players?: Player[] };

export type TeamApplication = {
  id?: number;
  status: ApplicationStatus;
  tournamentId: number;
  tournamentTitle: string;
};
