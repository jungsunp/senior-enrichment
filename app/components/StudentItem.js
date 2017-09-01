'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { removeStudentThunk } from '../reducers/students';

/* -----------------  Component  ------------------ */

class StudentItem extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove (evt) {
    evt.stopPropagation();
    this.props.removeStudent(this.props.student);
  }

  render () {
    const { student, campus } = this.props;
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="thumbnail">
          <div className="img-container">
            <img src={student.image} />
          </div>
          <div className="caption">
            <div className="name-container">
              <strong>{student.name}</strong>
              <br />
              <span>{campus ? campus.name : null}</span>
            </div>
            <p>
              <NavLink
                to={`/students/${student.id}`}
                className="btn btn-default caption-button"
                role="button">
                Detail
              </NavLink>
              <button
                onClick={this.handleRemove}
                className="btn btn-default caption-button">
                Remove
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    removeStudent: student => {
      dispatch(removeStudentThunk(student, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentItem);
