import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { theme } from '@/utils/theme.util';
import { CoreLayout } from '@/components/core';
import '@/fonts/typography.css';

const App = ({ Component, pageProps }: AppProps) => (
  <NextUIProvider theme={theme}>
    <CoreLayout>
      <Component {...pageProps} />
    </CoreLayout>
  </NextUIProvider>
);

export default App;
