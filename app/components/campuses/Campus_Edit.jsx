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
  }

  handleSubmit(event){
    const campusId = this.props.match.params.campusId;
    const info = this.state;
    axios.put(`/campuses/${campusId}`,info)
    this.setState({redirect:true})
  }

  render() {

    return (this.state.redirect)? (<Redirect to="/"/>) :
       (
        <div>
          <h1> Edit Campus Info </h1>
          <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                  <input
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.setState({name: e.target.value})}
                    id="exampleInputName"
                    placeholder="Campus Name"/>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputInfo">Campus Info   </label>
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
              <input type="submit" value="Submit" />
          </form>
        </div>
      )
  }
}


