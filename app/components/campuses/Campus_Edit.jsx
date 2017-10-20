import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';


export default class Campus_Edit extends Component {
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
    const campusId = this.props.match.params.campusId;
    const info = this.state.info;

    axios.put(`/campuses/${campusId}`,{info})
    this.setState({redirect:true})
  }

  handleChange(event){
    this.setState({ info: event.target.value });
  }
  render() {

    return (this.state.redirect)? (<Redirect to={`/allcampuses/${this.props.match.params.campusId}`}/>) :
       (
        <div>
          <h1> Campus Info </h1>
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


