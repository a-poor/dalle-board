import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import GestureIcon from '@mui/icons-material/Gesture';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="a"
              href=""
              sx={{
                fontFamily: 'roboto',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
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
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};