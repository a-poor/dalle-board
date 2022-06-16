import React from 'react';
import Grid from '@mui/material/Grid';

import { IBoardData } from '../types';


export interface IStoryBoardProps {
  data: IBoardData;
  setData?: (d: IBoardData) => void;
}

export default function StoryBoard({data, setData}: IStoryBoardProps) {
  return (
    <Grid container spacing={3}>
      {data.frames.map((frame, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>

        </Grid>  
      ))}
    </Grid>
  );
}
