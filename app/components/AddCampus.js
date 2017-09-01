'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCampusThunk } from '../reducers/campuses';

/* -----------------  Component  ------------------ */

class AddCampus extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const campus = {
      name: evt.target.campusName.value,
      image: evt.target.campusImage.value,
      description: evt.target.campusDescription.value
    };
    this.props.addCampus(campus);
  }

  render () {
    return (
      <div className="container">

        <div className="panel panel-default">

          <div className="panel-heading">
            <h3 className="panel-title">New Campus</h3>
          </div>
          <div className="panel-body">
            <div className="item-all-container">

              <div className="item-update-container col-sm-12 col-lg-12">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="campusName"
                      placeholder="Enter name" />
                    <label>Image URL</label>
                    <input
                      className="form-control"
                      type="text"
                      name="campusImage"
                      placeholder="Enter URL for image" />
                    <label>Description</label>
                    <textarea
                      className="form-control campus-desc-control"
                      type="text"
                      name="campusDescription"
                      placeholder="Enter description" />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-default update-btn">
                      Add
                    </button>
                  </div>
                </form>
              </div>

            </div>
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
    addCampus: (campus) => {
      dispatch(addCampusThunk(campus, history));
    },
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCampus);
