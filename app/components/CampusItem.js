'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/* -----------------  Component  ------------------ */

class CampusItem extends Component {

  constructor(props) {
    super(props);
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
export default connector(CampusItem);
