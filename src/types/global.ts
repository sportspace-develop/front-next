/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const emptyObject = {};

declare global {
  type TAnyObject = Record<string, any>;
  type TEmptyObject = typeof emptyObject;
  type TAnyFunction = (...args: any[]) => any;
  type TAnyFunctionWithOutArgs = () => any;
  type TEmptyFunction = () => void;
  type TAnyComponent<P = any> = React.NamedExoticComponent<P> | React.ComponentType<P>;
  type Optional<I extends Record<string, any>, K extends string> = Omit<I, K> & Partial<Pick<I, K>>;
  type DeepPartial<T> = T extends TAnyFunction
    ? T
    : T extends object
      ? {[P in keyof T]?: DeepPartial<T[P]>}
      : T;
  type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
  type Difference<A, B> = A extends B ? never : A;
  type Overwrite<A, B> = Pick<A, Difference<keyof A, keyof B>> & B;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
