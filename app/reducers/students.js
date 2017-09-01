import axios from 'axios';

import { addStudentToCampus, removeStudentFromCampus } from './campuses';

/* -----------------  Action Types  ------------------ */

const INITIALIZE_STUDENTS = 'INITIALIZE_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

/* -----------------  Action Creators  ------------------ */

const intializeStudents = students => ({
  type: INITIALIZE_STUDENTS,
  students
});

const addStudent = student => ({
  type: ADD_STUDENT,
  student
});

const removeStudent = studentId => ({
  type: REMOVE_STUDENT,
  studentId
});

const updateStudent = student => ({
  type: UPDATE_STUDENT,
  student
});

/* -----------------  Reducer  ------------------ */

export default function reducer (students = [], action) {

  switch (action.type) {

    case INITIALIZE_STUDENTS:
      return action.students;

    case ADD_STUDENT:
      return [...students, action.student];

    case REMOVE_STUDENT:
      return students.filter(student => (student.id !== action.studentId));

    case UPDATE_STUDENT:
      return students.map(student => {
        if (student.id === action.student.id) {
            // action.student.campuses = student.campuses;
            return action.student;
          } else {
            return student;
          }
      });

    default:
      return students;
  }
}

/* -----------------  Thunk Creators  ------------------ */

export const fetchStudents = () => {
  return dispatch => {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(intializeStudents(students)))
      .catch(err => console.error('Error during fetching students: ', err));
  };
};

export const addStudentThunk = (studentData, history) => {
  return dispatch => {
    axios.post('/api/students', studentData)
      .then(res => res.data)
      .then(({ campus, student }) => {
        student.campuses = [ campus ];
        dispatch(addStudent(student));
        dispatch(addStudentToCampus(campus, student));
        history.push(`/students/${student.id}`);
      })
      .catch(err => console.error(`Error adding a student ${studentData}`, err));
  };
};

export const removeStudentThunk = (student, history) => {
  return dispatch => {
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        console.log('student!!', student)
        if (student.campuses && student.campuses[0]){
          dispatch(removeStudentFromCampus(student.campuses[0], student));
        }
        dispatch(removeStudent(student.id));
        if (history.location.pathname.indexOf('/campuses/') < 0){
          // if removing student from campus detail page
          // so stay in that page
          // else, redirect to student list page
          history.push('/students/');
        }
      })
      .catch(err => console.error(`Error removing a student ${student.id}`, err));
  };
};

export const updateStudentThunk = (studentData, history) => {
  return dispatch => {
    axios.put(`/api/students/${studentData.id}`, studentData)
      .then(res => res.data)
      .then(({ campus, student }) => {
        student.campuses = [campus];
        dispatch(updateStudent(student));
        dispatch(removeStudentFromCampus(student.campuses[0], student));
        dispatch(addStudentToCampus(campus, student));
        history.push(`/students/${student.id}`);
      })
      .catch(err => console.error(`Error updating a student ${studentData}`, err));
  };
};
