import React, { useState } from 'react';

import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';

import firebase from '../../firebase/config';
import swal from 'sweetalert';
import '../admin.css';

export const AddTeamsComponent = () => {
  const history = useHistory();
  const [state, setState] = useState({
    name: '',
    img: '',
    league: ''
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const save = async () => {
    try {
      await firebase.db.collection("teams").add(state);
      swal("Team added", "The team has added correctly", "success")
        .then(
          () => history.push('/list-teams')
        );
    } catch (err) {
      swal("Error", JSON.stringify(err), "error");
    }
  }
  
  return (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper className="center-paper">
              <Typography variant="h3">Add Team</Typography>
              <TextField 
                fullWidth 
                id="name" 
                label="Name" 
                variant="outlined" 
                onChange={handleChange} 
                name="name"
              />
              <TextField 
                fullWidth 
                id="img" 
                label="Img" 
                variant="outlined" 
                onChange={handleChange} 
                name="img"
              />
              <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      label="League"
                      name="league"
                  >
                      <MenuItem value="premier">Premier League</MenuItem>
                      <MenuItem value="laliga">La Liga</MenuItem>
                      <MenuItem value="bundesliga">Bundesliga</MenuItem>
                      <MenuItem value="seriea">Serie A</MenuItem>
                      <MenuItem value="ligue1">Ligue 1</MenuItem>
                  </Select>
              </FormControl>
              <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={save}
              >
                  Save
              </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="center-paper">
              <img style={{ width: '300px', height: '300px' }} src={state.img} alt={state.name} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}