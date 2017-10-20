import {Link} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';


export default class CampusFunction extends Component {
  constructor(props){
    super(props);
    this.state={
      campuses:[]
    };
    this.campusId = this.props.campusId;
    this.handleChange = this.props.handleChange;
    this.handleSubmit = this.props.handleSubmit;
  }
    componentDidMount(){
    axios.get('/campuses')
       .then(res => res.data)
       .then(campuses => this.setState({campuses}))
       .catch(console.error);
  }

  render(){
    const listCampus = this.state.campuses;

      return !listCampus ? (<h1> Empty Campus </h1>):
      (
        <div className="form-group">
           <label>
              Campus:
              <select
                name="campus"
                onChange={this.handleChange}>

              <input type="submit"/>
                <option value="--">Choose a campus</option>
                {
                  listCampus&&listCampus.map((campus)=>{
                    return (<option key={campus.id} value={campus.id}>{campus.name}</option>)
                  })
                }
              </select>
           </label>
        </div>
      );
  }
}
