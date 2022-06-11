import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import GestureIcon from '@mui/icons-material/Gesture';
import Stack from '@mui/material/Stack';

import { AppPage } from '../types';


export interface INavBarProps {
  currentTab: AppPage;
  setCurrentTab: (tab: AppPage) => void;
}

export default function NavBar({currentTab, setCurrentTab}: INavBarProps) {
  return (
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
          <Stack direction="row" spacing={1}>
            <Button 
              color="inherit" 
              size="large"
              disabled={currentTab === AppPage.HOME}
              onClick={() => setCurrentTab(AppPage.HOME)}
            >
              <Typography>
                Home
              </Typography>
            </Button>
            <Button 
              color="inherit" 
              size="large"
              disabled={currentTab === AppPage.BOARD}
              onClick={() => setCurrentTab(AppPage.BOARD)}
            >
              <Typography>
                Board
              </Typography>
            </Button>
            <Button 
              color="inherit" 
              size="large"
              disabled={currentTab === AppPage.ABOUT}
              onClick={() => setCurrentTab(AppPage.ABOUT)}
            >
              <Typography>
                About
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};