import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../firebase/config';
import swal from 'sweetalert';
import './admin.css';

export default class EditMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            league: props.match.params.league,
            title: '',
            season: '',
            home: '',
            away: '',
            date: '',
            stadium: '',
            frame: '',
            data: [],
            teams: []
        }
    }

    componentDidMount() {
        firebase.db.collection('teams').orderBy('name', 'asc').get()
        .then(res => {
            const teamsLeague = res.docs.filter(team => team.data().league === this.state.league);
            this.setState({
                data: res.docs,
                teams: teamsLeague
            });
        })
        .catch(err => {
            console.log(err);
        });
        console.log(this.state.league, this.state.id);
        firebase.db.collection(this.state.league).doc(this.state.id).get()
        .then(res => {
            console.log(res.data());
            this.setState({
                title: res.data().title,
                season: res.data().season,
                home: res.data().home,
                away: res.data().away,
                date: res.data().date,
                stadium: res.data().stadium,
                frame: res.data().frame,
            });

        })
    }

    setTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    setSeason = (event) => {
        this.setState({
            season: event.target.value
        });
    }

    setHome = (event) => {
        this.setState({
            home: event.target.value
        });
    }

    setAway = (event) => {
        this.setState({
            away: event.target.value
        });
    }

    setDate = (event) => {
        this.setState({
            date: event.target.value
        });
    }

    setStadium = (event) => {
        this.setState({
            stadium: event.target.value
        });
    }

    setFrame = (event) => {
        this.setState({
            frame: event.target.value
        });
    }

    setLeague = (event) => {
        const display = this.state.data.filter(team => team.data().league === event.target.value);
        console.log(display);
        this.setState({
            league: event.target.value,
            teams: display
        });
    }

    save = () => {
        const toSave = {
            'title': this.state.title,
            'season': this.state.season,
            'home': this.state.home,
            'away': this.state.away,
            'date': this.state.date,
            'stadium': this.state.stadium,
            'frame': this.state.frame
        }
        firebase.db.collection(this.state.league).doc(this.state.id).set(toSave, {merge: true})
        .then(res => {
            console.log(res);
            swal('Match Edited', 'Match edited correctly', 'success')
            .then(() => {
                this.props.history.push("/list-matches");
            })

        })
        .catch(err => {
            console.log(err);
            swal("Error", "Verify your data", "error");
        })
    }

    render() {
        return(
            <div className="main">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Paper className="center-paper">
                            <h3>Edit Match</h3>
                            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" value={this.state.title} onChange={this.setTitle} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth type="date" id="outlined-basic" label="Date" variant="outlined" value={this.state.date} onChange={this.setDate} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth id="outlined-basic" label="Season" variant="outlined" value={this.state.season} onChange={this.setSeason} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.league}
                                        onChange={this.setLeague}
                                        label="League"
                                        >
                                            <MenuItem value="premier">Premier League</MenuItem>
                                            <MenuItem value="laliga">La Liga</MenuItem>
                                            <MenuItem value="bundesliga">Bundesliga</MenuItem>
                                            <MenuItem value="seriea">Serie A</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Home</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.home}
                                        onChange={this.setHome}
                                        label="Home"
                                        >
                                            {this.state.teams.map((team, index) => {
                                                return(<MenuItem key={index} value={team.ref.id}>{team.data().name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Away</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.away}
                                        onChange={this.setAway}
                                        label="Away"
                                        >
                                            {this.state.teams.map((team, index) => {
                                                return(<MenuItem key={index} value={team.ref.id}>{team.data().name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="outlined-basic" label="Stadium" variant="outlined" value={this.state.stadium} onChange={this.setStadium} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="outlined-basic" label="Frame" variant="outlined" value={this.state.frame} onChange={this.setFrame} />
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                    onClick={this.save}
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
}