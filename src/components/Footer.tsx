import React from 'react';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <hr />
        <Typography variant="overline" gutterBottom>
          Current Page: { "currentTab" }
        </Typography> 
      </div>
    </footer>
  );
}