export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', verifyCode: '/auth/verify-code' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    teams: {
      index: '/dashboard/teams',
      new: '/dashboard/teams/new',
      edit: '/dashboard/teams/[id]/edit',
    },
    tournaments: '/dashboard/tournaments',
  },
} as const;
