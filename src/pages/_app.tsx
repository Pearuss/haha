/* eslint-disable import/order */
import React from 'react';

import Router from 'next/router';
import { SWRConfig } from 'swr';

import useFetch from '../hooks/use-fetch';
import { EmptyLayout } from '../layout';
import { AppPropsWithLayout } from '../modals';

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';
import Head from 'next/head';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line react/jsx-props-no-spreading
/* eslint-disable react/jsx-props-no-spreading */

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => useFetch(url),
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
export default MyApp;
