import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Main from './components/main';
import Premier from './components/premier';
import Bundesliga from './components/bundesliga';
import LaLiga from './components/laliga';
import SerieA from './components/serie-a';
import AddTeams from './components/add-teams';
import ListTeams from './components/list-teams';
import EditTeams from './components/edit-teams';
import CreateMatch from './components/create-match';
import ListMatches from './components/list-matches';
import Watch from './components/watch';
import EditMatch from './components/edit-match';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Main} />
      <Route path='/premier' component={Premier} />
      <Route path='/bundesliga' component={Bundesliga} />
      <Route path='/laliga' component={LaLiga} />
      <Route path='/seriea' component={SerieA} />
      <Route path='/add-team' component={AddTeams} />
      <Route path='/edit-team/:id' component={EditTeams} />
      <Route path='/list-teams' component={ListTeams} />
      <Route path='/create-match' component={CreateMatch} />
      <Route path='/list-matches' component={ListMatches} />
      <Route path='/edit-match/:league/:id' component={EditMatch} />
      <Route path='/watch/:league/:id' component={Watch} />
    </Router>
  );
}

export default App;
