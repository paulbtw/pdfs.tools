import { useCallback, useState } from 'react';
import * as PDFJS from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { PDFInfo } from '../types';
import { fileToUint8Array, genId } from '../utils';

export const usePDFNative = () => {
  const [pdfInfos, setPDFInfos] = useState<PDFInfo[] | null>(null);
  const [requirePassword, setRequirePasswords] = useState<
    {
      id: string;
      name: string;
      status: number;
      callback: (password: string) => void;
      cancel: () => void;
    }[]
  >([]);

  const addPDF = useCallback(
    async (f: File[]) => {
      if (!pdfInfos) {
        setPDFInfos([]);
      }
      const pdfs = await Promise.all(
        f.map<Promise<PDFInfo | null>>(async (file) => {
          const uint8ArrayFile = await fileToUint8Array(file);
          const loadPDF = PDFJS.getDocument(uint8ArrayFile);
          const curId = genId();
          loadPDF.onPassword = async (
            callback: (password: string) => void,
            reason: number,
          ) => {
            setRequirePasswords((requirePasswords) => [
              ...requirePasswords,
              {
                id: curId,
                name: file.name,
                status: reason,
                callback: (pw: string) => {
                  setRequirePasswords((reqPasswords) =>
                    reqPasswords.filter((rp) => rp.id !== curId),
                  );
                  callback(pw);
                },
                cancel: async () => {
                  setRequirePasswords((reqPasswords) =>
                    reqPasswords.filter((rp) => rp.id !== curId),
                  );
                  await loadPDF.destroy();
                },
              },
            ]);
          };
          try {
            const loadedPDF = await loadPDF.promise;
            const pageCount = loadedPDF.numPages;
            return {
              id: curId,
              file,
              fileName: file.name,
              uint8Array: uint8ArrayFile,
              pageCount,
              pdfDocument: loadedPDF,
              pages: await Promise.all(
                Array.from({ length: pageCount }, async (_, i) => {
                  const page = await loadedPDF.getPage(i + 1);
                  const viewport = page.getViewport({ scale: 1 });
                  return {
                    width: viewport.width,
                    height: viewport.height,
                    rotation: viewport.rotation,
                    pageNumber: i + 1,
                  };
                }),
              ),
            };
          } catch (err) {
            return null;
          }
        }),
      );

      const filteredPDFs = pdfs.filter((pdf) => pdf !== null) as PDFInfo[];

      setPDFInfos((prev) => {
        if (!prev) {
          return filteredPDFs;
        }

        return [...prev, ...filteredPDFs];
      });
    },
    [pdfInfos],
  );

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
    requirePassword,
  };
};
