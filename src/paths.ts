export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', verifyCode: '/auth/verify-code' },
  dashboard: {
    account: '/dashboard/account',
    teams: {
      index: '/dashboard/teams',
      new: '/dashboard/teams/new',
      edit: '/dashboard/teams/[id]/edit',
      applications: {
        index: '/dashboard/teams/[id]/applications',
        new: '/dashboard/teams/[id]/applications/new',
        edit: '/dashboard/teams/[id]/applications/[applicationId]/edit',
      },
    },
    tournaments: {
      index: '/dashboard/tournaments',
      new: '/dashboard/tournaments/new',
      edit: '/dashboard/tournaments/[id]/edit',
    },
  },
} as const;
