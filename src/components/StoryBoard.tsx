import React from 'react';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { IBoardData } from '../types';
import BaseBoardFrame from './BaseBoardFrame';
import BoardFrame from './BoardFrame';
import NewFrame from './NewFrame';


export interface IStoryBoardProps {
  data: IBoardData;
  setData?: (d: IBoardData) => void;
}

export default function StoryBoard({data, setData}: IStoryBoardProps) {
  return (
    <Grid 
      container 
      spacing={4}
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
          key={i}
        >
          <BoardFrame 
            frameData={frame}
            isFirst={i === 0}
            isLast={i === data.frames.length - 1}
            onEdit={undefined}
            onMoveLeft={undefined}
            onMoveRight={undefined}
            onDelete={undefined}
          />
        </Grid>
      ))}
      <Grid 
          item 
          xs={12} 
          sm={6}
          md={4}
        >
          <NewFrame onClick={() => undefined} />
      </Grid>
    </Grid>
  );
}
