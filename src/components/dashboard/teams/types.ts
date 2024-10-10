import { z as zod } from 'zod';

import { playerEditFormSchema, teamEditFormSchema } from './edit/constants';

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;

export type PlayerEditFormData = zod.input<typeof playerEditFormSchema>;

export type Team = {
  id: string;
  title: string;
  logo_url?: string;
  photo_url?: string;
};

export type Player = {
  id: string;
  lastname: string; //фамилия
  firstname: string; //имя
  secondname: string; //отчество
  b_day: Date | null;
  photo: File | null;
};
