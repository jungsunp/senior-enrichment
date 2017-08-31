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
          <div className="campus-img">
            <img src={campus.image} />
          </div>
          <div className="caption">
            <div className="campus-name">
              <strong>{campus.name}</strong>
            </div>
            <p className="campus-desc">
              {campus.description}
            </p>
            <div>
              <span>...</span>
            </div>
            <p>
              <NavLink
                to={`/campuses/${campus.id}`}
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
export default connector(CampusItem);
