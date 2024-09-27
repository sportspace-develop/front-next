import type { Metadata } from 'next';

import * as React from 'react';

import { Unstable_Grid2 as Grid } from '@mui/material';

export const metadata = { title: `Overview | Dashboard` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      {'dashboard page'}
    </Grid>
  );
}
