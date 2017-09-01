'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';
import StudentItem from './StudentItem';

import { updateStudentThunk } from '../reducers/students';

/* -----------------  Component  ------------------ */

class StudentDetail extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { student } = this.props;
    student.name = evt.target.studentName.value;
    student.campusId = evt.target.studentCampus.value;
    student.birthday = evt.target.studentBirthday.value;
    student.email = evt.target.studentEmail.value;
    student.phone = evt.target.studentPhone.value;
    this.props.updateStudent(student);
  }

  render () {

    const { student, campuses, history } = this.props;
    if (!student) return <div />;

    const studentItem = (<StudentItem
      student={student}
      history={history} />);

    let campusIndex = null;
    campuses.forEach((campus, index) => {
      if ((student.campuses[0]) && (campus.id === student.campuses[0].id)) {
        campusIndex = index;
      }
    });
    const campusSelect = (<select className="form-control" name="studentCampus">
        {campuses.map((campus, index) => (
          (index === campusIndex) ?
            <option key={campus.id} value={campus.id} selected="selected">
              {campus.name}
            </option> :
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
        ))}
      </select>);

    return (
      <div className="container">

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Student</h3>
          </div>
          <div className="panel-body">
            <div className="item-all-container">

              {studentItem}

              <div className="item-update-container col-sm-6 col-lg-8">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentName"
                      defaultValue={student.name} />
                    <label>Campus</label>

                    {campusSelect}

                    <label>Birthday</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentBirthday"
                      defaultValue={student.birthday} />
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentEmail"
                      defaultValue={student.email} />
                    <label>Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentPhone"
                      defaultValue={student.phone} />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-default update-btn">
                      Update
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Campus</h3>
          </div>
          <div className="panel-body">
            <div className="item-students-container">
              {
                (campusIndex !== null) ?
                  <CampusItem campus={campuses[campusIndex]} history={history} /> :
                  null
              }
            </div>
          </div>
        </div>

      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = (state, ownProps) => {
  const studentId = +ownProps.match.params.id;
  const student = state.students.find(tmpStudent => {
    return tmpStudent.id === studentId;
  });
  const campuses = state.campuses;
  const { history } = ownProps;
  return { student, campuses, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    updateStudent: student => {
      dispatch(updateStudentThunk(student, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentDetail);
