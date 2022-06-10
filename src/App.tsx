import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { dummyData } from './api';
import Image from  './components/Image';
import NavBar from './components/NavBar';
import StoryBoard from './components/StoryBoard';
import { IBoardData } from './types';

export default function App() {
  const [boardData, setBoardData] = useState<IBoardData>({
    frames: [],
  });
  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="xl">
        <div style={{height: "15px"}}/>
        <Typography variant="h3" gutterBottom>
          Make a Board
        </Typography>
        <div>
          {dummyData.images.map(img => (
            <Image 
              b64img={img}
              style={{
                display: "block",
              }}
            />
          ))}
        </div>
        <hr />
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <Typography variant="overline" gutterBottom>
            Hello, World!
          </Typography>
          <StoryBoard
            data={boardData}
            setData={setBoardData}
          />
        </div>
      </Container>
    </div>
  );
}
