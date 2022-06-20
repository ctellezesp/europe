/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from 'react';

import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../../firebase/config';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import { TOASTIFY_CONFIG } from '../../constants/toastify';

import '../admin.css';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AppContext } from '../../context/app.context';


const FAKE_MATCH = {
  id: '',
  title: '',
  home: '',
  away: '',
  league: '',
  streams: []
}

const matchSchema = Yup.object().shape({
	title: Yup.string().required('Title is required!'),
	date: Yup.string().required(),
	home: Yup.string().required('Home team is required!'),
	away: Yup.string().required('Away team is required!'),
	stadium: Yup.string().required('Stadium is required!'),
  season: Yup.string().required('Season is required'),
	streams: Yup.array()
		.min(1)
		.of(
			Yup.object().shape({
				label: Yup.string().required('Stream label is required!'),
				frame: Yup.string().required('Stream frame is required!'),
			})
		),
});

export const ItemMatchComponent = () => {
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [allTeams, setAllTeams] = useState([]);
  const [teamsDisplay, setTeamsDisplay] = useState([]);

  const history = useHistory();

  const { id, league } = useParams();

  const editMode = id && league;

  useEffect(() => {
    const fetchTeams = async () => {
      if(appContext.teams.length > 0) {
        setAllTeams(appContext.teams);
        setLoading(false);
        return;
      }
      const { docs } = await firebase.db.collection('teams').orderBy('name', 'asc').get();
      const teams = docs.map(doc => ({
        ...doc.data(),
        id: doc.ref.id
      }))
      appContext.storeTeams(teams);
      setAllTeams(teams);
      setLoading(false);
    }
    fetchTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return loading ? (
      <SpinnerComponent />
    ) : (
      <div className="main">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <Paper className="center-paper">
              <h3>{editMode ? 'Edit Match' : 'Create Match'}</h3>
              <Formik 
                enableReinitialize
                initialValues={editMode ? {
                  ...appContext.getMatch(league, id),
                  league
                } : FAKE_MATCH} 
                validationSchema={matchSchema} 
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  if(editMode) {
                    await firebase.db.collection(league).doc(id).set(values, { merge: true });
                    appContext.updateMatch(league, {
                      ...values,
                      id
                    });
                    toast(`${values.title} edited`, TOASTIFY_CONFIG);
                    setSubmitting(false);
                    history.push('/list-matches');
                  } else {
                    const { id } = await firebase.db.collection(values.league).add(values);
                    appContext.createMatch(values.league, {
                      ...values,
                      id
                    });
                    toast(`${values.title} added`, TOASTIFY_CONFIG);
                    setSubmitting(false);
                    history.push('/list-matches');
                  }
                }}
              >
                {(props) => {
                  const {
                    handleChange,
                    values,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    isValid
                  } = props;

                  useEffect(() => {
                    const stadiumRetrieved = appContext.getTeam(values.home)?.stadium;
                    setFieldValue('stadium', stadiumRetrieved);
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  }, [values.home]);

                  useEffect(() => {
                    if(values.league !== 'champions' && values.league !== 'friendlies') {
                      const filtered = allTeams.filter(team => team.league === values.league);
                      setTeamsDisplay(filtered);
                    } else {
                      setTeamsDisplay(allTeams);
                    }
                  }, [values.league]);

                  const createStream = () => {
                    const newOption = {
                      label: '',
                      frame: '',
                    };
                    setFieldValue('streams', [...values.streams, newOption]);
                  };
      
                  const deleteStream = (index) => {
                    const newOptions = values.streams.slice();
                    newOptions.splice(index, 1);
                    setFieldValue('streams', newOptions);
                  };

                  return (
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs={12}>
                          <TextField 
                            fullWidth 
                            id="title" 
                            name="title"
                            label="Title" 
                            variant="outlined" 
                            onChange={handleChange} 
                            defaultValue={values.title}
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
                            defaultValue={values.date}
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
                            defaultValue={values.season}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                              <InputLabel id="league-select">League</InputLabel>
                              <Select
                                  labelId="league-select"
                                  id="league"
                                  name="league"
                                  onChange={handleChange}
                                  label="League"
                                  value={league}
                              >
                                {LEAGUE_OPTIONS.map(item => (
                                  <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                ))}
                              </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth variant="outlined">
                              <InputLabel id="home-select">Home</InputLabel>
                              <Select
                                labelId="home-select"
                                id="home"
                                onChange={handleChange}
                                label="Home"
                                name="home"
                                disabled={editMode ? false : !values.league}
                                value={values.home}
                              >
                                  {teamsDisplay.length > 0 && teamsDisplay
                                    .map((team, index) => 
                                      <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                                  )}
                              </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="away-select">Away</InputLabel>
                            <Select
                                labelId="away-select"
                                id="away"
                                onChange={handleChange}
                                name="away"
                                label="Away"
                                disabled={editMode ? false : !values.league}
                                value={values.away}
                            >
                                {teamsDisplay.length > 0 && teamsDisplay
                                  .map((team, index) => 
                                    <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
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
                            disabled={!values.home}
                            value={values.stadium}
                            onChange={handleChange} 
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            type="button"
                            onClick={createStream}
                          >
                            Add Stream
                          </Button>
                          {values.streams.length > 0 &&
                            values.streams.map((stream, index) => (
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                key={index}
                                style={{ marginTop: '10px' }}
                              >
                                <Grid item xs={12} md={3}>
                                  <TextField
                                    fullWidth
                                    name="label"
                                    variant="outlined"
                                    onChange={(event) =>
                                      setFieldValue(
                                        `streams[${index}].label`,
                                        event.target.value
                                      )
                                    }
                                    label="Label"
                                    value={stream.label || ''}
                                  />
                                </Grid>
                                <Grid item xs={10} md={8}>
                                  <TextField
                                    fullWidth
                                    name="frame"
                                    variant="outlined"
                                    onChange={(event) =>
                                      setFieldValue(
                                        `streams[${index}].frame`,
                                        event.target.value
                                      )
                                    }
                                    label="Frame"
                                    value={stream.frame || ''}
                                  />
                                </Grid>
                                <Grid item xs={2} md={1}>
                                  <Grid
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <IconButton
                                      aria-label="deleteFrame"
                                      color="error"
                                      onClick={() => deleteStream(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                        </Grid>
                        {isSubmitting ? (
                          <CircularProgress size={24} />
                        ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<SaveIcon />}
                          disabled={!isValid}
                          type="submit"
                        >
                          Save
                        </Button>
                        )}
                      </Grid>

                    </form>
                  )
                }}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
}