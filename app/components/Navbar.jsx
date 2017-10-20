import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class HomePage extends Component {

  render() {
    return (

        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">

              <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to="/allstudents">All Students</Link>
                  </li>
                  <li><Link to="/allcampuses">All Campus</Link></li>
                  <li><Link to="/">Home</Link></li>
              </ul>

            </div>
          </div>
        </nav>
    )
  }
}

