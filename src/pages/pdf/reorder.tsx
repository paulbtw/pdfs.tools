/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { NextPage } from 'next';
import { Drop, Editing, Titlebar } from '../../components';
import { usePDF } from '../../hooks';

const Reorder: NextPage = () => {
  const {
    initialize,
    reset,
    save,
    pdf,
    reorderPages,
    addNewFile,
    setNewOrder,
    newOrder,
  } = usePDF();
  const [finished, setFinished] = useState(false);

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
