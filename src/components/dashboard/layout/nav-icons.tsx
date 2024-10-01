import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Trophy as TrophyIcon } from '@phosphor-icons/react/dist/ssr/Trophy';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export enum NavIconNames {
  user = 'USER',
  users = 'USERS',
  trophy = 'TROPHY',
}

export const navIcons: Record<NavIconNames, Icon> = {
  [NavIconNames.user]: UserIcon,
  [NavIconNames.users]: UsersIcon,
  [NavIconNames.trophy]: TrophyIcon,
};
