import { FC } from 'react';
import { Box, useColorModeValue, Text, Button } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PDFInfo } from '../../types';
import { colors } from '../../utils';

interface FileItemProps {
  pdf: PDFInfo;
  idx: number;
}

export const FileItem: FC<FileItemProps> = ({ pdf, idx }) => {
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
      p={4}
      pr={8}
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
      {...listeners}
      role='group'
    >
      <Text fontSize='lg' fontWeight='500'>
        {pdf.id}
      </Text>
      <Button
        _groupHover={{
          display: 'none',
        }}
      >
        Test
      </Button>
    </Box>
  );
};
