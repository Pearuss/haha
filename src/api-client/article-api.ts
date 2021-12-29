/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestConfig } from 'axios';

import axiosClient from './axios-client-token';

const ArticleApi: any = () => ({
  getAll: (params?: AxiosRequestConfig<any> | undefined) => {
    const url = '/full-list';
    return axiosClient.get(url, params);
  },
});

export default ArticleApi;
