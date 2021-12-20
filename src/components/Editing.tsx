import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { PageInfo } from '../types';
import { AddMoreFiles } from './AddMoreFiles';
import { SortableGrid } from './SortableGrid';

interface EditingProps {
  setNewOrder: Dispatch<SetStateAction<PageInfo[]>>;
  newOrder: PageInfo[];
  pdf: string;
  reorderPages: () => void;
  reset: () => void;
  setFinished: Dispatch<SetStateAction<boolean>>;
  addNewFile: (f: File[]) => void;
}

export const Editing: FC<EditingProps> = ({
  setNewOrder,
  newOrder,
  pdf,
  reorderPages,
  reset,
  setFinished,
  addNewFile,
}) => {
  return (
    <Flex flexDirection='column' width='100%'>
      <Flex
        width='100%'
        flexDirection='column'
        border='1px solid'
        p={4}
        backgroundColor='gray.600'
        borderRadius={4}
      >
        <SortableGrid setNewOrder={setNewOrder} newOrder={newOrder} pdf={pdf} />
      </Flex>
      <Flex>
        <Button onClick={reset}>Reset</Button>
        <Button
          onClick={() => {
            reorderPages();
            setFinished(true);
          }}
        >
          Finish
        </Button>
        <AddMoreFiles addNewFile={addNewFile} />
      </Flex>
    </Flex>
  );
};
