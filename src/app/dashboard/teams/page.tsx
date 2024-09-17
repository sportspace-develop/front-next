import type {Metadata} from 'next';
import NextLink from 'next/link';

import * as React from 'react';

import {Plus as PlusIcon} from '@phosphor-icons/react/dist/ssr/Plus';
import {subDays} from 'date-fns';

import {Button, Unstable_Grid2 as Grid} from '@mui/material';

import {Team, TeamCard} from '@/components/dashboard/teams/team-card';
import List from '@/components/ui/list';
import {config} from '@/config';
import {paths} from '@/paths';

export const metadata = {title: `Команды | ${config.site.name}`} satisfies Metadata;

const PICTURE1 = 'https://st.joinsport.io/team/1305877/cover/65d8d6b757d14_385x257.jpg';
const PICTURE2 = 'https://st.joinsport.io/team/1305818/cover/667167d7b347e_385x257.png';
const IMG1 = 'https://st.joinsport.io/team/1305877/logo/6469e3d0468e8_173x173.jpg';
const IMG2 = 'https://st.joinsport.io/team/1305818/logo/646886d35da1a_173x173.jpg';

const teams: Team[] = [
  {
    id: '1',
    name: 'пример самого длинного к названия',
    picture: PICTURE1,
    // logo: IMG1,
    createdAt: subDays(new Date(), 3),
  },
  {
    id: '2',
    name: 'ATLETICO',
    // picture: PICTURE2,
    logo: IMG2,
    createdAt: subDays(new Date(), 2),
  },
  {
    id: '3',
    name: 'VSEPROSPORT.RU',
    // picture: PICTURE1,
    logo: IMG1,
    createdAt: subDays(new Date(), 2),
  },
  {
    id: '4',
    name: 'ATLETICO',
    picture: PICTURE2,
    // logo: IMG2,
    createdAt: subDays(new Date(), 1),
  },
];

const ItemComponent = React.memo(({item}: {item: Team}) => (
  <Grid md={4} xs={12} display="grid">
    <TeamCard item={item} />
  </Grid>
));

export default function Page(): React.JSX.Element {
  const isEmptyList = teams.length === 0;

  return (
    <List
      content={teams}
      headText="Команды"
      headActionComponent={
        <Button
          component={NextLink}
          href={paths.dashboard.teamsCreate}
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          {isEmptyList ? 'Создать' : 'Добавить'}
        </Button>
      }
      itemComponent={ItemComponent}
    />
  );
}
