import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import { NextApiResponse } from 'next';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
/* eslint-disable */
const proxy = httpProxy.createProxyServer();

export default function handler(req: any, res: NextApiResponse<Data>) {
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
          // const { data, message } = JSON.parse(body);
          const { accessToken, expiresIn } = JSON.parse(body).data;

          // console.log(accessToken + '+' + expiresIn);

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiresIn * 1000),
          });
          (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
        }
        resolve(true);
      });
    };

    proxy.once('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: 'http://localhost:3100/api/v1/auth',
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });

  //   res.status(200).json({ name: 'Test' });
}
