
import React from 'react';
// import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const SignOut = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])

    removeCookie("username");
    removeCookie("userpassword");
    removeCookie("userinfo");
    removeCookie("userid");
    props.history.push("/")
    return (
        <p>Signing you out</p>
    )
};

export default SignOut;