import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { dummyData } from './api';
import { AppPage, IBoardData } from './types';
import Image from  './components/Image';
import NavBar from './components/NavBar';
import StoryBoard from './components/StoryBoard';
import HomePage from './HomePage'
import BoardPage from './BoardPage'
import AboutPage from './AboutPage'
import Footer from './components/Footer'

export default function App() {
  // Create a state manager to sync the react-router
  // location with the NavBar's current tab.
  const navigate = useNavigate();
  const [currentTab, _setCurrentTab] = useState<AppPage>(AppPage.HOME);
  const setCurrentTab = (tab: AppPage) => {
    // Set the tab w/ react
    _setCurrentTab(tab);

    // Navigate to the page
    switch (tab) {
      case AppPage.BOARD:
        navigate("/board");
        break;
      case AppPage.ABOUT:
        navigate("/about");
        break;
      default:
        navigate("/");
        break;
    }
  };

  // Run the following once to ensure the NavBar's tab is
  // set correctly when the page is loaded initially.
  const loc = useLocation();
  useEffect(() => {
    switch (loc.pathname.toLowerCase()) {
      case "/board": 
        setCurrentTab(AppPage.BOARD);
        return;
      case "/about":
        setCurrentTab(AppPage.ABOUT);
        return;
      default:
        setCurrentTab(AppPage.HOME);
        return;
    }
  }, []);


  // Store the user's board data
  const [boardData, setBoardData] = useState<IBoardData>({
    frames: [],
  });
  useEffect(() => {
    setBoardData({
      frames: dummyData.images.map((img, i) => ({
        index: i+1,
        imageData: i % 2 === 0 ? img : undefined,
      }))
    });
  }, []);

  return (
    <div className="App">
      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <Container maxWidth="xl">
        <div style={{height: "15px"}}/>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                setCurrentTab={setCurrentTab} 
              />
            }
          />
          <Route 
            path="/board" 
            element={
              <BoardPage 
                data={boardData} 
                setData={setBoardData}
              />
            }
          />
          <Route 
            path="/about" 
            element={
              <AboutPage />
            }
          />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}
