import type {Metadata} from 'next';

import * as React from 'react';

import {Unstable_Grid2 as Grid} from '@mui/material';

import {Tournament, TournamentCard} from '@/components/dashboard/tournament/tournament-card';
import List from '@/components/ui/list';
import {config} from '@/config';

export const metadata = {
  title: `Tournaments | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const tournaments: Tournament[] = [
  {
    id: 1,
    name: 'Дивизион ПРОФИ',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 2,
    name: 'Дивизион B',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 3,
    name: 'Дивизион C',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 4,
    name: 'Дивизион D',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 5,
    name: 'Дивизион E',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 6,
    name: 'Дивизион F',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 7,
    name: 'Дивизион G',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 8,
    name: 'Дивизион H',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 9,
    name: 'Дивизион I',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 10,
    name: 'Дивизион J',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 11,
    name: 'Дивизион K',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
  {
    id: 12,
    name: 'Дивизион L',
    organisation: 'Мини-Футбольная Лига города Омска',
    description: 'ЛЕТНИЙ СЕЗОН 2024',
    logo: 'https://st.joinsport.io/league/1002006/logo/610b689724b96_172x172.png',
  },
];

const ItemComponent = React.memo(({item}: {item: Tournament}) => (
  <Grid lg={4} md={6} xs={12}>
    <TournamentCard item={item} />
  </Grid>
));

export default function Page(): React.JSX.Element {
  return <List content={tournaments} headText="Турниры" itemComponent={ItemComponent} />;
}
