import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

export const NavbarComponent = () => {

  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" style={{flexGrow: 1}}>
          UEFA Leagues
      </Typography>
      {(pathname !== '/' && !pathname.includes('watch')) && (
        <Link to="/dashboard" style={{color: 'white'}}>
          <Button color="inherit">Dashboard</Button>
        </Link>
      )}
      <Link to="/" style={{color: 'white'}}>
        <Button color="inherit">Home</Button>
      </Link>
      </Toolbar>
  </AppBar>
  )
}