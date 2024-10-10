import { z as zod } from 'zod';

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const MAX_PLAYER_FIO_LENGTH = 50;

export const playerEditFormSchema = zod.object({
  id: zod.coerce.string(),
  lastname: zod
    .string()
    .min(1, { message: 'Обязательно' })
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Фамилия слишком длинная - должно быть максимум ${MAX_PLAYER_FIO_LENGTH} символа`,
    }),
  firstname: zod
    .string()
    .min(1, { message: 'Обязательно' })
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Имя слишком длинное - должно быть максимум ${MAX_PLAYER_FIO_LENGTH} символа`,
    }),
  secondname: zod
    .string()
    .min(3, { message: 'Минимум 3 символа' })
    .max(MAX_PLAYER_FIO_LENGTH, {
      message: `Отчество слишком длинное - должно быть максимум ${MAX_PLAYER_FIO_LENGTH} символа`,
    })
    .or(zod.literal('')),
  photo: zod.object({
    url: zod.string().optional(),
    file: zod
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Максимальный размер логотипа 2MB')
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Формат файла должен быть jpg, jpeg или png',
      ),
  }),
  b_day: zod
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
  id: zod.coerce.string(),
  title: zod
    .string()
    .trim()
    .min(1, { message: 'Поле обязательно' })
    .min(3, { message: 'Название слишком короткое - должно быть минимум 3 символа' })
    .max(MAX_TEAM_NAME_LENGTH, {
      message: `Название слишком длинное - должно быть максимум ${MAX_TEAM_NAME_LENGTH} символа`,
    }),
  logo: zod.object({
    url: zod.string().optional(),
    file: zod
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Максимальный размер логотипа 2MB')
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Формат файла должен быть jpg, jpeg или png',
      ),
  }),
  photo: zod.object({
    url: zod.string().optional(),
    file: zod
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Максимальный размер фото 2MB')
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Формат файла должен быть jpg, jpeg или png',
      ),
  }),
  players: playerEditFormSchema.array().optional(),
});
