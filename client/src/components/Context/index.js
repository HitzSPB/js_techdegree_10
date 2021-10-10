import { useCookies } from 'react-cookie'
import React, { useState } from 'react';

export const UserContext = React.createContext({
    //default values
    currentUser: {
        username: "",
        userpassword: "",
        userinfo: "",
        userid: null
    },
    login: () => { },
    userSignUp: () => { },
    logout: () => { }
});

export const UserProvider = (props) => {
    //state
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])
    const [state, setState] = useState("");
    const [userState, setUserState] = useState({    currentUser: {
        username: "",
        userpassword: "",
        userinfo: "",
        userid: null
    }});

    //login check
    if(cookies.userid !== undefined && userState.currentUser.username === "")
    {
        console.log("we etner?")
        console.log(cookies)
        setUserState({
            currentUser: {
                username: cookies.username,
                userpassword: cookies.userpassword,
                userinfo: cookies.userinfo,
                userid: cookies.userid
            }
        })
    }
    //methods
    const handleSignUp = (firstName, lastName, email, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: password
            })

        }
        fetch('http://localhost:5000/api/users', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const json = await response.json()
                    if (response.status === 400) {
                        await setState({ data: json })
                    }
                    else {
                        props.history.push("/error");
                    }
                }
                else {
                    const requestSignInOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa(`${email}:${password}`)
                        },
                    }

                    fetch('http://localhost:5000/api/users', requestSignInOptions)
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

                                setUserState({
                                    currentUser: {
                                        username: email,
                                        userpassword: password,
                                        userinfo: `${jsonData.firstName} ${jsonData.lastName}`,
                                        userid: jsonData.id
                                    }
                                })

                                setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/' })
                                setCookie('username', email, { path: '/' })
                                setCookie('userpassword', password, { path: '/' })
                                setCookie('userid', jsonData.id, { path: '/' })
                                // props.history.push("/");
                            }

                        })
                }
            });
    }

    const handleLogout = () => {
        setUserState({
            currentUser: {
                username: "",
                userpassword: "",
                userinfo: "",
                userid: null
            }
        })
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
                        props.history.push("/sign-in");
                    }
                    else {
                        props.history.push("/error");
                    }
                }
                else {
                    const jsonData = await response.json();
                    setUserState({
                        currentUser: {
                            username: email,
                            userinfo: `${jsonData.firstName} ${jsonData.lastName}`,
                            userpassword: password,
                            userid: jsonData.id
                        }
                    })
                    setCookie('userinfo', `${jsonData.firstName} ${jsonData.lastName}`, { path: '/' })
                    setCookie('username', email, { path: '/' })
                    setCookie('userpassword', password, { path: '/' })
                    setCookie('userid', jsonData.id, { path: '/' })
                    return "happy"
                    // console.log(userState.user)
                    // props.history.goBack();
                }
            });
    };



    return (<UserContext.Provider value={{
        currentUser: userState.currentUser,
        login: handleLogin,
        userSignUp: handleSignUp,
        logout: handleLogout
    }}>{props.children}</UserContext.Provider>)
}