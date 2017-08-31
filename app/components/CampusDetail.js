'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';
import StudentItem from './StudentItem';

import { fetchCampus } from '../reducers/campuses';

/* -----------------  Component  ------------------ */

class CampusDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      description: ''
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
    const { campus, students, name, image, description, handleSubmit, handleChange } = this.props;
    if (!campus) return <div />;
    const campusItem = <CampusItem campus={campus} />;
    const studentItemArr = (students && students.length) ?
      students.map(student => (<StudentItem key={student.id} student={student} campus={campus} />)) :
      null;
    return (
      <div className="container">

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Campus</h3>
          </div>
          <div className="panel-body">
            <div className="item-all-container">

              {campusItem}

              <div className="item-update-container col-sm-6 col-lg-8">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      value={name}
                      className="form-control"
                      type="text"
                      name="campusName"
                      defaultValue={campus.name} />
                    <label>Image URL</label>
                    <input
                      onChange={handleChange}
                      value={image}
                      className="form-control"
                      type="text"
                      name="campusImage"
                      defaultValue={campus.image} />
                    <label>Description</label>
                    <textarea
                      onChange={handleChange}
                      value={description}
                      className="form-control campus-desc-control"
                      type="text"
                      name="campusDescription"
                      defaultValue={campus.description} />
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
            <h3 className="panel-title">Students</h3>
          </div>
          <div className="panel-body">
            <div className="item-students-container">
              {studentItemArr}
            </div>
          </div>
        </div>

      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = (state, ownProps) => {
  const campusId = +ownProps.match.params.id;
  const campus = state.campuses.find(tmpCampus => {
    return tmpCampus.id === campusId;
  });
  let students = [];
  if (campus) {
    students = campus.students;
  }
  return { campus, students };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CampusDetail);
