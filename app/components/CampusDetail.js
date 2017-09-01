'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';
import StudentItem from './StudentItem';

import { updateCampusThunk } from '../reducers/campuses';

/* -----------------  Component  ------------------ */

class CampusDetail extends Component {

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { campus } = this.props;
    campus.name = evt.target.campusName.value;
    campus.image = evt.target.campusImage.value;
    campus.description = evt.target.campusDescription.value;
    this.props.updateCampus(campus);
  }

  render () {

    const { campus, students, history } = this.props;
    if (!campus) return <div />;

    const campusItem = (<CampusItem
      campus={campus}
      history={history} />);

    const studentItemArr = (students && students.length) ?
      students.map(student => (<StudentItem
        key={student.id}
        student={student}
        campus={campus}
        history={history} />)) :
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
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="campusName"
                      defaultValue={campus.name} />
                    <label>Image URL</label>
                    <input
                      className="form-control"
                      type="text"
                      name="campusImage"
                      defaultValue={campus.image} />
                    <label>Description</label>
                    <textarea
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
    students.forEach(student => {
      student.campuses = [campus];
    });
  }
  const { history } = ownProps;
  return { campus, students, history };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    updateCampus: campus => {
      dispatch(updateCampusThunk(campus, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CampusDetail);
