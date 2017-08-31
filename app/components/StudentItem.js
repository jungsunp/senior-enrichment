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
    const { student } = this.props;
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="thumbnail">
          <img src={student.image} />
          <div className="caption">
            <h3>{student.name}</h3>
            <h4>email: {student.email}</h4>
            <p>
              <NavLink
                to={`/students/${student.id}`}
                className="btn btn-default" role="button">
                Detail
              </NavLink>
              <NavLink to="#" className="btn btn-default" role="button">
                Remove
              </NavLink>
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
