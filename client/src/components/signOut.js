
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context';

const SignOut = (props) => {

    return (
        <div>
        <Consumer>{value => value.logout()}</Consumer>
        <Redirect to="/" />
        </div>
    )
};

export default SignOut;