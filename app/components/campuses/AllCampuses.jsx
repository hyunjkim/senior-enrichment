import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CampusEdit from './Campus_Edit';

const initialState = {
      name: "",
      info: "",
      campuses: [],
      edit: false
}

export default class AllCampuses extends Component {
  constructor() {
    super()
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/campuses')
        .then(response => response.data)
        .then(campuses => this.setState({campuses}));
  }

  handleSubmit(event) {
    const {name,email,info} = this.state;
    const newCampus ={name,info};

    axios.post('/campuses', newCampus)
        .then(res => this.setState({res}))
        .catch(console.error);
    event.stopPropagation();
  }

  handleDelete(event) {
    const campusId = event.target.id;
    const newCampus = this.state.campuses.filter(campus => campus.id !== Number(campusId));
    this.setState({campuses: newCampus});
    axios.delete(`/campuses/${campusId}`);
    event.stopPropagation();
  }
//performance warning: If you need to respond to input changes you might want to debounce the function so the above won't work well as it would fire componentDidUpdate for every keypress

  render() {
    const listCampuses = this.state.campuses;

    // if(this.state.edit) return (<CampusEdit {...this.props}/>);

    return (
      <div className="panel panel-default center">
        <form
          style={{display: 'flex', justifyContent: 'center'}}
          className="form-inline"
          onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label>
              Name:
                <input
                  type="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value })}
                  placeholder="Name"/>
             </label>
          </div>
          <div className="form-group">
             <label>
                Info:
                <input
                  type="info"
                  value={this.state.info}
                  onChange={(e) => this.setState({info: e.target.value })}
                  placeholder="Info"/>
             </label>
             <input
              type="submit"
              value="Submit"
              className="btn btn-default btn-sm"/>
          </div>
        </form>
        <div >
            <table className="table">
                <thead>
                  <tr>
                    <th>Campus Id</th>
                    <th>Name</th>
                    <th>Info</th>
                    <th>Options</th>
                  </tr>
                </thead>
              {
                listCampuses&&listCampuses.map(campus => {
                  return (
                      <tbody key={campus.id}>
                        <tr>
                          <th scope="row">{campus.id}</th>
                            <Link
                              to={`/allcampuses/info/${campus.id}`}>
                              <td>{campus.name}</td>
                            </Link>
                            <td>{campus.info}</td>
                            <td>
                              <button
                                  type="button"
                                  className="btn btn-default btn-sm">
                                <span
                                  id={campus.id}
                                  onClick={this.handleDelete}
                                  className="glyphicon glyphicon-remove"
                                  aria-hidden="true"></span>
                              </button>

                              <Link to={`/allcampuses/edit/${campus.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-default btn-sm">
                                  <span
                                    className="glyphicon glyphicon-pencil"
                                    aria-hidden="true">
                                  </span>
                                </button>
                              </Link>

                              <Link to={`/allcampuses/info/${campus.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-default btn-sm">
                                  <span
                                    className="glyphicon glyphicon-user"
                                    aria-hidden="true">
                                  </span>
                                  Students
                                </button>
                              </Link>
                            </td>
                        </tr>
                      </tbody>
                  )
                })
              }
            </table>
        </div>
      </div>
    )
  }
}


