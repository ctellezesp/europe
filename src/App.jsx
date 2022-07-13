import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { MainComponent } from './components/main/main.component';
import { AddTeamsComponent } from './components/add-teams/add-teams.component';
import { ListTeamsComponent } from './components/list-teams/list-teams.component';
import { EditTeamsComponent } from './components/edit-team/edit-team.component';
import { ItemMatchComponent } from './components/item-match/item-match.component';
import { ListMatchesComponent } from './components/list-matches/list-matches.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShareComponent } from './components/share/share.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <ToastContainer theme="dark" />
      <Switch>
        <Route path='/' exact component={MainComponent} />
        <Route path='/add-team' component={AddTeamsComponent} />
        <Route path='/edit-team/:id' component={EditTeamsComponent} />
        <Route path='/list-teams' component={ListTeamsComponent} />
        <Route path='/create-match' component={ItemMatchComponent} />
        <Route path='/list-matches' component={ListMatchesComponent} />
        <Route path='/edit-match/:league/:id' component={ItemMatchComponent} />
        <Route path='/dashboard' component={DashboardComponent} />
        <Route path='/share' component={ShareComponent} />
      </Switch>
    </Router>
  );
}

export default App;
