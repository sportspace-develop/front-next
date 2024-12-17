/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { configure, render, screen } from '@testing-library/react';

configure({ asyncUtilTimeout: 5000, testIdAttribute: 'data-selector' });

Object.defineProperty(global, 'render', {
  value: render,
});

Object.defineProperty(global, 'tscreen', {
  value: screen,
});

Element.prototype.scrollIntoView = jest.fn();

/* eslint-enable import/no-extraneous-dependencies */
