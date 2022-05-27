import React from 'react';

import { Paper, Grid } from '@material-ui/core';
import '../cards.css';

export const SerieAComponent = ({ id, title, home, away, stadium, frame, handleClick }) => {
  const match = { id, title, home, away, stadium, frame };
  return (
    <Grid item xs={12} onClick={() => handleClick(match)}>
      <Paper elevation={3} className="seriea">
        <div className="seriea-header">
          <span className="uppercase">{title}</span>
        </div>
        <div className="seriea-teams ss">
          <div className="seriea-home">
            <img className="seriea-team" src={home.img} alt={home.name} />
          </div>
          <div className="seriea-brand">
            <img className="seriea-team" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=512&h=512&transparent=true" alt="Serie A" />
          </div>
          <div className="seriea-away">
            <img className="seriea-team" src={away.img} alt={away.name} />
          </div>
        </div>
        <div className="seriea-info">
          <div className="info-home">
            <span className="uppercase">{home.name}</span>
          </div>
          <div className="info-vs">
            <span className="uppercase">vs</span>
          </div>
          <div className="info-away">
            <span className="uppercase">{away.name}</span>
          </div>
        </div>
        <div className="seriea-footer">
          <span className="uppercase">{stadium}</span>
        </div>
      </Paper>
    </Grid>
  )
}