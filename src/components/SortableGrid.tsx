import { Dispatch, FC, SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { PageInfo } from '../types';
import { SortableItem } from './SortableItem';

interface SortableGridProps {
  setNewOrder: Dispatch<SetStateAction<PageInfo[]>>;
  newOrder: PageInfo[];
  pdf: string;
}

export const SortableGrid: FC<SortableGridProps> = ({
  setNewOrder,
  newOrder,
  pdf,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setNewOrder((curNewOrder) => {
        const oldIndex = curNewOrder.findIndex(({ id }) => id === active.id);
        const newIndex = curNewOrder.findIndex(({ id }) => id === over.id);

        return arrayMove(curNewOrder, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setNewOrder((curNewOrder) => curNewOrder.filter((page) => page.id !== id));
  };

  const handleRotate = (id: string, rotation: number) => {
    setNewOrder((curNewOrder) => {
      const index = curNewOrder.findIndex(({ id: curId }) => curId === id);
      const page = curNewOrder[index];

      return [
        ...curNewOrder.slice(0, index),
        { ...page, rotation: (page.rotation + rotation) % 360 },
        ...curNewOrder.slice(index + 1),
      ];
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box display='grid' gridTemplateColumns='repeat(auto-fill, 200px)'>
        <SortableContext items={newOrder} strategy={rectSortingStrategy}>
          {newOrder.map(({ id, rotation, pageNumber }) => (
            <SortableItem
              id={id}
              key={id}
              handleDelete={handleDelete}
              handleRotate={handleRotate}
              rotation={rotation}
              pageNumber={pageNumber}
              pdf={pdf}
            />
          ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};
