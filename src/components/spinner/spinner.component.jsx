import React from 'react';

import { CircularProgress } from '@material-ui/core';
import './spinner.styles.css';

export const SpinnerComponent = () => (
  <div className='spinner-section'>
    <CircularProgress color="secondary" size="4em" />
  </div>
)