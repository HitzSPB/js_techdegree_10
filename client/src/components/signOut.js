
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const SignOut = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword', 'userinfo', 'userid'])
    useEffect(() => {
        removeCookie("username");
        removeCookie("userpassword");
        removeCookie("userinfo");
        removeCookie("userid");
    }, [])
    return (
        <Redirect to="/" />
    )
};

export default SignOut;