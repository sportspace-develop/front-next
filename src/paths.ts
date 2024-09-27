export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', verifyCode: '/auth/verify-code' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    teams: '/dashboard/teams',
    teamsNew: '/dashboard/teams/new',
    teamsEdit: '/dashboard/teams/[id]/edit',
    tournaments: '/dashboard/tournaments',
  },
} as const;
