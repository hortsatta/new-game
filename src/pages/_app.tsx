import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { theme } from '@/config/theme';
import { CoreLayout } from '@/components/core';
import '@/fonts/typography.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider theme={theme}>
      <CoreLayout>
        <Component {...pageProps} />
      </CoreLayout>
    </NextUIProvider>
  );
};

export default App;
