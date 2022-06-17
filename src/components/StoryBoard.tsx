import React from 'react';
import Grid from '@mui/material/Grid';

import { IBoardData } from '../types';
import BoardFrame from './BoardFrame';


export interface IStoryBoardProps {
  data: IBoardData;

  onEdit?: (index: number) => void;
  onMoveLeft?: (index: number) => void;
  onMoveRight?: (index: number) => void;
  onDelete?: (index: number) => void;
  onAddFrame?: (index: number) => void;
}

export default function StoryBoard({data, onEdit, onMoveLeft, onMoveRight, onDelete, onAddFrame}: IStoryBoardProps) {
  return (
    <div
      style={{
        margin: "25px auto",
      }}
    >
      <Grid 
        container 
        spacing={2}
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        {data.frames.map((frame, i) => (
          <Grid 
            item 
            xs={12} 
            sm={6}
            md={4}
            lg={3}
            key={i}
          >
            <BoardFrame 
              index={i}
              frameData={frame}
              isFirst={i === 0}
              isLast={i === data.frames.length - 1}
              onEdit={onEdit && (() => onEdit(i))}
              onMoveLeft={onMoveLeft && (() => onMoveLeft(i))}
              onMoveRight={onMoveRight && (() => onMoveRight(i))}
              onDelete={onDelete && (() => onDelete(i))}
              onAddFrame={onAddFrame && (() => onAddFrame(i))}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
