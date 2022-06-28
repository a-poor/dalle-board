import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


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
        <Typography variant="h4">
          Editing Frame #{frameData?.frameNumber !== undefined && frameData?.frameNumber + 1}
        </Typography>
        
        {/* Image */}
        <div></div>
        <Typography></Typography>

      </Container>
    </>
  );
}
