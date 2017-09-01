'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
const toonavatar = require('cartoon-avatar');

import { addStudentThunk } from '../reducers/students';

/* -----------------  Component  ------------------ */

class AddStudent extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const student = {
      name: evt.target.studentName.value,
      campusId: evt.target.studentCampus.value,
      image: toonavatar.generate_avatar(),
      birthday: evt.target.studentBirthday.value,
      email: evt.target.studentEmail.value,
      phone: evt.target.studentPhone.value,
    };
    this.props.addStudent(student);
  }

  render () {
    const { campuses } = this.props;
    const campusSelect = (<select className="form-control" name="studentCampus">
        {campuses.map(campus => (
          <option key={campus.id} value={campus.id}>
            {campus.name}
          </option>
        ))}
      </select>);

    return (
      <div className="container">

        <div className="panel panel-default">

          <div className="panel-heading">
            <h3 className="panel-title">New Student</h3>
          </div>
          <div className="panel-body">
            <div className="item-all-container">

              <div className="item-update-container col-sm-12 col-lg-12">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentName"
                      placeholder="Enter name" />
                    <label>Campus</label>

                    {campusSelect}

                    <label>Birthday</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentBirthday"
                      placeholder="Enter birthday" />
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentEmail"
                      placeholder="Enter email" />
                    <label>Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="studentPhone"
                      placeholder="enter phone" />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-default update-btn">
                      Add
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({
  campuses: state.campuses
});

const mapDispatchToProps = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    addStudent: student => {
      dispatch(addStudentThunk(student, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddStudent);
