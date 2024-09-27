import { NavIconNames } from '@/components/dashboard/layout/nav-icons';
import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

export const navItems: NavItemConfig[] = [
  { key: 'overview', title: 'Обзор', href: paths.dashboard.overview, icon: NavIconNames.charPie },
  {
    key: 'tournaments',
    title: 'Турниры',
    href: paths.dashboard.tournaments,
    icon: NavIconNames.trophy,
  },
  { key: 'teams', title: 'Команды', href: paths.dashboard.teams, icon: NavIconNames.users },
  { key: 'account', title: 'Аккаунт', href: paths.dashboard.account, icon: NavIconNames.user },
];
