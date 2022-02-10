/* eslint-disable object-curly-newline */
import React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/favicon.ico`}
          />

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="/static/script.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
