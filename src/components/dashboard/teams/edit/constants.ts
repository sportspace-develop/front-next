import { v4 as uuidv4 } from 'uuid';
import { z as zod } from 'zod';

import { PlayerType } from './types';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const getInitialValuesPlayer = (): PlayerType => ({
  id: uuidv4(),
  fio: '',
  photo: null,
  birthDate: null,
});

export const MAX_PLAYER_FIO_LENGTH = 130;

export const playerEditFormSchema = {
  fio: zod
    .string()
    .min(1, { message: 'Поле обязательно' })
    .min(3, { message: 'ФИО слишком короткое - должно быть минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `ФИО слишком длинное - должно быть максимум ${MAX_PLAYER_FIO_LENGTH} символа`,
    }),
  photo: zod
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Максимальный размер логотипа 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Формат файла должен быть jpg, jpeg или png',
    ),
  birthDate: zod
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
};

export const MAX_TEAM_NAME_LENGTH = 32;

export const teamEditFormSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(1, { message: 'Поле обязательно' })
    .min(3, { message: 'Название слишком короткое - должно быть минимум 3 символа' })
    .max(MAX_TEAM_NAME_LENGTH, {
      message: `Название слишком длинное - должно быть максимум ${MAX_TEAM_NAME_LENGTH} символа`,
    }),
  logoFile: zod
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Максимальный размер логотипа 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Формат файла должен быть jpg, jpeg или png',
    ),
  pictureFile: zod
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Максимальный размер фото 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Формат файла должен быть jpg, jpeg или png',
    ),
  players: zod.object(playerEditFormSchema).array().optional(),
});
