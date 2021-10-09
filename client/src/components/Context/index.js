import { useCookies } from 'react-cookie'
import React, { useState } from 'react';

export const UserContext = React.createContext({
    //default values
    state: userState.user,
    login: handleLogin,
    logout: handleLogout
});

export const UserProvider = (props) => {
//state
const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])
const [state, setState] = useState("");
const [userState, setUserState] = useState("");

//methods

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
  


    return(<UserContext.Provider value={{      
        state: userState.user,
        login: handleLogin,
        logout: handleLogout
    }}>{props.children}</UserContext.Provider>)
}