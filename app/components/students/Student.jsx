import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';


export default class Student extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const studentId = this.props.match.params.studentId;
    const info = this.state.info;

    axios.put(`/students/${studentId}`,{info})
    this.setState({redirect:true})
  }

  handleChange(event){
    this.setState({ info: event.target.value });
  }
  render() {

    return (this.state.redirect)? (<Redirect to='/allstudents'/>) :
       (
        <div>
          <h1> Student Info </h1>
          <form onSubmit={this.handleSubmit}>
           <label>
              Info:
               <input
                type="info"
                value={this.state.info}
                onChange={this.handleChange}
                placeholder="Info"
               />
           </label>
              <input type="submit" value="Submit" />
          </form>
        </div>
      )
  }
}


