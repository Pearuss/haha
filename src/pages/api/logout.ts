import Cookies from 'cookies';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const cookies = new Cookies(req, res);
  cookies.set('access_token');
  proxy.web(req, res, {
    target: 'https://js-post-api.herokuapp.com',
    changeOrigin: true,
    selfHandleResponse: true,
  });

  res.status(200).json({ message: 'logout successfully' });
}
