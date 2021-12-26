import { useCallback, useState } from 'react';
import * as PDFLib from 'pdf-lib';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { PDFInfo } from '../types';
import { fileToUint8Array, genId } from '../utils';

export const usePDFNative = () => {
  const [pdfInfos, setPDFInfos] = useState<PDFInfo[] | null>(null);

  const addPDF = useCallback(async (f: File[]) => {
    const pdfs = await Promise.all(
      f.map<Promise<PDFInfo>>(async (file) => {
        const uint8ArrayFile = await fileToUint8Array(file);

        const pdf = await PDFLib.PDFDocument.load(uint8ArrayFile);

        return {
          id: genId(),
          file,
          fileName: file.name,
          uint8Array: uint8ArrayFile,
          title: pdf.getTitle() ?? file.name,
          pageCount: pdf.getPageCount(),
          pdfDocument: null,
          pages: pdf.getPages().map((page, index) => {
            return {
              width: page.getWidth(),
              height: page.getHeight(),
              rotation: page.getRotation().angle,
              pageNumber: index + 1,
            };
          }),
        };
      }),
    );

    setPDFInfos((prev) => {
      if (!prev) {
        return pdfs;
      }

      return [...prev, ...pdfs];
    });
  }, []);

  const setPDFDocument = useCallback((pdfDoc: PDFDocumentProxy, id: string) => {
    setPDFInfos((prev) => {
      if (!prev) {
        return null;
      }

      const pdfInfo = prev.find((pdf) => pdf.id === id);

      if (!pdfInfo) {
        return prev;
      }

      return [
        ...prev.filter((pdf) => pdf.id !== id),
        {
          ...pdfInfo,
          pdfDocument: pdfDoc,
        },
      ];
    });
  }, []);

  const deletePDF = useCallback((id: string) => {
    setPDFInfos((currentPDFInfos) => {
      if (!currentPDFInfos) return null;
      return currentPDFInfos.filter((pdfInfo) => pdfInfo.id !== id);
    });
  }, []);

  const resetAll = useCallback(
    (full?: boolean) => {
      if (full) {
        if (!pdfInfos) return;
        setPDFInfos(null);
      } else {
        if (!pdfInfos) return;
        if (pdfInfos.length === 0) return;
        setPDFInfos([]);
      }
    },
    [pdfInfos],
  );

  return {
    pdfInfos,
    addPDF,
    resetAll,
    deletePDF,
    setPDFDocument,
  };
};
