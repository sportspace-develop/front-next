import { redirect } from 'next/navigation';

import { paths } from '@/paths';

export default function Page(): never {
  redirect(paths.dashboard.tournaments.index);
}
