import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Trophy as TrophyIcon } from '@phosphor-icons/react/dist/ssr/Trophy';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export enum NavIconNames {
  charPie = 'CHAR_PIE',
  gearSix = 'GEAR_SIX',
  plugsConnected = 'PLUGS_CONNECTED',
  xSquare = 'X_SQUARE',
  user = 'USER',
  users = 'USERS',
  trophy = 'TROPHY',
}

export const navIcons: Record<NavIconNames, Icon> = {
  [NavIconNames.charPie]: ChartPieIcon,
  [NavIconNames.gearSix]: GearSixIcon,
  [NavIconNames.plugsConnected]: PlugsConnectedIcon,
  [NavIconNames.xSquare]: XSquare,
  [NavIconNames.user]: UserIcon,
  [NavIconNames.users]: UsersIcon,
  [NavIconNames.trophy]: TrophyIcon,
};
