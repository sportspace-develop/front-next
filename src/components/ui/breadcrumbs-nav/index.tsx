import { Metadata } from 'next';
import NextLink from 'next/link';

import * as React from 'react';

import { Breadcrumbs, Link, Typography } from '@mui/material';

import { config } from '@/config';

export const metadata = { title: `Создать команду | ${config.site.name}` } satisfies Metadata;

type BreadcrumbsNavProps = {
  items: {
    name: string;
    path: string;
  }[];
  currentTitle?: string;
};

export default function BreadcrumbsNav({
  items,
  currentTitle,
}: BreadcrumbsNavProps): React.JSX.Element {
  return (
    <Breadcrumbs>
      {items.map((item, index) => (
        <Link
          key={index}
          color="text.primary"
          component={NextLink}
          href={item.path}
          variant="subtitle2"
        >
          {item.name}
        </Link>
      ))}
      {currentTitle && (
        <Typography color="text.secondary" variant="subtitle2">
          {currentTitle}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
