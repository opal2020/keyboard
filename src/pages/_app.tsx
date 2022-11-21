import { ThemeProvider, Global } from '@emotion/react';
import { observer } from 'mobx-react';

import globalStyles from 'styles/globalStyle';
import { AppProps } from 'next/app';
import Script from 'next/script';
import theme from 'styles/theme';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import * as gtag from '../../lib/gtag';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>keyboard</title>
      </Head>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
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
