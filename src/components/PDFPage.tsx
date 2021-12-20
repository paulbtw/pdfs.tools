import { FC, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

interface PageProps {
  pdf: string;
  pageCount: number;
  currentPage: number;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFPage: FC<PageProps> = ({ pdf, pageCount }) => {
  const ref = useRef<HTMLDivElement>(null);

  const child = ref?.current?.children[2];
  child?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Document file={pdf} inputRef={ref}>
        {Array.from(Array(pageCount).keys()).map((pageNumber) => (
          <Page
            pageNumber={pageNumber + 1}
            width={800}
            height={1200}
            key={pageNumber}
            className='pdf-page'
            scale={1}
          />
        ))}
      </Document>
    </>
  );
};
