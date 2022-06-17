import { useState, useEffect, useContext } from 'react';

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
import { SpinnerComponent } from '../spinner/spinner.component';
import { AppContext } from '../../context/app.context';
import { SearchBarComponent } from '../commons/search-bar/search-bar.component';

export const ListMatchesComponent = () => {
  const appContext = useContext(AppContext);
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
    if(appContext[league] && appContext[league].length > 0) {
      setState({
        ...state,
        [league]: appContext[league],
        data: appContext[league],
        league
      });
      return;
    }
    const { docs } = await firebase.db.collection(league).orderBy('date', 'desc').get();
    const matches = docs.map(doc => ({
      ...doc.data(),
      id: doc.ref.id
    }))
    setState({
      ...state,
      [league]: matches,
      data: matches,
      league
    });
    appContext.storeMatches(league, matches);
  }

  const fetchTeams = async () => {
    if(appContext.teams.length > 0) {
      setState({
        ...state,
        teams: appContext.teams,
        loading: false
      });
      return;
    }
    const { docs } = await firebase.db.collection("teams").orderBy('name', 'asc').get();
    const teams = docs.map(doc => {
      const teamData = {
        ...doc.data(),
        id: doc.ref.id
      }
      return teamData;
    });
    appContext.storeTeams(teams);
    setState({
      ...state,
      teams,
      loading: false
    });
  }

  useEffect(() => {
    fetchTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = async league => {
    await fetchLeagueMatches(league);
  }

  const getName = (id) => appContext.getTeam(id).name;

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
              state[state.league] = state[state.league].filter(match => match.id !== id);
              appContext.deleteMatch(state.league, id);
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

  const filterByLeague = (league) => filter(league);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = state.data.filter(match => {
      const home = getName(match.home);
      const away = getName(match.away);
      const matchName = `${home} vs ${away} ${match.title} ${match.season} ${match.date}`;
      return matchName.toLowerCase().includes(searchValue);
    });
    setState({
      ...state,
      data: filtered
    });
  }

  const handleCancel = () => {
    setState({
      ...state,
      data: state[state.league]
    })
  }

  return state.loading ? (
    <SpinnerComponent />
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
                <span className="tag" onClick={() => filterByLeague(league.value)}>{league.name}</span>
              ))}
            </div>
            <div style={{ width: '100%' }}>
              <SearchBarComponent onSearch={handleSearch} onCancel={handleCancel} />
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
                        <TableCell align="left">{match.date}</TableCell>
                        <TableCell align="left">{getName(match.home)}</TableCell>
                        <TableCell align="left">{getName(match.away)}</TableCell>
                        <TableCell align="left">{match.title}</TableCell>
                        <TableCell align="left">
                          <Link to={`edit-match/${state.league}/${match.id}`}>
                            <IconButton aria-label="edit" size="small">
                                <EditIcon fontSize="inherit" color="primary" />
                            </IconButton>
                          </Link>
                          <IconButton aria-label="delete" size="small" onClick={() => deleteMatch(match.id)}>
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