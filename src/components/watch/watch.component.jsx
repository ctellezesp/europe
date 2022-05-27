/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core'

import firebase from '../../firebase/config';
import { PremierComponent } from '../premier/premier.component';
import { PlayerComponent } from '../player/player.component';
import { LaLigaComponent } from '../la-liga/la-liga.component';
import { BundesligaComponent } from '../bundesliga/bundesliga.component';
import { SerieAComponent } from '../serie-a/serie-a.component';
import { Ligue1Component } from '../ligue-1/ligue-1.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ChampionsComponent } from '../champions/champions.component';
import { AppContext } from '../../context/app.context';

export const WatchComponent = () => {
  const appContext = useContext(AppContext);
  const { league, id } = useParams();
  const [state, setState] = useState({
    title: '',
    date: '',
    home: '',
    away: '',
    stadium: '',
    season: '',
    frame: '',
    teams: [],
    loading: true
  });

  const fetchMatch = async (league, matchId) => {
    if(appContext[league].length > 0) {
      const match = appContext.getMatch(league, matchId);
      const home = appContext.teams.length > 0 ? appContext.getTeam(match.home) : await firebase.db.collection('teams').doc(match.home).get();
      const away = appContext.teams.length > 0 ? appContext.getTeam(match.away) : await firebase.db.collection('teams').doc(match.away).get();
      setState({
        title: match.title,
        date: match.date,
        home: home,
        away: away,
        stadium: match.stadium,
        season: match.season,
        frame: match.frame,
        loading: false
      })
    } else {
      try {
        const result = await firebase.db.collection(league).doc(matchId).get();
        const home = await firebase.db.collection('teams').doc(result.data().home).get();
        const away = await firebase.db.collection('teams').doc(result.data().away).get();
        setState({
          title: result.data().title,
          date: result.data().date,
          home: home.data(),
          away: away.data(),
          stadium: result.data().stadium,
          season: result.data().season,
          frame: result.data().frame,
          loading: false
        })
      } catch (err) {
        console.log({ err });
      }
    } 
  }

  useEffect(() => {
    fetchMatch(league, id);
  }, [league, id]);

  return state.loading ? (
    <SpinnerComponent />
  ) : (
    <div className="main-watch">
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} lg={8}>
            <PlayerComponent render={state.frame} />
          </Grid>
          <Grid item xs={12} lg={4}>
            {league === 'premier' && (
              <PremierComponent 
                id={id}
                title={state.title}
                stadium={state.stadium}
                home={state.home}
                away={state.away}
                inList={false}
              />
            )}
            {league === 'laliga' && (
              <LaLigaComponent 
                id={id}
                season={state.season} 
                home={state.home}
                away={state.away}
                stadium={state.stadium}
                title={state.title}
                inList={false}
              />
            )}
            {league === 'bundesliga' && (
              <BundesligaComponent 
                id={id}
                season={state.season}
                title={state.title}
                home={state.home}
                away={state.away}
                stadium={state.stadium}
                inList={false}
              />
            )}
            {league === 'seriea' && (
              <SerieAComponent 
                id={id}
                title={state.title}
                home={state.home}
                away={state.away}
                stadium={state.stadium}
                inList={false}
              />
            )}
            {league === 'ligue1' && (
              <Ligue1Component 
                id={id}
                title={state.title}
                home={state.home}
                away={state.away}
                inList={false}
              />
            )}
            {league === 'champions' && (
              <ChampionsComponent 
                id={id}
                title={state.title}
                home={state.home}
                away={state.away}
                inList={false}
                stadium={state.stadium}
              />
            )}
          </Grid>
      </Grid>
    </div>
  );
}