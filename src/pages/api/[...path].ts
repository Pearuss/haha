import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import { NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: any, res: NextApiResponse<any>) {
  // req.url = req.url.replace(/^\/api/, '');
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);

    if (cookies.get('access_token')) {
      const accessToken = cookies.get('access_token');
      console.log(accessToken);

      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = '';

    proxy.web(req, res, {
      target: 'http://localhost:3100',
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
