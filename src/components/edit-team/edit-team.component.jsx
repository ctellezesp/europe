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
import swal from 'sweetalert';
import { useParams, useHistory } from 'react-router-dom';

import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import '../admin.css';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AppContext } from '../../context/app.context';

export const EditTeamsComponent = () => {
  const appContext = useContext(AppContext);
  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = useState({
    id,
    name: '',
    img: '',
    league: '',
    loading: true
  });

  useEffect(() => {
    const fetchTeam = async teamId => {
      const result = appContext.teams.length > 0 ? appContext.getTeam(teamId) : await firebase.db.collection("teams").doc(teamId).get();
      const { name, img, league } = result.data();
      setState({
        ...state,
        name,
        img,
        league,
        loading: false
      });
    }
    fetchTeam(state.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const save = () => {
    firebase.db.collection("teams").doc(state.id).set(state, { merge: true })
    .then(res => {
      appContext.updateTeam(state.id, state);
      swal("Team added", "The team has added correctly", "success")
      .then(() => {
        history.push('/list-teams');
      });
    })
    .catch(err => {
      swal("Error", "Please, verify your data", "error");
    })
  }

  return state.loading ? (
    <SpinnerComponent />
  ) : (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper className="center-paper">
            <h3>Add Team</h3>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              defaultValue={state.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="img"
              name="img"
              label="Image"
              variant="outlined"
              defaultValue={state.img}
              onChange={handleChange}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={state.league}
                onChange={handleChange}
                label="League"
              >
                {LEAGUE_OPTIONS.map(item => (
                  <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                ))}
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