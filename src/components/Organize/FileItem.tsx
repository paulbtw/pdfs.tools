import { FC } from 'react';
import { Box, useColorModeValue, Text, IconButton } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GrClose } from 'react-icons/gr';
import { PDFInfo } from '../../types';
import { colors } from '../../utils';

interface FileItemProps {
  pdf: PDFInfo;
  idx: number;
  deletePDF: (id: string) => void;
}

export const FileItem: FC<FileItemProps> = ({ pdf, idx, deletePDF }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: pdf.id });
  const color = colors[idx % colors.length];
  return (
    <Box
      key={pdf.id}
      bg={useColorModeValue(`${color}.200`, `${color}.700`)}
      border='1px'
      borderColor={useColorModeValue(`${color}.300`, `${color}.600`)}
      _hover={{
        bg: useColorModeValue(`${color}.300`, `${color}.600`),
      }}
      transition='background-color 0.3s ease-in-out'
      m={1}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      cursor={isDragging ? 'grabbing' : 'grab'}
      {...attributes}
      role='group'
      position='relative'
    >
      <Box {...listeners} width='100%' height='100%' p={4} pr={12}>
        <Text fontSize='lg' fontWeight='500' textOverflow='ellipsis'>
          {pdf.fileName}
        </Text>
      </Box>
      <Box
        display='none'
        position='absolute'
        top='50%'
        right='10px'
        transform='translateY(-50%)'
        marginLeft='auto'
        width='32px'
        height='32px'
        cursor='pointer'
        _groupHover={{
          display: 'block',
        }}
      >
        <IconButton
          aria-label='delete'
          isRound
          size='sm'
          icon={<GrClose />}
          onClick={() => {
            deletePDF(pdf.id);
          }}
        />
      </Box>
    </Box>
  );
};
