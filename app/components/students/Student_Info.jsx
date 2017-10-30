import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
// import CampusEdit from './campuses/AllCampuses';


export default class Campus_Info extends Component {
  constructor(props){
    super(props);
    this.state={
      students:[],
      redirect:false,
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
    const newCampus = {name,info};

    axios.post('/campuses', newCampus)
        .then(res => this.setState({res}))
        .catch(console.error);
    event.stopPropagation();
  }

  handleDelete(event) {
    const studentId = event.target.id;
    this.setState({redirect: true});
    axios.delete(`/students/${studentId}`);
    event.stopPropagation();
  }

render() {
    const studentId = Number(this.props.match.params.studentId);
    const campusName = this.state.name;
    const singleStudent = this.state.students.filter(student => student.id === studentId);

    return (this.state.redirect)? (<Redirect to="/allstudents"/>) :
    (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
          {
            singleStudent&&singleStudent.map(student => {
                 return (<h1
                          key={student.id}
                          className="display-3">{student.name}
                        </h1>);
            })
          }
              <p className="lead">Campus Info: {campusName}</p>
          </div>
        </div>

        <h2>EDIT/DELETE STUDENT INFO</h2>
            <button
                type="button"
                className="btn btn-default btn-sm">
                <span
                  id={studentId}
                  onClick={this.handleDelete}
                  className="glyphicon glyphicon-remove"
                  aria-hidden="true">
                </span>
            </button>

            <Link to={`/allstudents/edit/${studentId}`}>
              <button
                  type="button"
                  className="btn btn-default btn-sm">
                <span
                  className="glyphicon glyphicon-pencil"
                  aria-hidden="true">
                </span>
              </button>
            </Link>

      </div>
    )
  }
}
