import { subDays } from 'date-fns';

import { Team } from '@/components/dashboard/teams/team-card';

const PICTURE1 = 'https://st.joinsport.io/team/1305877/cover/65d8d6b757d14_385x257.jpg';
const PICTURE2 = 'https://st.joinsport.io/team/1305818/cover/667167d7b347e_385x257.png';
const IMG1 = 'https://st.joinsport.io/team/1305877/logo/6469e3d0468e8_173x173.jpg';
const IMG2 = 'https://st.joinsport.io/team/1305818/logo/646886d35da1a_173x173.jpg';

export const teams: Team[] = [
  {
    id: '0',
    name: 'пример самого длинного к названия',
    picture: PICTURE1,
    // logo: IMG1,
    createdAt: subDays(new Date(), 3),
  },
  {
    id: '1',
    name: 'ATLETICO',
    // picture: PICTURE2,
    logo: IMG2,
    createdAt: subDays(new Date(), 2),
  },
  {
    id: '2',
    name: 'VSEPROSPORT.RU',
    // picture: PICTURE1,
    logo: IMG1,
    createdAt: subDays(new Date(), 2),
  },
  {
    id: '3',
    name: 'ATLETICO',
    picture: PICTURE2,
    // logo: IMG2,
    createdAt: subDays(new Date(), 1),
  },
];
