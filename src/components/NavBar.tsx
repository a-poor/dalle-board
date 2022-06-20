import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const loc = useLocation();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              DALL-E Board
            </Link>
          </Typography>
          <Button color="inherit" variant="text">
            {loc.pathname === "/" && (
              <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>
                About
              </Link>
            )}
            {loc.pathname === "/about" && (
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Go Back
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "15px" }} />
    </>
  );
}