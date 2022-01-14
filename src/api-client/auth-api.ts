import useFetch from '../hooks/use-fetch';
import { LoginPayLoad } from '../models';
import axiosAuth from './axios-auth';

export const authApi = {
  login(payload: LoginPayLoad) {
    return useFetch('/api/login', { method: 'POST', body: JSON.stringify(payload) });
  },

  logout() {
    return axiosAuth.post('/logout');
  },
  getProfile() {
    return axiosAuth.get('/user/1');
  },
};
