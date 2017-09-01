'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { removeCampusThunk } from '../reducers/campuses';

/* -----------------  Component  ------------------ */

class CampusItem extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove (evt) {
    evt.stopPropagation();
    this.props.removeCampus(this.props.campus.id);
  }

  render () {
    const { campus } = this.props;
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="thumbnail">
          <div className="img-container">
            <img src={campus.image} />
          </div>
          <div className="caption">
            <div className="name-container">
              <strong>{campus.name}</strong>
            </div>
            <p className="campus-buttons">
              <NavLink
                to={`/campuses/${campus.id}`}
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
    removeCampus: campusId => {
      dispatch(removeCampusThunk(campusId, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CampusItem);
