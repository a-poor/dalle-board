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
import useMediaQuery from '@mui/material/useMediaQuery';
import Grow from '@mui/material/Grow';

import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { 
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './App.css';
import { dummyData } from './api';
import { AppPage, IBoardData } from './types';

import NavBar from './components/NavBar';

const cardSize = {
  width: "300px",
  height: "500px",
}


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

export function GridItem({id}: {id: string}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <>
      <Grid
        item
        ref={setNodeRef}
        md={4}
        sm={6}
        xs={12}
        style={{
          width: cardSize.width,
          height: cardSize.height,
          ...style
        }}
        {...attributes}
        {...listeners}
      >
        <div style={{ 
          width: "100%", 
          height: "100%", 
          backgroundColor: isDragging ? "transparent" : "#f0f00f"
        }}>
          {!isDragging && <span>
            My name is... {id}
          </span>}
        </div>
      </Grid>
    </>
  );
}

/**
 * TrashDrop is a droppable location for deleting draggable frames.
 * If a user picks up a frame, this square will appear in the lower
 * right of the screen.
 */
export function TrashDrop() {
  const { 
    active,
    isOver,
    setNodeRef,
  } = useDroppable({
    id: "trash-drop",
  });
  return (
    <>
      <Grow in={active !== null}>
        <div 
          ref={setNodeRef}
          style={{
            width: isOver ? "200px" : "150px",
            height: isOver ? "200px" : "150px",
            border: isOver ? "3.5px dashed rgba(235,64,52,0.8)" : "2.5px dashed rgba(235,64,52,0.8)",
            backgroundColor: "rgba(235,64,52,0.3)",
            borderRadius: "15px",
            position: "fixed",
            right: 10,
            bottom: 10,
            color: "rgba(235,64,52,0.8)",
          }}
        >
          <div style={{ 
            margin: "auto", 
            marginTop: isOver ? "50px" : "40px",
            textAlign: "center"
          }}>
            <DeleteOutlineOutlinedIcon style={{
              fontSize: isOver ? "44px" : "24px"
            }}/>
            <Typography style={{
              fontWeight: "bold", 
              fontSize: isOver ? "22px" : "15px"
            }}>
              DELETE FRAME
            </Typography>
          </div>
        </div>
      </Grow>
    </>
  );
}

export function Board({data, setData, activeId}: {
    data: {id: string}[], 
    setData: (data: {id: string}[]) => void,
    activeId: string | null,
}) {
  return (
    <>
    <SortableContext 
        items={data}
        strategy={rectSortingStrategy}
      >
        <Grid container spacing={2}>
          {data.map(d => (
            <GridItem
              key={d.id}
              id={d.id}
            />
          ))}
        </Grid>

        <TrashDrop />

      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div style={{ 
            width: cardSize.width,
            height: cardSize.height,
            backgroundColor: "#f00ff0"
          }}>
            My name is... {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </>
  );
}

export function HomePage({data, setData, activeId}: {
    data: {id: string}[], 
    setData: (data: {id: string}[]) => void,
    activeId: string | null,
}) {
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
        <ButtonGroup size={buttonQuery ? "large" : "small"} disableElevation>
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

      <Board 
        data={data}
        setData={setData}
        activeId={activeId}
      />
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
  // TODO – Replace the following with a real data source.
  const _data = new Array(10).fill(0).map((_, i) => ({
    id: `id-${i}`,
  }))
  const [data, setData] = useState(_data);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({active, over}) => {
          setActiveId(null);
          // If null, do nothing
          if (over === null) { return; }

          // If trash, delete
          if (over.id === "trash-drop") {
            console.log(`Deleting id: ${active.id}`);
            const i = data.findIndex(d => d.id === active.id);
            const newData = JSON.parse(JSON.stringify(data)) as ({id: string}[]);
            newData.splice(i, 1)
            return setData(newData);
          }

          // If new location, move the item
          if (active.id !== over.id) {
            setData((items) => {
              const oldIndex = items.findIndex(d => d.id === active.id);
              const newIndex = items.findIndex(d => d.id === over.id);
              return arrayMove(items, oldIndex, newIndex);
            });
          }
        }}
        onDragStart={({active}) => setActiveId(`${active.id}`)}
      >
        <NavBar />
        <Container maxWidth="lg">
          <Routes>
            <Route 
              path="/"
              element={
                <HomePage 
                  data={data}
                  setData={setData}
                  activeId={activeId}
                />
              } 
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
      </DndContext>
    </>
  );
}
