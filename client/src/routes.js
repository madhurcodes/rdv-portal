/**
 * Created by Nikhil on 23/05/17.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ManageTeam from './components/ManageTeam'
import AddMember from './components/AddMember'
import EventCategory from './components/EventCategory'
import Venue from './components/Venue'
import Permission from './components/Permission'
import EventCreate from './components/EventCreate'

export default (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/profile' component={Profile}/>
    <Route path='/manage-team' component={ManageTeam}/>
    <Route path='/add-member' component={AddMember}/>
    <Route path='/create-event' component={EventCreate}/>
    <Route path='/event-category' component={EventCategory}/>
    <Route path='/venue' component={Venue}/>
    <Route path='/permission' component={Permission}/>
    <Route render={function () {
      return <p>Not Found!</p>
    }}/>
  </Switch>
);