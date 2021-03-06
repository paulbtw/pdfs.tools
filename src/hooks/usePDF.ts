import { useState } from 'react';
import * as PDFLib from 'pdf-lib';
import { degrees } from 'pdf-lib';
import { PageInfo } from '../types';
import { readAsDataURL } from '../utils';

export const usePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(-1);
  const [isMultiPage, setIsMultiPage] = useState<boolean>(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [title, setTitle] = useState<string | undefined>();

  const update = async (updatedPdf: string | null) => {
    if (!updatedPdf) {
      setPageCount(0);
      setPageIndex(-1);
      setIsMultiPage(false);
      setIsFirstPage(false);
      setIsLastPage(false);
      setTitle(undefined);
      setPageInfo([]);
      setPdf(null);
      return;
    }
    const loadedPdf = await PDFLib.PDFDocument.load(updatedPdf);
    const pages = loadedPdf.getPages();
    const multi = pages.length > 1;

    setPageCount(pages.length);
    if (pageIndex >= pages.length || pageIndex === -1) {
      setPageIndex(1);
    }
    const pageInfoArray = pages.map((curPage, index) => {
      return {
        width: curPage.getWidth(),
        height: curPage.getHeight(),
        rotation: curPage.getRotation().angle,
        pageNumber: index + 1,
        id: `${index}`,
      };
    });

    setPageInfo(pageInfoArray);
    setIsMultiPage(multi);
    setIsFirstPage(pageIndex === 1);
    setIsLastPage(pageIndex === pages.length);
    setTitle(loadedPdf.getTitle());
    setPdf(updatedPdf);
  };

  const reset = () => {
    setFile(null);
    setPdf(null);
    setPageCount(0);
    setPageIndex(-1);
    setTitle(undefined);
  };

  const nextPage = () => {
    if (pageIndex >= pageCount) {
      return;
    }
    const newPageIndex = pageIndex + 1;
    setPageIndex(newPageIndex);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pageCount - 1);
  };

  const prevPage = () => {
    if (pageIndex <= 1) {
      return;
    }
    const newPageIndex = pageIndex - 1;
    setPageIndex(newPageIndex);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pageCount - 1);
  };

  const reorderPages = async (newOrder: PageInfo[]) => {
    if (!pdf) {
      return;
    }

    const pdfDoc = await PDFLib.PDFDocument.load(pdf);
    const pdfDocPages = pdfDoc.getPages();

    for (let currentPage = 0; currentPage < newOrder.length; currentPage++) {
      pdfDoc.removePage(currentPage);

      pdfDoc
        .insertPage(
          currentPage,
          pdfDocPages[newOrder[currentPage].pageNumber - 1],
        )
        .setRotation(degrees(newOrder[currentPage].rotation));
    }

    if (pdfDocPages.length > newOrder.length) {
      for (
        let currentPage = pdfDocPages.length - 1;
        currentPage >= newOrder.length;
        currentPage--
      ) {
        pdfDoc.removePage(currentPage);
      }
    }

    const savedPdfDoc = await pdfDoc.saveAsBase64({ dataUri: true });
    await update(savedPdfDoc);
  };

  const save = async (newOrder?: PageInfo[]) => {
    if (!pdf) {
      return;
    }
    if (newOrder) {
      await reorderPages(newOrder);
    }

    const fileName = file?.name ? file.name : title;
    const link = document.createElement('a');
    link.href = pdf;
    link.download = fileName ?? 'file.pdf';
    link.click();
  };

  const initialize = async (f: File[]) => {
    const loadedPDFs = await Promise.all(
      f.map(async (fileToRead) => {
        const buffer = await readAsDataURL(fileToRead);
        if (!buffer) {
          throw new Error('Could not read file');
        }
        return buffer;
      }),
    );

    if (loadedPDFs.length === 0) {
      throw new Error('No PDFs loaded');
    }

    const initialPDF = await PDFLib.PDFDocument.load(loadedPDFs[0]);

    // eslint-disable-next-line no-restricted-syntax
    for await (const pdfToMerge of loadedPDFs.slice(1)) {
      const pdfToMergeDoc = await PDFLib.PDFDocument.load(pdfToMerge);
      const copiedPages = await initialPDF.copyPages(
        pdfToMergeDoc,
        pdfToMergeDoc.getPageIndices(),
      );
      copiedPages.forEach((page) => {
        initialPDF.addPage(page);
      });
    }

    const savedPdf = await initialPDF.saveAsBase64({ dataUri: true });

    await update(savedPdf);
  };

  const addNewFile = async (f: File[]) => {
    const loadedPDFs = await Promise.all(
      f.map(async (fileToRead) => {
        const buffer = await readAsDataURL(fileToRead);
        if (!buffer) {
          throw new Error('Could not read file');
        }
        return buffer;
      }),
    );

    if (loadedPDFs.length === 0 || !pdf) {
      throw new Error('No PDFs loaded');
    }

    const initialPDF = await PDFLib.PDFDocument.load(pdf);

    // eslint-disable-next-line no-restricted-syntax
    for await (const pdfToMerge of loadedPDFs) {
      const pdfToMergeDoc = await PDFLib.PDFDocument.load(pdfToMerge);
      const copiedPages = await initialPDF.copyPages(
        pdfToMergeDoc,
        pdfToMergeDoc.getPageIndices(),
      );
      copiedPages.forEach((page) => {
        initialPDF.addPage(page);
      });
    }

    const savedPdf = await initialPDF.saveAsBase64({ dataUri: true });

    await update(savedPdf);
  };

  const encrypt = async (_password: string) => {
    // Waiting for https://github.com/Hopding/pdf-lib/pull/1015
  };

  return {
    file,
    pdf,
    initialize,
    reset,
    title,
    setTitle,
    pageCount,
    nextPage,
    prevPage,
    isFirstPage,
    isLastPage,
    isMultiPage,
    pageIndex,
    save,
    reorderPages,
    pageInfo,
    addNewFile,
    encrypt,
  };
};
