'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';

// Define the type for the observer callback function
type ObserverCallback = () => void;

const createRouteObserver = () => {
  let observer: ObserverCallback | null = null;

  const setObserver = (callback: ObserverCallback) => {
    observer = callback;
  };

  const notify = () => {
    if (observer) {
      observer();
    }
  };

  return { setObserver, notify };
};

const routeObserver = createRouteObserver();

const useAsyncRoutePush = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const asyncPush = async (path: string) =>
    new Promise<void>((resolve) => {
      startTransition(() => {
        router.push(path);
      });

      routeObserver.setObserver(() => {
        resolve();
      });
    });

  React.useEffect(() => {
    if (!isPending) {
      routeObserver.notify();
    }
  }, [isPending]);

  return asyncPush;
};

const useAsyncRouteReplace = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const asyncReplace = async (path: string) =>
    new Promise<void>((resolve) => {
      startTransition(() => {
        router.replace(path);
      });

      routeObserver.setObserver(() => {
        resolve();
      });
    });

  React.useEffect(() => {
    if (!isPending) {
      routeObserver.notify();
    }
  }, [isPending]);

  return asyncReplace;
};

export { useAsyncRoutePush, useAsyncRouteReplace };
