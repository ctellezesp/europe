import { useState, useEffect, useContext } from "react";

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
import swal from 'sweetalert';
import { useParams, useHistory } from 'react-router-dom';

import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import '../admin.css';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AppContext } from "../../context/app.context";

export const EditMatchComponent = () => {

  const appContext = useContext(AppContext);
  const { id, league } = useParams();
  const history = useHistory();

  const [state, setState] = useState({
    id,
    league,
    title: '',
    season: '',
    home: '',
    away: '',
    date: '',
    stadium: '',
    frame: '',
    data: [],
    teams: [],
    loading: true
  });

  useEffect(() => {
    const fetchTeams = async () => {
      if(appContext.teams.length > 0) {
        return appContext.teams;
      }
      const { docs } = await firebase.db.collection('teams').orderBy('name', 'asc').get();
      const teams = docs.map(team => ({
        ...team.data(),
        id: team.ref.id
      }));
      appContext.storeTeams(teams);
      return teams;
    }
    const fetchMatch = async (leagueId, matchId) => {
      if(appContext[leagueId].length > 0) {
        const teams = await fetchTeams();
        const match = appContext.getMatch(leagueId, matchId);
        const { title, season, home, away, date, stadium, frame } = match;
        setState({
          ...state,
          data: teams,
          teams: teams,
          title,
          season,
          home,
          away,
          date,
          stadium,
          frame,
          loading: false
        });
        return;
      }
      const teamsResult = await fetchTeams();
      const teamsLeague = leagueId === 'champions' ? teamsResult : teamsResult.filter(team => team.league === leagueId);
      const matchResult = await firebase.db.collection(leagueId).doc(matchId).get();
      const { title, season, home, away, date, stadium, frame } = matchResult.data();
      setState({
        ...state,
        data: teamsResult,
        teams: teamsLeague,
        title,
        season,
        home,
        away,
        date,
        stadium,
        frame,
        loading: false
      });
    }
    fetchMatch(state.league, state.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id, state.league]);

  const handleChange = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const setLeague = event => {
    const { value } = event.target;
    const display = state.data.filter(team => team.data().league === value);
    this.setState({
      ...state,
      league: value,
      teams: display
    });
  }

  const save = () => {
    const { title, season, home, away, date, stadium, frame } = state;
    const toSave = {
      title,
      season,
      home,
      away,
      date,
      stadium,
      frame
    }
    firebase.db.collection(state.league).doc(state.id).set(toSave, { merge: true })
    .then(res => {
      appContext.updateMatch(state.league, {
        ...toSave,
        id: state.id
      });
      swal('Match Edited', 'Match edited correctly', 'success')
      .then(() => {
        history.push("/list-matches");
      })

    })
    .catch(err => {
      swal("Error", "Verify your data", "error");
    })
  }

  return state.loading ? (
    <SpinnerComponent />
  ) : (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Paper className="center-paper">
            <h3>Edit Match</h3>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  id="title" 
                  name="title"
                  label="Title" 
                  variant="outlined" 
                  defaultValue={state.title} 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  type="date" 
                  id="date" 
                  name="name"
                  label="Date" 
                  variant="outlined" 
                  defaultValue={state.date} 
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
                  defaultValue={state.season} 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={state.league}
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
                      name="home"
                      value={state.home}
                      onChange={handleChange}
                      label="Home"
                  >
                      {state.teams && state.teams.length > 0 && state.teams.map((team, index) => 
                        <MenuItem key={index} value={team.id}>{team.name}</MenuItem>
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
                      name="away"
                      value={state.away}
                      onChange={handleChange}
                      label="Away"
                  >
                      {state.teams && state.teams.length > 0 && state.teams.map((team, index) => 
                        <MenuItem key={index} value={team.id}>{team.name}</MenuItem>
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
                  defaultValue={state.stadium} 
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
                  defaultValue={state.frame} 
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