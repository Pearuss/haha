import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

import { authApi } from '../api-client/auth-api';
import { LoginPayLoad } from '../modals';

export function useAuth(option?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('http://localhost:3000/api/v1/user/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1h
    revalidateOnFocus: false,
    ...option,
  });
  const firstLoading = profile === undefined && error === undefined;

  // const random_boolean = Math.random() < 0.5;

  // if (profile) {
  //   profile.isAdmin = random_boolean;
  // }

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
