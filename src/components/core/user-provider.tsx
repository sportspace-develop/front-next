'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { useGetProfileQuery } from '@/lib/store/features/profile-api';

function UserProfileInitializer() {
  const { error } = useGetProfileQuery();

  React.useEffect(() => {
    if (error) {
      console.error('Ошибка загрузки профиля:', error);
      toast.error('Не удалось загрузить профиль');
    }
  }, [error]);

  return <React.Fragment />;
}

export default UserProfileInitializer;
