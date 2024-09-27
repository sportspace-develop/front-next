export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', verifyCode: '/auth/verify-code' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    teams: '/dashboard/teams',
    teamsCreate: '/dashboard/teams/create',
    tournaments: '/dashboard/tournaments',
  },
} as const;
