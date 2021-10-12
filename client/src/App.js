import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import React from 'react';

// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Error from './components/UnhandledError';
import { UserProvider } from './components/Context';


const App = (props) => {

  return (
    <UserProvider>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        <PrivateRoute exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
        <Route exact path="/sign-in" render={(props) => <UserSignIn {...props} />} />
        <Route exact path="/sign-up" render={(props) => <UserSignUp {...props} />} />
        <Route exact path="/sign-out" render={(props) => <UserSignOut {...props} />} />
        <Route exact path="/forbidden" render={(props) => <Forbidden />} />
        <Route exact path="/error" render={(props) => <Error />} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
