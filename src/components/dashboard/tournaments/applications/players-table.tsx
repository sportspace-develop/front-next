'use client';

import * as React from 'react';

import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { SkeletonList } from '@/components/ui/list';
import formatDate from '@/lib/format-date';
import { Player } from '@/lib/store/types';

type PlayersTableProps = {
  players: Player[];
  isLoading: boolean;
};

const TruncateTableCell = styled(TableCell)({
  maxWidth: '150px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const PlayersTable = React.memo(({ players, isLoading }: PlayersTableProps) => {
  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фамилия</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell', md: 'table-cell' } }}>
                Отчество
              </TableCell>
              <TableCell
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'table-cell',
                  },
                }}
              >
                Дата рождения
              </TableCell>
              <TableCell>Фото</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id} sx={{ cursor: { xs: 'pointer', sm: 'default' } }}>
                <TruncateTableCell title={player.lastName}>{player.lastName}</TruncateTableCell>
                <TruncateTableCell title={player.firstName}>{player.firstName}</TruncateTableCell>
                <TruncateTableCell
                  sx={{ display: { xs: 'none', sm: 'table-cell', md: 'table-cell' } }}
                  title={player.secondName}
                >
                  {player.secondName}
                </TruncateTableCell>
                <TableCell
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'table-cell',
                    },
                  }}
                >
                  {player.bDay && formatDate(new Date(player.bDay), { format: 'dd.MM.yyyy' })}
                </TableCell>
                <TableCell>
                  <Avatar src={player.photoUrl} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default PlayersTable;
