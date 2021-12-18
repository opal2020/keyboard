import { ThemeProvider, Global } from '@emotion/react';
import { observer } from 'mobx-react';

import globalStyles from 'styles/globalStyle';
import { AppProps } from 'next/app';
import theme from 'styles/theme';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>keyboard</title>
      </Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rhodium+Libre&display=swap"
        rel="stylesheet"
      />
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default observer(MyApp);
