import { NextUIProvider } from '@nextui-org/react';
import { Slide, ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';

import { globalStyles, theme } from '@/utils/theme.util';
import { CoreLayout } from '@/components/core';

import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/fonts/typography.css';

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();
  return (
    <>
      <NextUIProvider theme={theme}>
        <CoreLayout>
          <Component {...pageProps} />
        </CoreLayout>
      </NextUIProvider>
      <ToastContainer
        theme='dark'
        position='bottom-center'
        transition={Slide}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        limit={2}
        icon={false}
        pauseOnFocusLoss
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
