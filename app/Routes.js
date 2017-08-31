'use strict';

// npms
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Root from './components/Root';
import Home from './components/Home';
import CampusDetail from './components/CampusDetail';
import AddCampus from './components/AddCampus';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudent from './components/AddStudent';

// redux stores
import { fetchCampuses } from './reducers/campuses';
import { fetchStudents } from './reducers/students';

/* -----------------  Component  ------------------ */

class Routes extends Component {

  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={Home} />
            <Route path="/campuses/add" component={AddCampus} />
            <Route path="/campuses/:id" component={CampusDetail} />
            <Route exact path="/students" component={StudentList} />
            <Route path="/students/add" component={AddStudent} />
            <Route exact path="/students/:id" component={StudentDetail} />
          </Switch>
        </Root>
      </Router>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Routes);
