'use client';

import * as React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { UserPlus as UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';

import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import FileInput from '@/components/ui/file-input';

import { ACCEPTED_IMAGE_TYPES, MAX_PLAYER_FIO_LENGTH, getInitialValuesPlayer } from './constants';
import { TeamEditFormData } from './types';

const PlayerFormContent = React.memo(() => {
  const { control } = useFormContext<TeamEditFormData>();

  const {
    fields: players,
    append: appendPlayer,
    remove: removePlayer,
  } = useFieldArray<TeamEditFormData, 'players'>({
    name: 'players',
  });

  const addedPlayer = React.useCallback(
    () => appendPlayer(getInitialValuesPlayer()),
    [appendPlayer],
  );

  return (
    <Stack spacing={2}>
      {players.map((player, index) => {
        const isNotLastPlayer = index < players.length - 1;
        const hasOnePlayer = players.length === 1;
        const handleRemovePlayer = () => removePlayer(index);

        return (
          <Stack key={player.id} spacing={1} sx={{ flexDirection: { md: 'row' } }}>
            <Stack flexDirection="row" sx={{ alignItems: 'center', display: { md: 'none' } }}>
              <Typography variant="subtitle1">Игрок №{index + 1}</Typography>
              <IconButton onClick={handleRemovePlayer} disabled={hasOnePlayer}>
                <TrashIcon />
              </IconButton>
            </Stack>
            <Grid container spacing={2} flex={1}>
              <Grid md={5} xs={12}>
                <Controller
                  control={control}
                  name={`players.${index}.fio`}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="ФИО"
                      fullWidth
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                      inputProps={{ maxLength: MAX_PLAYER_FIO_LENGTH }}
                    />
                  )}
                />
              </Grid>
              <Grid md={3} xs={12}>
                <Controller
                  control={control}
                  name={`players.${index}.birthDate`}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      {...field}
                      label="Дата рождения"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: fieldState.invalid,
                          helperText: fieldState.error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid md={4} xs={12}>
                <Controller
                  control={control}
                  name={`players.${index}.photo`}
                  render={({ field, fieldState }) => (
                    <FileInput
                      {...field}
                      fullWidth
                      label="Фото"
                      inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                      helperText={fieldState.error?.message}
                      error={fieldState.invalid}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                onClick={handleRemovePlayer}
                sx={{
                  maxHeight: 'max-content',
                  width: 'max-content',
                  alignItems: 'flex-start',
                  mt: 1,
                }}
                disabled={hasOnePlayer}
              >
                <TrashIcon />
              </IconButton>
            </Box>
            {isNotLastPlayer && <Divider sx={{ mt: 2, display: { md: 'none' } }} />}
          </Stack>
        );
      })}
      <IconButton sx={{ boxShadow: 4, width: 'max-content' }} color="primary" onClick={addedPlayer}>
        <UserPlusIcon />
      </IconButton>
    </Stack>
  );
});

export default PlayerFormContent;
