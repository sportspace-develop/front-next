import { z as zod } from 'zod';

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const MAX_TOURNAMENT_TITLE_LENGTH = 50;

const dateSchema = zod.date({
  errorMap: (issue, { defaultError }) => {
    if (issue.code === 'invalid_date') {
      return {
        message: 'Некорректный формат даты',
      };
    }

    if (issue.code === 'invalid_type') {
      return {
        message: 'Укажите дату',
      };
    }

    return {
      message: defaultError,
    };
  },
});

export const tournamentEditFormSchema = zod
  .object({
    id: zod.coerce.number().optional(),
    title: zod
      .string()
      .min(1, { message: 'Обязательно' })
      .min(3, { message: 'Минимум 3 символа' })
      .max(MAX_TOURNAMENT_TITLE_LENGTH, {
        message: `Максимум ${MAX_TOURNAMENT_TITLE_LENGTH} символов`,
      }),
    logoUrl: zod.string().optional(),
    startDate: dateSchema,
    endDate: dateSchema,
    registerStartDate: dateSchema.nullable(),
    registerEndDate: dateSchema.nullable(),
  })
  .refine((data) => !data.startDate || !data.endDate || data.startDate <= data.endDate, {
    path: ['endDate'],
    message: 'Дата должна быть позже начала турнира',
  })
  .refine(
    (data) =>
      !data.registerStartDate || !data.registerEndDate || data.registerStartDate <= data.endDate,
    {
      path: ['registerEndDate'],
      message: 'Дата должна быть позже начала регистрации турнира',
    },
  )
  .refine((data) => data.registerStartDate || !data.registerEndDate, {
    path: ['registerStartDate'],
    message: 'Укажите дату начала регистрации',
  })
  .refine((data) => !data.registerStartDate || data.registerEndDate, {
    path: ['registerEndDate'],
    message: 'Укажите дату завершения регистрации',
  });
