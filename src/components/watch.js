import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Player from './player';
import firebase from '../firebase/config';
import './player.css';
import './cards.css';

export default class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            league: props.match.params.league,
            id: props.match.params.id,
            title: '',
            date: '',
            home: '',
            away: '',
            stadium: '',
            season: '',
            frame: '',
            teams: []
        }
    }

    componentDidMount() {
        console.log(this.state.league, this.state.id);
        firebase.db.collection(this.state.league).doc(this.state.id).get()
            .then(res => {
                console.log(res.data());
                this.setState({
                    title: res.data().title,
                    date: res.data().date,
                    home: res.data().home,
                    away: res.data().away,
                    stadium: res.data().stadium,
                    season: res.data().season,
                    frame: res.data().frame
                });
            })
            .catch(err => {
                console.log(err);
            });

        firebase.db.collection('teams').orderBy('name', 'asc').get()
            .then(res => {
                console.log(res.docs);
                this.setState({
                    teams: res.docs
                })
            });
    }

    getName = (id) => {
        console.log(this.state.teams);
        if (typeof (id) == 'string' && id.length > 0) {
            return this.state.teams[0] ? this.state.teams.find(team => team.ref.id === id).data().name : "";
        } else {
            return "";
        }
    }

    getImg = (id) => {
        if (typeof (id) == 'string' && id.length > 0) {
            return this.state.teams[0] ? this.state.teams.find(team => team.ref.id === id).data().img : "";
        } else {
            return "";
        }
    }


    render() {
        return (
            <div className="main-watch">
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={1}>
                    <Grid item xs={12} lg={8}>
                        <Player render={this.state.frame} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        {this.state.league === 'premier' &&
                            <Paper elevation={3} className="premier">
                                <div className="premier-header">
                                    <span>Premier</span>
                                    <img alt="Premier" src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                                    <span>League</span>
                                </div>
                                <div className="pl-body">
                                    <div className="premier-stadium">
                                        <span>{this.state.stadium}</span>
                                    </div>
                                    <div className="premier-home">
                                        <span className="uppercase pl-tag bold">{this.getName(this.state.home)}</span>
                                        <div className="pl-img">
                                            <img src={this.getImg(this.state.home)} alt={this.getName(this.state.home)} />
                                        </div>
                                    </div>
                                    <div className="premier-away">
                                        <span className="uppercase pl-tag bold">{this.getName(this.state.away)}</span>
                                        <div className="pl-img">
                                            <img src={this.getImg(this.state.away)} alt={this.getName(this.state.away)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-footer">
                                    <span>{this.state.title}</span>
                                </div>
                            </Paper>
                        }

                        {this.state.league === 'laliga' &&
                            <Paper elevation={3} className="laliga">
                                <div className="laliga-brand">
                                    <span className="laliga-gold"><b>La Liga</b> {this.state.season}</span>
                                </div>
                                <div className="laliga-header">
                                    <div className="laliga-teamname">
                                        <span className="uppercase bold">{this.getName(this.state.home)}</span>
                                    </div>
                                    <div className="laliga-md">
                                        <span>{this.state.title}</span>
                                    </div>
                                    <div className="laliga-teamname">
                                        <span className="uppercase bold">{this.getName(this.state.away)}</span>
                                    </div>
                                </div>
                                <div className="laliga-equipos ll">
                                    <div className="laliga-home">
                                        <img className="laliga-logo" src={this.getImg(this.state.home)} alt={this.getName(this.state.home)} />
                                    </div>
                                    <div className="laliga-logo-div">
                                        <img className="laliga-logo" src="https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png" alt="La Liga" />
                                    </div>
                                    <div className="laliga-away">
                                        <img className="laliga-logo" src={this.getImg(this.state.away)} alt={this.getName(this.state.home)} />
                                    </div>
                                </div>
                                <div className="laliga-footer">
                                    <span className="uppercase laliga-gold bold">{this.state.stadium}</span>
                                </div>
                            </Paper>
                        }


                        {this.state.league === 'bundesliga' &&
                            <Paper className="bundesliga" elevation={3}>
                                <div className="bundesliga-header">
                                    <div className="bundesliga-comp">
                                        <img className="bundesliga-header-img" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=40&h=40&transparent=true" alt="Bundesliga" />
                                        <span className="bundesliga-title"><b>BUNDESLIGA</b></span>
                                        <span>{this.state.season}</span>
                                    </div>
                                    <div className="bundesliga-md">
                                        <span className="bundesliga-md-text">{this.state.title}</span>
                                    </div>
                                </div>
                                <div className="bundesliga-teams">
                                    <div className="bundesliga-team-item bundesliga-home">
                                        <img src={this.getImg(this.state.home)} alt={this.getName(this.state.home)} />
                                    </div>
                                    <div className="bundesliga-team-item bundesliga-away">
                                        <img src={this.getImg(this.state.away)} alt={this.getName(this.state.away)} />
                                    </div>
                                </div>
                                <div className="bundesliga-footer">
                                    <span className="uppercase"><b>{this.state.stadium}</b></span>
                                </div>
                            </Paper>
                        }

                        {this.state.league === 'seriea' &&
                            <Paper elevation={3} className="seriea">
                                <div className="seriea-header">
                                    <span className="uppercase">{this.state.title}</span>
                                </div>
                                <div className="seriea-teams ss">
                                    <div className="seriea-home">
                                        <img className="seriea-team" src={this.getImg(this.state.home)} alt={this.getName(this.state.home)} />
                                    </div>
                                    <div className="seriea-brand">
                                        <img className="seriea-team" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=512&h=512&transparent=true" alt="Serie A" />
                                    </div>
                                    <div className="seriea-away">
                                        <img className="seriea-team" src={this.getImg(this.state.away)} alt={this.getName(this.state.away)} />
                                    </div>
                                </div>
                                <div className="seriea-info">
                                    <div className="info-home">
                                        <span className="uppercase">{this.getName(this.state.home)}</span>
                                    </div>
                                    <div className="info-vs">
                                        <span className="uppercase">vs</span>
                                    </div>
                                    <div className="info-away">
                                        <span className="uppercase">{this.getName(this.state.away)}</span>
                                    </div>
                                </div>
                                <div className="seriea-footer">
                                    <span className="uppercase">{this.state.stadium}</span>
                                </div>
                            </Paper>
                        }

                        {this.state.league === 'ligue1' && (
                            <Paper elevation={3} className="ligue1">
                                <div className="ligue1-header">
                                    <span className="uppercase">{this.state.title}</span>
                                </div>
                                <div className="teams-ligue1">
                                    <div className="ligue1-home">
                                        <img className="ligue1-team" src={this.getImg(this.state.home)} alt={this.getName(this.state.home)} />
                                    </div>
                                    <div className="ligue1-brand">
                                        <img className="ligue1-team" src="https://i.imgur.com/W1HYuAN.png" alt="Ligue 1" />
                                    </div>
                                    <div className="ligue1-away">
                                        <img className="ligue1-team" src={this.getImg(this.state.away)} alt={this.getName(this.state.away)} />
                                    </div>
                                </div>
                                <div className="ligue1-info">
                                    <div className="ligue1-info-home">
                                        <span className="uppercase">{this.getName(this.state.home)}</span>
                                    </div>
                                    <div className="ligue1-info-vs">
                                        <span className="uppercase">vs</span>
                                    </div>
                                    <div className="ligue1-info-away">
                                        <span className="uppercase">{this.getName(this.state.away)}</span>
                                    </div>
                                </div>
                                <div className="ligue1-footer">
                                    <span className="uppercase">{this.state.stadium}</span>
                                </div>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}