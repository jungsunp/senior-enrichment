import axios from 'axios';

/* -----------------  Action Types  ------------------ */

const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const ADD_STUDENT_TO_CAMPUS = 'ADD_STUDENT_TO_CAMPUS';
const REMOVE_STUDENT_FROM_CAMPUS = 'REMOVE_STUDENT_FROM_CAMPUS';

/* -----------------  Action Creators  ------------------ */

const intializeCampuses = campuses => ({
  type: INITIALIZE_CAMPUSES,
  campuses
});

const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus
});

const removeCampus = campusId => ({
  type: REMOVE_CAMPUS,
  campusId
});

const updateCampus = campus => ({
  type: UPDATE_CAMPUS,
  campus
});

export const addStudentToCampus = (campus, student) => ({
  type: ADD_STUDENT_TO_CAMPUS,
  campus,
  student
});

export const removeStudentFromCampus = (campus, student) => ({
  type: REMOVE_STUDENT_FROM_CAMPUS,
  campus,
  student
});

/* -----------------  Reducer  ------------------ */

export default function reducer (campuses = [], action) {

  switch (action.type) {

    case INITIALIZE_CAMPUSES:
      return action.campuses;

    case ADD_CAMPUS:
      return [...campuses, action.campus];

    case REMOVE_CAMPUS:
      return campuses.filter(campus => (campus.id !== action.campusId));

    case UPDATE_CAMPUS:
      return campuses.map(campus => {
        if (campus.id === action.campus.id) {
          action.campus.students = campus.students;
          return action.campus;
        } else {
          return campus;
        }
      });

    case ADD_STUDENT_TO_CAMPUS:
      return campuses.map(campus => {
        if (campus.id === action.campus.id) {
          if (campus.students) campus.students = [...campus.students, action.student];
          else campus.students = [ action.student ];
          return campus;
        } else {
          return campus;
        }
      });

    case REMOVE_STUDENT_FROM_CAMPUS:
      return campuses.map(campus => {
        if (campus.id === action.campus.id) {
          if (campus.students) {
            campus.students = campus.students.filter(student => {
              return student.id !== action.student.id;
            });
          }
          return campus;
        } else {
          return campus;
        }
      });

    default:
      return campuses;
  }
}

/* -----------------  Thunk Creators  ------------------ */

export const fetchCampuses = () => {
  return dispatch => {
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(intializeCampuses(campuses)))
      .catch(err => console.error('Error during fetching campuses: ', err));
  };
};

export const addCampusThunk = (campus, history) => {
  return dispatch => {
    axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(createdCampus => {
        dispatch(addCampus(createdCampus));
        history.push(`/campuses/${createdCampus.id}`);
      })
      .catch(err => console.error(`Error adding a campus ${campus}`, err));
  };
};

export const removeCampusThunk = (campusId, history) => {
  return dispatch => {
    axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        dispatch(removeCampus(campusId));
        history.push('/campuses/');
      })
      .catch(err => console.error(`Error removing a campus ${campusId}`, err));
  };
};

export const updateCampusThunk = (campus, history) => {
  return dispatch => {
    axios.put(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        dispatch(updateCampus(updatedCampus));
        history.push(`/campuses/${updatedCampus.id}`);
      })
      .catch(err => console.error(`Error updating a campus ${campus}`, err));
  };
};
