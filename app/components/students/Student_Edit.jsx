import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';


export default class Student extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      info: "",
      campusId:"",
    };
    this.redirect = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const studentId = this.props.match.params.studentId;
    const info = this.state;

    axios.put(`/students/${studentId}`,info)
    this.redirect = true;
    this.setState({info})
  }
  render() {

    return (this.redirect)? (<Redirect to='/allstudents'/>) :
       (
        <div>
          <h1> Edit Student Info </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName">Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value})}
                  id="exampleInputName"
                  placeholder="Student Name"/>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.setState({email: e.target.value})}
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"/>
                <small
                  id="emailHelp"
                  className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputInfo">Student Info   </label>
                <input
                  name="info"
                  className="form-control"
                  value={this.state.info}
                  onChange={(e) => this.setState({info: e.target.value})}
                  id="exampleInputInfo"
                  placeholder=" Info "/>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputId">Campus Id   </label>
                <input
                  name="campusId"
                  className="form-control"
                  value={this.state.campusId}
                  onChange={(e) => this.setState({campusId: e.target.value})}
                  id="exampleInputId"
                  placeholder=" Campus Id "/>
            </div>

            <button
              type="submit"
              className="btn btn-default btn-sm">Submit</button>
          </form>
        </div>
      )
  }
}
