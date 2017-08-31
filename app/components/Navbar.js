import React from 'react';
import { NavLink } from 'react-router-dom';

/* -----------------  Component  ------------------ */
const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand glyphicon glyphicon-education"></span>
          <NavLink to="/" className="navbar-brand">
            Campus Manager
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/campuses" activeClassName="active">
                campuses
              </NavLink>
            </li>
            <li>
              <NavLink to="/students" activeClassName="active">
                students
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
