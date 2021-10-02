import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';

// Components
import Header from './components/header';
import Courses from './components/courses';
import CourseDetail from './components/courseDetail';
import CreateCourse from './components/createCourse';
import UpdateCourse from './components/updateCourse';
import UserSignUp from './components/signUp';
import UserSignIn from './components/signIn';
import Forbidden from './components/forbidden';
import UserSignOut from './components/signOut';
import NotFound from './components/notFound';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        <Route exact path="/courses/create" render={(props) => <CreateCourse {...props}  />} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
