import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class HomePage extends Component {

  constructor() {
    super()
    this.state = {
      campuses:[],
      campus:true
    };
  }

  componentDidMount() {
   axios.get('/campuses')
        .then(response => response.data)
        .then(campuses => this.setState({campuses}));
  }

  render() {
    const allCampuses = this.state.campuses;

    return (!allCampuses)? <h1>No Campuses</h1>:
    (
      <div className="row">
            <ul>
              {
                allCampuses&&allCampuses.map(campus => {
                  let imageUrl = campus.image || "campus_icon.png";
                  return (
                      <div key={campus.id}>
                          <div className="col-sm-6 col-md-4">
                          <Link to={`/allcampuses/info/${campus.id}`}>
                              <div className="thumbnail">
                                  <img
                                    alt="100%x200"
                                    src={imageUrl}
                                    style={{height:"200px", width: "100%", display: 'block'}}
                                    />
                                  <div className="caption">
                                    <h3>{campus.name? (campus.name):"Campus"}</h3>
                                    <p>{campus.info? (campus.info.length > 16?
                                      campus.info.slice(0,16) : campus.info) : "Oh Happy Day"}
                                    </p>
                                  </div>
                              </div>
                          </Link>
                          </div>
                      </div>
                    )
                })
              }
            </ul>
      </div>
    )
  }
}




