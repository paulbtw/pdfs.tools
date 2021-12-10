/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { NextPage } from 'next';
import { Drop, Editing, Titlebar } from '../../components';
import { usePDF } from '../../hooks';
import { PageInfo } from '../../types';

const Reorder: NextPage = () => {
  const { initialize, reset, save, pdf, reorderPages, pageInfo, addNewFile } =
    usePDF();
  const [newOrder, setNewOrder] = useState<PageInfo[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setNewOrder(pageInfo);
  }, [pageInfo]);

  return (
    <>
      <Titlebar title='Reorder Pages' />
      <Flex flex='0 0 100%'>
        {finished ? (
          <>
            <Button onClick={() => save()}>Save</Button>
            <Button
              onClick={() => {
                reset();
                setFinished(false);
                setNewOrder([]);
              }}
            >
              Reset
            </Button>
          </>
        ) : !pdf ? (
          <Drop onLoaded={initialize} />
        ) : (
          <Editing
            setNewOrder={setNewOrder}
            newOrder={newOrder}
            pdf={pdf}
            reorderPages={reorderPages}
            reset={reset}
            setFinished={setFinished}
            addNewFile={addNewFile}
          />
        )}
      </Flex>
    </>
  );
};

export default Reorder;
