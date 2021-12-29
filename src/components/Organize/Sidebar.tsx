import { FC } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { PDFInfo } from '../../types';
import { FileItem } from './FileItem';

interface SidebarProps {
  resetAll: (full?: boolean) => void;
  pdfs: PDFInfo[];
  deletePDF: (id: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ resetAll, pdfs, deletePDF }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async ({ active }: DragEndEvent) => {
    console.log(active.id);
  };
  return (
    <Flex flexFlow='column' height='100%'>
      <Box
        p={4}
        textTransform='uppercase'
        borderBottom='1px'
        borderColor={useColorModeValue('gray.300', 'gray.600')}
      >
        <Heading fontWeight='600' textAlign='center' size='lg'>
          Organize PDF
        </Heading>
      </Box>
      <Box p={4} flex={1} overflowX='hidden' overflowY='auto'>
        <Box display='flex' justifyContent='space-between' mb={2}>
          <Text fontSize='lg' fontWeight='500'>
            Files:
          </Text>
          <Button size='sm' onClick={() => resetAll(false)}>
            Delete all
          </Button>
        </Box>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={pdfs} strategy={rectSortingStrategy}>
            {pdfs.map((pdf, idx) => (
              <FileItem
                pdf={pdf}
                idx={idx}
                key={pdf.id}
                deletePDF={deletePDF}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
      <Box
        p={4}
        height='100px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
      >
        <Button size='lg' onClick={() => resetAll(true)}>
          Reset
        </Button>
      </Box>
    </Flex>
  );
};
