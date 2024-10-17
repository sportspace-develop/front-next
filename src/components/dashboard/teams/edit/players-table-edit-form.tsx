'use client';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { UserPlus as UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';

import {
  Avatar,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import formatDate from '@/lib/format-date';

import { PlayerEditFormData } from '../types';
import { DEFAULT_INITIAL_VALUES_PLAYER } from './constants';
import TeamPlayerEditForm from './player-edit-form';

type TeamPlayersEditFormProps = {
  players: PlayerEditFormData[];
  onSave: SubmitHandler<PlayerEditFormData>;
  isLoading: boolean;
};

const TruncateTableCell = styled(TableCell)({
  maxWidth: '150px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TeamPlayersTableEditForm = React.memo(
  ({ players, onSave, isLoading }: TeamPlayersEditFormProps) => {
    const [editingPlayer, setEditingPlayer] = React.useState<PlayerEditFormData | null>(null);
    const editingElementRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!isLoading && players.length === 0 && !editingPlayer) {
        setEditingPlayer(DEFAULT_INITIAL_VALUES_PLAYER);
      }
    }, [editingPlayer, isLoading, players]);

    React.useEffect(() => {
      if (!editingPlayer) {
        return;
      }

      editingElementRef.current?.scrollIntoView({
        behavior: 'smooth', // Плавная прокрутка
      });
    }, [editingPlayer]);

    const handleSave = React.useCallback(
      async (values: PlayerEditFormData) => {
        const result = await onSave(values);

        if (result) {
          setEditingPlayer(null);
        }
      },
      [onSave],
    );

    const handleAddPlayer = React.useCallback(() => {
      setEditingPlayer(DEFAULT_INITIAL_VALUES_PLAYER);
    }, []);

    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Фамилия</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Отчество</TableCell>
                <TableCell>Дата рождения</TableCell>
                <TableCell>Фото</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TruncateTableCell>{player?.lastName}</TruncateTableCell>
                  <TruncateTableCell>{player?.firstName}</TruncateTableCell>
                  <TruncateTableCell>{player?.secondName}</TruncateTableCell>
                  <TableCell>
                    {player?.bDay ? formatDate(player.bDay, { format: 'dd.MM.yyyy' }) : null}
                  </TableCell>
                  <TableCell>
                    <Avatar src={player?.photo?.url} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingPlayer(player)} color="primary">
                      <PencilIcon size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ mt: editingPlayer ? 2 : 0 }} ref={editingElementRef}>
          {editingPlayer && (
            <Stack>
              <TeamPlayerEditForm item={editingPlayer} onSave={handleSave} isLoading={isLoading} />
            </Stack>
          )}
        </Stack>
        <Button
          sx={{ boxShadow: 4, width: 'max-content', mt: 2 }}
          variant="outlined"
          onClick={handleAddPlayer}
          startIcon={<UserPlusIcon />}
        >
          Добавить игрока
        </Button>
      </>
    );
  },
);

export default TeamPlayersTableEditForm;
