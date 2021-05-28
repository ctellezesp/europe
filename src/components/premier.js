import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './cards.css';

export default class Premier extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="main epl-body">
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="premier">
                            <div className="premier-header">
                            <span>Premier</span>
                            <img src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                            <span>League</span>
                            </div>
                            <div className="pl-body">
                            <div className="premier-stadium">
                                <span>Anfield</span>
                            </div>
                            <div className="premier-home">
                                <span className="uppercase pl-tag bold">Liverpool</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png&h=512&w=512" alt="Liverpool" />
                                </div>
                            </div>
                            <div className="premier-away">
                                <span className="uppercase pl-tag bold">Leeds United</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/357.png&h=512&w=512" alt="Leeds" />
                                </div>
                            </div>
                            </div>
                            <div className="pl-footer">
                            <span>Matchday 01</span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="premier">
                            <div className="premier-header">
                            <span>Premier</span>
                            <img src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                            <span>League</span>
                            </div>
                            <div className="pl-body">
                            <div className="premier-stadium">
                                <span>Tottenham Stadium</span>
                            </div>
                            <div className="premier-home">
                                <span className="uppercase pl-tag bold">Tottenham</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/367.png&h=512&w=512" alt="Liverpool" />
                                </div>
                            </div>
                            <div className="premier-away">
                                <span className="uppercase pl-tag bold">Everton</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/368.png&h=512&w=512" alt="Leeds" />
                                </div>
                            </div>
                            </div>
                            <div className="pl-footer">
                            <span>Matchday 01</span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="premier">
                            <div className="premier-header">
                            <span>Premier</span>
                            <img src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                            <span>League</span>
                            </div>
                            <div className="pl-body">
                            <div className="premier-stadium">
                                <span>Amex Stadium</span>
                            </div>
                            <div className="premier-home">
                                <span className="uppercase pl-tag bold">Brighton</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/331.png&h=512&w=512" alt="Liverpool" />
                                </div>
                            </div>
                            <div className="premier-away">
                                <span className="uppercase pl-tag bold">Chelsea</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png&h=512&w=512" alt="Leeds" />
                                </div>
                            </div>
                            </div>
                            <div className="pl-footer">
                            <span>Matchday 01</span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="premier">
                            <div className="premier-header">
                            <span>Premier</span>
                            <img src="https://freepikpsd.com/wp-content/uploads/2019/11/english-premier-league-png-19-Transparent-Images.png" />
                            <span>League</span>
                            </div>
                            <div className="pl-body">
                            <div className="premier-stadium">
                                <span>Craven Cottage</span>
                            </div>
                            <div className="premier-home">
                                <span className="uppercase pl-tag bold">Fulham</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/370.png&h=512&w=512" alt="Liverpool" />
                                </div>
                            </div>
                            <div className="premier-away">
                                <span className="uppercase pl-tag bold">Arsenal</span>
                                <div className="pl-img">
                                <img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png&h=512&w=512" alt="Leeds" />
                                </div>
                            </div>
                            </div>
                            <div className="pl-footer">
                            <span>Matchday 01</span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}