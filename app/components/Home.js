'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------  Component  ------------------ */

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    let campusList = this.props.campuses.map(campus => (
      <li key={campus.id}>
        {campus.name}
      </li>
    ));
    return (
      <div>
        This is Home!!
        <ul>
          {campusList}
        </ul>
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
