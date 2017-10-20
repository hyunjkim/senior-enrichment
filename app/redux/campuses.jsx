import axios from 'axios';

/* -----------------  ACTION TYPES ------------------ */

export const SET_CAMPUS = 'SET_CAMPUS';
export const ADD_CAMPUS = 'ADD_CAMPUS';
export const UPDATE_CAMPUS_INFO = 'UPDATE_CAMPUS_INFO ';
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS';


/* ------------   ACTION CREATORS   ------------------ */

const setCampus  = campus => ({ type: SET_CAMPUS, campus });
const addCampus = campusName  => ({ type: ADD_CAMPUS, campusName });
const updateCampus = info  => ({ type: UPDATE_CAMPUS_INFO, info });
const removeCampus = id    => ({ type: REMOVE_CAMPUS, id });

/* ------------  REDUCERS (EXPORT DEFAULT)  ------------------ */

export default function campuseReducers (state = {}, action) {
  switch (action.type) {

    case SET_CAMPUS:
      return action.students;

    case ADD_CAMPUS:
      return action.campusName;

    case UPDATE_CAMPUS_INFO:
      return action.info;

    case REMOVE_CAMPUS:
      return action.id;

    default:
      return state;
  };
};

/* ------------   THUNK CREATORS     ------------------ */

export const fetchAllCampus = () => dispatch => {
  // REFERENCE: server/main_router
  axios.get('/campuses')
       .then(res => dispatch(setStudents(res.data)))
       .catch(err => console.error('Campus does not exist', err));
};


