import { FC, useEffect, useMemo } from 'react';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { Document } from 'react-pdf';
import { PDFInfo } from '../../types';

interface PDFLoaderProps {
  pdf: PDFInfo;
  onLoadSuccess: (pdf: PDFDocumentProxy, id: string) => void;
  onUnload: (id: string) => void;
}

export const PDFLoader: FC<PDFLoaderProps> = ({
  pdf,
  onLoadSuccess,
  onUnload,
}) => {
  const file = useMemo(() => {
    const f = { data: pdf.uint8Array };
    return f;
  }, [pdf.uint8Array]);

  useEffect(() => {
    return () => onUnload(pdf.id);
  }, [onUnload, pdf.id]);

  return (
    <Document
      file={file}
      onLoadSuccess={(curPDFProxy) => onLoadSuccess(curPDFProxy, pdf.id)}
    />
  );
};
