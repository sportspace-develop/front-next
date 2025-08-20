import { profileApi } from '@/lib/store/features/profile-api';
import { useAppSelector } from '@/lib/store/hooks';

export function useProfile() {
  return useAppSelector(profileApi.endpoints.getProfile.select()).data;
}

export function useProfileId() {
  return useAppSelector(profileApi.endpoints.getProfile.select()).data?.id;
}
