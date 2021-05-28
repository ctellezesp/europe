import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './cards.css';

export default class LaLiga extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="main liga-bd">
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="laliga">
                            <div className="laliga-brand">
                                <span className="laliga-gold"><b>La Liga</b> 2020-21</span>
                            </div>
                            <div className="laliga-header">
                                <div className="laliga-teamname">
                                    <span className="uppercase bold">barcelona</span>
                                </div>
                                <div className="laliga-md">
                                    <span>Matchday 03</span>
                                </div>
                                <div className="laliga-teamname">
                                    <span className="uppercase bold">villarreal</span>
                                </div>
                            </div>
                            <div className="laliga-equipos ll">
                                <div className="laliga-home">
                                    <img className="laliga-logo" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png&h=512&w=512" alt="Barcelona" />
                                </div>
                                <div className="laliga-logo-div">
                                    <img className="laliga-logo" src="https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png" alt="La Liga" />
                                </div>
                                <div className="laliga-away">
                                    <img className="laliga-logo" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/102.png&h=512&w=512" alt="La Liga" />
                                </div>
                            </div>
                            <div className="laliga-footer">
                                <span className="uppercase laliga-gold bold">Camp Nou</span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="laliga">
                            <div className="laliga-brand">
                                <span className="laliga-gold"><b>La Liga</b> 2020-21</span>
                            </div>
                            <div className="laliga-header">
                                <div className="laliga-teamname">
                                    <span className="uppercase bold">real betis</span>
                                </div>
                                <div className="laliga-md">
                                    <span>Matchday 03</span>
                                </div>
                                <div className="laliga-teamname">
                                    <span className="uppercase bold">real madrid</span>
                                </div>
                            </div>
                            <div className="laliga-equipos ll">
                                <div className="laliga-home">
                                    <img className="laliga-logo" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/244.png&h=512&w=512" alt="Barcelona" />
                                </div>
                                <div className="laliga-logo-div">
                                    <img className="laliga-logo" src="https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png" alt="La Liga" />
                                </div>
                                <div className="laliga-away">
                                    <img className="laliga-logo" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png&h=512&w=512" alt="La Liga" />
                                </div>
                            </div>
                            <div className="laliga-footer">
                                <span className="uppercase laliga-gold bold">Camp Nou</span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}