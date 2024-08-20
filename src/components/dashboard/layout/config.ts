import {paths} from '@/paths';
import type {NavItemConfig} from '@/types/nav';

export const navItems = [
  {key: 'overview', title: 'Обзор', href: paths.dashboard.overview, icon: 'chart-pie'},
  {key: 'tournaments', title: 'Турниры', href: paths.dashboard.tournaments, icon: 'users'},
  {key: 'teams', title: 'Команды', href: paths.dashboard.teams, icon: 'users'},
  {key: 'account', title: 'Аккаунт', href: paths.dashboard.account, icon: 'user'},
] satisfies NavItemConfig[];
