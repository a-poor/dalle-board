import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import { IBoardData } from './types';
import StoryBoard from './components/StoryBoard';

export interface IBoardPageProps {
  data: IBoardData;
  setData: (d: IBoardData) => void;
}

export default function BoardPage({data, setData}: IBoardPageProps) {
  // Track state of the "Confirm Delete Frame" dialog
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // The frame to delete when the "Confirm Delete Frame" dialog is confirmed
  const [frameToDelete, setFrameToDelete] = useState(-1);

  // Is the "Confirm Delete Frame" dialog open?
  const [editFrameOpen, setEditFrameOpen] = useState(false);

  // What frame data is being edited?
  const [editFrameData, setEditFrameData] = useState({});

  // What frame number is being edited?
  const [frameBeingEdited, setFrameBeingEdited] = useState<number>(0);


  // Create functions to handle frame events
  const onMoveLeft = (i: number) => {
    // Can't move left if already first frame
    if (i < 1) return;

    // Copy the current data
    const newData: IBoardData = JSON.parse(JSON.stringify(data));

    // Swap the frames
    const temp = newData.frames[i - 1];
    newData.frames[i - 1] = newData.frames[i];
    newData.frames[i] = temp;

    // Update the state
    setData(newData);
  };
  const onMoveRight = (i: number) => {
    // Can't move left if already first frame
    if (i >= data.frames.length - 1) return;

    // Copy the current data
    const newData: IBoardData = JSON.parse(JSON.stringify(data));

    // Swap the frames
    const temp = newData.frames[i + 1];
    newData.frames[i + 1] = newData.frames[i];
    newData.frames[i] = temp;

    // Update the state
    setData(newData);
  };
  const onAddFrame = (i: number) => {
    // Copy the current data
    const newData: IBoardData = JSON.parse(JSON.stringify(data));

    // Add a new frame
    newData.frames.splice(i + 1, 0, {});

    // Update the state
    setData(newData);
  };
  const onEdit = (i: number) => {
    i;
  };
  const onDelete = (i: number) => {
    // Copy the current data
    const newData: IBoardData = JSON.parse(JSON.stringify(data));

    // Add a new frame
    newData.frames.splice(i, 1);

    // Update the state
    setData(newData);
  };

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
      <Divider />

      {/* The actual storyboard. */}
      <StoryBoard
        data={data}
        onEdit={onEdit}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
        onDelete={onDelete}
        onAddFrame={onAddFrame}
      />
    </>
  );
}
