'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';
import StudentItem from './StudentItem';

/* -----------------  Component  ------------------ */

class StudentDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      birthday: '',
      email: '',
      phone: '',
      campusId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {

  }

  handleSubmit (evt) {
    evt.preventDefault();
  }

  render () {
    const { student, campuses, name, birthday, email, phone, image, campusId, handleChange, handleSubmit } = this.props;
    if (!student) return <div />;
    const studentItem = <StudentItem student={student} />;
    let campusIndex = 0;
    campuses.forEach((campus, index) => {
      if (campus.id === student.campuses[0].id) campusIndex = index;
    });
    const campusSelect = (<select className="form-control">
        {campuses.map(campus => (
          (campus.id === student.campuses[0].id) ?
            <option key={campus.id} selected="selected">
              {campus.name}s
            </option> :
            <option key={campus.id}>
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      value={name}
                      className="form-control"
                      type="text"
                      name="studentName"
                      defaultValue={student.name} />
                    <label>Campus</label>

                    {campusSelect}

                    <label>Image URL</label>
                    <input
                      onChange={handleChange}
                      value={image}
                      className="form-control"
                      type="text"
                      name="studentImage"
                      defaultValue={student.image} />
                    <label>Birthday</label>
                    <input
                      onChange={handleChange}
                      value={birthday}
                      className="form-control"
                      type="text"
                      name="studentBirthday"
                      defaultValue={student.birthday} />
                    <label>Email</label>
                    <input
                      onChange={handleChange}
                      value={email}
                      className="form-control"
                      type="text"
                      name="studentEmail"
                      defaultValue={student.email} />
                    <label>Phone</label>
                    <input
                      onChange={handleChange}
                      value={phone}
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
              <CampusItem campus={campuses[campusIndex]} />
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
  return { student, campuses };
};

const mapDispatchToProps = dispatch => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentDetail);
