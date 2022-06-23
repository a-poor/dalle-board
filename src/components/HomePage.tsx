import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearIcon from '@mui/icons-material/Clear';

import Board from './Board';

export interface IFrameData {
  id: string;
}

export interface IHomePageProps {
  data: IFrameData[];
  activeId: string | null;
  onAddFrame: () => void;
  onExportBoard: () => void;
  onClearBoard: () => void;
}

export default function HomePage({data, activeId, onAddFrame, onExportBoard, onClearBoard}: IHomePageProps) {
  // Media query to determine if the screen is small or not.
  // Used to determine the button group layout.
  const buttonQuery = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Typography variant="h3">
        DALL-E Board
      </Typography>
      <Typography variant="subtitle1">
        Create a storyboard with DALL-E Mini
      </Typography>

      <div 
        style={{
          marginTop: "5px", 
          marginBottom: "15px"
        }}
      >
        {buttonQuery && (
          <ButtonGroup 
            size="small"
            disableElevation
            style={{margin: "auto"}}
          >
            <Tooltip title="Add a new frame to the storyboard.">
              <Button
                startIcon={<AddIcon />} 
                onClick={onAddFrame}
              >
                Add Frame
              </Button>
            </Tooltip>
            <Tooltip title="Download the storyboard as a PDF.">
              <Button
                startIcon={<FileDownloadIcon />} 
                onClick={onExportBoard}
              >
                Export Board
              </Button>
            </Tooltip>
            <Tooltip title="Clear the storyboard and start-over.">
              <Button
                startIcon={<ClearIcon />} 
                onClick={onClearBoard}
              >
                Clear Board
              </Button>
            </Tooltip>
          </ButtonGroup>
        )}

        {!buttonQuery && (
          <Stack direction="row" style={{margin: "auto"}}>
            <Tooltip title="Add a new frame to the storyboard.">
              <IconButton onClick={onAddFrame}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download the storyboard as a PDF.">
              <IconButton onClick={onExportBoard}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear the storyboard and start-over.">
              <IconButton onClick={onClearBoard}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </div>

      <Divider style={{ margin: "15px auto" }}/>

      <Board 
        data={data}
        activeId={activeId}
        onAddFrame={onAddFrame}
      />
    </>
  );
}
