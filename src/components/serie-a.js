import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './cards.css';

export default class SerieA extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="main seriea-body">
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="seriea">
                            <div className="seriea-header">
                                <span className="uppercase">Matchday 03</span>
                            </div>
                            <div className="seriea-teams ss">
                                <div className="seriea-home">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/14/images/logo/30/original/lazio.png" alt="Juventus" />
                                </div>
                                <div className="seriea-brand">
                                    <img className="seriea-team" src="http://www.legaseriea.it/assets/legaseriea/images/logo_main_seriea.png?v=21" alt="Serie A" />
                                </div>
                                <div className="seriea-away">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/8/images/logo/642/original/inter.png" alt="Lazio" />
                                </div>
                            </div>
                            <div className="seriea-info">
                                <div className="info-home">
                                    <span className="uppercase">Lazio</span>
                                </div>
                                <div className="info-vs">
                                    <span className="uppercase">vs</span>
                                </div>
                                <div className="info-away">
                                    <span className="uppercase">Inter</span>
                                </div>
                            </div>
                            <div className="seriea-footer">
                                <span className="uppercase">Stadio Olimpico</span>
                            </div>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="seriea">
                            <div className="seriea-header">
                                <span className="uppercase">Matchday 02</span>
                            </div>
                            <div className="seriea-teams ss">
                                <div className="seriea-home">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/20/images/logo/819/original/loghi_400x400_0024_roma.png" alt="Juventus" />
                                </div>
                                <div className="seriea-brand">
                                    <img className="seriea-team" src="http://www.legaseriea.it/assets/legaseriea/images/logo_main_seriea.png?v=21" alt="Serie A" />
                                </div>
                                <div className="seriea-away">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/1/images/logo/789/original/juve.png" alt="Lazio" />
                                </div>
                            </div>
                            <div className="seriea-info">
                                <div className="info-home">
                                    <span className="uppercase">Roma</span>
                                </div>
                                <div className="info-vs">
                                    <span className="uppercase">vs</span>
                                </div>
                                <div className="info-away">
                                    <span className="uppercase">Juventus</span>
                                </div>
                            </div>
                            <div className="seriea-footer">
                                <span className="uppercase">Stadio Olimpico</span>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Paper elevation={3} className="seriea">
                            <div className="seriea-header">
                                <span className="uppercase">Matchday 01</span>
                            </div>
                            <div className="seriea-teams ss">
                                <div className="seriea-home">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/1/images/logo/789/original/juve.png" alt="Juventus" />
                                </div>
                                <div className="seriea-brand">
                                    <img className="seriea-team" src="http://www.legaseriea.it/assets/legaseriea/images/logo_main_seriea.png?v=21" alt="Serie A" />
                                </div>
                                <div className="seriea-away">
                                    <img className="seriea-team" src="http://www.legaseriea.it/uploads/default/attachments/squadre/squadre_m/10/images/logo/626/original/sampdoria.png" alt="Lazio" />
                                </div>
                            </div>
                            <div className="seriea-info">
                                <div className="info-home">
                                    <span className="uppercase">Juventus</span>
                                </div>
                                <div className="info-vs">
                                    <span className="uppercase">vs</span>
                                </div>
                                <div className="info-away">
                                    <span className="uppercase">Sampdoria</span>
                                </div>
                            </div>
                            <div className="seriea-footer">
                                <span className="uppercase">Allianz Stadium</span>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}