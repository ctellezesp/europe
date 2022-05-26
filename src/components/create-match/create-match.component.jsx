import { useState, useEffect, useContext } from 'react';

import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import firebase from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import LEAGUE_OPTIONS from '../../constants/league-options.constant';

import '../admin.css';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AppContext } from '../../context/app.context';

export const CreateMatchComponent = () => {
  const appContext = useContext(AppContext);
  const [state, setState] = useState({
    title: '',
    season: '',
    home: '',
    away: '',
    date: '',
    stadium: '',
    frame: '',
    league: '',
    data: [],
    teams: [],
    loading: true
  });

  const history = useHistory();

  useEffect(() => {
    const fetchTeams = async () => {
      if(appContext.teams.length > 0) {
        setState({
          data: appContext.teams,
          loading: false
        });
        return;
      }
      const { docs } = await firebase.db.collection('teams').orderBy('name', 'asc').get();
      setState({
        data: docs,
        loading: false
      });
    }
    fetchTeams();
  }, []);

  const handleChange = event => {
    const {name, value} = event.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const setLeague = (event) => {
    const { value } = event.target;
    const display = value === 'champions' ? state.data : state.data.filter(team => team.data().league === value);
    setState({
      ...state,
      league: value,
      teams: display
    });
  }

  const save = async () => {
    const {title, season, home, away, date, stadium, frame} = state;
    const toSave = {
      title,
      season,
      home,
      away,
      stadium,
      frame,
      date
    };
    const { id } = await firebase.db.collection(state.league).add(toSave);
    appContext.createMatch(state.league, {
      ...toSave,
      id
    });
    swal('Match Added', 'Match added correctly', 'success')
    .then(() => {
      history.push("/list-matches");
    })
  }

  return state.loading ? (
    <SpinnerComponent />
  ) : (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Paper className="center-paper">
            <h3>Create Match</h3>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  id="title" 
                  name="title"
                  label="Title" 
                  variant="outlined" 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  type="date" 
                  id="date" 
                  name="date"
                  label="Date" 
                  variant="outlined" 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  id="season" 
                  name="season"
                  label="Season" 
                  variant="outlined" 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={setLeague}
                        label="League"
                    >
                      {LEAGUE_OPTIONS.map(item => (
                        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Home</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      label="Home"
                      name="home"
                      disabled={!state.league}
                    >
                        {state.teams && state.teams.length > 0 && state.teams.map((team, index) => 
                          <MenuItem key={index} value={team.ref.id}>{team.data().name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Away</InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={handleChange}
                      name="away"
                      label="Away"
                      disabled={!state.league}
                  >
                      {state.teams && state.teams.length > 0 && state.teams.map((team, index) => 
                        <MenuItem key={index} value={team.ref.id}>{team.data().name}</MenuItem>
                      )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  id="stadium" 
                  name="stadium"
                  label="Stadium" 
                  variant="outlined" 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  id="frame" 
                  name="frame"
                  label="Frame" 
                  variant="outlined" 
                  onChange={handleChange} 
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                onClick={save}
              >
                Save
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}