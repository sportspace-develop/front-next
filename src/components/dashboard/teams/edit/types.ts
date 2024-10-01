import { z as zod } from 'zod';

import { teamEditFormSchema } from './constants';

export type PlayerType = {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: Date | null;
  photo: File | null;
};

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;
