'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import StudentItem from './StudentItem';

/* -----------------  Component  ------------------ */

class StudentList extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { students, history } = this.props;
    const studentItemArr = students.map(student => (
      <StudentItem
        key={student.id}
        student={student}
        campus={student.campuses[0]}
        history={history} />
    ));
    return (
      <div className="container">
        <div className="student-list">
          { studentItemArr }
        </div>
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({
  students: state.students
});

const mapDispatchToProps = dispatch => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentList);
