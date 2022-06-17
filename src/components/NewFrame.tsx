import React from 'react';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import BaseBoardFrame from './BaseBoardFrame';

export interface INewFrameProps {
  onClick?: () => void;
}

export default function NewFrame({ onClick }: INewFrameProps) {
  return (
    <BaseBoardFrame>
      <Box
        style={{
          textAlign: "center",
          margin: "75px auto 0px auto",
          width: "100%",
          aspectRatio: "3/2",
        }}
      >
        <Button onClick={onClick}>
          <Tooltip title="Create a new storyboard frame">
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
          </Tooltip>
        </Button>
      </Box>
    </BaseBoardFrame>
  );
}
