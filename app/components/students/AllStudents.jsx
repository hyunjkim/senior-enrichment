import React, { Component } from 'react';
import axios from 'axios';
import Student from './Student';
import CampusFunction from '../campuses/CampusFunction';
import {Link} from 'react-router-dom';

const initialState = {
      name: "",
      email: "",
      info: "",
      campusId:"",
      students: [],
      edit: false
}

export default class AllStudents extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/students')
        .then(response => response.data)
        .then(students => this.setState({students}));
  }

  handleSubmit(event) {
    const {name, email, info, campusId} = this.state;

    axios.post('/students', {name,email,info,campusId})
      .then(res => res.data)
      .then(student => this.setState({student}))
      .catch(console.error);

    event.stopPropagation();
  }
  handleChange(event){
    const campusId = event.target.value;
    this.setState({campusId});
  }
  handleDelete(event) {
    const studentId = event.target.id;
    const newStudents = this.state.students.filter(student => student.id !== Number(studentId));
    this.setState({students: newStudents});
    axios.delete(`/students/${studentId}`);
    event.stopPropagation();
  }


//performance warning: If you need to respond to input changes you might want to debounce the function so the above won't work well as it would fire componentDidUpdate for every keypress

  render() {

    const listStudents = this.state.students;

    if(this.state.edit) return (<Student {...this.props}/>);

    return (
      <div className="panel panel-default">
         <form style={{display: 'flex', justifyContent: 'center'}} className="form-inline" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label>
              Name:
                <input
                  type="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value })}
                  placeholder="Name"
                 />
             </label>
          </div>
          <div className="form-group">
             <label>
                Email:
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({email: e.target.value })}
                  placeholder="Email"
                 />
             </label>
          </div>
          <div className="form-group">
             <label>
                Info:
                <input
                  type="info"
                  value={this.state.info}
                  onChange={(e) => this.setState({info: e.target.value })}
                  placeholder="Info"
                 />
             </label>
          </div>
          <div>
            <CampusFunction
            {...this.props}
            campusId = {this.state.campusId}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
          </div>
            <input type="submit" value="Submit" />
        </form>
        <div >
            <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Info</th>
                    <th>Campus</th>
                    <th>Options</th>
                  </tr>
                </thead>
              {
                listStudents&&listStudents.map(student => {
                  return (
                      <tbody key={student.id}>
                        <tr>
                          <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.info}</td>
                            <td>{student.campusId}</td>
                            <td>
                              <button>
                                <span id={student.id}  onClick={this.handleDelete} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                              </button>

                              <Link to={`/allstudents/edit/${student.id}`}>
                                <button>
                                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
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
