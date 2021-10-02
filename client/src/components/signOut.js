
import React, { useState, useEffect  }  from 'react';
import { Redirect } from 'react-router-dom';
import { cookies, useCookies } from 'react-cookie'

const SignOut = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userpassword'])
    useEffect(() => {
        removeCookie("username");
        removeCookie("userpassword");
    }, [])
   return (
          <Redirect to="/" />  
    )
};

export default SignOut;