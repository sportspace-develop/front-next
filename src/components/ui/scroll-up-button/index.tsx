'use client';

import * as React from 'react';

import { CaretUp as CaretUpIcon } from '@phosphor-icons/react/dist/ssr/CaretUp';

import { Fab } from '@mui/material';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ScrollUpButton = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY > 50;

      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      {visible && (
        <Fab
          aria-label="Наверх"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
          }}
        >
          <CaretUpIcon size={20} />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default ScrollUpButton;
