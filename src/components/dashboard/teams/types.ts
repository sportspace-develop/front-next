import { z as zod } from 'zod';

import {
  playerEditFormSchema,
  teamApplicationEditFormSchema,
  teamEditFormSchema,
} from './constants';

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;

export type PlayerEditFormData = zod.input<typeof playerEditFormSchema>;

export type TeamApplicationEditFormData = zod.input<typeof teamApplicationEditFormSchema>;

export type Player = {
  id: number;
  lastName: string; //фамилия
  firstName: string; //имя
  secondName?: string; //отчество
  bDay?: string;
  photoUrl?: string;
};

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
  status: string;
  tournamentId?: number;
  tournamentTitle: string;
};

export type TeamApplicationDTO = {
  id?: number;
  status: string;
  tournamentId?: number;
  tournamentTitle: string;
  players?: Player[];
};

export type TeamApplicationsDTO = {
  data: TeamApplication[];
};
