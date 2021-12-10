import { FC } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai';
import { Page, Document } from 'react-pdf';

interface SortableItemProps {
  id: string;
  handleDelete: (id: string) => void;
  handleRotate: (id: string, rotation: number) => void;
  pageNumber: number;
  rotation: number;
  pdf: string;
}

export const SortableItem: FC<SortableItemProps> = ({
  id,
  handleDelete,
  handleRotate,
  rotation,
  pageNumber,
  pdf,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  return (
    <Box
      w='200px'
      h='200px'
      border='1px'
      flex='0 0 21%'
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      justifyItems='center'
      alignItems='center'
    >
      <Box display='flex' justifyContent='center' width='100%' height='24px'>
        <IconButton
          h='24px'
          w='24px'
          icon={<DeleteIcon color='black' />}
          aria-label='Delete'
          onClick={() => handleDelete(id)}
          tabIndex={0}
        />
        <IconButton
          h='24px'
          w='24px'
          icon={
            <AiOutlineRotateLeft color='black' height='24px' width='24px' />
          }
          aria-label='Rotate left'
          onClick={() => handleRotate(id, -90)}
          tabIndex={0}
        />
        <IconButton
          h='24px'
          w='24px'
          icon={
            <AiOutlineRotateRight color='black' height='24px' width='24px' />
          }
          aria-label='Rotate right'
          onClick={() => handleRotate(id, 90)}
          tabIndex={0}
        />
      </Box>
      <Box
        {...listeners}
        width='100%'
        height='calc(100% - 24px)'
        display='flex'
        justifyItems='center'
        alignItems='center'
        alignContent='center'
        justifyContent='center'
      >
        <Document file={pdf} className='react-pdf__Document-small'>
          <Page
            rotate={rotation}
            pageNumber={pageNumber}
            width={123}
            height={160}
          />
        </Document>
      </Box>
    </Box>
  );
};
