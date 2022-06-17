import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';

import { IBoardData } from './types';
import StoryBoard from './components/StoryBoard';
import ConfirmDelete from './components/ConfirmDelete';

export interface IBoardPageProps {
  data: IBoardData;
  setData?: (d: IBoardData) => void;
}

export default function BoardPage({data, setData}: IBoardPageProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(true);
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Board
      </Typography>

      {/* Quick short sentence or two about how to get started... */}
      <Typography variant="body1" gutterBottom>
        Here{`'`}s a quick sentence or two about what to do and how to get started and stuff like that.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Go ahead and do this or that or something else...
      </Typography>

      {/* Top-level action buttons to clear the whole board or save it to a file. */}
      <Stack 
        direction="row" 
        spacing={2}
        style={{
          margin: "25px auto",
        }}
      >
        <Tooltip title="Save the board as a PDF">
          <Fab variant="extended" color="primary" size="medium">
            <SaveIcon sx={{mr: 1}}/>
            Export Board
          </Fab>
        </Tooltip>
        <Tooltip title="Clear the board and start over">
          <Fab variant="extended" color="primary" size="medium">
            <ClearIcon sx={{mr: 1}}/>
            Clear Board
          </Fab>
        </Tooltip>
      </Stack>

      {/* TODO – Remove this? */}
      <hr />

      {/* The actual storyboard. */}
      <StoryBoard
        data={data}
        setData={setData}
      />

      <ConfirmDelete
        open={confirmDeleteOpen}
        onConfirm={() => setConfirmDeleteOpen(false)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
