import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { globalStyles, theme } from '@/utils/theme.util';
import { CoreLayout } from '@/components/core';
import '@/fonts/typography.css';

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <NextUIProvider theme={theme}>
      <CoreLayout>
        <Component {...pageProps} />
      </CoreLayout>
    </NextUIProvider>
  );
};

export default App;
