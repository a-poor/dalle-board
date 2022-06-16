import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import StartIcon from '@mui/icons-material/Start';


export default function HomePage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Home
      </Typography>
      
      <Box style={{
        width: "950px",
        height: "500px",
        backgroundColor: "#f0f0f0",
        margin: "25px 0",
      }}/>

      <Typography gutterBottom variant="body1">
        Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
      </Typography>
      <Typography gutterBottom variant="body1">
        Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
      </Typography>
      <Typography gutterBottom variant="body1">
        Here is the basic starting text about how this is what this is about and also what you can do here etc etc etc...
      </Typography>

      <Fab variant="extended" color="primary">
        <StartIcon sx={{mr: 1}}/>
        Get Started
      </Fab>
    </>
  );
}
