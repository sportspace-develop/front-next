'use client';

import React from 'react';

import { useGetProfileQuery } from '@/lib/store/features/profile-api';

function UserProfileInitializer() {
  useGetProfileQuery();

  return <React.Fragment />;
}

export default UserProfileInitializer;
