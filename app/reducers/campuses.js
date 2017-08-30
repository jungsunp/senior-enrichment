import axios from 'axios';

/* -----------------  Action Types  ------------------ */

const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

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
        return (campus.id === action.campus.id) ?
          action.campus :
          campus;
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

export const addCampusThunk = campus => {
  return dispatch => {
    axios.post('/api/campuss', campus)
      .then(res => res.data)
      .then(createdCampus => {
        dispatch(addCampus(createdCampus));
      })
      .catch(err => console.error(`Error adding a campus ${campus}`, err));
  };
};

export const removeCampusThunk = campusId => {
  return dispatch => {
    axios.delete(`/api/campuss/${campusId}`)
      .then(() => {
        dispatch(removeCampus(campusId));
      })
      .catch(err => console.error(`Error removing a campus ${campusId}`, err));
  };
};

export const updateCampusThunk = (campusId, campus) => {
  return dispatch => {
    axios.put(`/api/campuss/${campusId}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        dispatch(updateCampus(updatedCampus));
      })
      .catch(err => console.error(`Error updating a campus ${campus}`, err));
  };
};
