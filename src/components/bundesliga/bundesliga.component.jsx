import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import '../cards.css';

export const BundesligaComponent = ({ id, season, title, home, away, stadium, inList = true }) => {
  return (
    <Grid item xs={12}>
      <Link to={`/watch/bundesliga/${id}`}>
        <Paper className="bundesliga" elevation={3}>
          <div className="bundesliga-header">
              <div className="bundesliga-comp">
                  <img className="bundesliga-header-img" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=40&h=40&transparent=true" alt="Bundesliga" />
                  <span className="bundesliga-title"><b>BUNDESLIGA</b></span>
                  <span>{season}</span>
              </div>
              <div className="bundesliga-md">
                  <span className="bundesliga-md-text">{title}</span>
              </div>
          </div>
          <div className="bundesliga-teams">
              <div className="bundesliga-team-item bundesliga-home">
                  <img src={home.img} alt={home.name} />
              </div>
              <div className="bundesliga-team-item bundesliga-away">
                  <img src={away.img} alt={away.name} />
              </div>
          </div>
          <div className="bundesliga-footer">
              <span className="uppercase"><b>{stadium}</b></span>
          </div>
        </Paper>
      </Link>
    </Grid>
  );
}