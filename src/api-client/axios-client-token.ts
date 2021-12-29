import queryString from 'querystring';

import axios from 'axios';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNyIjoiZGllbW50QGh5YnJpZC10ZWNobm9sb2dpZXMuY28uanAiLCJyb2xlIjo0MCwibG9naW5LZXkiOiI1ZjgyOTNmNC1jMzdkLTM4YzItZTRlNC0xMTA4MjM1MzdhZjYiLCJpYXQiOjE2NDA1Njc4MzQsImV4cCI6MTY3MTY3MTgzNH0.oMA7uuv8ZwBKkrpiYTvApIm39OAtnaebqzdGUICFk1k';

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a response interceptor

/* eslint-disable */
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
