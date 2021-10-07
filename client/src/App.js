import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/reset.css';
import './styles/global.css';
import { useCookies } from 'react-cookie'
import React, { useState } from 'react';

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
import { Provider } from './components/Context';


const App = (props) => {

  const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])
  const [state, setState] = useState("");
  const [userState, setUserState] = useState("");
  const handleLogout = () => {
    removeCookie("username");
    removeCookie("userpassword");
    removeCookie("userinfo");
    removeCookie("userid");
  }

   const handleLogin = (email, password) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${email}:${password}`)
            },
        }
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        await setState("The combination of Username and password did not match a user")
                    }
                    else {
                        props.history.push("/error");
                    }
                }
                else {
                    const jsonData = await response.json();
                    setUserState({user : {userinfo: `${jsonData.firstName} ${jsonData.lastName}`,
                    username:  email,
                    userpassword: password,
                    userid: jsonData.id}})
                    setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/' })
                    setCookie('username', email, { path: '/' })
                    setCookie('userpassword', password, { path: '/' })
                    setCookie('userid', jsonData.id, { path: '/' })
                    // console.log(userState.user)
                    // props.history.goBack();
                }
            });
    };

  return (
    <Provider value={{
      state: userState.user,
      login: handleLogin,
      logout: handleLogout
    }}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        <PrivateRoute exact path="/courses/create" component={CreateCourse} user={userState.user} />
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
    </Provider>
  );
}

export default App;
