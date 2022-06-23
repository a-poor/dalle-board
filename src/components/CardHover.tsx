import React from 'react';
import Paper from '@mui/material/Paper';


/**
 * CardHover represents the styling of a card hovering over other
 * cards, when being dragged (via the dndkit library).
 */
export default function CardHover() {
  return (
    <>
      <Paper 
        elevation={5}
        style={{
          width: "200px",
          height: "250px",
        }}
      />
    </>
  );
}
