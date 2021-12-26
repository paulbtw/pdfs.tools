import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Organize } from '../../components';
import { Tool } from '../../components/Tool';
import { usePDFNative } from '../../hooks/usePDFNative';

const Merge: NextPage = () => {
  const { t } = useTranslation();

  const nativePDF = usePDFNative();

  return (
    <>
      {!nativePDF.pdfInfos ? (
        <Tool
          title={t('Merge PDF files')}
          subtitle={t('Combine multiple PDFs into one document.')}
          onLoaded={nativePDF.addPDF}
        />
      ) : (
        <>
          {nativePDF.pdfInfos && (
            <Organize
              pdfs={nativePDF.pdfInfos}
              resetAll={nativePDF.resetAll}
              setPDFDocument={nativePDF.setPDFDocument}
              deletePDF={nativePDF.deletePDF}
            />
          )}
        </>
      )}
    </>
  );
};

export default Merge;
