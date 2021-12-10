import { FC } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

export const Grid: FC = () => {
  const newOrder = [1, 2, 3, 4, 5];
  const sensor = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = newOrder.findIndex(
        (page) => page.toString() === active.id,
      );
      const newIndex = newOrder.findIndex(
        (page) => page.toString() === over.id,
      );

      arrayMove(newOrder, oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensor}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={} />
    </DndContext>
  );
};
