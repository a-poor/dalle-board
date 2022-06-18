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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { IFrameData } from '../types';
import EditFrameDesc from './EditFrameDesc';
import EditFrameGen from './EditFrameGen';


interface IEditFrameStartProps {
  data: IFrameData;
  onEditDesc?: () => void;
  onEditImage?: () => void;
}

function EditFrameStart({ data, onEditDesc, onEditImage }: IEditFrameStartProps) {
  return (
    <DialogContent>
      <Typography variant="subtitle1">
        IMAGE
      </Typography>
      <div 
        style={{
            display: "flex",
            marginTop: "5px",
            marginBottom: "10px",
          }}
      >
        <div style={{flexGrow: 1}}/>
        {!data.imageData && (
          <Skeleton variant="rectangular" width={300} height={300} style={{margin: "auto"}}/>
        )}
        {data.imageData && (
          <img 
            src={`data:image/png;base64, ${data.imageData}`}
            alt="Storyboard frame generated by DALL-E"
            width={300} 
            height={300}
            style={{margin: "auto"}}
          />
        )}
        <div style={{flexGrow: 1}}/>
      </div>

      <div style={{padding: "0px 10px 0px"}}>
        <Typography variant="subtitle1" gutterBottom>
          DALL-E PROMPT
        </Typography>
        <Typography variant="body2" gutterBottom>
          {data.imagePrompt ? (
            data.imagePrompt
          ) : (
            <span style={{ color: "#909090" }}>
              No prompt set...
            </span>
          )}
        </Typography>
        <Button 
          onClick={onEditImage} 
          variant="outlined" 
          size="small"
          style={{margin: "3px 0px 5px 0px"}}
        >
          Edit Image/Prompt
        </Button>
        <div style={{height: "20px"}}/>

        <Typography variant="subtitle1" gutterBottom>
          FRAME DESCRIPTION
        </Typography>
        <Typography variant="body2" gutterBottom>
          {data.frameDescription ? (
            data.frameDescription
          ) : (
            <span style={{ color: "#909090" }}>
              No description set...
            </span>
          )}
        </Typography>
        <Button 
          onClick={onEditDesc}
          variant="outlined" 
          size="small"
          style={{margin: "3px 0px 5px 0px"}}
        >
          Edit Description
        </Button>
      </div>

    </DialogContent>
  );
}

interface IEditFrameDescriptionProps {
  desc?: string;
  setDesc: (desc?: string) => void;
  goBack: () => void;
}

function EditFrameDescription({desc, setDesc, goBack}: IEditFrameDescriptionProps) {
  const [newDesc, setNewDesc] = useState(desc);
  return (
    <DialogContent>
      <Typography variant="subtitle1" gutterBottom>
        Frame Description
      </Typography>
      <TextField 
        multiline
        fullWidth
        minRows={4}
        value={newDesc}
        onChange={e => setNewDesc(e.target.value)}
      />
    </DialogContent>
  );
}

interface IEditFrameImageProps {
  prompt?: string;
  setPrompt: (prompt?: string) => void;
  img?: string;
  setImg: (img?: string) => void;
  goBack: () => void;
}

function EditFrameImage({prompt, setPrompt, img, setImg, goBack}: IEditFrameImageProps) {
  return (
    <DialogContent></DialogContent>
  );
}

enum EditFrameMode {
  Start,
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

  // State to determine the mode the edit dialog is in.
  const [mode, setMode] = useState(EditFrameMode.Start);

  // Function to run to save the edits.
  const onSave = () => {
    setMode(EditFrameMode.Start);
    setFrameData && setFrameData(editFrameData);
    onClose && onClose();
  };

  // Function to run to cancel the edits.
  const onCancel = () => {
    setMode(EditFrameMode.Start);
    setFrameData && setFrameData(frameData);
    onClose && onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      // maxWidth="md"
    >
      <div 
        style={{ 
          display: "flex",
          margin: "10px",
          marginBottom: "0px",
        }}
      >
        <div>
          {mode !== EditFrameMode.Start && (
            <IconButton 
              size="small" 
              onClick={() => setMode(EditFrameMode.Start)}
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
          paddingTop: "2px",
        }}
      >
        Frame #{frameIndex + 1}
      </DialogTitle>

      {/*-------------------------------------------*/}

      {/* Mode == Start */}
      {mode === EditFrameMode.Start && (
        <EditFrameStart
          data={frameData}
          onEditDesc={() => setMode(EditFrameMode.Description)}
          onEditImage={() => setMode(EditFrameMode.Generate)}
        />
      )}

      {/* Mode == Description */}
      {mode === EditFrameMode.Description && (
        <EditFrameDescription
          desc={frameData.frameDescription}
          setDesc={(desc) => undefined}
          goBack={() => setMode(EditFrameMode.Start)}
        />
      )}

      {/* Mode == Image */}
      {mode === EditFrameMode.Generate && (
        <EditFrameImage
          prompt={frameData.imagePrompt}
          setPrompt={(prompt) => undefined}
          img={frameData.imageData}
          setImg={(img) => undefined}
          goBack={() => setMode(EditFrameMode.Start)}
        />
      )}

      {/*-------------------------------------------*/}

      {/* Edit the Text Description */}
      {/* {mode === EditFrameMode.Description && (
        <EditFrameDesc
          prompt={editFrameData.imagePrompt}
          desc={editFrameData.frameDescription}
          setDesc={(desc: string) => _setEditFrameData({ 
            ...editFrameData, 
            frameDescription: desc,
          })}
        />
      )} */}

      {/* (Optionally Change Prompt &) Regenerate Images */}
      {/* {mode === EditFrameMode.Generate && (
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
      )} */}

      <DialogActions>
        {/* {mode === EditFrameMode.Description && (
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
        )} */}
        {mode !== EditFrameMode.Start && (
          <Button 
            size="large" 
            onClick={() => {
              setMode(EditFrameMode.Start);
              _setEditFrameData({
                ...editFrameData,
                frameDescription: frameData.frameDescription,
              });
            }}
          >
            {"Save & Go Back"}
          </Button>
        )}
        <Button 
          size="large" 
          onClick={onSave}
        >
          {"Save & Close"}
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