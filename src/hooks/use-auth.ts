import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

import { authApi } from '../api-client/auth-api';
import { LoginPayLoad } from '../modals';

export function useAuth(option?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('http://localhost:3000/api/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1h
    revalidateOnFocus: false,
    ...option,
  });
  const firstLoading = profile === undefined && error === undefined;

  async function login(data: LoginPayLoad) {
    await authApi.login(data);

    mutate();
  }
  async function logout() {
    await authApi.logout();
    mutate(null, false);
  }

  return {
    profile,
    error,
    mutate,
    login,
    logout,
    firstLoading,
  };
}
