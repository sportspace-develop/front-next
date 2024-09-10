import {z} from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const teamCreateFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {message: 'Обязательно к заполнению'})
    .min(3, {message: 'Название слишком короткое - должно быть минимум 3 символа'})
    .max(32, {message: 'Название слишком длинное - должно быть макисмум 32 символа'}),
  logoFile: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Максимальный размер логотипа 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Формат файла должен быть jpg, jpeg или png',
    ),
  pictureFile: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Максимальный размер фото 5MB')
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Формат файла должен быть jpg, jpeg или png',
    ),
});
