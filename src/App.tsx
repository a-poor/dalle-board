import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearIcon from '@mui/icons-material/Clear';

import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

import './App.css';
import { dummyData } from './api';
import { AppPage, IBoardData } from './types';

import NavBar from './components/NavBar';


interface IImageFrameProps {
  index: number;
}

export function ImageFrame({index}: IImageFrameProps) {
  return (
    <>
      <Paper 
        elevation={2}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{margin: "20px"}}>
          <div style={{height: "15px"}} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <Typography variant="subtitle1"><i>Frame: {index}</i></Typography>
            </div>
            <div style={{flexGrow: 1}}/>
            <div>
              <IconButton>
                <Tooltip title="Delete frame">
                  <ClearIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}

export function EmptyBoard() {
  return (
    <></>
  );
}

export function Board() {
  const boards = new Array(10).fill(0);
  
  // Put inside cards
  /* <ImageFrame index={i} /> */

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  })

  return (
    <>
      <DragDropContext onDragEnd={(res, prov) => undefined}>
        <Grid container spacing={2}>
          <Droppable droppableId='myDroppableId'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {boards.map((_, i) => (
                  <Grid 
                    item 
                    // lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    style={{
                      width: "300px",
                      height: "500px",
                    }}
                    key={i}
                  >
                    <div style={{ 
                      width: "100%", 
                      height: "100%", 
                      backgroundColor: "#f0f00f"
                    }}/>
                  </Grid>
                ))}
              </div>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
    </>
  );
}

export function HomePage() {
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
        <ButtonGroup>
          <Tooltip title="Add a new frame to the storyboard.">
            <Button startIcon={<AddIcon />}>
              Add Frame
            </Button>
          </Tooltip>
          <Tooltip title="Download the storyboard as a PDF.">
            <Button startIcon={<FileDownloadIcon />}>
              Export Board
            </Button>
          </Tooltip>
          <Tooltip title="Clear the storyboard and start-over.">
            <Button startIcon={<ClearIcon />}>
              Clear Board
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <Board />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        About DALL-E Board
      </Typography>
      <Skeleton 
        variant="rectangular" 
        style={{
          margin: "auto",
          width: "850px",
          height: "450px",
        }}
      />
      <Typography variant="caption" gutterBottom>
        {'This is an image caption describing the above image. Not sure what it is yet...'}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {"This is the text of the about page and it has the about page info and I'm not sure what THAT will"}
        {"be yet but this is where it will be when I figure it out."}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {"In the meantime, though, this is some placeholder text and it is taking up space so that I"}
        {"can see what the about page will look like."}
      </Typography>
      <Typography variant="body1" gutterBottom>
        That is all for now.
      </Typography>
    </>
  );
}

export default function App() {
  return (
    <>
        <NavBar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
    </>
  );
}
