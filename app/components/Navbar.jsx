import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class HomePage extends Component {

  render() {
    return (

        <nav
          className="navbar navbar-default navbar-fixed-top"
          style={{background: '#563d7c'}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to="/allstudents" style={{color: '#FFFFFF'}}>All Students</Link>
                  </li>
                  <li><Link to="/allcampuses" style={{color: '#FFFFFF'}}>All Campus</Link></li>
                  <li><Link to="/" style={{color: '#FFFFFF'}}>Home</Link></li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
}

