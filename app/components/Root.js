import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

/* -----------------  Component  ------------------ */
const Root = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="add-buttons">
        <NavLink
          to={'/students/add'}
          className="btn btn-default add-button"
          role="button">
          New Student
        </NavLink>
        <NavLink
          to={'/campuses/add'}
          className="btn btn-default add-button"
          role="button">
          New Campus
        </NavLink>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Root;
