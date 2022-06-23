import React from 'react';
import Grid from '@mui/material/Grid';
import { 
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TrashDrop from './TrashDrop';
import EmptyBoard from './EmptyBoard';
import Card from './Card';
import CardHover from './CardHover';


export interface IFrameData {
  id: string;
}

export interface IBoardProps {
  data: IFrameData[];
  activeId: string | null;
  onAddFrame: () => void;
}

export default function Board({data, activeId, onAddFrame}: IBoardProps) {
  // Check if the board is empty...
  if (data.length === 0) return <EmptyBoard onAddFrame={onAddFrame}/>;

  // TODO: Pass this to <CardHover />
  const activeFrame = data.find(frame => frame.id === activeId);

  return (
    <>
    <SortableContext 
        items={data}
        strategy={rectSortingStrategy}
      >
        <Grid container spacing={2}>
          {data.map(d => (
            <Card
              key={d.id}
              id={d.id}
            />
          ))}
        </Grid>
        <TrashDrop />
      </SortableContext>

      <DragOverlay>
        {activeId !== null && <CardHover />}
      </DragOverlay>
    </>
  );
}
