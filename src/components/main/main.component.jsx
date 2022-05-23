import { useState, useEffect, useContext } from 'react';

import firebase from '../../firebase/config';
import { PremierComponent } from '../premier/premier.component';
import { LaLigaComponent } from '../la-liga/la-liga.component';
import { SerieAComponent } from '../serie-a/serie-a.component';
import { BundesligaComponent } from '../bundesliga/bundesliga.component';
import { Ligue1Component } from '../ligue-1/ligue-1.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import '../cards.css';
import { ChampionsComponent } from '../champions/champions.component';
import LEAGUE_OPTIONS from '../../constants/league-options.constant';
import { AppContext } from '../../context/app.context';

export const MainComponent = () => {

  const appContext = useContext(AppContext);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBySeason = (matches, season) => {
    return matches.filter((match) => match.data().season === season);
}

  const fetchLeague = async (league) => {
    if(appContext[league].length > 0) {
      const seasons = new Set();
      const matches = appContext[league];
      matches.forEach((item) => seasons.add(item.data().season));
      setState({
        ...state,
        [league]: matches,
        data: filterBySeason(matches, [...seasons].slice().sort().reverse()[0]),
        league,
        seasons: [...seasons],
        loading: false
      });
    } else {
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
          seasons: [...seasons],
          loading: false
        });
      } catch (err) {
        console.log({ err });
      }
    }
  }

  const fetchTeams = async () => {
    if(appContext.teams.length > 0) {
      setState({
        ...state,
        teams: appContext.teams,
        loading: false
      });
    } else {
      const response = await firebase.db.collection('teams').orderBy('name', 'asc').get();
      setState({
        ...state,
        teams: response.docs,
        loading: false
      });
    }
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
      <div>
        <div className="leagues-scroll">
          {LEAGUE_OPTIONS.map(league => (
            <div className="scroll-item MuiPaper-elevation6">
              <img className="league-img-scroll" alt={league.name} src={league.image} onClick={() => fetchLeague(league.value)} />
            </div>
          ))}
        </div>
        <div className="tags-scroll">
          {state.seasons.map((season, index) => (
            <span key={index} className="season MuiPaper-elevation6" onClick={() => getMatchesBySeason(state.league, season)}>{season}</span>
          ))}
        </div>
        {state.data.length === 0 && (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src="https://logodix.com/logo/1999222.png" style={{ height: 'auto', width: '60%' }} alt="UEFA" />
          </div>
        )}
        <div className="grid-matches">
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
          {state.league === 'champions' && state.data.map((match) => (
            <ChampionsComponent 
              key={match.ref.id}
              id={match.ref.id}
              title={match.data().title}
              home={getTeam(match.data().home)}
              away={getTeam(match.data().away)}
              stadium={match.data().stadium}
            />
          ))}
        </div>
      </div>
    </div>
  )
}