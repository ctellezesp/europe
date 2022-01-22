import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';

import firebase from '../../firebase/config';
import { PremierComponent } from '../premier/premier.component';
import { LaLigaComponent } from '../la-liga/la-liga.component';
import { SerieAComponent } from '../serie-a/serie-a.component';
import { BundesligaComponent } from '../bundesliga/bundesliga.component';
import { Ligue1Component } from '../ligue-1/ligue-1.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import '../cards.css';

export const MainComponent = () => {
  const [state, setState] = useState({
    premier: [],
    laliga: [],
    bundesliga: [],
    seriea: [],
    ligue1: [],
    data: [],
    league: '',
    seasons: [],
    teams: [],
    loading: true
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const filterBySeason = (matches, season) => {
    return matches.filter((match) => match.data().season === season);
}

  const fetchLeague = async (league) => {
    setState({
      ...state,
      loading: true
    });
    try {
      const response = await firebase.db.collection(league).orderBy('date', 'desc').get();
      const seasons = new Set();
      const matches = response.docs;
      matches.forEach((item) => seasons.add(item.data().season));
      setState({
        ...state,
        [league]: matches,
        data: filterBySeason(matches, [...seasons].slice().sort().reverse()[0]),
        league,
        loading: false
      });
    } catch (err) {
      console.log({ err });
    }
  }

  const fetchTeams = async () => {
    const response = await firebase.db.collection('teams').orderBy('name', 'asc').get();
    setState({
      ...state,
      teams: response.docs,
      loading: false
    });
  }

  const getTeam = (id) => {
    return state.teams.find(team => team.ref.id === id).data();
  }

  const getMatchesBySeason = (league, season) => {
    setState({
      ...state,
      data: filterBySeason(state[league], season)
    });
  }

  return state.loading ? (
    <SpinnerComponent />
    ) : (
    <div className="main-body">
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <div className="leagues-scroll">
            <div className="scroll-item MuiPaper-elevation6">
                <img className="league-img-scroll" alt="Premier League" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&w=80&h=80&transparent=true" onClick={() => fetchLeague('premier')} />
            </div>
            <div className="scroll-item MuiPaper-elevation6">
                <img className="league-img-scroll" alt="La Liga" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&w=80&h=80&transparent=true" onClick={() => fetchLeague('laliga')} />
            </div>
            <div className="scroll-item MuiPaper-elevation6">
                <img className="league-img-scroll" alt="Bundesliga" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&w=80&h=80&transparent=true" onClick={() => fetchLeague('bundesliga')} />
            </div>
            <div className="scroll-item MuiPaper-elevation6">
                <img className="league-img-scroll" alt="Serie A" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&w=80&h=80&transparent=true" onClick={() => fetchLeague('seriea')} />
            </div>
            <div className="scroll-item MuiPaper-elevation6">
                <img className="league-img-scroll" alt="Ligue 1" src="https://i.imgur.com/aj7FnmI.png" onClick={() => fetchLeague('ligue1')} />
            </div>
        </div>
        <div className="tags-scroll">
          {state.seasons.map((season, index) => (
              <span key={index} className="season MuiPaper-elevation6" onClick={() => getMatchesBySeason(state.league, season)}>{season}</span>
          ))}
        </div>
        {state.data.length === 0 && (
          <Grid item xs={12} md={10} lg={8}>
            <img src="https://gentepasionyfutbol.com.co/wp-content/uploads/2020/01/UEFA.jpg" style={{ height: 'auto', width: '100%' }} alt="UEFA" />
          </Grid>
        )}
        {state.league === 'premier' && state.data.map((match, index) => (
          <PremierComponent 
            key={index} 
            id={match.ref.id} 
            stadium={match.data().stadium}
            home={getTeam(match.data().home)}
            away={getTeam(match.data().away)}
            title={match.data().title}
          />
        ))}
        {state.league === 'laliga' && state.data.map((match, index) => (
          <LaLigaComponent 
            key={index}
            id={match.ref.id}
            stadium={match.data().stadium}
            home={getTeam(match.data().home)}
            away={getTeam(match.data().away)}
            title={match.data().title}
          />
        ))}
        {state.league === 'seriea' && state.data.map((match, index) => (
          <SerieAComponent 
            key={index}
            id={match.ref.id}
            title={match.data().title}
            home={getTeam(match.data().home)}
            away={getTeam(match.data().away)}
            stadium={match.data().stadium}
          />
        ))}
        {state.league === 'bundesliga' && state.data.map((match, index) => (
          <BundesligaComponent 
            key={index}
            id={match.ref.id}
            season={match.data().season}
            title={match.data().title}
            home={getTeam(match.data().home)}
            away={getTeam(match.data().away)}
            stadium={match.data().stadium}
          />
        ))}
        {state.league === 'ligue1' && state.data.map((match, index) => (
          <Ligue1Component 
            key={index}
            id={match.ref.id}
            title={match.data().title}
            home={getTeam(match.data().home)}
            away={getTeam(match.data().away)}
          />
        ))}
      </Grid>
    </div>
  )
}