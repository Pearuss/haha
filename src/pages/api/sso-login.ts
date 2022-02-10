import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import { NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};
/* eslint-disable */
const proxy = httpProxy.createProxyServer();

export default function handler(req: any, res: any) {
  req.url = req.url.replace(/^\/api/, '');

  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not support' });
  }

  return new Promise((resolve) => {
    req.headers.cookie = '';
    const handleLoginResponse: ProxyResCallback = (proxyRes, req: any, res) => {
      let body = '';
      proxyRes.on('data', function (chunk) {
        body += chunk;
      });
      proxyRes.on('end', function () {
        try {
          if (JSON.parse(body).message === 422) {
            (res as NextApiResponse).status(400).json({ message: 422 });
            return;
          }

          const { accessToken, expiresIn } = JSON.parse(body).data;
          // const cookies = new Cookies(req, res, {
          //   secure: process.env.NODE_ENV !== 'development',
          // });
          const cookies = new Cookies(req, res);
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiresIn * 1000),
          });
          (res as NextApiResponse).status(200).json({ message: 200 });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 500 });
        }
        resolve(true);
      });
    };

    proxy.once('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
