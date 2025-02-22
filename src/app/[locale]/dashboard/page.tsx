import { redirect } from '@/i18n/routing';
import { paths } from '@/paths';

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  redirect({ href: paths.dashboard.tournaments.index, locale });
}
