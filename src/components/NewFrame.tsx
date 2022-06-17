import React from 'react';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import BaseBoardFrame from './BaseBoardFrame';

export interface INewFrameProps {
  onClick: () => void;
}

export default function NewFrame({ onClick }: INewFrameProps) {
  return (
    <BaseBoardFrame>
      <Box
        style={{
          textAlign: "center",
          margin: "auto",
          padding: "25px",
        }}
      >
        <Button
          style={{
            textAlign: "center",
            margin: "auto",
          }}
        >
          <Stack>
            <AddBoxIcon 
              style={{
                fontSize: "64px",
                margin: "auto",
              }}
            />
            <Typography variant="h4">
              New Frame
            </Typography>
          </Stack>
        </Button>
      </Box>
    </BaseBoardFrame>
  );
}
