import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface IConfirmDeleteProps {
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmDelete({open, onConfirm, onCancel}: IConfirmDeleteProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this frame? You will lose the image that was generated.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onConfirm}
          variant="contained"
          color="error"
        >
          Delete It!
        </Button>
        <Button 
          onClick={onCancel} 
          variant="contained"
          color="info"
        >
          {`Wait! Don't delete it!`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
