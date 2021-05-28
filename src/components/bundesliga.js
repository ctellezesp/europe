import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './cards.css';

export default class Bundesliga extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="main bundes-bd">
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className="bundesliga" elevation={3}>
                            <div className="bundesliga-header">
                                <div className="bundesliga-comp">
                                    <img className="bundesliga-header-img" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=40&h=40&transparent=true" alt="Bundesliga" />
                                    <span className="bundesliga-title"><b>BUNDESLIGA</b></span>
                                    <span>2020-21</span>
                                </div>
                                <div className="bundesliga-md">
                                    <span className="bundesliga-md-text">Matchday 01</span>
                                </div>
                            </div>
                            <div className="bundesliga-teams">
                                <div className="bundesliga-team-item bundesliga-home">
                                    <img src="https://www.bundesliga.com/assets/clublogo/fcb.svg" alt="Bayern" />
                                </div>
                                <div className="bundesliga-team-item bundesliga-away">
                                    <img src="https://www.bundesliga.com/assets/clublogo/s04.svg" alt="Schalke" />
                                </div>
                            </div>
                            <div className="bundesliga-footer">
                                <span className="uppercase"><b>Allianz Arena</b></span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className="bundesliga" elevation={3}>
                            <div className="bundesliga-header">
                                <div className="bundesliga-comp">
                                    <img className="bundesliga-header-img" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=40&h=40&transparent=true" alt="Bundesliga" />
                                    <span className="bundesliga-title"><b>BUNDESLIGA</b></span>
                                    <span>2020-21</span>
                                </div>
                                <div className="bundesliga-md">
                                    <span className="bundesliga-md-text">Matchday 01</span>
                                </div>
                            </div>
                            <div className="bundesliga-teams">
                                <div className="bundesliga-team-item bundesliga-home">
                                    <img src="https://www.bundesliga.com/assets/clublogo/bvb.svg" alt="Dormund" />
                                </div>
                                <div className="bundesliga-team-item bundesliga-away">
                                    <img src="https://www.bundesliga.com/assets/clublogo/bmg.svg" alt="Gladbach" />
                                </div>
                            </div>
                            <div className="bundesliga-footer">
                                <span className="uppercase"><b>Signal Iduna Park</b></span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}