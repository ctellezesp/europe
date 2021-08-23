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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import firebase from "../firebase/config";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import './admin.css';

export default class ListMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            teams: [],
            premier: [],
            laliga: [],
            bundesliga: [],
            seriea: [],
            ligue1: [],
            league: ''
        }
    }

    componentDidMount() {
        firebase.db.collection("teams").orderBy('name', 'asc').get()
            .then(res => {
                this.setState({
                    teams: res.docs,
                });
            });

        firebase.db.collection('premier').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    premier: res.docs,
                    data: res.docs,
                    league: 'premier'
                });
            })
            .catch(err => {
                console.log(err);
            });

        firebase.db.collection('laliga').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    laliga: res.docs
                });
            })
            .catch(err => {
                console.log(err);
            });

        firebase.db.collection('bundesliga').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    bundesliga: res.docs
                });
            })
            .catch(err => {
                console.log(err);
            });

        firebase.db.collection('seriea').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    seriea: res.docs
                });
            })
            .catch(err => {
                console.log(err);
            });

        firebase.db.collection('ligue1').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    ligue1: res.docs
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    filter = (league) => {
        this.setState({
            data: this.state[league],
            league: league
        });
    }

    getName = (id) => {
        return this.state.teams.find(team => team.id === id).data().name;
    }

    delete = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this match!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.db.collection(this.state.league).doc(id).delete()
                        .then(res => {
                            swal("Match deleted correctly", {
                                icon: "success",
                            });
                            this.state[this.state.league] = this.state[this.state.league].filter(match => match.ref.id !== id);
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
                                <span className="tag" onClick={() => this.filter('premier')}>Premier League</span>
                                <span className="tag" onClick={() => this.filter('laliga')}>La Liga</span>
                                <span className="tag" onClick={() => this.filter('bundesliga')}>Bundesliga</span>
                                <span className="tag" onClick={() => this.filter('seriea')}>Serie A</span>
                                <span className="tag" onClick={() => this.filter('ligue1')}>Ligue 1</span>
                            </div>
                            {this.state.data.length > 0 && <TableContainer>
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
                                        {this.state.data.map((match, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{match.data().date}</TableCell>
                                                <TableCell align="left">{this.getName(match.data().home)}</TableCell>
                                                <TableCell align="left">{this.getName(match.data().away)}</TableCell>
                                                <TableCell align="left">{match.data().title}</TableCell>
                                                <TableCell align="left">
                                                    <Link to={`edit-match/${this.state.league}/${match.ref.id}`}>
                                                        <IconButton aria-label="edit" size="small">
                                                            <EditIcon fontSize="inherit" color="primary" />
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton aria-label="delete" size="small" onClick={() => this.delete(match.ref.id)}>
                                                        <DeleteIcon fontSize="inherit" color="secondary" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>}
                            {this.state.teams.length === 0 && <h3>No Matches Available</h3>}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
