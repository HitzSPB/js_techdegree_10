import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './Context';

const SignOut = () => {
    const {logout} = useContext(UserContext);
    useEffect(() =>  logout());

    return (
        <div>
            <Redirect to="/" />
        </div>
    )
};

export default SignOut;