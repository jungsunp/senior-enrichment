'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------  Component  ------------------ */

class AddStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      birthday: '',
      email: '',
      phone: '',
      campusId: ''
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
    const { campuses, name, birthday, email, phone, image, campusId, handleChange, handleSubmit } = this.props;
    const campusSelect = (<select className="form-control">
        {campuses.map(campus => (
          <option key={campus.id}>
            {campus.name}
          </option>
        ))}
      </select>);
    return (
      <div className="container">

        <div className="panel panel-default">

          <div className="panel-heading">
            <h3 className="panel-title">New Student</h3>
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
                    <label>Campus</label>

                    {campusSelect}

                    <label>Image URL</label>
                    <input
                      onChange={handleChange}
                      value={image}
                      className="form-control"
                      type="text"
                      name="campusImage"
                      placeholder="Enter URL for image" />
                    <label>Birthday</label>
                    <input
                      onChange={handleChange}
                      value={birthday}
                      className="form-control"
                      type="text"
                      name="studentBirthday"
                      placeholder="Enter birthday" />
                    <label>Email</label>
                    <input
                      onChange={handleChange}
                      value={email}
                      className="form-control"
                      type="text"
                      name="studentEmail"
                      placeholder="Enter email" />
                    <label>Phone</label>
                    <input
                      onChange={handleChange}
                      value={phone}
                      className="form-control"
                      type="text"
                      name="studentPhone"
                      placeholder="enter phone" />
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

const mapStateToProps = state => ({
  campuses: state.campuses
});

const mapDispatchToProps = dispatch => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddStudent);
