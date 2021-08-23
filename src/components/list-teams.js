import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import firebase from "../firebase/config";
import swal from 'sweetalert';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './admin.css';

export default class ListTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            teams: [],
            loading: true
        }
    }

    componentDidMount() {
        firebase.db.collection("teams").orderBy('name', 'asc').get()
            .then(res => {
                this.setState({
                    data: res.docs,
                    teams: res.docs,
                    loading: false
                });
            })
    }

    filter = (league) => {
        const teams = this.state.data.filter(team => team.data().league === league);
        this.setState({
            teams: teams
        });
    }

    delete = (id) => {
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
                            swal("Tournament deleted correctly", {
                                icon: "success",
                            });
                            firebase.db.collection("teams").orderBy('title', 'asc').get()
                                .then(res => {
                                    this.setState({
                                        data: res.docs
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
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

    render() {
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
                                <span className="tag" onClick={() => this.filter('premier')}>Premier League</span>
                                <span className="tag" onClick={() => this.filter('laliga')}>La Liga</span>
                                <span className="tag" onClick={() => this.filter('bundesliga')}>Bundesliga</span>
                                <span className="tag" onClick={() => this.filter('seriea')}>Serie A</span>
                                <span className="tag" onClick={() => this.filter('ligue1')}>Ligue 1</span>
                            </div>
                            {this.state.teams.length > 0 && <TableContainer>
                                <Table style={{ width: "100%" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left">Team</TableCell>
                                            <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.teams.map((team, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="right"><Avatar alt={team.data().name} src={team.data().img} /></TableCell>
                                                <TableCell align="left">{team.data().name}</TableCell>
                                                <TableCell align="left">
                                                    <Link to={`edit-team/${team.ref.id}`}>
                                                        <IconButton aria-label="edit" size="small">
                                                            <EditIcon fontSize="inherit" color="primary" />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton aria-label="delete" size="small" onClick={() => this.delete(team.ref.id)}>
                                                        <DeleteIcon fontSize="inherit" color="secondary" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>}
                            {this.state.teams.length === 0 && <h3>No Teams Available</h3>}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
