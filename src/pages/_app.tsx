import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { DefaultLayout } from '../layout';
import theme from '../theme';
import '../theme/global.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ChakraProvider>
  );
}

export default MyApp;
