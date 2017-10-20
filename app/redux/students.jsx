import axios from 'axios';

/* -----------------  ACTION TYPES ------------------ */

export const SET_STUDENTS = 'SET_STUDENTS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT_INFO = 'UPDATE_STUDENT_INFO';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';


/* ------------   ACTION CREATORS   ------------------ */

const setStudents  = students => ({ type: SET_STUDENTS, students });
const addStudent = name  => ({ type: ADD_STUDENT, name });
const updateStudent = info  => ({ type: UPDATE_STUDENT_INFO, info });
const removeStudent = id    => ({ type: REMOVE_STUDENT, id });

/* ------------  REDUCERS (EXPORT DEFAULT)  ------------------ */

export default function studentReducers (state = {}, action) {
  switch (action.type) {

    case SET_STUDENTS:
      return action.students;

    case ADD_STUDENT:
      return action.name;

    case UPDATE_STUDENT_INFO:
      return action.info;

    case REMOVE_STUDENT:
      return action.id;

    default:
      return state;
  };
};

/* ------------   THUNK CREATORS     ------------------ */

export const fetchAllStudents = () => dispatch => {
  // REFERENCE : server/main_router
  axios.get('/students')
       .then(res => dispatch(setStudents(res.data)))
       .catch(err => console.error('Student does not exist', err));
};


