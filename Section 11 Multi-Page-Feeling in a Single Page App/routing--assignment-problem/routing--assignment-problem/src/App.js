import React, { Component } from 'react';
import { NavLink, Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import NotFound from './containers/NotFound/NotFound'

const navlinkStyle = {
  color: "black",
  textDecoration: 'none',
  padding: "0px 40px ",

}
const activeStyle = {
  color: 'red',
}

const nav = {
  height: "50px",
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
}

class App extends Component {
  render() {
    return (
      // <BrowserRouter basename="/myapp"> if react app was inside myapp directory
      <BrowserRouter>

        <div className="App">
          <nav style={nav} >
            <NavLink activeStyle={activeStyle} style={navlinkStyle} to="/users">Users</NavLink>
            <NavLink activeStyle={activeStyle} style={navlinkStyle} to="/courses">Courses</NavLink>
          </nav>
          <Switch>

            <Route path='/users' component={Users} />
            <Redirect from="/all-courses" to='/courses' />
            <Route path='/courses' component={Courses} />
            <Route exact path='/'>
              <ol style={{ textAlign: 'left' }}>
                <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
                <li>Add a simple navigation with two links  One leading to "Users", one leading to "Courses"</li>
                <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
                <li>Pass the course ID to the "Course" page and output it there</li>
                <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
                <li>Load the "Course" component as a nested component of "Courses"</li>
                <li>Add a 404 error page and render it for any unknown routes</li>
                <li>Redirect requests to /all-courses to /courses  Your "Courses" page)</li>
              </ol>
            </Route>
            <Route component={NotFound} />

          </Switch>



        </div>



      </BrowserRouter>

    );
  }
}

export default App;
