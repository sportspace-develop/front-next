'use client';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { UserPlus as UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [editingPlayer, setEditingPlayer] = React.useState<PlayerEditFormData | null>(
      DEFAULT_INITIAL_VALUES_PLAYER,
    );

    const editingElementRef = React.useRef<HTMLDivElement | null>(null);
    const didMount = React.useRef(false);

    React.useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;

        return;
      }

      if (editingPlayer) {
        editingElementRef.current?.scrollIntoView({
          behavior: 'smooth', // Плавная прокрутка
        });
      }
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
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Отчество</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  Дата рождения
                </TableCell>
                <TableCell>Фото</TableCell>
                <TableCell sx={{ maxWidth: '36px' }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  onClick={() => isMobile && setEditingPlayer(player)}
                  sx={{ cursor: { xs: 'pointer', sm: 'default' } }}
                >
                  <TruncateTableCell>{player.lastName}</TruncateTableCell>
                  <TruncateTableCell>{player.firstName}</TruncateTableCell>
                  <TruncateTableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {player.secondName}
                  </TruncateTableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {player.bDay && formatDate(player.bDay, { format: 'dd.MM.yyyy' })}
                  </TableCell>
                  <TableCell>
                    <Avatar src={player.photoUrl} />
                  </TableCell>
                  <TableCell sx={{ maxWidth: '36px', p: 0 }}>
                    <IconButton onClick={() => setEditingPlayer(player)} color="primary">
                      <PencilIcon size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div ref={editingElementRef}>
          {editingPlayer && (
            <Stack sx={{ mt: 2 }}>
              <TeamPlayerEditForm item={editingPlayer} onSave={handleSave} isLoading={isLoading} />
              <Divider sx={{ mt: 3, display: { xs: 'block', sm: 'none' } }} />
            </Stack>
          )}
        </div>
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
