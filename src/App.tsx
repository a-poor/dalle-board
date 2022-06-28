import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';

import { Routes, Route, useNavigate } from "react-router-dom";
import { faker } from '@faker-js/faker';

import { 
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { v4 as uuidv4 } from 'uuid';

import './App.css';
import { dummyData } from './api';
import { AppPage, IBoardData } from './types';

import NavBar from './components/NavBar';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import EditFramePage from './EditFramePage';
import Footer from './components/Footer';


const newFrameId = () => uuidv4().split("-")[0];


interface IFrameData {
  id: string;
  frameNumber: number;
}

function RedirectHomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, []);
  return (<></>);
}

export default function App() {
  // TODO – Replace the following with a real data source.
  const _data = new Array(10)
    .fill(null)
    .map((_, i) => ({
      id: newFrameId(),
      frameNumber: i,
    }));
  const [data, setData] = useState(_data as IFrameData[]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // const [editFrameIndex, setEditFrameIndex] = useState<number | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const navigate = useNavigate();

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
            const newData = JSON.parse(JSON.stringify(data)) as IFrameData[];
            
            newData.splice(i, 1);
            
            return setData(newData.map((d, i) => ({...d, frameNumber: i})));
          }

          // If new location, move the item
          if (active.id === over.id) { return; }

          const i = data.findIndex(d => d.id === active.id);
          const j = data.findIndex(d => d.id === over.id);

          setData(arrayMove(data, i, j).map((d, i) => ({...d, frameNumber: i})));
        }}
        onDragStart={({active}) => setActiveId(active.id.toString())}
      >
        <div style={{minWidth: "350px"}}>
          <NavBar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={
                  <HomePage 
                    data={data}
                    activeId={activeId}
                    onAddFrame={() => {
                      setData([
                        ...JSON.parse(JSON.stringify(data)),
                        {
                          id: newFrameId(),
                          frameNumber: data.length,
                        },
                      ]as IFrameData[]);
                    }}
                    onExportBoard={() => console.log("Exporting...")} // TODO – Change me...
                    onClearBoard={() => setData([] as IFrameData[])}
                  />
              }/>
              <Route path="/edit/:frameId" element={
                <EditFramePage 
                  getFrameData={(id: string) => data.find(d => d.id === id)}
                  onGoBack={() => navigate("/")}
                />
              }/>
              <Route path="/about" element={<AboutPage />}/>
              <Route path="*" element={<RedirectHomePage />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </DndContext>
    </>
  );
}
