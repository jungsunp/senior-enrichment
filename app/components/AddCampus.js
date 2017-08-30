'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------  Component  ------------------ */

class AddCampus extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        This is AddCampus!!
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCampus);
