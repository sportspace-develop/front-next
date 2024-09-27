import { z as zod } from 'zod';

import { teamEditFormSchema } from './constants';

export type PlayerType = {
  id: string;
  fio: string;
  birthDate?: Date;
  photo: File | null;
};

export type TeamEditFormData = zod.input<typeof teamEditFormSchema>;
