import { ChakraProvider } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { AppProps } from 'next/app';
import * as PDFJS from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';
import { NavbarLayout } from '../layout';
import theme from '../theme';

import '../theme/global.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </ChakraProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-US')),
    },
  };
};

export default appWithTranslation(App);
