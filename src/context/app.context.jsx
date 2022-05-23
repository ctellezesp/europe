import { useState, useContext, createContext } from 'react';

export const AppContext = createContext({
  teams: [],
  bundesliga: [],
  premier: [],
  laliga: [],
  seriea: [],
  ligue1: [],
  champions: [],
  createTeam: (team) => null,
  updateTeam: (teamId, data) => null,
  getTeam: (teamId) => null,
  deleteTeam: (teamId) => null,
  createMatch: (league, match) => null,
  updateMatch: (league, match) => null,
  getMatch: (league, matchId) => null,
  deleteMatch: (league, matchId) => null
});

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    teams: [],
    bundesliga: [],
    premier: [],
    laliga: [],
    seriea: [],
    ligue1: [],
    champions: []
  });

  const createTeam = (team) => {
    setState(prev => ({
      ...prev,
      teams: [...prev.teams, team]
    }));
  }

  const updateTeam = (teamId, data) => {
    setState(prev => ({
      ...prev,
      teams: prev.teams.map(team => team.id === teamId ? data : team)
    }))
  }

  const getTeam = teamId => {
    return state.teams.find(team => team.id === teamId);
  }

  const deleteTeam = teamId => {
    setState(prev => ({
      ...prev,
      teams: prev.teams.filter(team => team.id !== teamId)
    }))
  }

  const createMatch = (league, match) => {
    setState(prev => ({
      ...prev,
      [league]: [...prev[league], match]
    }));
  }

  const updateMatch = (league, match) => {
    setState(prev => ({
      ...prev,
      [league]: prev[league].map(item => item.id === match.id ? match : item)
    }));
  }

  const getMatch = (league, matchId) => {
    return state[league].find(match => match.id === matchId);
  }

  const deleteMatch = (league, matchId) => {
    setState(prev => ({
      ...prev,
      [league]: prev[league].filter(match => match.id !== matchId)
    }))
  }

  const { teams, bundesliga, premier, ligue1, laliga, seriea } = state;

  <AppContext.Provider value={{
    teams, 
    bundesliga, 
    premier, 
    ligue1, 
    laliga, 
    seriea, 
    createTeam, 
    updateTeam, 
    getTeam, 
    deleteTeam, 
    createMatch, 
    updateMatch, 
    getMatch, 
    deleteMatch
  }}>
    {children}
  </AppContext.Provider>
}