import React, { FC, useCallback, useState, useMemo } from 'react';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
  pdf: Uint8Array;
  scale?: number;
}

export const PDFViewer: FC<PDFViewerProps> = ({ pdf, scale = 1 }) => {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);

  const onFileChange = useMemo(() => {
    const file = { data: pdf };
    return file;
  }, [pdf]);
  const onLoadSuccess = useCallback((doc: PDFDocumentProxy) => {
    setDocument(doc);
  }, []);
  return (
    <>
      <Document file={onFileChange} onLoadSuccess={onLoadSuccess} />

      {document && (
        <Page pageNumber={1} pdf={document} renderAnnotationLayer={true} />
      )}
    </>
  );
};
