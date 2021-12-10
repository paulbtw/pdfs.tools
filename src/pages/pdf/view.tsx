import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { Drop, PDFPage, Titlebar } from '../../components';
import { usePDF } from '../../hooks';

const View: NextPage = () => {
  const { initialize, nextPage, prevPage, reset, save, pdf, pageCount } =
    usePDF();

  return (
    <>
      <Titlebar title='View PDF' />
      <Flex flex='0 0 100%'>
        {!pdf ? (
          <Drop onLoaded={initialize} />
        ) : (
          <>
            <Flex flexDirection='column'>
              <Button onClick={prevPage}>Prev</Button>
              <Button onClick={nextPage}>Next</Button>
              <Button onClick={reset}>Reset</Button>
              <Button onClick={() => save()}>Save</Button>
            </Flex>
            <PDFPage pdf={pdf} pageCount={pageCount} />
          </>
        )}
      </Flex>
    </>
  );
};

export default View;
