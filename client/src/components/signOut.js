
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './Context';

const SignOut = (props) => {
    const {logout} = useContext(UserContext);
    logout()
    return (
        <div>
        <Redirect to="/" />
        </div>
    )
};

export default SignOut;