import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { MainComponent } from './components/main/main.component';
import { WatchComponent } from './components/watch/watch.component';
import { AddTeamsComponent } from './components/add-teams/add-teams.component';
import { ListTeamsComponent } from './components/list-teams/list-teams.component';
import EditTeams from './components/edit-teams';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { ListMatchesComponent } from './components/list-matches/list-matches.component';
import EditMatch from './components/edit-match';
import Navbar from './components/navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={MainComponent} />
        <Route path='/watch/:league/:id' component={WatchComponent} />
        <Route path='/add-team' component={AddTeamsComponent} />
        <Route path='/edit-team/:id' component={EditTeams} />
        <Route path='/list-teams' component={ListTeamsComponent} />
        <Route path='/create-match' component={CreateMatchComponent} />
        <Route path='/list-matches' component={ListMatchesComponent} />
        <Route path='/edit-match/:league/:id' component={EditMatch} />
      </Switch>
    </Router>
  );
}

export default App;
