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
    const { campuses, history } = this.props;
    const campusItemArr = campuses.map(campus => (
      <CampusItem
        key={campus.id}
        campus={campus}
        history={history} />
    ));
    return (
      <div className="container">
        <div className="campus-list">
          { campusItemArr }
        </div>
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = (state, ownProps) => ({
  campuses: state.campuses,
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Home);
