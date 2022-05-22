import { useState, useEffect } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import firebase from "../../firebase/config";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import '../admin.css';

export const ListMatchesComponent = () => {
  const [state, setState] = useState({
    data: [],
    teams: [],
    premier: [],
    laliga: [],
    bundesliga: [],
    seriea: [],
    ligue1: [],
    champions: [],
    league: '',
    loading: true
  });

  const fetchLeagueMatches = async (league) => {
    const {docs} = await firebase.db.collection(league).orderBy('date', 'desc').get()
    setState({
      ...state,
      [league]: docs,
      data: docs,
      league
    });
  }

  const fetchTeams = async () => {
    const { docs } = await firebase.db.collection("teams").orderBy('name', 'asc').get();
    setState({
      ...state,
      teams: docs,
      loading: false
    })
  }

  useEffect(() => {
    fetchTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = async league => {
    await fetchLeagueMatches(league);
  }

  const getName = (id) => state.teams.find(team => team.id === id).data().name;

  const deleteMatch = async id => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this match!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.db.collection(state.league).doc(id).delete()
          .then(res => {
              swal("Match deleted correctly", {
                  icon: "success",
              });
              state[state.league] = state[state.league].filter(match => match.ref.id !== id);
          })
          .catch(err => {
            swal("Error", {
                icon: "error",
            });
          })
      } else {
        swal("You don't deleted this tournament");
      }
    });
  }

  return state.loading ? (
    <p>Cargando...</p>
  ) : (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={8}>
          <Link to="/create-match">
            <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
            >
                Create Match
            </Button>
          </Link>
          <Paper className="center-paper">
            <div className="tags-scroll">
              {LEAGUE_OPTIONS.map(league => (
                <span className="tag" onClick={() => filter(league.value)}>{league.name}</span>
              ))}
            </div>
            {state.data.length > 0 && (
              <TableContainer>
                <Table style={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Home</TableCell>
                      <TableCell align="left">Away</TableCell>
                      <TableCell align="left">Matchday</TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.data.map((match, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{match.data().date}</TableCell>
                        <TableCell align="left">{getName(match.data().home)}</TableCell>
                        <TableCell align="left">{getName(match.data().away)}</TableCell>
                        <TableCell align="left">{match.data().title}</TableCell>
                        <TableCell align="left">
                          <Link to={`edit-match/${state.league}/${match.ref.id}`}>
                            <IconButton aria-label="edit" size="small">
                                <EditIcon fontSize="inherit" color="primary" />
                            </IconButton>
                          </Link>
                          <IconButton aria-label="delete" size="small" onClick={() => deleteMatch(match.ref.id)}>
                              <DeleteIcon fontSize="inherit" color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {state.teams.length === 0 && <h3>No Matches Available</h3>}
          </Paper>
        </Grid>
      </Grid>
     </div>
  );
}