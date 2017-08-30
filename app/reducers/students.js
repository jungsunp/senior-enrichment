import axios from 'axios';

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
        return (student.id === action.student.id) ?
          action.student :
          student;
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

export const addStudentThunk = student => {
  return dispatch => {
    axios.post('/api/students', student)
      .then(res => res.data)
      .then(createdStudent => {
        dispatch(addStudent(createdStudent));
      })
      .catch(err => console.error(`Error adding a student ${student}`, err));
  };
};

export const removeStudentThunk = studentId => {
  return dispatch => {
    axios.delete(`/api/students/${studentId}`)
      .then(() => {
        dispatch(removeStudent(studentId));
      })
      .catch(err => console.error(`Error removing a student ${studentId}`, err));
  };
};

export const updateStudentThunk = (studentId, student) => {
  return dispatch => {
    axios.put(`/api/students/${studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        dispatch(updateStudent(updatedStudent));
      })
      .catch(err => console.error(`Error updating a student ${student}`, err));
  };
};
