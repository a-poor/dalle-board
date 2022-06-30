import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';


interface IFrameData {
  id: string;
  frameNumber: number;
  frameImage?: string;
  framePrompt?: string;
  frameDesc?: string;
}

export interface IEditFramePageProps {
  getFrameData: (id: string) => IFrameData | undefined;
  onGoBack: () => void;
  onSaveFrame?: (id: string) => void;
  onFrameDoesntExist?: () => void; // TODO – Pop up a notification of the error
}

export default function EditFramePage({getFrameData, onSaveFrame, onGoBack, onFrameDoesntExist}: IEditFramePageProps) {
  // Used for returning to the home page
  const navigate = useNavigate();

  // Get the frame id from the URL
  const { frameId } = useParams();

  // Confirm that the frameId is not nil
  if (frameId === undefined) {
    console.error("No frameId provided. Returning to home page.");
    useEffect(() => navigate("/"), [frameId]);
  }

  // Get the frame data (and confirm that it exists)
  const frameData = getFrameData(frameId as string);
  if (!frameData) {
    // If this function is provided, call it
    onFrameDoesntExist && onFrameDoesntExist();
    
    // Log the error and go back to the home page
    console.error("Invalid frameId provided. Returning to home page.");
    useEffect(() => navigate("/"), [frameId]);
  }

  return (
    <>
      <Container maxWidth="md">
        <Button variant="text" startIcon={<ChevronLeftIcon />} onClick={onGoBack}>
          Go Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Editing Frame #{frameData?.frameNumber !== undefined && frameData?.frameNumber + 1}
        </Typography>
        
        {/* Image */}
        <div 
          style={{
            width: "300px",
            height: "300px",
            margin: "auto",
            marginBottom: "15px",
          }}
        >
          <Skeleton variant="rectangular" style={{width: "100%", height: "100%"}}/>
        </div>

        {/* DALL-E Prompt */}
        <Typography variant="subtitle2" gutterBottom>
          <span>
            DALL-E Image Prompt:
          </span>
          <Tooltip title="Edit/Regenerate Image">
            <IconButton size="small" style={{marginLeft: "5px"}}>
              <EditIcon color="primary"/>
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography gutterBottom>
          Prompt goes here...
        </Typography>

        {/* Frame Description */}
        <Typography variant="subtitle2" gutterBottom>
          <span>
            Frame Description:
          </span>
          <Tooltip title="Edit Frame Description">
            <IconButton size="small" style={{marginLeft: "5px"}}>
              <EditIcon color="primary"/>
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography gutterBottom>
          Frame Description goes here...
        </Typography>

        <br/>

        <ButtonGroup>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>

      </Container>
    </>
  );
}
