import { z as zod } from 'zod';

import { teamEditFormSchema } from './edit/constants';

export type PlayerType = {
  id: string;
  lastname: string; //lastname - lastname
  name: string; //firstname - name
  patronymic: string; //secondname - patronymic
  b_day: Date | null;
  photo: File | null;
};

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;

export type Team = {
  id: string;
  title: string;
  logo_url?: string;
  photo_url?: string;
};
