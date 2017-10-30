import React, { Component } from 'react';
import axios from 'axios';
import {NavLink,Link} from 'react-router-dom';
import CampusEdit from './AllCampuses';


export default class Campus_Info extends Component {

  constructor(props){
    super(props);
    this.state={
      students:[],
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }

  componentDidMount(){
    const campusId = String(this.props.match.params.campusId);
    axios.get(`/campuses/${campusId}`)
        .then(response=> response.data)
        .then(campus => this.setState(campus))
        .catch(console.error);
  }

  handleSubmit(event) {
    const {name,info} = this.state;
    const newCampus ={name,info};

    axios.post('/campuses', newCampus)
        .then(res => this.setState({res}))
        .catch(console.error);
    event.stopPropagation();
  }

  handleDelete(event) {
    const campusId = event.target.id;
    const newCampus = this.state.students.filter(campus => campus.id !== Number(campusId));
    this.setState({students: newCampus});
    axios.delete(`/campuses/${campusId}`);
    event.stopPropagation();
  }

render() {
    const cId = Number(this.props.match.params.campusId);
    const numberOfStudents = this.state.students.length;
    const campusStudents = this.state.students.filter(student => student.campusId === cId);
    const campusName = this.state.name;
    const campusId = this.state.id;
    const campusInfo = this.state.info;
    const campusImage = this.state.image;

    return (
     <div className="panel panel-default">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">{campusName}</h1>
            <p className="lead">Campus Info: {campusInfo}</p>
            <h2>
              Number of Students <span className="badge badge-light">{numberOfStudents}</span>
            </h2>
          </div>
        </div>
        <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Info</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
            {
              campusStudents[0]&&campusStudents.map(studentInCampus =>{
                return (
                <tr key={studentInCampus.id}>
                  <th scope="row">{studentInCampus.id}</th>
                    <td>
                      <Link to={`/allstudents/info/${studentInCampus.campusId}/${studentInCampus.id}/`}>
                        {studentInCampus.name}
                      </Link>
                    </td>
                    <td>{studentInCampus.email}</td>
                    <td>{studentInCampus.info}</td>
                    <td>
                      <button
                          type="button"
                          className="btn btn-default btn-sm">
                        <span
                          id={studentInCampus.id}
                          onClick={this.handleDelete}
                          className="glyphicon glyphicon-remove"
                          aria-hidden="true"></span>
                      </button>

                      <Link to={`/allstudents/edit/${studentInCampus.id}`}>
                        <button
                            type="button"
                            className="btn btn-default btn-sm">
                          <span
                            className="glyphicon glyphicon-pencil"
                            aria-hidden="true"></span>
                        </button>
                      </Link>
                    </td>
                </tr>
                )
              })
            }
            </tbody>
        </table>
      </div>
      )
  }
}


