import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import BaseBoardFrame from './BaseBoardFrame';

import { IFrameData } from '../types';



const defaultImgSize = 256;

export interface IBoardFrameProps {
  frameData: IFrameData;
  isFirst?: boolean;
  isLast?: boolean;
  onEdit?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onDelete?: () => void;
}

export default function BoardFrame({ frameData, isFirst, isLast, onEdit, onMoveLeft, onMoveRight, onDelete }: IBoardFrameProps) {
  return (
    <BaseBoardFrame>
      <CardHeader 
        subheader={`Frame: ${ frameData.index }`}
      />

      {frameData.imageData && (
        <CardMedia 
          component="img"
          height={defaultImgSize}
          src={frameData.imageData && `data:image/png;base64, ${frameData.imageData}`}
          alt="DALL-E Mini generated storyboard image"
        />
      )}
      {!frameData.imageData && (
        <CardMedia>
          <Skeleton 
            variant="rectangular"
            height={defaultImgSize}
            animation={false}
          />
        </CardMedia>
      )}

      <CardContent>
        <Stack>
          <Typography 
            variant="caption" 
            gutterBottom 
            sx={{ mb: 2 }}
            style={{
              color: frameData.frameDescription ? "inherit" : "rgba(0, 0, 0, 0.44)",
            }}
          >
            { frameData.imagePrompt || "(No Image Prompt)" }
          </Typography>
          <Typography 
            variant="body2" 
            gutterBottom
            style={{
              color: frameData.frameDescription ? "inherit" : "rgba(0, 0, 0, 0.44)",
            }}
          >
            { frameData.frameDescription || "(No Frame Description)" }
          </Typography>
        </Stack>
      </CardContent>

      <CardActions>
        <IconButton onClick={onEdit} color="primary">
          <Tooltip title="Edit frame">
            <ModeEditIcon />
          </Tooltip>
        </IconButton>
        <IconButton disabled={isFirst} onClick={onMoveLeft} color="primary">
          <Tooltip title="Move frame left">
            <ChevronLeftIcon />
          </Tooltip>
        </IconButton>
        <IconButton disabled={isLast} onClick={onMoveRight} color="primary">
          <Tooltip title="Move frame right">
            <ChevronRightIcon />
          </Tooltip>
        </IconButton>
        <IconButton onClick={onDelete} color="error">
          <Tooltip title="Delete frame">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </CardActions>
    </BaseBoardFrame>
  );
}
