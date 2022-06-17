import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>
        Editing Frame {frameIndex}
      </DialogTitle>
    </Dialog>
  );
}