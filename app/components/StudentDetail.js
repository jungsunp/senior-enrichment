'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------  Component  ------------------ */

class StudentDetail extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        This is StudentDetail!!
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(StudentDetail);
