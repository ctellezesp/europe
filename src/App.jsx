import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { MainComponent } from './components/main/main.component';
import { WatchComponent } from './components/watch/watch.component';
import AddTeams from './components/add-teams';
import ListTeams from './components/list-teams';
import EditTeams from './components/edit-teams';
import CreateMatch from './components/create-match';
import ListMatches from './components/list-matches';
import EditMatch from './components/edit-match';
import Navbar from './components/navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={MainComponent} />
        <Route path='/watch/:league/:id' component={WatchComponent} />
        <Route path='/add-team' component={AddTeams} />
        <Route path='/edit-team/:id' component={EditTeams} />
        <Route path='/list-teams' component={ListTeams} />
        <Route path='/create-match' component={CreateMatch} />
        <Route path='/list-matches' component={ListMatches} />
        <Route path='/edit-match/:league/:id' component={EditMatch} />
      </Switch>
    </Router>
  );
}

export default App;
