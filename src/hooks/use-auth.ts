import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

import { authApi } from '../api-client/auth-api';
import { LoginPayLoad } from '../models';

export function useAuth(option?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/api/v1/user/profile', {
    dedupingInterval: 10 * 60 * 1000, // 5p
    revalidateOnFocus: false,
    ...option,
  });
  const firstLoading = profile === undefined && error === undefined;

  // const random_boolean = Math.random() < 0.5;

  // if (profile) {
  //   profile.isAdmin = random_boolean;
  // }

  async function login(data: LoginPayLoad) {
    const res = await authApi.login(data);
    if (res.message === 200) {
      mutate();
    }
    return res;
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
