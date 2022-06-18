import React from 'react';
import Grid from '@mui/material/Grid';

import { IBoardData, IFrameData } from '../types';
import BoardFrame from './BoardFrame';


export interface IStoryBoardProps {
  data: IBoardData;

  onAddFrame: (i: number) => void;
  onMoveLeft: (i: number) => void;
  onMoveRight: (i: number) => void;
  onDelete: (i: number) => void;
  onEdit: (i: number, f: IFrameData) => void;
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
              onEdit={(f: IFrameData) => onEdit(i, f)}
              onMoveLeft={() => onMoveLeft(i)}
              onMoveRight={() => onMoveRight(i)}
              onDelete={() => onDelete(i)}
              onAddFrame={() => onAddFrame(i)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
