import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import Container from '@mui/material/Container';
import StartIcon from '@mui/icons-material/Start';
import BrushIcon from '@mui/icons-material/Brush';
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Home
      </Typography>
      
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
      </Container>

      <div style={{height: "15px"}}/>

      <Fab 
        variant="extended" 
        color="primary"
        onClick={() => navigate("/board")}
        style={{
          margin: "15px 0",
        }}
      >
        <BrushIcon sx={{mr: 1}}/>
        Get Started
      </Fab>
    </>
  );
}
