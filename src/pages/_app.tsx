import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { NextPage } from 'next/types';
import React, { ReactElement, ReactNode } from 'react';

import '@/styles/frame.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Seo from '@/components/Seo';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const colorModeManager = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colorModeManager });

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;
  let Layout;
  if (Component.getLayout) {
    Layout = Component.getLayout(<Component {...pageProps} />);
  } else {
    Layout = <Component {...pageProps} />;
  }

  return (
    <ChakraProvider theme={theme}>
      <Seo />
      {Layout}
    </ChakraProvider>
  );
};

export default App;

type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type { NextPageWithLayout };
