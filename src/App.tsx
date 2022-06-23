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
      id: uuidv4(),
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
            
            return setData(newData);
          }

          // If new location, move the item
          if (active.id === over.id) { return; }

          const i = data.findIndex(d => d.id === active.id);
          const j = data.findIndex(d => d.id === over.id);

          setData(arrayMove(data, i, j));
        }}
        onDragStart={({active}) => setActiveId(active.id.toString())}
      >
        <div style={{minWidth: "350px"}}>
          <NavBar />
          <Container maxWidth="lg">
            <Routes>
              <Route 
                path="/"
                element={
                  <HomePage 
                    data={data}
                    activeId={activeId}
                    onAddFrame={() => {
                      setData([
                        ...JSON.parse(JSON.stringify(data)),
                        {
                          id: uuidv4(),
                          frameNumber: data.length,
                        },
                      ]as IFrameData[]);
                    }}
                    onExportBoard={() => console.log("Exporting...")}
                    onClearBoard={() => setData([] as IFrameData[])}
                  />
                } 
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/edit/:frameId" element={<EditFramePage />} />
              <Route path="*" element={<RedirectHomePage />} />
            </Routes>
          </Container>
        </div>
      </DndContext>
    </>
  );
}
