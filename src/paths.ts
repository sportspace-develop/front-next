export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', verifyCode: '/auth/verify-code' },
  dashboard: {
    account: '/dashboard/account',
    teams: {
      index: '/dashboard/teams',
      new: '/dashboard/teams/new',
      edit: '/dashboard/teams/[id]/edit',
    },
    tournaments: {
      index: '/dashboard/tournaments',
      new: '/dashboard/tournaments/new',
      edit: '/dashboard/tournaments/[id]/edit',
    },
  },
} as const;
