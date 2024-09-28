'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  CardMedia,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { teams } from '@/app/dashboard/teams/data';
import FileInput from '@/components/ui/file-input';
import useObjectURL from '@/hooks/use-object-url';
import { paths } from '@/paths';

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_TEAM_NAME_LENGTH,
  getInitialValuesPlayer,
  teamEditFormSchema,
} from './constants';
import PlayerFormContent from './player-form-content';
import { TeamEditFormData } from './types';

const defaultValues: TeamEditFormData = {
  name: '',
  logoFile: null,
  pictureFile: null,
  players: [],
};

type TeamEditFormProps = {
  id?: string;
  title: string;
};

const TeamEditForm = React.memo(({ id, title }: TeamEditFormProps) => {
  // HARDCODE
  const value = React.useMemo(() => {
    if (id) {
      return { ...teams[Number(id)], players: [getInitialValuesPlayer()] };
    }

    return defaultValues;
  }, [id]);

  const router = useRouter();

  const methods = useForm<TeamEditFormData>({
    defaultValues,
    resolver: zodResolver(teamEditFormSchema),
  });

  const logoUrl = useObjectURL(methods.watch('logoFile'));
  const pictureUrl = useObjectURL(methods.watch('pictureFile'));

  React.useEffect(() => methods.reset(value), [methods, value]);

  const onSubmit = React.useCallback(
    async (_: TeamEditFormData): Promise<void> => {
      // setIsPending(true);
      // HARDCODE
      router.replace(paths.dashboard.teams.index);
      // setIsPending(false);
    },
    [router],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          spacing={3}
          display="flex"
          sx={{ mb: 2, flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Button type="submit" variant="contained" sx={{ width: 'max-content' }}>
            Сохранить
          </Button>
        </Stack>
        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary>Настройки команды</AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Controller
                  control={methods.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                      label="Название команды"
                      fullWidth
                      inputProps={{ maxLength: MAX_TEAM_NAME_LENGTH }}
                    />
                  )}
                />
                <Controller
                  control={methods.control}
                  name="pictureFile"
                  render={({ field, fieldState }) => (
                    <>
                      <FileInput
                        {...field}
                        label="Фото Команды"
                        inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                        helperText={fieldState.error?.message}
                        error={fieldState.invalid}
                      />
                      {pictureUrl && !fieldState.error && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <CardMedia
                            sx={{
                              height: 150,
                              width: '100%',
                              maxWidth: 500,
                              backgroundSize: 'contain',
                            }}
                            image={pictureUrl}
                          />
                        </Box>
                      )}
                    </>
                  )}
                />
                <Controller
                  name="logoFile"
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                      <Grid md={10} xs={12} display="grid">
                        <FileInput
                          {...field}
                          label="Логотип"
                          inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                          helperText={fieldState.error?.message}
                          error={fieldState.invalid}
                        />
                      </Grid>
                      <Grid>
                        {logoUrl && !fieldState.error && (
                          <Avatar src={logoUrl} sx={{ height: 100, width: 100, boxShadow: 3 }} />
                        )}
                      </Grid>
                    </Grid>
                  )}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary>Игроки</AccordionSummary>
            <AccordionDetails>
              <PlayerFormContent />
            </AccordionDetails>
          </Accordion>
        </Box>
      </form>
    </FormProvider>
  );
});

export default TeamEditForm;
