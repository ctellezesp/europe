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

export default class AddTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            img: '',
            league: ''
        }
    }

    setName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    setImg = (event) => {
        this.setState({
            img: event.target.value
        });
    }

    setLeague = (event) => {
        this.setState({
            league: event.target.value
        });
    }

    save = () => {
        firebase.db.collection("teams").add(this.state)
        .then(res => {
            console.log(res);
            swal("Team added", "The team has added correctly", "success")
            .then(() => {
                this.props.history.push('/list-teams');
            });
        })
        .catch(err => {
            console.log(err);
            swal("Error", "Please, verify your data", "error");
        })
    }

    render() {
        return(
            <div className="main">
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper className="center-paper">
                            <h3>Add Team</h3>
                            <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" onChange={this.setName} />
                            <TextField fullWidth id="outlined-basic" label="Img" variant="outlined" onChange={this.setImg} />
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">League</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this.setLeague}
                                label="League"
                                >
                                    <MenuItem value="premier">Premier League</MenuItem>
                                    <MenuItem value="laliga">La Liga</MenuItem>
                                    <MenuItem value="bundesliga">Bundesliga</MenuItem>
                                    <MenuItem value="seriea">Serie A</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<SaveIcon />}
                                onClick={this.save}
                            >
                                Save
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className="center-paper">
                            <img style={{width: '300px', height: '300px'}} src={this.state.img} alt={this.state.name} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}