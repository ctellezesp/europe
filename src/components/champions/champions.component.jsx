import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './champions.styles.css';

export const ChampionsComponent = ({
  id, 
  season, 
  home, 
  away,
  stadium, 
  title, 
  frame,
  handleClick
}) => {
  const match = { id, season, title, home, away, stadium, frame };
  return (
    <Grid item xs={12} onClick={() => handleClick(match)}>
      <Paper elevation={3}>
        {/* Champions Styles */}
        <div className="champions">
          <div className="champions-header">
            <img src="https://img.uefa.com/imgml/uefacom/ucl/2021/logos/logo_dark.svg" alt="Champions League" className='champions-logo' />
          </div>
          <div className='champions-body'>
            <div className='champions-team'>
              <img className='champions-team-logo' src={home.img} alt={home.name} />
              
            </div>
            <div className='champions-team'>
              <img className='champions-team-logo' src={away.img} alt={away.name} />
              
            </div>
          </div>
          <div className='champions-footer'>
            <span className='champions-footer-title'>
              {title}
            </span>
            <span className='champions-footer-stadium'>
              {stadium}
            </span>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}