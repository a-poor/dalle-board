import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { faker } from '@faker-js/faker';

import './App.css';
import { dummyData } from './api';
import { AppPage, IBoardData } from './types';

import NavBar from './components/NavBar';
import { Skeleton, Typography } from '@mui/material';


export function HomePage() {
  return (
    <>
      <Typography variant="h3">
        DALL-E Board
      </Typography>
      <Typography variant="subtitle1">
        Create a storyboard with DALL-E Mini
      </Typography>
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
