import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export interface IEmptyBoardProps {
  onAddFrame: () => void;
}

/**
 * EmptyBoard represents the display of an empty board with
 * no cards (aka storyboard frames).
 */
export default function EmptyBoard({onAddFrame}: IEmptyBoardProps) {
  return (
    <>
      <Container 
        maxWidth="md" 
        style={{
          textAlign: "center", 
          color: "rgba(0,0,0,0.54)",
          marginTop: "100px",
          marginBottom: "150px",
        }}
      >
        <HistoryEduIcon style={{ fontSize: "76px" }}/>
        <Typography variant="h4" gutterBottom>
          Your Storyboard is Empty
        </Typography>
        <Button 
          disableElevation 
          variant="outlined" 
          color="inherit" 
          onClick={onAddFrame}
        >
          Add a Frame
        </Button>
      </Container>
    </>
  );
}
