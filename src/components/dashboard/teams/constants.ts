import { z as zod } from 'zod';

import { PlayerEditFormData } from './types';

export const MAX_PLAYER_FIO_LENGTH = 50;

export const playerEditFormSchema = zod.object({
  id: zod.coerce.number().optional(),
  lastName: zod
    .string()
    .min(1, { message: 'Обязательно' })
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Максимум ${MAX_PLAYER_FIO_LENGTH} символов`,
    }),
  firstName: zod
    .string()
    .min(1, { message: 'Обязательно' })
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Максимум ${MAX_PLAYER_FIO_LENGTH} символов`,
    }),
  secondName: zod
    .string()
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Максимум ${MAX_PLAYER_FIO_LENGTH} символов`,
    })
    .or(zod.literal(''))
    .or(zod.literal(undefined)),
  photoUrl: zod.string().optional(),
  bDay: zod
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Некорректный формат даты' : defaultError,
      }),
    })
    .nullable()
    .refine((date) => !date || date <= new Date(), {
      message: 'Дата не может быть в будущем',
    })
    .refine((date) => !date || date.getFullYear() >= 1900, {
      message: 'Дата должна быть не ранее 1900 года',
    }),
});

export const MAX_TEAM_NAME_LENGTH = 32;

export const teamEditFormSchema = zod.object({
  id: zod.coerce.number().optional(),
  title: zod
    .string()
    .trim()
    .min(1, { message: 'Поле обязательно' })
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_TEAM_NAME_LENGTH, {
      message: `Максимум ${MAX_PLAYER_FIO_LENGTH} символов`,
    }),
  logoUrl: zod.string().optional(),
  photoUrl: zod.string().optional(),
});

export const DEFAULT_INITIAL_VALUES_PLAYER: PlayerEditFormData = {
  lastName: '',
  firstName: '',
  secondName: '',
  bDay: null,
  photoUrl: undefined,
};
