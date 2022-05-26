import React, { useContext } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import firebase from "../../firebase/config";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

import '../admin.css';
import { AppContext } from '../../context/app.context';

export const ListTeamsComponent = () => {
  const appContext = useContext(AppContext);
  const [state, setState] = React.useState({
    data: [],
    teams: [],
    loading: true
  });

  React.useEffect(() => {
    const fetchTeams = async () => {
      if(appContext.teams.length > 0) {
        setState({
          data: appContext.teams,
          teams: appContext.teams,
          loading: false
        });
        return;
      }
      const { docs } = await firebase.db.collection("teams").orderBy('name', 'asc').get();
      setState({
        data: docs,
        teams: docs,
        loading: false
      });
      appContext.storeTeams(docs);
    }
    fetchTeams();
  }, []);

  const filter = league => {
    const teams = state.data.filter(team => team.data().league === league);
    setState({
      ...state,
      teams
    });
  }

  const deleteTeam = async id => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this tournament!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.db.collection("teams").doc(id).delete()
          .then(res => {
            const updateTeams = state.data.filter(team => team.id !== id);
            setState({
              ...state,
              data: updateTeams
            })
            appContext.deleteTeam(id);
            swal("Tournament deleted correctly", {
                icon: "success",
            });
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

  return (
    <div className="main">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} lg={8}>
          <Link to="/add-team">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Team
            </Button>
          </Link>
          <Paper className="center-paper">
            <div className="tags-scroll">
              <span className="tag" onClick={() => filter('premier')}>Premier League</span>
              <span className="tag" onClick={() => filter('laliga')}>La Liga</span>
              <span className="tag" onClick={() => filter('bundesliga')}>Bundesliga</span>
              <span className="tag" onClick={() => filter('seriea')}>Serie A</span>
              <span className="tag" onClick={() => filter('ligue1')}>Ligue 1</span>
              <span className="tag" onClick={() => filter('champions')}>Champions</span>
            </div>
            {state.teams.length > 0 && <TableContainer>
              <Table style={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">Team</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.teams.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell align="right"><Avatar alt={team.data().name} src={team.data().img} /></TableCell>
                      <TableCell align="left">{team.data().name}</TableCell>
                      <TableCell align="left">
                        <Link to={`edit-team/${team.ref.id}`}>
                          <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="inherit" color="primary" />
                          </IconButton>
                        </Link>
                        <IconButton aria-label="delete" size="small" onClick={() => deleteTeam(team.ref.id)}>
                            <DeleteIcon fontSize="inherit" color="secondary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>}
          {state.teams.length === 0 && <h3>No Teams Available</h3>}
        </Paper>
      </Grid>
    </Grid>
  </div>
  );
}