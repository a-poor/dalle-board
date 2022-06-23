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
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';


interface IFrameData {
  id: string;
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
                      // TODO – Change this...
                      const data2 = JSON.parse(JSON.stringify(data)) as IFrameData[];
                      data2.push({
                        id: `id-${data2.length}`,
                      });
                      setData(data2);
                    }}
                    onExportBoard={() => console.log("Exporting...")}
                    onClearBoard={() => setData([] as IFrameData[])}
                  />
                } 
              />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Container>
        </div>
      </DndContext>
    </>
  );
}
