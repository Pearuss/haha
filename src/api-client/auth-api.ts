import { LoginPayLoad } from '../models';
import axiosAuth from './axios-auth';

export const authApi = {
  login(payload: LoginPayLoad) {
    return axiosAuth.post('/login', payload);
  },

  logout() {
    return axiosAuth.post('/logout');
  },
  getProfile() {
    return axiosAuth.get('/user/1');
  },
};
