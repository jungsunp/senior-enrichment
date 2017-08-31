'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------  Component  ------------------ */

class AddCampus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {

  }

  handleSubmit (evt) {
    evt.preventDefault();
  }

  render () {
    const { name, image, description, handleSubmit, handleChange } = this.props;
    return (
      <div className="container">

        <div className="panel panel-default">

          <div className="panel-heading">
            <h3 className="panel-title">New Campus</h3>
          </div>
          <div className="panel-body">
            <div className="item-all-container">

              <div className="item-update-container col-sm-12 col-lg-12">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      value={name}
                      className="form-control"
                      type="text"
                      name="campusName"
                      placeholder="Enter name" />
                    <label>Image URL</label>
                    <input
                      onChange={handleChange}
                      value={image}
                      className="form-control"
                      type="text"
                      name="campusImage"
                      placeholder="Enter URL for image" />
                    <label>Description</label>
                    <textarea
                      onChange={handleChange}
                      value={description}
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

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCampus);
