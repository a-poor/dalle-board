import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

import CardPlaceholder from './CardPlaceholder';


const cardSize = {
  width: "300px",
  height: "500px",
}

export interface ICardProps {
  id: string;
}

/**
 * Card represents a frame in the storyboard.
 * 
 */
export default function Card({id}: ICardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <>
      <Grid
        item
        ref={setNodeRef}
        md={4}
        sm={6}
        xs={12}
        style={{
          width: cardSize.width,
          height: cardSize.height,
          ...style
        }}
        {...attributes}
        {...listeners}
      >
        {isDragging && (<CardPlaceholder />)}
        {!isDragging && (
          <Paper
            variant="outlined"
            style={{ 
              width: "100%", 
              height: "100%", 
              // backgroundColor: "#f0f00f"
            }}
          >
            {!isDragging && <span>
              My name is... {id}
            </span>}
          </Paper>
        )}
      </Grid>
    </>
  );
}
