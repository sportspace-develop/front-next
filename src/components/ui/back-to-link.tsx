'use client';

import NextLink from 'next/link';

import * as React from 'react';

import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';

import { Link, Typography } from '@mui/material';

interface BackToLinkProps {
  href?: string;
  text?: string;
}

const goBack = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  window.history.back();
};

const BackToLinkContent = React.memo<BackToLinkProps>(({ text }) => {
  return (
    <>
      <CaretLeftIcon size={20} />
      <Typography sx={{ ml: 0.5 }} variant="subtitle2">
        {text}
      </Typography>
    </>
  );
});

const BackToLink = React.memo<BackToLinkProps>(({ href, text = 'Назад' }) => {
  if (href) {
    return (
      <Link
        component={NextLink}
        href={href}
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <BackToLinkContent text={text} />
      </Link>
    );
  }

  return (
    <Link
      href="#"
      onClick={goBack}
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <BackToLinkContent text={text} />
    </Link>
  );
});

export default BackToLink;
