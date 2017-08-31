'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampusItem from './CampusItem';

/* -----------------  Component  ------------------ */

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { campuses } = this.props;
    return (
      <div className="container">
        <div className="campus-list">
          {
            campuses.map(campus => (
              <CampusItem key={campus.id} campus={campus} />
            ))
          }
        </div>
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({
  campuses: state.campuses
});

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Home);
