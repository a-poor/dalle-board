import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { dummyData } from './api';
import { AppPage, IBoardData } from './types';
import Image from  './components/Image';
import NavBar from './components/NavBar';
import StoryBoard from './components/StoryBoard';
import HomePage from './HomePage'
import BoardPage from './BoardPage'
import AboutPage from './AboutPage'

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppPage>(AppPage.HOME);
  const [boardData, setBoardData] = useState<IBoardData>({
    frames: [],
  });
  return (
    <div className="App">
      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <Container maxWidth="xl">
        <div style={{height: "15px"}}/>
        <Typography variant="h3" gutterBottom>
          Make a Board
        </Typography>
        <div>
          {dummyData.images.map((img, i) => (
            <Image 
              key={i}
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
            Current Page: { currentTab }
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
