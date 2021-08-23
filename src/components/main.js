import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebase from '../firebase/config';
import './cards.css';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            premier: [],
            laliga: [],
            bundesliga: [],
            seriea: [],
            ligue1: [],
            data: [],
            league: '',
            seasons: [],
            teams: []
        }
    }

    componentDidMount() {
        firebase.db.collection('premier').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    premier: res.docs
                });
            })
            .catch(err => {
                console.log('PREMIER NOT LOADS');
                console.log(err);
            });

        firebase.db.collection('laliga').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    laliga: res.docs
                });
            })
            .catch(err => {
                console.log('LA LIGA NOT LOADS');
                console.log(err);
            });

        firebase.db.collection('bundesliga').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    bundesliga: res.docs
                });
            })
            .catch(err => {
                console.log('BUNDESLIGA NOT LOADS');
                console.log(err);
            });

        firebase.db.collection('seriea').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    seriea: res.docs
                });
            })
            .catch(err => {
                console.log('SERIE A NOT LOADS');
                console.log(err);
            });

        firebase.db.collection('ligue1').orderBy('date', 'desc').get()
            .then(res => {
                this.setState({
                    ligue1: res.docs
                });
            })
            .catch(err => {
                console.log('LIGUE 1 A NOT LOADS');
                console.log(err);
            });

        firebase.db.collection('teams').orderBy('name', 'asc').get()
            .then(res => {
                this.setState({
                    teams: res.docs
                });
            })
            .catch(err => {
                console.log('TEAMS NOT LOADS');
                console.log(err);
            });
    }

    loadPremier = () => {
        const seasons = new Set();
        this.state.premier.forEach((item) => seasons.add(item.data().season));
        this.setState({
            data: this.filterBySeason('premier', [...seasons].slice().sort().reverse()[0]),
            league: 'premier',
            seasons: [...seasons]
        });
    }

    loadBundesliga = () => {
        const seasons = new Set();
        this.state.bundesliga.forEach((item) => seasons.add(item.data().season));
        this.setState({
            data: this.filterBySeason('bundesliga', [...seasons].slice().sort().reverse()[0]),
            league: 'bundesliga',
            seasons: [...seasons]
        });
    }

    loadLaLiga = () => {
        const seasons = new Set();
        this.state.laliga.forEach((item) => seasons.add(item.data().season));
        this.setState({
            data: this.filterBySeason('laliga', [...seasons].slice().sort().reverse()[0]),
            league: 'laliga',
            seasons: [...seasons]
        });
    }

    loadSerieA = () => {
        const seasons = new Set();
        this.state.seriea.forEach((item) => seasons.add(item.data().season));
        this.setState({
            data: this.filterBySeason('seriea', [...seasons].slice().sort().reverse()[0]),
            league: 'seriea',
            seasons: [...seasons]
        });
    }

    loadLeague1 = () => {
        const seasons = new Set();
        this.state.ligue1.forEach((item) => seasons.add(item.data().season));
        this.setState({
            data: this.filterBySeason('ligue1', [...seasons].slice().sort().reverse()[0]),
            league: 'ligue1',
            seasons: [...seasons]
        });
    }

    getTeam = (id) => {
        return this.state.teams.find(team => team.ref.id === id).data();
    }

    filterBySeason = (league, season) => {
        return this.state[league].filter((match) => match.data().season === season);
    }

    getMatchesBySeason = (season) => {
        this.setState({
            data: this.filterBySeason(this.state.league, season)
        });
    }

    render() {
        return (
            <div className="main-body">
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>

                    <div className="leagues-scroll">
                        <div className="scroll-item MuiPaper-elevation6">
                            <img className="league-img-scroll" alt="Premier League" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&w=80&h=80&transparent=true" onClick={this.loadPremier} />
                        </div>
                        <div className="scroll-item MuiPaper-elevation6">
                            <img className="league-img-scroll" alt="La Liga" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&w=80&h=80&transparent=true" onClick={this.loadLaLiga} />
                        </div>
                        <div className="scroll-item MuiPaper-elevation6">
                            <img className="league-img-scroll" alt="Bundesliga" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=80&h=80&transparent=true" onClick={this.loadBundesliga} />
                        </div>
                        <div className="scroll-item MuiPaper-elevation6">
                            <img className="league-img-scroll" alt="Serie A" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=80&h=80&transparent=true" onClick={this.loadSerieA} />
                        </div>
                        <div className="scroll-item MuiPaper-elevation6">
                            <img className="league-img-scroll" alt="Ligue 1" src="https://i.imgur.com/aj7FnmI.png" onClick={this.loadLeague1} />
                        </div>
                    </div>



                    <div className="tags-scroll">
                        {this.state.seasons.map((season, index) => (
                            <span key={index} className="season MuiPaper-elevation6" onClick={() => this.getMatchesBySeason(season)}>{season}</span>
                        ))}
                    </div>


                    {this.state.data.length === 0 &&
                        <Grid item xs={12} md={10} lg={8}>
                            <img src="https://gentepasionyfutbol.com.co/wp-content/uploads/2020/01/UEFA.jpg" style={{ height: 'auto', width: '100%' }} alt="UEFA" />
                        </Grid>
                    }

                    {this.state.league === 'premier' && this.state.data.map((match, index) => {
                        return (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                                <Link to={`/watch/${this.state.league}/${match.ref.id}`}>
                                    <Paper elevation={3} className="premier">
                                        <div className="premier-header">
                                            <span>Premier</span>
                                            <img alt="Premier" src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                                            <span>League</span>
                                        </div>
                                        <div className="pl-body">
                                            <div className="premier-stadium">
                                                <span>{match.data().stadium}</span>
                                            </div>
                                            <div className="premier-home">
                                                <span className="uppercase pl-tag bold">{this.getTeam(match.data().home).name}</span>
                                                <div className="pl-img">
                                                    <img src={this.getTeam(match.data().home).img} alt={this.getTeam(match.data().home).name} />
                                                </div>
                                            </div>
                                            <div className="premier-away">
                                                <span className="uppercase pl-tag bold">{this.getTeam(match.data().away).name}</span>
                                                <div className="pl-img">
                                                    <img src={this.getTeam(match.data().away).img} alt={this.getTeam(match.data().away).name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-footer">
                                            <span>{match.data().title}</span>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })}

                    {this.state.league === 'bundesliga' && this.state.data.map((match, index) => {
                        return (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                                <Link to={`/watch/${this.state.league}/${match.ref.id}`}>
                                    <Paper className="bundesliga" elevation={3}>
                                        <div className="bundesliga-header">
                                            <div className="bundesliga-comp">
                                                <img className="bundesliga-header-img" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=40&h=40&transparent=true" alt="Bundesliga" />
                                                <span className="bundesliga-title"><b>BUNDESLIGA</b></span>
                                                <span>{match.data().season}</span>
                                            </div>
                                            <div className="bundesliga-md">
                                                <span className="bundesliga-md-text">{match.data().title}</span>
                                            </div>
                                        </div>
                                        <div className="bundesliga-teams">
                                            <div className="bundesliga-team-item bundesliga-home">
                                                <img src={this.getTeam(match.data().home).img} alt={this.getTeam(match.data().home).name} />
                                            </div>
                                            <div className="bundesliga-team-item bundesliga-away">
                                                <img src={this.getTeam(match.data().away).img} alt={this.getTeam(match.data().away).name} />
                                            </div>
                                        </div>
                                        <div className="bundesliga-footer">
                                            <span className="uppercase"><b>{match.data().stadium}</b></span>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })}

                    {this.state.league === 'laliga' && this.state.data.map((match, index) => {
                        return (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                                <Link to={`/watch/${this.state.league}/${match.ref.id}`}>
                                    <Paper elevation={3} className="laliga">
                                        <div className="laliga-brand">
                                            <span className="laliga-gold"><b>La Liga</b> {match.data().season}</span>
                                        </div>
                                        <div className="laliga-header">
                                            <div className="laliga-teamname">
                                                <span className="uppercase bold">{this.getTeam(match.data().home).name}</span>
                                            </div>
                                            <div className="laliga-md">
                                                <span>{match.data().title}</span>
                                            </div>
                                            <div className="laliga-teamname">
                                                <span className="uppercase bold">{this.getTeam(match.data().away).name}</span>
                                            </div>
                                        </div>
                                        <div className="laliga-equipos ll">
                                            <div className="laliga-home">
                                                <img className="laliga-logo" src={this.getTeam(match.data().home).img} alt={this.getTeam(match.data().home).name} />
                                            </div>
                                            <div className="laliga-logo-div">
                                                <img className="laliga-logo" src="https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png" alt="La Liga" />
                                            </div>
                                            <div className="laliga-away">
                                                <img className="laliga-logo" src={this.getTeam(match.data().away).img} alt={this.getTeam(match.data().away).name} />
                                            </div>
                                        </div>
                                        <div className="laliga-footer">
                                            <span className="uppercase laliga-gold bold">{match.data().stadium}</span>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })}

                    {this.state.league === 'seriea' && this.state.data.map((match, index) => {
                        return (
                            <Grid item xs={12} md={6} lg={3} key={index}>
                                <Link to={`/watch/${this.state.league}/${match.ref.id}`}>
                                    <Paper elevation={3} className="seriea">
                                        <div className="seriea-header">
                                            <span className="uppercase">{match.data().title}</span>
                                        </div>
                                        <div className="seriea-teams ss">
                                            <div className="seriea-home">
                                                <img className="seriea-team" src={this.getTeam(match.data().home).img} alt={this.getTeam(match.data().home).name} />
                                            </div>
                                            <div className="seriea-brand">
                                                <img className="seriea-team" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=512&h=512&transparent=true" alt="Serie A" />
                                            </div>
                                            <div className="seriea-away">
                                                <img className="seriea-team" src={this.getTeam(match.data().away).img} alt={this.getTeam(match.data().away).name} />
                                            </div>
                                        </div>
                                        <div className="seriea-info">
                                            <div className="info-home">
                                                <span className="uppercase">{this.getTeam(match.data().home).name}</span>
                                            </div>
                                            <div className="info-vs">
                                                <span className="uppercase">vs</span>
                                            </div>
                                            <div className="info-away">
                                                <span className="uppercase">{this.getTeam(match.data().away).name}</span>
                                            </div>
                                        </div>
                                        <div className="seriea-footer">
                                            <span className="uppercase">{match.data().stadium}</span>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })}
                    {this.state.league === 'ligue1' && this.state.data.map((match, index) => (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <Link to={`/watch/${this.state.league}/${match.ref.id}`}>
                                <Paper elevation={3} className="ligue1">
                                    <div className="ligue1-header">
                                        <span className="uppercase">{match.data().title}</span>
                                    </div>
                                    <div className="teams-ligue1">
                                        <div className="ligue1-home">
                                            <img className="ligue1-team" src={this.getTeam(match.data().home).img} alt={this.getTeam(match.data().home).name} />
                                        </div>
                                        <div className="ligue1-brand">
                                            <img className="ligue1-team" src="https://i.imgur.com/W1HYuAN.png" alt="Ligue 1" />
                                        </div>
                                        <div className="ligue1-away">
                                            <img className="ligue1-team" src={this.getTeam(match.data().away).img} alt={this.getTeam(match.data().away).name} />
                                        </div>
                                    </div>
                                    <div className="ligue1-info">
                                        <div className="ligue1-info-home">
                                            <span className="uppercase">{this.getTeam(match.data().home).name}</span>
                                        </div>
                                        <div className="ligue1-info-vs">
                                            <span className="uppercase">vs</span>
                                        </div>
                                        <div className="ligue1-info-away">
                                            <span className="uppercase">{this.getTeam(match.data().away).name}</span>
                                        </div>
                                    </div>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}