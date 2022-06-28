import React from 'react';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <>
      <footer style={{margin: "25px auto"}}>
        <Container maxWidth="md">
          <Divider style={{margin: "25px auto"}}/>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            DALL-E Board is an open-source project by <a href="https://github.com/a-poor">Austin Poor</a>.
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            You can find the code and more information <a href="https://github.com/a-poor/dalle-board">here</a>.
          </Typography>
        </Container>
      </footer>
    </>
  );
}
