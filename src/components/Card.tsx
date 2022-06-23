import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

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
        // {...listeners}
      >
        {isDragging && (<CardPlaceholder />)}
        {!isDragging && (
          <Paper
            variant="outlined"
            style={{ 
              width: "100%", 
              height: "100%", 
              boxSizing: "border-box",
              padding: "5px 8px",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "5px 0px",
              }}
            >
              <div style={{
                marginTop: "5px",
              }}>
                <Typography variant="subtitle1">
                  Frame: {id}
                </Typography>
              </div>
              <div style={{flexGrow: 1}}/>
              <div>
                <IconButton disableRipple {...listeners}>
                  <DragIndicatorIcon />
                </IconButton>
              </div>
            </div>
            My name is... {id}
            <Button>Hello</Button>
          </Paper>
        )}
      </Grid>
    </>
  );
}
