export const paths = {
  home: '/',
  auth: {signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password'},
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    teams: '/dashboard/teams',
    teamsCreate: '/dashboard/teams/create',
    tournaments: '/dashboard/tournaments',
  },
} as const;
