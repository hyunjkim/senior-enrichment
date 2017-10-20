import {Link} from 'react-router-dom';
import React from 'react';


const studentFunc = (props) => {

  console.log('STUDENT FUNCTION', props.info)
  console.log('HANDLE DELETE', props.delete)
  const listStudents = props.info;
  const {handleDelete} = props.delete;


  return !listStudents ? (<h1> There are no students </h1>):
  (
      <div>
            <ul>
              {
                listStudents&&listStudents.map(student => {
                  return (
                    <div key={student.id}>
                        <li>Name: {student.name}</li>
                        <li>Email: {student.email}</li>
                        <li>Info: {student.info}</li>
                        <div>

                          <button>
                            <span id={student.id}  onClick={handleDelete} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                          </button>

                          <Link to={`/allstudents/edit/${student.id}`}>
                            <button>
                              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                          </Link>

                        </div>
                    </div>
                  )
                })
              }
            </ul>
        </div>
    );
}

export default studentFunc;
