import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { IFrameData } from '../types';
import EditFrameDesc from './EditFrameDesc';
import EditFrameGen from './EditFrameGen';


enum EditFrameMode {
  Description,
  Generate,
}

export interface IEditFrameProps {
  /** Is the EditFrame dialog open? */
  open: boolean;

  /** Callback to run when closing the dialog. */
  onClose: () => void;

  /** Index of the frame being edited. */
  frameIndex: number;

  /** Initial frame data to edit. */
  frameData: IFrameData;

  /** Callback to run in order to save the frame updates. */
  setFrameData: (frameData: IFrameData) => void;
}

export default function EditFrame({ open, onClose, frameIndex, frameData, setFrameData }: IEditFrameProps) {
  // Store the state of the frame while editing.
  const [editFrameData, _setEditFrameData] = useState(frameData);


  // Function to run to save the edits.
  const onSave = () => {
    setFrameData && setFrameData(editFrameData);
    onClose && onClose();
  };

  // Function to run to cancel the edits.
  const onCancel = () => {
    setFrameData && setFrameData(frameData);
    onClose && onClose();
  };

  // State to determine the mode the edit dialog is in.
  const [mode, setMode] = useState(EditFrameMode.Description);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="md"
    >
      <div 
        style={{ 
          display: "flex",
          margin: "10px",
          marginBottom: "0px",
        }}
      >
        <div>
          {mode === EditFrameMode.Generate && (
            <IconButton 
              size="small" 
              onClick={() => setMode(EditFrameMode.Description)}
            >
              <Tooltip title="Go Back">
                <ChevronLeftIcon/>
              </Tooltip>
            </IconButton>
          )}
        </div>
        <div style={{ flexGrow: 1 }}/>
        <div>
          <IconButton size="small" onClick={onCancel}>
            <Tooltip title="Close">
              <CloseIcon/>
            </Tooltip>
          </IconButton>
        </div>
      </div>
      <DialogTitle
        style={{
          paddingTop: "3px",
        }}
      >
        {mode === EditFrameMode.Description && (
          `Editing Frame ${frameIndex + 1}'s Description`
        )}
        {mode === EditFrameMode.Generate && (
          `Generating Image for Frame ${frameIndex + 1}`
        )}
      </DialogTitle>

      {/* Edit the Text Description */}
      {mode === EditFrameMode.Description && (
        <EditFrameDesc
          prompt={editFrameData.imagePrompt}
          desc={editFrameData.frameDescription}
          setDesc={(desc: string) => _setEditFrameData({ 
            ...editFrameData, 
            frameDescription: desc,
          })}
        />
      )}

      {/* (Optionally Change Prompt &) Regenerate Images */}
      {mode === EditFrameMode.Generate && (
        <EditFrameGen 
          prompt={editFrameData.imagePrompt}
          desc={editFrameData.frameDescription}
          setPrompt={(p: string) => _setEditFrameData({ 
            ...editFrameData, 
            imagePrompt: p,
          })}
          setImg={(img: string) => _setEditFrameData({ 
            ...editFrameData, 
            imageData: img,
          })}
        />
      )}

      <DialogActions>
        {mode === EditFrameMode.Description && (
          <Button 
            size="large" 
            onClick={() => setMode(EditFrameMode.Generate)}
          >
            Edit Frame
          </Button>
        )}
        {mode === EditFrameMode.Generate && (
          <Button 
            size="large" 
            onClick={() => setMode(EditFrameMode.Description)}
          >
            Edit Description
          </Button>
        )}
        <Button 
          size="large" 
          onClick={onSave}
        >
          Save
        </Button>
        <Button 
          size="large"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}