import type {Metadata} from 'next';

import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';

export const metadata = {title: `Overview | Dashboard`} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      {'dashboard page'}
    </Grid>
  );
}
