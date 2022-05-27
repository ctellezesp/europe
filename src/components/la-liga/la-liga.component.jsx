import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import '../cards.css';

export const LaLigaComponent = ({ id, season, home, away, stadium, title, frame, handleClick }) => {
   const match = { id, season, title, home, away, stadium, frame };
  return (
    <Grid item xs={12} onClick={() => handleClick(match)}>
      <Paper elevation={3} className="laliga">
        <div className="laliga-brand">
          <span className="laliga-gold"><b>La Liga</b> {season}</span>
        </div>
        <div className="laliga-header">
          <div className="laliga-teamname">
            <span className="uppercase bold">{home.name}</span>
          </div>
          <div className="laliga-md">
            <span>{title}</span>
          </div>
          <div className="laliga-teamname">
            <span className="uppercase bold">{away.name}</span>
          </div>
        </div>
        <div className="laliga-equipos ll">
          <div className="laliga-home">
            <img className="laliga-logo" src={home.img} alt={home.name} />
          </div>
          <div className="laliga-logo-div">
            <img className="laliga-logo" src="https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png" alt="La Liga" />
          </div>
          <div className="laliga-away">
            <img className="laliga-logo" src={away.img} alt={away.name} />
          </div>
        </div>
        <div className="laliga-footer">
          <span className="uppercase laliga-gold bold">{stadium}</span>
        </div>
      </Paper>
    </Grid>
  );
}