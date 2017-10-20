import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import CampusEdit from './Campuses';


export default class Campus_Info extends Component {
  constructor(props){
    super(props);
    this.state={
      students:{},
      redirect:false,
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }

  componentDidMount(){
    const campusId = this.props.match.params.id;

    // axios.get(`/students`)
    //      .then(res => res.data)
    //      .then(campus => this.setState({campus}))
    //      .catch(console.error);

    // axios.get(`/students/${campusId}`)
    //     .then(response=> response.data)
    //     .then(students => this.setState({students}))
    //     .catch(console.error);


      axios.get(`/campuses/${campusId}`)
        .then(response=> response.data)
        .then(students => this.setState({students}))
        .catch(console.error);
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

render() {
    const campusStudents = this.state.students;
    console.log('LINE44', this.state);
    console.log('LINE45', campusStudents);
    return (!campusStudents)? (<div>No Students</div>):
    (
     <div className="panel panel-default">
        <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Info</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
            {
              campusStudents&&campusStudents.map(studentInCampus =>{
                <tr>
                  <th scope="row">{studentInCampus.id}</th>
                    <td>{studentInCampus.name}</td>
                    <td>{studentInCampus.info}</td>
                    <td>
                      <button>
                        <span id={studentInCampus.id}  onClick={this.handleDelete} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                      </button>

                      <Link to={`/allcampuses/edit/${studentInCampus.id}`}>
                        <button>
                          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </button>
                      </Link>
                    </td>
                </tr>
              })
            }
            </tbody>
        </table>
      </div>
      )
  }
}


