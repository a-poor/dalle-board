import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AboutPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        About DALL-E Board
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
    </>
  );
}
