import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import React from 'react';

// Components
import Header from './components/header';
import Courses from './components/courses';
import CourseDetail from './components/courseDetail';
import CreateCourse from './components/createCourse';
import UpdateCourse from './components/updateCourse';
import UserSignUp from './components/signUp';
import UserSignIn from './components/signIn';
import UserSignOut from './components/signOut';
import PrivateRoute from './components/privateRoute';
import Forbidden from './components/forbidden';
import NotFound from './components/notFound';
import Error from './components/error';
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
