import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import PremierLeagueLogo from '../../assets/pl-logo.png';
import '../cards.css';

export const PremierComponent = ({ id, stadium, home, away, title, frame, handleClick }) => {
  const match = { id, stadium, home, away, title, frame }
  return (
    <Grid item xs={12} onClick={() => handleClick(match)}>
      <Paper elevation={3} className="premier">
        <div className="premier-header">
          <img src={PremierLeagueLogo} alt="Premier League" />
        </div>
        <div className="pl-body">
          <div className="premier-stadium">
            <span>{stadium}</span>
          </div>
          <div className="premier-home">
            <span className="uppercase pl-tag bold">{home.name}</span>
            <div className="pl-img">
              <img src={home.img} alt={home.name} />
            </div>
          </div>
          <div className="premier-away">
            <span className="uppercase pl-tag bold">{away.name}</span>
            <div className="pl-img">
              <img src={away.img} alt={away.name} />
            </div>
          </div>
        </div>
        <div className="pl-footer">
          <span>{title}</span>
        </div>
      </Paper>
    </Grid>
  );
}