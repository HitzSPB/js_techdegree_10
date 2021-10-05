
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const SignOut = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])

    removeCookie("username");
    removeCookie("userpassword");
    removeCookie("userinfo");
    removeCookie("userid");
    return (
        <Redirect to="/" />
    )
};

export default SignOut;