import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import '../cards.css';

export const Ligue1Component = ({ id, title, home, away, frame, streams, handleClick }) => {
  const match = { id, title, home, away, frame, streams };
  return (
    <Grid item xs={12} onClick={() => handleClick(match)}>
      <Paper elevation={3} className="ligue1">
        <div className="ligue1-header">
          <span className="uppercase">{title}</span>
        </div>
        <div className="teams-ligue1">
          <div className="ligue1-home">
            <img className="ligue1-team" src={home.img} alt={home.name} />
          </div>
          <div className="ligue1-brand">
            <img className="ligue1-team" src="https://i.imgur.com/W1HYuAN.png" alt="Ligue 1" />
          </div>
          <div className="ligue1-away">
            <img className="ligue1-team" src={away.img} alt={away.name} />
          </div>
        </div>
        <div className="ligue1-info">
          <div className="ligue1-info-home">
            <span className="uppercase">{home.name}</span>
          </div>
          <div className="ligue1-info-vs">
            <span className="uppercase">vs</span>
          </div>
          <div className="ligue1-info-away">
            <span className="uppercase">{away.name}</span>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}