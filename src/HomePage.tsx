import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import BrushIcon from '@mui/icons-material/Brush';

import { AppPage } from './types';


export interface IHomePageProps {
  setCurrentTab: (tab: AppPage) => void;
}

export default function HomePage({ setCurrentTab }: IHomePageProps) {
  return (
    <>
      {/* <Typography variant="h3" gutterBottom>
        Home
      </Typography> */}
      
      <Box style={{
        maxWidth: "950px",
        height: "500px",
        backgroundColor: "#f0f0f0",
        margin: "25px auto",
      }}/>

      <Container>
        <Typography gutterBottom variant="body1">
          Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
        </Typography>
        <Typography gutterBottom variant="body1">
          Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
        </Typography>
        <Typography gutterBottom variant="body1">
          Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
        </Typography>

        <div style={{height: "15px"}}/>

        <Tooltip title="Create a new board">
          <Fab 
            variant="extended" 
            color="primary"
            size="medium"
            onClick={() => setCurrentTab(AppPage.BOARD)}
            style={{
              margin: "5px 0 25px 0",
            }}
          >
            <BrushIcon sx={{mr: 1}}/>
            Get Started
          </Fab>
        </Tooltip>
      </Container>
    </>
  );
}
