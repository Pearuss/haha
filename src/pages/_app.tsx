import React from 'react';

import { SWRConfig } from 'swr';

import useFetch from '../hooks/use-fetch';
// import axiosClient from '../api-client/axios-client';
import { EmptyLayout } from '../layout';
import { AppPropsWithLayout } from '../modals';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

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
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
export default MyApp;
