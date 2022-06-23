import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
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
  frameNumber: number;
  frameImage?: string;
  frameDesc?: string;
  onEditFrame?: () => void;
}

/**
 * Card represents a frame in the storyboard.
 * 
 */
export default function Card({id, frameNumber, frameImage, frameDesc, onEditFrame}: ICardProps) {
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
              padding: "3px 8px",
              position: "relative",
            }}
          >
            {/* Header with Drag Handle & Frame # */}
            <div
              style={{
                display: "flex",
                margin: "5px 0px",
              }}
            >
              <div style={{marginLeft: "-5px"}}>
                <IconButton disableRipple {...listeners}>
                  <DragIndicatorIcon />
                </IconButton>
              </div>
              <div style={{
                marginTop: "7px",
              }}>
                <Typography variant="subtitle1">
                  Frame: {frameNumber + 1}
                </Typography>
              </div>
              <div style={{flexGrow: 1}}/>
            </div>

            {/* Image */}
            <Box style={{
              width: "200px",
              height: "200px",
              margin: "10px auto",
            }}>
              {!frameImage && (
                <Skeleton variant="rectangular" width="100%" height="100%" animation={false}/>
              )}
              {frameImage && (
                1
              )}
            </Box>


            {/* Frame Description */}
            <Typography variant="body2" style={{margin: "auto 3px",}}>
              {!frameDesc && (
                <span style={{color: "#707070"}}>No description yet...</span>
              )}
              {frameDesc}
            </Typography>

            {/* Footer with Edit Button */}
            <div style={{position: "absolute", left: "12px", bottom: "15px"}}>
              <Button 
                onClick={onEditFrame}
                variant="outlined"
                disableElevation
              >
                Edit Frame
              </Button>
            </div>
          </Paper>
        )}
      </Grid>
    </>
  );
}
