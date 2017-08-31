'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/* -----------------  Component  ------------------ */

class StudentItem extends Component {

  constructor(props) {
    super(props);
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
                className="btn btn-default caption-button"
                type="submit">
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentItem);
