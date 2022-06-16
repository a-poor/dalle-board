import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import GestureIcon from '@mui/icons-material/Gesture';
import { useNavigate } from "react-router-dom";

import { AppPage } from '../types';


export interface INavBarProps {
  currentTab: AppPage;
  setCurrentTab: (tab: AppPage) => void;
}

export default function NavBar({ currentTab, setCurrentTab }: INavBarProps) {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            sx={{
              display: {
                md: "none",
                xs: "flex",
              }
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              fontFamily: 'roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              mr: 2,
            }}
          >
            <GestureIcon
              fontSize="large"
              sx={{
                mr: 1,
                mt: 0.5,
                mb: -0.5
              }}
            />
            <span>DALL-E Board</span>
          </Typography>
          <Box
            className="tabs"
            sx={{
              mt: 0.75,
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <ButtonGroup>
              <Button 
                variant="contained" 
                disableElevation 
                size="large" 
                onClick={() => {
                  setCurrentTab(AppPage.HOME)
                  navigate("/")
                }}
                disabled={currentTab == AppPage.HOME}
                style={{
                  color: currentTab == AppPage.HOME ? "#fff" : "inherit",
                }}
              >
                Home
              </Button>
              <Button 
                variant="contained" 
                disableElevation 
                size="large" 
                onClick={() => {
                  setCurrentTab(AppPage.BOARD)
                  navigate("/board")
                }}
                disabled={currentTab == AppPage.BOARD}
                style={{
                  color: currentTab == AppPage.BOARD ? "#fff" : "inherit",
                }}
              >
                Board
              </Button>
              <Button 
                variant="contained" 
                disableElevation 
                size="large" 
                onClick={() => {
                  setCurrentTab(AppPage.ABOUT)
                  navigate("/about")
                }}
                disabled={currentTab == AppPage.ABOUT}
                style={{
                  color: currentTab == AppPage.ABOUT ? "#fff" : "inherit",
                }}
              >
                About
              </Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: "65px" }} />
    </>
  );
}
