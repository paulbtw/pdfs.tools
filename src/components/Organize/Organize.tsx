import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { Page } from 'react-pdf';
import { PDFInfo } from '../../types';
import { PDFLoader } from './PDFLoader';
import { Sidebar } from './Sidebar';

/**
 * This component is used for:
 *   - Merging multiple PDFs into one document.
 *   - Deleting pages from a PDF.
 *   - Adding pages to a PDF.
 *   - Rotating pages in a PDF.
 *
 */

interface OrganizeProps {
  pdfs: PDFInfo[];
  resetAll: (full?: boolean) => void;
  setPDFDocument: (pdfDoc: PDFDocumentProxy, id: string) => void;
  deletePDF: (id: string) => void;
}

export const Organize: FC<OrganizeProps> = ({
  pdfs,
  resetAll,
  setPDFDocument,
  deletePDF,
}) => {
  return (
    <Flex width='100%' height='100%'>
      <Box
        height='100%'
        p={4}
        flex='1 1'
        overflowX='hidden'
        overflowY='auto'
        boxSizing='border-box'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('gray', 'gray'),
            borderRadius: '24px',
          },
        }}
      >
        {pdfs.map((pdf) => (
          <PDFLoader
            key={pdf.id}
            pdf={pdf}
            onLoadSuccess={setPDFDocument}
            onUnload={deletePDF}
          />
        ))}
        {pdfs.map((pdf) => {
          if (!pdf.pdfDocument) {
            return null;
          }
          return (
            <Page
              // @ts-ignore
              pdf={pdf.pdfDocument}
              key={`${pdf.id}-1`}
              pageNumber={1}
              renderAnnotationLayer={false}
            />
          );
        })}
      </Box>
      <Box flexBasis='440px' bg={useColorModeValue('white', 'gray.800')}>
        <Sidebar resetAll={resetAll} pdfs={pdfs} />
      </Box>
    </Flex>
  );
};
