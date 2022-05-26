import React from 'react';

import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export const DashboardComponent = () => {
  return (
    <Grid container justifyContext="center" spacing={1}>
      <Grid item xs={12} md={6} lg={4}>
        <Link to='/list-matches'>
          <Paper>
            <Typography variant="h4" align="center">
              Matches
            </Typography>
          </Paper>
        </Link>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Link to='/list-teams'>
          <Paper>
            <Typography variant="h4" align="center">
              Teams
            </Typography>
          </Paper>
        </Link>
      </Grid>
    </Grid>
  )
}