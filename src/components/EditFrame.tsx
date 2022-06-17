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

export interface IEditFrameProps {
  open: boolean;
  onSave?: () => void;
  onCancel?: () => void;

  frameIndex: number;
  frameData: IFrameData;
  setFrameData?: (frameData: IFrameData) => void;
}

export default function EditFrame({ open, onSave, onCancel, frameIndex, frameData, setFrameData }: IEditFrameProps) {
  const [desc, setDesc] = useState(frameData.frameDescription);
  const _onCancel = () => {
    setDesc(frameData.frameDescription);
    onCancel && onCancel();
  }

  const [genPanelOpen, setGenPanelOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={_onCancel}
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
          {/* <IconButton size="small">
            <Tooltip title="Go Back">
              <ChevronLeftIcon/>
            </Tooltip>
          </IconButton> */}
        </div>
        <div style={{ flexGrow: 1 }}/>
        <div>
          <IconButton size="small" onClick={_onCancel}>
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
        Editing Frame {frameIndex + 1}
      </DialogTitle>
      <DialogContent>
        <div 
          style={{
            height: "350px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            style={{
              flexGrow: 1,
              minWidth: "400px",
            }}
          >
            <div style={{
              margin: "auto",
              marginBottom: "15px",
            }}>
              <Skeleton 
                variant="rectangular" 
                height={300}
                width={300}
                style={{
                  margin: "auto",
                  marginBottom: "10px",
                }}
              />
              <Typography 
                gutterBottom
                variant="caption"  
                style={{
                  textAlign: "center",
                  color: frameData.frameDescription ? "inherit" : "rgba(0, 0, 0, 0.44)",
                  marginBottom: "15px",
                }}
              >
                { frameData.imagePrompt || "(No Image Prompt)" }
              </Typography>
            </div>
          </Box>
          <Box
            style={{
              flexGrow: 1,
              minWidth: "400px",
            }}
          >
            <TextField 
              multiline
              fullWidth
              label="Frame Description"
              placeholder="Describe the frame..."
              variant="filled"
              rows={12}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button size="large">
          Save
        </Button>
        <Button size="large" onClick={_onCancel}>
          Edit Frame
        </Button>
        <Button size="large" onClick={_onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}