import React, { Component } from 'react';
import { Router} from 'react-router';
import {
         Link,
         Redirect,
         Route,
         Switch
       } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

import Root from './components/Root';
import HomePage from './components/HomePage';
import AllStudents from './components/students/AllStudents';
import Student from './components/students/Student';
import CampusEdit from './components/campuses/Campus_Edit';
import CampusInfo from './components/campuses/Campus_Info';
import Campuses from './components/campuses/Campuses';
import Navbar from './components/Navbar';

/* -----------------    COMPONENT     ------------------ */

export default class Routes extends Component {
  render () {

    return (
      <Router history={newHistory}>
          <div id="main" className="container">
            <Navbar/>
            <hr/>
            <hr/>
              <div>
               <Switch>
                <Route exact path="/allstudents" component={AllStudents}/>
                <Route path="/allstudents/edit/:studentId" component={Student} />
                <Route exact path="/allcampuses" component={Campuses} />
                <Route path="/allcampuses/edit/:campusId" component={CampusEdit} />
                <Route exact path="/allcampuses/info/:campusId" component={CampusInfo} />
                <Route path="/" component={HomePage} />
                <Redirect to="/"/>
               </Switch>
              </div>
          </div>
      </Router>
    );
  }
}
