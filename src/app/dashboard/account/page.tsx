import type {Metadata} from 'next';

import * as React from 'react';

import {Unstable_Grid2 as Grid, Stack, Typography} from '@mui/material';

import {AccountDetailsForm} from '@/components/dashboard/account/account-details-form';
import {AccountInfo} from '@/components/dashboard/account/account-info';
import {config} from '@/config';

export const metadata = {title: `Account | Dashboard | ${config.site.name}`} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
