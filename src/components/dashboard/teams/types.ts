import { z as zod } from 'zod';

import { playerEditFormSchema, teamEditFormSchema } from './constants';

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;

export type PlayerEditFormData = zod.input<typeof playerEditFormSchema>;

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
