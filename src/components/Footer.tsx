import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <footer>
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <Divider />
        <Typography variant="overline" gutterBottom>
          Current Page: { "currentTab" }
        </Typography> 
      </div>
    </footer>
  );
}